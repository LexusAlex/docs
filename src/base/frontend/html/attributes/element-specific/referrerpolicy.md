---
title: "referrerpolicy"
description: "Задаёт политику передачи Referer при загрузке или переходе."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `referrerpolicy`

Задаёт политику передачи Referer при загрузке или переходе.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`a`](/base/frontend/html/elements/text-level-semantics/a), [`area`](/base/frontend/html/elements/embedded-content/area), [`iframe`](/base/frontend/html/elements/embedded-content/iframe), [`img`](/base/frontend/html/elements/embedded-content/img), [`link`](/base/frontend/html/elements/document-metadata/link), [`script`](/base/frontend/html/elements/scripting/script) | Referrer policy for fetches initiated by the element | Referrer policy | [`a`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-referrerpolicy), [`area`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-referrerpolicy), [`iframe`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-referrerpolicy), [`img`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-referrerpolicy), [`link`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-referrerpolicy), [`script`](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-referrerpolicy) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<a>`, `<area>`, `<iframe>`, `<img>`, `<link>`, `<script>`

Точная формулировка WHATWG: `Referrer policy for fetches initiated by the element`. Формат из индекса: `Referrer policy`.

```html
<a href="/docs/" referrerpolicy="no-referrer">Документация</a>

<map name="office-map">
  <area shape="rect" coords="0,0,160,120" href="/rooms/1" alt="Переговорная" referrerpolicy="no-referrer">
</map>

<iframe src="/help/" title="Справка" referrerpolicy="no-referrer"></iframe>

<img src="photo.jpg" alt="Горная долина" referrerpolicy="no-referrer">

<link rel="stylesheet" href="styles.css" referrerpolicy="no-referrer">

<script src="app.js" referrerpolicy="no-referrer"></script>
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
- [Определение `<a>`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-referrerpolicy)
- [Определение `<area>`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-referrerpolicy)
- [Определение `<iframe>`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-referrerpolicy)
- [Определение `<img>`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-referrerpolicy)
- [Определение `<link>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-referrerpolicy)
- [Определение `<script>`](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-referrerpolicy)
