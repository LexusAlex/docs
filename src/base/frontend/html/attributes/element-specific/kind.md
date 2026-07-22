---
title: "kind"
description: "Задаёт назначение временной дорожки track."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `kind`

Задаёт назначение временной дорожки track.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`track`](/base/frontend/html/elements/embedded-content/track) | The type of text track | " subtitles "; " captions "; " descriptions "; " chapters "; " metadata " | [`track`](https://html.spec.whatwg.org/multipage/media.html#attr-track-kind) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<track>`

Точная формулировка WHATWG: `The type of text track`. Формат из индекса: `" subtitles "; " captions "; " descriptions "; " chapters "; " metadata "`.

```html
<video controls>
  <source src="lesson.mp4" type="video/mp4">
  <track kind="captions" src="captions-ru.vtt" srclang="ru" label="Русские субтитры">
</video>
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
- [Определение `<track>`](https://html.spec.whatwg.org/multipage/media.html#attr-track-kind)
