---
title: "crossorigin"
description: "Настраивает CORS-режим загрузки ресурса."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `crossorigin`

Настраивает CORS-режим загрузки ресурса.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`audio`](/base/frontend/html/elements/embedded-content/audio), [`img`](/base/frontend/html/elements/embedded-content/img), [`link`](/base/frontend/html/elements/document-metadata/link), [`script`](/base/frontend/html/elements/scripting/script), [`video`](/base/frontend/html/elements/embedded-content/video) | How the element handles crossorigin requests | " anonymous "; " use-credentials "; the empty string | [`audio`](https://html.spec.whatwg.org/multipage/media.html#attr-media-crossorigin), [`img`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-crossorigin), [`link`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-crossorigin), [`script`](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-crossorigin), [`video`](https://html.spec.whatwg.org/multipage/media.html#attr-media-crossorigin) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<audio>`, `<img>`, `<link>`, `<script>`, `<video>`

Точная формулировка WHATWG: `How the element handles crossorigin requests`. Формат из индекса: `" anonymous "; " use-credentials "; the empty string`.

```html
<audio controls crossorigin="anonymous">Скачать аудио</audio>

<img src="photo.jpg" alt="Горная долина" crossorigin="anonymous">

<link rel="stylesheet" href="styles.css" crossorigin="anonymous">

<script src="app.js" crossorigin="anonymous"></script>

<video controls crossorigin="anonymous">Скачать видео</video>
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
- [Определение `<audio>`](https://html.spec.whatwg.org/multipage/media.html#attr-media-crossorigin)
- [Определение `<img>`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-crossorigin)
- [Определение `<link>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-crossorigin)
- [Определение `<script>`](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-crossorigin)
- [Определение `<video>`](https://html.spec.whatwg.org/multipage/media.html#attr-media-crossorigin)
