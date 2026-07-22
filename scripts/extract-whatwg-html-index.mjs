import { readFile, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

export const SPEC_ROOT = 'https://html.spec.whatwg.org/multipage/'

// The WHATWG indices table currently contains copied links for these global
// attributes. Keep audited definition URLs here until the upstream table is fixed.
const attributeSpecUrlOverrides = {
  headingoffset: `${SPEC_ROOT}sections.html#attr-headingoffset`,
  headingreset: `${SPEC_ROOT}sections.html#attr-headingreset`,
  slot: `${SPEC_ROOT}dom.html#attr-slot`
}

const entityMap = new Map([
  ['amp', '&'], ['apos', "'"], ['gt', '>'], ['lt', '<'], ['nbsp', ' '], ['quot', '"'],
  ['ndash', '–'], ['mdash', '—'], ['dagger', '†']
])

export function decodeHtml(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/giu, (entity, name) => {
    if (name.startsWith('#x')) return String.fromCodePoint(Number.parseInt(name.slice(2), 16))
    if (name.startsWith('#')) return String.fromCodePoint(Number.parseInt(name.slice(1), 10))
    return entityMap.get(name.toLowerCase()) ?? entity
  })
}

export function textContent(value) {
  return decodeHtml(value.replace(/<br\s*\/?>/giu, ' ').replace(/<[^>]+>/gu, ' ').replace(/\s+/gu, ' ').trim())
}

function absoluteSpecUrl(href) {
  if (/^https?:\/\//u.test(href)) return href
  if (href.startsWith('#')) return `${SPEC_ROOT}indices.html${href}`
  return new URL(href, SPEC_ROOT).href
}

function codeNamesOutsideParentheses(cell) {
  const names = []
  const pattern = /<code\b[^>]*>([\s\S]*?)<\/code>/giu
  for (const match of cell.matchAll(pattern)) {
    const prefix = textContent(cell.slice(0, match.index))
    const depth = [...prefix].reduce((value, character) => character === '(' ? value + 1 : character === ')' ? Math.max(0, value - 1) : value, 0)
    const name = textContent(match[1])
    if (depth === 0 && /^[a-z][a-z0-9]*$/u.test(name)) names.push(name)
  }
  return unique(names)
}

function linksFromCell(cell) {
  const links = []
  const pattern = /<a\b[^>]*\bhref=(?:"([^"]+)"|'([^']+)'|([^\s>]+))[^>]*>([\s\S]*?)<\/a>/giu
  for (const match of cell.matchAll(pattern)) {
    const href = match[1] ?? match[2] ?? match[3]
    links.push({ text: textContent(match[4]), href: absoluteSpecUrl(decodeHtml(href)) })
  }
  return links
}

function tableBody(html, marker) {
  const tableStart = html.indexOf(marker)
  if (tableStart < 0) throw new Error(`Не найдена таблица ${marker}`)
  const bodyStart = html.indexOf('<tbody>', tableStart)
  const tableEnd = html.indexOf('</table>', bodyStart)
  if (bodyStart < 0 || tableEnd < 0) throw new Error(`Повреждена таблица ${marker}`)
  return html.slice(bodyStart + '<tbody>'.length, tableEnd)
}

function rowsFromTable(body) {
  return [...body.matchAll(/<tr(?:\s[^>]*)?>([\s\S]*?)(?=<tr(?:\s|>)|$)/giu)].map((match) => match[1])
}

function cellsFromRow(row) {
  return [...row.matchAll(/<(?:th|td)(?:\s[^>]*)?>([\s\S]*?)(?=<(?:th|td)(?:\s|>)|$)/giu)].map((match) => match[1])
}

const unique = (values) => [...new Set(values)]

export function extractElements(html) {
  const rows = rowsFromTable(tableBody(html, '<caption>List of elements</caption>'))
  const elements = []
  for (const row of rows) {
    const cells = cellsFromRow(row)
    if (cells.length !== 7) throw new Error(`У строки элемента ожидалось 7 ячеек, получено ${cells.length}`)
    const names = unique([...cells[0].matchAll(/<code\b[^>]*>[\s\S]*?<a\b[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/code>/giu)]
      .map((match) => textContent(match[1])).filter((name) => /^[a-z][a-z0-9]*$/u.test(name)))
    const specLinks = linksFromCell(cells[0])
    const parentLinks = linksFromCell(cells[3])
    const childLinks = linksFromCell(cells[4])
    const attributeLinks = linksFromCell(cells[5]).filter(({ text }) => text !== 'globals')
    const interfaceLink = linksFromCell(cells[6])[0]
    for (const name of names) {
      const specLink = specLinks.find(({ text }) => text === name) ?? specLinks[0]
      elements.push({
        name,
        description: textContent(cells[1]),
        categories: linksFromCell(cells[2]).map(({ text }) => text),
        categoriesText: textContent(cells[2]),
        parents: parentLinks.map(({ text }) => text),
        parentsText: textContent(cells[3]),
        children: childLinks.map(({ text }) => text),
        childrenText: textContent(cells[4]),
        attributes: unique(attributeLinks.map(({ text }) => text)),
        attributeLinks: Object.fromEntries(attributeLinks.map(({ text, href }) => [text, href])),
        interface: interfaceLink?.text ?? textContent(cells[6]),
        interfaceUrl: interfaceLink?.href ?? null,
        specUrl: specLink?.href ?? `${SPEC_ROOT}indices.html#elements-3`
      })
    }
  }
  return elements
}

function extractAttributesTable(html, marker, kind) {
  return rowsFromTable(tableBody(html, marker)).map((row) => {
    const cells = cellsFromRow(row)
    if (cells.length !== 4) throw new Error(`У строки атрибута ожидалось 4 ячейки, получено ${cells.length}`)
    const elementLinks = linksFromCell(cells[1])
    const appliesText = textContent(cells[1])
    const elementNames = codeNamesOutsideParentheses(cells[1])
    const elementSpecUrls = Object.fromEntries(elementNames.map((elementName) => {
      const link = elementLinks.find(({ text }) => text === elementName)
      return [elementName, link?.href]
    }).filter(([, href]) => href))
    const specLink = elementLinks.find(({ text, href }) => elementNames.includes(text) && href.startsWith(SPEC_ROOT))
      ?? elementLinks.find(({ href }) => href.startsWith(SPEC_ROOT)) ?? elementLinks[0]
    const name = textContent(cells[0])
    return {
      name, kind, elements: elementNames, elementSpecUrls,
      appliesToAll: /HTML elements/u.test(appliesText), appliesText,
      description: textContent(cells[2]), value: textContent(cells[3]),
      specUrl: attributeSpecUrlOverrides[name] ?? specLink?.href ?? `${SPEC_ROOT}indices.html#attributes-3`
    }
  })
}

export function extractAttributes(html) {
  return extractAttributesTable(html, '<caption>List of attributes (excluding event handler content attributes)</caption>', 'regular')
}

export function extractEventHandlers(html) {
  return extractAttributesTable(html, '<caption>List of event handler content attributes</caption>', 'event')
}

export function extractWhatwgIndex(html, checkedAt = new Date().toISOString().slice(0, 10)) {
  return {
    source: `${SPEC_ROOT}indices.html`, checkedAt,
    elements: extractElements(html), attributes: extractAttributes(html), events: extractEventHandlers(html)
  }
}

async function main() {
  const [input, output] = process.argv.slice(2)
  if (!input || !output) throw new Error('Использование: node scripts/extract-whatwg-html-index.mjs <indices.html> <output.json>')
  const result = extractWhatwgIndex(await readFile(input, 'utf8'))
  await writeFile(output, `${JSON.stringify(result, null, 2)}\n`, 'utf8')
  console.log(`WHATWG: ${result.elements.length} элементов, ${result.attributes.length} атрибутов, ${result.events.length} обработчиков`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main()
