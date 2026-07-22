---
title: "title"
description: "Передаёт консультативную информацию; смысл зависит от элемента."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `title`

Передаёт консультативную информацию; смысл зависит от элемента.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| Все HTML-элементы | Advisory information for the element | Text | [WHATWG](https://html.spec.whatwg.org/multipage/dom.html#attr-title) |
| [`abbr`](/base/frontend/html/elements/text-level-semantics/abbr), [`dfn`](/base/frontend/html/elements/text-level-semantics/dfn) | Full term or expansion of abbreviation | Text | [`abbr`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-abbr-title), [`dfn`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-dfn-title) |
| [`input`](/base/frontend/html/elements/forms/input) | Description of pattern (when used with pattern attribute) | Text | [`input`](https://html.spec.whatwg.org/multipage/input.html#attr-input-title) |
| [`link`](/base/frontend/html/elements/document-metadata/link) | Title of the link | Text | [`link`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-title) |
| [`link`](/base/frontend/html/elements/document-metadata/link), [`style`](/base/frontend/html/elements/document-metadata/style) | CSS style sheet set name | Text | [`link`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-title), [`style`](https://html.spec.whatwg.org/multipage/semantics.html#attr-style-title) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для всех HTML-элементов — вариант 1

Точная формулировка WHATWG: `Advisory information for the element`. Формат из индекса: `Text`.

```html
<div title="Дополнительная информация">Содержимое div</div>
```

### Для `<abbr>`, `<dfn>` — вариант 2

Точная формулировка WHATWG: `Full term or expansion of abbreviation`. Формат из индекса: `Text`.

```html
<abbr title="HyperText Markup Language">Содержимое abbr</abbr>

<dfn title="Document Object Model">Содержимое dfn</dfn>
```

### Для `<input>` — вариант 3

Точная формулировка WHATWG: `Description of pattern (when used with pattern attribute)`. Формат из индекса: `Text`.

```html
<input type="text" name="field" title="Формат: name@example.com">
```

### Для `<link>` — вариант 4

Точная формулировка WHATWG: `Title of the link`. Формат из индекса: `Text`.

```html
<link rel="stylesheet" href="styles.css" title="Дополнительная информация">
```

### Для `<link>`, `<style>` — вариант 5

Точная формулировка WHATWG: `CSS style sheet set name`. Формат из индекса: `Text`.

```html
<link rel="stylesheet" href="styles.css" title="Дополнительная информация">

<style title="Дополнительная информация">.notice { color: #b42318; }</style>
```

Если атрибут отсутствует, действует состояние по умолчанию конкретного элемента. Пустая строка и отсутствие атрибута не взаимозаменяемы, кроме случаев, явно определённых спецификацией.

## Связи

- Специальная межэлементная связь в общем каталоге не выделена; область применения указана в таблице.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение для всех HTML-элементов](https://html.spec.whatwg.org/multipage/dom.html#attr-title)
- [Определение `<abbr>`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-abbr-title)
- [Определение `<dfn>`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-dfn-title)
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/input.html#attr-input-title)
- [Определение `<link>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-title)
- [Определение `<link>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-title)
- [Определение `<style>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-style-title)
