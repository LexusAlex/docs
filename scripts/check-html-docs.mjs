import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative, sep } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import {
  attributeGroup, attributeSlug, elementByName, elementGroups, elementSummaries, eventAttributes,
  globalAttributes, globalAttributeNames, groupedAttributes, relationshipScenarios, specificAttributes
} from '../src/.vitepress/data/html-catalog.mjs'
import { buildHtmlDocFiles } from './generate-html-docs.mjs'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const MARKER = '<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->'
const JS_MARKER = '// Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную.'

function invariant(condition, message) {
  if (!condition) throw new Error(message)
}

function duplicates(values) {
  const seen = new Set()
  return [...new Set(values.filter((value) => seen.has(value) || !seen.add(value)))]
}

function pageRoute(relativePath) {
  const normalized = relativePath.replaceAll('\\', '/')
  if (!normalized.startsWith('src/base/frontend/html/') || !normalized.endsWith('.md')) return null
  const sourcePath = normalized.slice('src/'.length, -'.md'.length)
  return sourcePath.endsWith('/index') ? `/${sourcePath.slice(0, -'index'.length)}` : `/${sourcePath}`
}

function stripCodeFences(markdown) {
  return markdown.replace(/```[\s\S]*?```/gu, '')
}

function validateHtmlExamples(relativePath, markdown) {
  const voidNames = 'area base br col embed hr img input link meta source track wbr'.split(' ')
  for (const match of markdown.matchAll(/```html\n([\s\S]*?)```/gu)) {
    const html = match[1]
    for (const name of voidNames) {
      invariant(!new RegExp(`</${name}\\s*>`, 'iu').test(html), `${relativePath}: у void-элемента ${name} найден закрывающий тег`)
    }
    for (const tag of html.matchAll(/<([a-z][a-z0-9-]*)([^<>]*?)>/giu)) {
      const attributes = [...tag[2].matchAll(/\s([:\w-]+)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/gu)].map((item) => item[1].toLowerCase())
      const duplicateNames = duplicates(attributes)
      invariant(duplicateNames.length === 0, `${relativePath}: атрибуты повторяются в ${tag[0]}: ${duplicateNames.join(', ')}`)
    }
  }
}

function resolveInternalLink(sourceRoute, href) {
  const url = new URL(href, `https://docs.invalid${sourceRoute}`)
  return decodeURI(url.pathname)
}

export function validateCatalog() {
  const groupedNames = elementGroups.flatMap(({ names }) => names)
  const indexedNames = [...elementByName.keys()]
  invariant(groupedNames.length === 113, `Ожидалось 113 элементов в группах, получено ${groupedNames.length}`)
  invariant(indexedNames.length === 113, `Ожидалось 113 элементов WHATWG, получено ${indexedNames.length}`)
  invariant(duplicates(groupedNames).length === 0, `Элементы повторяются в группах: ${duplicates(groupedNames).join(', ')}`)
  invariant(groupedNames.every((name) => elementByName.has(name)), 'В группах есть элемент, отсутствующий в WHATWG-индексе')
  invariant(indexedNames.every((name) => groupedNames.includes(name)), 'В WHATWG-индексе есть нераспределённый элемент')
  invariant(groupedNames.every((name) => elementSummaries[name]), 'У одного или нескольких элементов нет русского описания')

  invariant(globalAttributes.length === 32, `Ожидалось 32 глобальных темы, получено ${globalAttributes.length}`)
  invariant(specificAttributes.length === 113, `Ожидалось 113 специальных атрибутов, получено ${specificAttributes.length}`)
  invariant(eventAttributes.length === 89, `Ожидалось 89 событийных атрибутов, получено ${eventAttributes.length}`)
  invariant(groupedAttributes.length === 145, `Ожидалось 145 обычных тем, получено ${groupedAttributes.length}`)
  invariant(globalAttributeNames.every((name) => globalAttributes.some((attribute) => attribute.name === name)), 'Не все глобальные темы найдены в каталоге')
  invariant(duplicates(groupedAttributes.map(({ name }) => name)).length === 0, 'Обычные атрибуты не были объединены по имени')
  invariant(duplicates(eventAttributes.map(({ name }) => name)).length === 0, 'Событийные атрибуты повторяются')

  for (const element of elementByName.values()) {
    invariant(element.specUrl.startsWith('https://'), `У ${element.name} нет нормативного URL`)
    invariant(element.interface, `У ${element.name} нет DOM-интерфейса`)
  }
  for (const attribute of [...groupedAttributes, ...eventAttributes]) {
    const variants = attribute.variants ?? [attribute]
    invariant(variants.every((variant) => variant.specUrl.startsWith('https://')), `У ${attribute.name} нет нормативного URL`)
    for (const variant of variants) {
      if (!variant.elementSpecUrls) continue
      invariant(variant.elements.every((element) => variant.elementSpecUrls[element]?.startsWith('https://')), `У ${attribute.name} нет определения для одного из элементов`)
    }
  }
}

export function validateGeneratedFiles(files) {
  invariant(files.size === 369, `Ожидалось 369 управляемых файлов, получено ${files.size}`)
  const routes = new Set([
    ...[...files.keys()].map(pageRoute).filter(Boolean),
    '/base/frontend/html/document/',
    '/base/frontend/html/document/headers',
    '/base/frontend/html/elements/theory/',
    '/base/frontend/html/elements/theory/block-and-inline'
  ])
  const requiredElementHeadings = ['## Синтаксис', '## Модель содержимого', '## Атрибуты', '## Связи с другими элементами', '## Примеры использования', '## DOM-интерфейс', '## Спецификация']
  const requiredAttributeHeadings = ['## Применимость и значение', '## Примеры использования', '## Связи', '## DOM', '## Спецификация']
  const attributesByPath = new Map([
    ...groupedAttributes.map((attribute) => [`src/base/frontend/html/attributes/${attributeGroup(attribute.name)}/${attributeSlug(attribute.name)}.md`, attribute]),
    ...eventAttributes.map((attribute) => [`src/base/frontend/html/attributes/events/${attribute.name}.md`, attribute])
  ])

  for (const [relativePath, content] of files) {
    const expectedMarker = extname(relativePath) === '.md' ? MARKER : JS_MARKER
    invariant(content.includes(expectedMarker), `${relativePath}: отсутствует маркер генератора`)
    if (extname(relativePath) !== '.md') continue
    invariant((content.match(/^# /gmu) ?? []).length === 1, `${relativePath}: должен быть ровно один H1`)
    invariant(!content.includes('="example"'), `${relativePath}: найдено шаблонное значение example`)
    validateHtmlExamples(relativePath, content)
    invariant(!/\|[^\n]*<[a-z][^>\n]*>[^\n]*\|/iu.test(stripCodeFences(content)), `${relativePath}: неэкранированный HTML-подобный текст в таблице`)
    invariant(!/\[[^\]\n]*\[[^\]\n]*\]\([^)]*\)[^\]\n]*\]\(/u.test(content), `${relativePath}: вложенная Markdown-ссылка`)

    if (/\/elements\/[^/]+\/[^/]+\.md$/u.test(relativePath) && !relativePath.endsWith('/index.md')) {
      for (const heading of requiredElementHeadings) invariant(content.includes(heading), `${relativePath}: нет раздела ${heading}`)
      invariant(!content.includes('Пример содержимого'), `${relativePath}: найден шаблонный пример`)
      const name = relativePath.slice(relativePath.lastIndexOf('/') + 1, -'.md'.length)
      const element = elementByName.get(name)
      invariant(element, `${relativePath}: неизвестный элемент`)
      for (const exactText of [element.categoriesText, element.parentsText, element.childrenText]) {
        invariant(content.includes(exactText), `${relativePath}: потеряна точная модель «${exactText}»`)
      }
      for (const scenario of relationshipScenarios.filter(({ html }) => new RegExp(`<${name}(?:[\\s>])`, 'u').test(html))) {
        invariant(content.includes(scenario.html), `${relativePath}: отсутствует сценарий ${scenario.id}`)
      }
    }
    if (/\/attributes\/(?:global|element-specific|events)\/[^/]+\.md$/u.test(relativePath) && !relativePath.endsWith('/index.md')) {
      for (const heading of requiredAttributeHeadings) invariant(content.includes(heading), `${relativePath}: нет раздела ${heading}`)
      const attribute = attributesByPath.get(relativePath)
      invariant(attribute, `${relativePath}: неизвестный атрибут`)
      const htmlExamples = (content.match(/```html\n/gu) ?? []).length
      const variantCount = attribute.variants?.length ?? 1
      invariant(htmlExamples >= variantCount, `${relativePath}: HTML-примеров меньше нормативных вариантов`)
      if (relativePath.includes('/events/')) {
        invariant(/```js\n[\s\S]*?addEventListener\(/u.test(content), `${relativePath}: нет JavaScript-примера addEventListener()`)
        invariant(content.includes(`'${attribute.name.slice(2)}'`), `${relativePath}: в примере нет имени события`)
      }
    }

    const route = pageRoute(relativePath)
    const prose = stripCodeFences(content)
    for (const match of prose.matchAll(/\]\(([^)]+)\)/gu)) {
      const href = match[1]
      if (/^(?:https?:|mailto:|#)/u.test(href)) continue
      const target = resolveInternalLink(route, href)
      invariant(routes.has(target) || routes.has(`${target}/`), `${relativePath}: битая ссылка ${href} → ${target}`)
    }
  }
}

async function walkMarkdown(directory) {
  const result = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) result.push(...await walkMarkdown(path))
    else if (entry.name.endsWith('.md')) result.push(path)
  }
  return result
}

async function loadActualFiles(expected) {
  const actual = new Map()
  for (const relativePath of expected.keys()) {
    try {
      actual.set(relativePath, await readFile(join(ROOT, relativePath), 'utf8'))
    } catch (error) {
      if (error.code === 'ENOENT') throw new Error(`${relativePath}: файл отсутствует`)
      throw error
    }
  }
  return actual
}

async function findStaleGeneratedFiles(expected) {
  const htmlDirectory = join(ROOT, 'src/base/frontend/html')
  const markdownFiles = await walkMarkdown(htmlDirectory)
  const expectedPaths = new Set(expected.keys())
  const stale = []
  for (const absolutePath of markdownFiles) {
    const relativePath = relative(ROOT, absolutePath).split(sep).join('/')
    if (!expectedPaths.has(relativePath) && (await readFile(absolutePath, 'utf8')).includes(MARKER)) stale.push(relativePath)
  }
  return stale
}

async function main() {
  validateCatalog()
  const expected = buildHtmlDocFiles()
  const actual = await loadActualFiles(expected)
  validateGeneratedFiles(actual)
  for (const [relativePath, expectedContent] of expected) {
    invariant(actual.get(relativePath) === expectedContent, `${relativePath}: содержимое не соответствует каталогу`)
  }
  const stale = await findStaleGeneratedFiles(expected)
  invariant(stale.length === 0, `Найдены устаревшие сгенерированные файлы:\n${stale.join('\n')}`)
  console.log('HTML-справочник: 113 элементов, 234 атрибута и 369 файлов проверены')
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main()
