---
title: "autoplay"
description: "Просит начать воспроизведение медиа автоматически."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `autoplay`

Просит начать воспроизведение медиа автоматически.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`audio`](/base/frontend/html/elements/embedded-content/audio), [`video`](/base/frontend/html/elements/embedded-content/video) | Hint that the media resource can be started automatically when the page is loaded | Boolean attribute | [`audio`](https://html.spec.whatwg.org/multipage/media.html#attr-media-autoplay), [`video`](https://html.spec.whatwg.org/multipage/media.html#attr-media-autoplay) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

### Булева семантика

Это булев атрибут: присутствие означает истину независимо от строки значения. Используйте `autoplay`, `autoplay=""` или `autoplay="autoplay"`; запись `autoplay="false"` всё равно означает истину.

## Примеры использования

### Для `<audio>`, `<video>`

Точная формулировка WHATWG: `Hint that the media resource can be started automatically when the page is loaded`. Формат из индекса: `Boolean attribute`.

```html
<audio controls autoplay>Скачать аудио</audio>

<video controls autoplay>Скачать видео</video>
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
- [Определение `<audio>`](https://html.spec.whatwg.org/multipage/media.html#attr-media-autoplay)
- [Определение `<video>`](https://html.spec.whatwg.org/multipage/media.html#attr-media-autoplay)
