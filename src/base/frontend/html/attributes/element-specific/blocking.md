---
title: "blocking"
description: "Указывает операции, которые могут блокировать отображение документа."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `blocking`

Указывает операции, которые могут блокировать отображение документа.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`link`](/base/frontend/html/elements/document-metadata/link), [`script`](/base/frontend/html/elements/scripting/script), [`style`](/base/frontend/html/elements/document-metadata/style) | Whether the element is potentially render-blocking | Unordered set of unique space-separated tokens * | [`link`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-blocking), [`script`](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-blocking), [`style`](https://html.spec.whatwg.org/multipage/semantics.html#attr-style-blocking) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<link>`, `<script>`, `<style>`

Точная формулировка WHATWG: `Whether the element is potentially render-blocking`. Формат из индекса: `Unordered set of unique space-separated tokens *`.

```html
<link rel="stylesheet" href="styles.css" blocking="render">

<script src="app.js" blocking="render"></script>

<style blocking="render">.notice { color: #b42318; }</style>
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
- [Определение `<link>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-blocking)
- [Определение `<script>`](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-blocking)
- [Определение `<style>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-style-blocking)
