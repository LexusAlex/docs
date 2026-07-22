import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { extractWhatwgIndex } from './extract-whatwg-html-index.mjs'
import { buildHtmlDocFiles } from './generate-html-docs.mjs'
import { validateCatalog, validateGeneratedFiles } from './check-html-docs.mjs'
import {
  attributeGroup, attributeSlug, elementByName, elementHref, eventAttributes,
  groupedAttributes, relationshipScenarios
} from '../src/.vitepress/data/html-catalog.mjs'

function sourcePathFromRoute(route) {
  return `src${route}.md`
}

function htmlFenceCount(content) {
  return (content.match(/```html\n/gu) ?? []).length
}

test('официальный снимок WHATWG разбирается в ожидаемые наборы', async () => {
  const snapshot = JSON.parse(await readFile(new URL('../src/.vitepress/data/html-spec-index.json', import.meta.url), 'utf8'))
  assert.equal(snapshot.elements.length, 113)
  assert.equal(new Set(snapshot.attributes.map(({ name }) => name)).size, 144)
  assert.equal(snapshot.events.length, 89)
  assert.ok(snapshot.elements.every(({ specUrl }) => specUrl.startsWith('https://html.spec.whatwg.org/')))
  const height = snapshot.attributes.find(({ name }) => name === 'height')
  assert.ok(!height.elements.includes('picture'))
  assert.equal(height.elementSpecUrls.canvas, 'https://html.spec.whatwg.org/multipage/canvas.html#attr-canvas-height')
  assert.ok(height.elementSpecUrls.source.endsWith('#attr-dim-height'))
})

test('экстрактор сохраняет разные варианты одноимённого атрибута', () => {
  const html = `
    <table><caption>List of elements</caption><tbody>
      <tr><th><code><a href=semantics.html#the-html-element>html</a></code><td>Root<td>none<td>none<td><a href=semantics.html#the-head-element>head</a><td><a href=dom.html#global-attributes>globals</a><td><code><a href=dom.html#htmlelement>HTMLElement</a></code>
    </table>
    <table><caption>List of attributes (excluding event handler content attributes)</caption><tbody>
      <tr><th><code>type</code><td><code><a href=input.html#attr-input-type>input</a></code><td>Control type<td>Keyword
      <tr><th><code>type</code><td><code><a href=form-elements.html#attr-button-type>button</a></code><td>Button type<td>Keyword
      <tr><th><code>height</code><td><code><a href=embedded-content.html#attr-source-height>source</a></code> (in <code><a href=embedded-content.html#the-picture-element>picture</a></code>)<td>Source height<td>Integer
    </table>
    <table><caption>List of event handler content attributes</caption><tbody>
      <tr><th><code>onclick</code><td><a href=webappapis.html#handler-onclick>HTML elements</a><td>click handler<td>Event handler content attribute
    </table>`
  const result = extractWhatwgIndex(html, '2026-07-22')
  assert.equal(result.elements[0].name, 'html')
  assert.deepEqual(result.attributes.map(({ name }) => name), ['type', 'type', 'height'])
  assert.deepEqual(result.attributes[2].elements, ['source'])
  assert.equal(result.attributes[2].elementSpecUrls.source, 'https://html.spec.whatwg.org/multipage/embedded-content.html#attr-source-height')
  assert.equal(result.events[0].name, 'onclick')
})

test('глобальные атрибуты с ошибочными ссылками индекса указывают на определения', async () => {
  const snapshot = JSON.parse(await readFile(new URL('../src/.vitepress/data/html-spec-index.json', import.meta.url), 'utf8'))
  const urls = Object.fromEntries(snapshot.attributes.filter(({ name }) => ['headingoffset', 'headingreset', 'slot'].includes(name)).map(({ name, specUrl }) => [name, specUrl]))
  assert.equal(urls.headingoffset, 'https://html.spec.whatwg.org/multipage/sections.html#attr-headingoffset')
  assert.equal(urls.headingreset, 'https://html.spec.whatwg.org/multipage/sections.html#attr-headingreset')
  assert.equal(urls.slot, 'https://html.spec.whatwg.org/multipage/dom.html#attr-slot')
})

test('каждый нормативный вариант атрибута имеет отдельный HTML-пример', () => {
  const files = buildHtmlDocFiles()
  for (const attribute of groupedAttributes) {
    const path = `src/base/frontend/html/attributes/${attributeGroup(attribute.name)}/${attributeSlug(attribute.name)}.md`
    assert.ok(htmlFenceCount(files.get(path)) >= attribute.variants.length, `${attribute.name}: примеров меньше вариантов`)
  }
})

test('пример каждого варианта содержит рассматриваемый атрибут', () => {
  const files = buildHtmlDocFiles()
  for (const attribute of groupedAttributes) {
    const path = `src/base/frontend/html/attributes/${attributeGroup(attribute.name)}/${attributeSlug(attribute.name)}.md`
    const blocks = [...files.get(path).matchAll(/```html\n([\s\S]*?)```/gu)].map((match) => match[1])
    const actualName = attribute.name === 'data-*' ? 'data-user-id' : attribute.name
    for (let index = 0; index < attribute.variants.length; index++) {
      assert.match(blocks[index], new RegExp(`\\s${actualName.replace('*', '\\*')}(?:\\s|=|>)`, 'u'), `${attribute.name}: вариант ${index + 1} не содержит атрибут`)
    }
  }
})
test('страницы событий показывают addEventListener рядом со встроенным обработчиком', () => {
  const files = buildHtmlDocFiles()
  for (const attribute of eventAttributes) {
    const eventName = attribute.name.slice(2)
    const page = files.get(`src/base/frontend/html/attributes/events/${attribute.name}.md`)
    assert.match(page, /```js\n[\s\S]*?addEventListener\(/u, `${attribute.name}: нет JavaScript-примера`)
    assert.ok(page.includes(`'${eventName}'`), `${attribute.name}: неверное имя события`)
  }
})

test('страница элемента сохраняет точную модель WHATWG и все подходящие сценарии', () => {
  const files = buildHtmlDocFiles()
  for (const element of elementByName.values()) {
    const page = files.get(sourcePathFromRoute(elementHref(element.name)))
    for (const exactText of [element.categoriesText, element.parentsText, element.childrenText]) {
      assert.ok(page.includes(exactText), `${element.name}: потеряна точная формулировка «${exactText}»`)
    }
    const scenarios = relationshipScenarios.filter(({ html }) => new RegExp(`<${element.name}(?:[\\s>])`, 'u').test(html))
    for (const scenario of scenarios) assert.ok(page.includes(scenario.html), `${element.name}: нет сценария ${scenario.id}`)
  }
})

test('примеры элементов не содержат шаблонный текст', () => {
  const files = buildHtmlDocFiles()
  for (const [path, content] of files) {
    if (/\/elements\/[^/]+\/[^/]+\.md$/u.test(path)) assert.ok(!content.includes('Пример содержимого'), path)
  }
})

test('перегруженный type покрывает разные семейства значений', () => {
  const page = buildHtmlDocFiles().get('src/base/frontend/html/attributes/element-specific/type.md')
  for (const fragment of ['type="text/html"', 'type="submit"', 'type="image/svg+xml"', 'type="email"', 'type="I"', 'type="module"']) {
    assert.ok(page.includes(fragment), `нет примера ${fragment}`)
  }
  assert.ok(page.includes('links.html#attr-hyperlink-type'))
  assert.ok(page.includes('semantics.html#attr-link-type'))
  assert.ok(page.includes('scripting.html#attr-script-type'))
})

test('новые возможности описаны вместе с ограничениями и наборами значений', () => {
  const files = buildHtmlDocFiles()
  const selectedcontent = files.get('src/base/frontend/html/elements/forms/selectedcontent.md')
  assert.match(selectedcontent, /первого дочернего button/u)
  assert.match(selectedcontent, /multiple/u)
  const command = files.get('src/base/frontend/html/attributes/element-specific/command.md')
  for (const value of ['toggle-popover', 'show-popover', 'hide-popover', 'show-modal', 'request-close', 'close', '--save']) assert.ok(command.includes(`command="${value}"`))
  const closedby = files.get('src/base/frontend/html/attributes/element-specific/closedby.md')
  for (const value of ['any', 'closerequest', 'none']) assert.ok(closedby.includes(`closedby="${value}"`))
})

test('проверка отклоняет потерю примеров нормативных вариантов', () => {
  const files = buildHtmlDocFiles()
  const path = 'src/base/frontend/html/attributes/element-specific/autocomplete.md'
  let keptFirst = false
  files.set(path, files.get(path).replace(/```html\n[\s\S]*?```/gu, (block) => {
    if (!keptFirst) { keptFirst = true; return block }
    return ''
  }))
  assert.throws(() => validateGeneratedFiles(files), /HTML-примеров меньше нормативных вариантов/u)
})

test('проверка отклоняет потерю JavaScript-примера события', () => {
  const files = buildHtmlDocFiles()
  const path = 'src/base/frontend/html/attributes/events/onclick.md'
  files.set(path, files.get(path).replace(/```js\n[\s\S]*?```/u, ''))
  assert.throws(() => validateGeneratedFiles(files), /addEventListener/u)
})
test('подписи HTML-элементов в sidebar экранированы для v-html', () => {
  const sidebar = buildHtmlDocFiles().get('src/.vitepress/data/html-sidebar.mjs')
  assert.ok(sidebar.includes('text: "&lt;a&gt;"'))
  assert.doesNotMatch(sidebar, /text: "<[a-z][a-z0-9]*>"/u)
})
test('каталог и полный набор страниц проходят структурную проверку', () => {
  assert.doesNotThrow(() => validateCatalog())
  assert.doesNotThrow(() => validateGeneratedFiles(buildHtmlDocFiles()))
})

test('проверка отклоняет закрывающий тег void-элемента', () => {
  const files = buildHtmlDocFiles()
  const path = 'src/base/frontend/html/elements/embedded-content/img.md'
  files.set(path, files.get(path).replace('```html\n<img>\n```', '```html\n<img></img>\n```'))
  assert.throws(() => validateGeneratedFiles(files), /void-элемента img/u)
})
test('проверка отклоняет страницу без обязательного раздела', () => {
  const files = buildHtmlDocFiles()
  const path = 'src/base/frontend/html/elements/text-level-semantics/a.md'
  files.set(path, files.get(path).replace('## Модель содержимого', '## Удалённый раздел'))
  assert.throws(() => validateGeneratedFiles(files), /Модель содержимого/u)
})

test('проверка отклоняет битую внутреннюю ссылку', () => {
  const files = buildHtmlDocFiles()
  const path = 'src/base/frontend/html/elements/text-level-semantics/a.md'
  files.set(path, files.get(path).replace('/base/frontend/html/attributes/global/', '/base/frontend/html/attributes/missing/'))
  assert.throws(() => validateGeneratedFiles(files), /битая ссылка/u)
})
