---
title: "fetchpriority"
description: "Подсказывает относительный приоритет загрузки ресурса."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `fetchpriority`

Подсказывает относительный приоритет загрузки ресурса.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`img`](/base/frontend/html/elements/embedded-content/img), [`link`](/base/frontend/html/elements/document-metadata/link), [`script`](/base/frontend/html/elements/scripting/script) | Sets the priority for fetches initiated by the element | " auto "; " high "; " low " | [`img`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-fetchpriority), [`link`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-fetchpriority), [`script`](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-fetchpriority) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<img>`, `<link>`, `<script>`

Точная формулировка WHATWG: `Sets the priority for fetches initiated by the element`. Формат из индекса: `" auto "; " high "; " low "`.

```html
<img src="photo.jpg" alt="Горная долина" fetchpriority="high">

<link rel="stylesheet" href="styles.css" fetchpriority="high">

<script src="app.js" fetchpriority="high"></script>
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
- [Определение `<img>`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-fetchpriority)
- [Определение `<link>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-fetchpriority)
- [Определение `<script>`](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-fetchpriority)
