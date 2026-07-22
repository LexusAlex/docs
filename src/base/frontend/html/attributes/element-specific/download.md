---
title: "download"
description: "Предлагает скачать целевой ресурс и при необходимости задаёт имя файла."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `download`

Предлагает скачать целевой ресурс и при необходимости задаёт имя файла.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`a`](/base/frontend/html/elements/text-level-semantics/a), [`area`](/base/frontend/html/elements/embedded-content/area) | Whether to download the resource instead of navigating to it, and its filename if so | Text | [`a`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-download), [`area`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-download) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<a>`, `<area>`

Точная формулировка WHATWG: `Whether to download the resource instead of navigating to it, and its filename if so`. Формат из индекса: `Text`.

```html
<a href="/docs/" download="report.pdf">Документация</a>

<map name="office-map">
  <area shape="rect" coords="0,0,160,120" href="/rooms/1" alt="Переговорная" download="report.pdf">
</map>
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
- [Определение `<a>`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-download)
- [Определение `<area>`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-download)
