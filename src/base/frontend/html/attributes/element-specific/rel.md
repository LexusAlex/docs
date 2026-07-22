---
title: "rel"
description: "Задаёт тип связи текущего документа с целевым ресурсом."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `rel`

Задаёт тип связи текущего документа с целевым ресурсом.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`a`](/base/frontend/html/elements/text-level-semantics/a), [`area`](/base/frontend/html/elements/embedded-content/area) | Relationship between the location in the document containing the hyperlink and the destination resource | Unordered set of unique space-separated tokens * | [`a`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-rel), [`area`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-rel) |
| [`link`](/base/frontend/html/elements/document-metadata/link) | Relationship between the document containing the hyperlink and the destination resource | Unordered set of unique space-separated tokens * | [`link`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-rel) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<a>`, `<area>` — вариант 1

Точная формулировка WHATWG: `Relationship between the location in the document containing the hyperlink and the destination resource`. Формат из индекса: `Unordered set of unique space-separated tokens *`.

```html
<a href="/docs/" rel="noopener">Документация</a>

<map name="office-map">
  <area shape="rect" coords="0,0,160,120" href="/rooms/1" alt="Переговорная" rel="help">
</map>
```

### Для `<link>` — вариант 2

Точная формулировка WHATWG: `Relationship between the document containing the hyperlink and the destination resource`. Формат из индекса: `Unordered set of unique space-separated tokens *`.

```html
<link rel="stylesheet" href="styles.css">
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
- [Определение `<a>`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-rel)
- [Определение `<area>`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-rel)
- [Определение `<link>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-rel)
