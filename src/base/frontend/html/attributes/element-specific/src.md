---
title: "src"
description: "Задаёт URL встраиваемого ресурса."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `src`

Задаёт URL встраиваемого ресурса.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`audio`](/base/frontend/html/elements/embedded-content/audio), [`embed`](/base/frontend/html/elements/embedded-content/embed), [`iframe`](/base/frontend/html/elements/embedded-content/iframe), [`img`](/base/frontend/html/elements/embedded-content/img), [`input`](/base/frontend/html/elements/forms/input), [`script`](/base/frontend/html/elements/scripting/script), [`source`](/base/frontend/html/elements/embedded-content/source), [`track`](/base/frontend/html/elements/embedded-content/track), [`video`](/base/frontend/html/elements/embedded-content/video) | Address of the resource | Valid non-empty URL potentially surrounded by spaces | [`audio`](https://html.spec.whatwg.org/multipage/media.html#attr-media-src), [`embed`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-embed-src), [`iframe`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-src), [`img`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-src), [`input`](https://html.spec.whatwg.org/multipage/input.html#attr-input-src), [`script`](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-src), [`source`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-source-src), [`track`](https://html.spec.whatwg.org/multipage/media.html#attr-track-src), [`video`](https://html.spec.whatwg.org/multipage/media.html#the-video-element) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<audio>`, `<embed>`, `<iframe>`, `<img>`, `<input>`, `<script>`, `<source>`, `<track>`, `<video>`

Точная формулировка WHATWG: `Address of the resource`. Формат из индекса: `Valid non-empty URL potentially surrounded by spaces`.

```html
<audio controls src="photo.jpg">Скачать аудио</audio>

<embed src="photo.jpg" type="image/svg+xml">

<iframe src="photo.jpg" title="Справка"></iframe>

<img src="photo.jpg" alt="Горная долина">

<input type="image" name="field" src="photo.jpg" alt="Отправить">

<script src="photo.jpg"></script>

<video controls>
  <source src="photo.jpg" type="video/webm">
</video>

<video controls>
  <source src="lesson.mp4" type="video/mp4">
  <track kind="captions" src="photo.jpg" srclang="ru" label="Русские субтитры">
</video>

<video controls src="photo.jpg">Скачать видео</video>
```

### Связь: Иллюстрация с подписью

figcaption, если есть, является первым или последним дочерним элементом figure.

```html
<figure>
  <img src="diagram.svg" alt="Схема потока данных" width="640" height="360">
  <figcaption>Поток данных приложения.</figcaption>
</figure>
```

### Связь: Адаптивное изображение

picture содержит source перед обязательным img; img остаётся источником по умолчанию и носителем alt.

```html
<picture>
  <source media="(min-width: 800px)" srcset="hero-wide.webp" type="image/webp">
  <img src="hero.jpg" alt="Горная долина">
</picture>
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

- **Иллюстрация с подписью:** figcaption, если есть, является первым или последним дочерним элементом figure.
- **Адаптивное изображение:** picture содержит source перед обязательным img; img остаётся источником по умолчанию и носителем alt.
- **Медиа и дорожки:** audio и video могут содержать несколько source и track; браузер выбирает подходящий ресурс.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<audio>`](https://html.spec.whatwg.org/multipage/media.html#attr-media-src)
- [Определение `<embed>`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-embed-src)
- [Определение `<iframe>`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-src)
- [Определение `<img>`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-src)
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/input.html#attr-input-src)
- [Определение `<script>`](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-src)
- [Определение `<source>`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-source-src)
- [Определение `<track>`](https://html.spec.whatwg.org/multipage/media.html#attr-track-src)
- [Определение `<video>`](https://html.spec.whatwg.org/multipage/media.html#the-video-element)
