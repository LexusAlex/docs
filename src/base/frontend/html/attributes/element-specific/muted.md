---
title: "muted"
description: "Задаёт начальное беззвучное состояние медиа."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `muted`

Задаёт начальное беззвучное состояние медиа.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`audio`](/base/frontend/html/elements/embedded-content/audio), [`video`](/base/frontend/html/elements/embedded-content/video) | Whether to mute the media resource by default | Boolean attribute | [`audio`](https://html.spec.whatwg.org/multipage/media.html#attr-media-muted), [`video`](https://html.spec.whatwg.org/multipage/media.html#attr-media-muted) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

### Булева семантика

Это булев атрибут: присутствие означает истину независимо от строки значения. Используйте `muted`, `muted=""` или `muted="muted"`; запись `muted="false"` всё равно означает истину.

## Примеры использования

### Для `<audio>`, `<video>`

Точная формулировка WHATWG: `Whether to mute the media resource by default`. Формат из индекса: `Boolean attribute`.

```html
<audio controls muted>Скачать аудио</audio>

<video controls muted>Скачать видео</video>
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
- [Определение `<audio>`](https://html.spec.whatwg.org/multipage/media.html#attr-media-muted)
- [Определение `<video>`](https://html.spec.whatwg.org/multipage/media.html#attr-media-muted)
