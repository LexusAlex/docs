---
title: "cite"
description: "Ссылается на источник цитаты или описание правки."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `cite`

Ссылается на источник цитаты или описание правки.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`blockquote`](/base/frontend/html/elements/grouping-content/blockquote), [`del`](/base/frontend/html/elements/edits/del), [`ins`](/base/frontend/html/elements/edits/ins), [`q`](/base/frontend/html/elements/text-level-semantics/q) | Link to the source of the quotation or more information about the edit | Valid URL potentially surrounded by spaces | [`blockquote`](https://html.spec.whatwg.org/multipage/grouping-content.html#attr-blockquote-cite), [`del`](https://html.spec.whatwg.org/multipage/edits.html#attr-mod-cite), [`ins`](https://html.spec.whatwg.org/multipage/edits.html#attr-mod-cite), [`q`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-q-cite) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<blockquote>`, `<del>`, `<ins>`, `<q>`

Точная формулировка WHATWG: `Link to the source of the quotation or more information about the edit`. Формат из индекса: `Valid URL potentially surrounded by spaces`.

```html
<blockquote cite="https://example.com/change/42">Содержимое blockquote</blockquote>

<del cite="https://example.com/change/42">Содержимое del</del>

<ins cite="https://example.com/change/42">Содержимое ins</ins>

<q cite="https://example.com/change/42">Короткая цитата</q>
```

### Связь: История правок

ins и del описывают изменения документа, а datetime фиксирует время правки.

```html
<p>Срок: <del datetime="2026-07-20">20 июля</del> <ins datetime="2026-07-22">22 июля</ins>.</p>
```

Если атрибут отсутствует, действует состояние по умолчанию конкретного элемента. Пустая строка и отсутствие атрибута не взаимозаменяемы, кроме случаев, явно определённых спецификацией.

## Связи

- **История правок:** ins и del описывают изменения документа, а datetime фиксирует время правки.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<blockquote>`](https://html.spec.whatwg.org/multipage/grouping-content.html#attr-blockquote-cite)
- [Определение `<del>`](https://html.spec.whatwg.org/multipage/edits.html#attr-mod-cite)
- [Определение `<ins>`](https://html.spec.whatwg.org/multipage/edits.html#attr-mod-cite)
- [Определение `<q>`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-q-cite)
