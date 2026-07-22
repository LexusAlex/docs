---
title: "controls"
description: "Запрашивает встроенные средства управления пользовательского агента."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `controls`

Запрашивает встроенные средства управления пользовательского агента.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`audio`](/base/frontend/html/elements/embedded-content/audio), [`video`](/base/frontend/html/elements/embedded-content/video), [`img`](/base/frontend/html/elements/embedded-content/img) | Show user agent controls | Boolean attribute | [`audio`](https://html.spec.whatwg.org/multipage/media.html#attr-media-controls), [`video`](https://html.spec.whatwg.org/multipage/media.html#attr-media-controls), [`img`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-controls) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

### Булева семантика

Это булев атрибут: присутствие означает истину независимо от строки значения. Используйте `controls`, `controls=""` или `controls="controls"`; запись `controls="false"` всё равно означает истину.

## Примеры использования

### Для `<audio>`, `<video>`, `<img>`

Точная формулировка WHATWG: `Show user agent controls`. Формат из индекса: `Boolean attribute`.

```html
<audio controls>Скачать аудио</audio>

<video controls>Скачать видео</video>

<img src="photo.jpg" alt="Горная долина" controls>
```

### Связь: Медиа и дорожки

audio и video могут содержать несколько source и track; браузер выбирает подходящий ресурс.

```html
<video controls poster="preview.jpg" preload="metadata">
  <source src="lesson.webm" type="video/webm">
  <source src="lesson.mp4" type="video/mp4">
  <track kind="captions" src="captions-ru.vtt" srclang="ru" label="Русские субтитры">
</video>
```

Если атрибут отсутствует, действует состояние по умолчанию конкретного элемента. Пустая строка и отсутствие атрибута не взаимозаменяемы, кроме случаев, явно определённых спецификацией.

## Связи

- **Медиа и дорожки:** audio и video могут содержать несколько source и track; браузер выбирает подходящий ресурс.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<audio>`](https://html.spec.whatwg.org/multipage/media.html#attr-media-controls)
- [Определение `<video>`](https://html.spec.whatwg.org/multipage/media.html#attr-media-controls)
- [Определение `<img>`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-controls)
