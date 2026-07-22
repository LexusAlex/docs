---
title: "type"
description: "Выбирает вид элемента, ресурса, кнопки, поля или списка."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `type`

Выбирает вид элемента, ресурса, кнопки, поля или списка.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`a`](/base/frontend/html/elements/text-level-semantics/a), [`link`](/base/frontend/html/elements/document-metadata/link) | Hint for the type of the referenced resource | Valid MIME type string | [`a`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-type), [`link`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-type) |
| [`button`](/base/frontend/html/elements/forms/button) | Type of button | " submit "; " reset "; " button " | [`button`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-button-type) |
| [`embed`](/base/frontend/html/elements/embedded-content/embed), [`object`](/base/frontend/html/elements/embedded-content/object), [`source`](/base/frontend/html/elements/embedded-content/source) | Type of embedded resource | Valid MIME type string | [`embed`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-embed-type), [`object`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-object-type), [`source`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-source-type) |
| [`input`](/base/frontend/html/elements/forms/input) | Type of form control | input type keyword | [`input`](https://html.spec.whatwg.org/multipage/input.html#attr-input-type) |
| [`ol`](/base/frontend/html/elements/grouping-content/ol) | Kind of list marker | " 1 "; " a "; " A "; " i "; " I " | [`ol`](https://html.spec.whatwg.org/multipage/grouping-content.html#attr-ol-type) |
| [`script`](/base/frontend/html/elements/scripting/script) | Type of script | " module "; " importmap "; " speculationrules "; a valid MIME type string that is not a JavaScript MIME type essence match | [`script`](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-type) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<a>`, `<link>` — вариант 1

Точная формулировка WHATWG: `Hint for the type of the referenced resource`. Формат из индекса: `Valid MIME type string`.

```html
<a href="/docs/" type="text/html">Документация</a>

<link rel="stylesheet" href="styles.css" type="text/css">
```

### Для `<button>` — вариант 2

Точная формулировка WHATWG: `Type of button`. Формат из индекса: `" submit "; " reset "; " button "`.

```html
<button type="submit">Выполнить</button>
```

### Для `<embed>`, `<object>`, `<source>` — вариант 3

Точная формулировка WHATWG: `Type of embedded resource`. Формат из индекса: `Valid MIME type string`.

```html
<embed src="diagram.svg" type="image/svg+xml">

<object data="manual.pdf" type="application/pdf">Содержимое object</object>

<video controls>
  <source src="lesson.webm" type="video/webm">
</video>
```

### Для `<input>` — вариант 4

Точная формулировка WHATWG: `Type of form control`. Формат из индекса: `input type keyword`.

```html
<input type="email" name="field">
```

### Для `<ol>` — вариант 5

Точная формулировка WHATWG: `Kind of list marker`. Формат из индекса: `" 1 "; " a "; " A "; " i "; " I "`.

```html
<ol type="I"><li>Первый пункт</li></ol>
```

### Для `<script>` — вариант 6

Точная формулировка WHATWG: `Type of script`. Формат из индекса: `" module "; " importmap "; " speculationrules "; a valid MIME type string that is not a JavaScript MIME type essence match`.

```html
<script src="app.js" type="module"></script>
```

### Основные состояния input

```html
<input type="text" name="name">
<input type="password" name="password">
<input type="email" name="email">
<input type="url" name="site">
<input type="tel" name="phone">
<input type="search" name="q">
<input type="number" name="count" min="0">
<input type="range" name="volume" min="0" max="100">
<input type="date" name="date">
<input type="datetime-local" name="starts">
<input type="month" name="month">
<input type="week" name="week">
<input type="time" name="time">
<input type="color" name="color">
<input type="file" name="files" multiple>
<input type="checkbox" name="agree">
<input type="radio" name="plan" value="pro">
<input type="hidden" name="token" value="42">
<input type="submit" value="Отправить">
<input type="reset" value="Сбросить">
<input type="button" value="Проверить">
<input type="image" src="send.svg" alt="Отправить">
```

### Варианты script

```html
<script src="classic.js"></script>
<script type="module" src="app.js"></script>
<script type="importmap">{ "imports": { "app": "/app.js" } }</script>
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

### Связь: Связи элементов формы

for у label совпадает с id поля, а list у input — с id datalist.

```html
<form action="/subscribe" method="post">
  <fieldset>
    <legend>Подписка</legend>
    <label for="email">Email</label>
    <input id="email" name="email" type="email" required>
    <button type="submit">Подписаться</button>
  </fieldset>
</form>
```

Если атрибут отсутствует, действует состояние по умолчанию конкретного элемента. Пустая строка и отсутствие атрибута не взаимозаменяемы, кроме случаев, явно определённых спецификацией.

## Связи

- **Адаптивное изображение:** picture содержит source перед обязательным img; img остаётся источником по умолчанию и носителем alt.
- **Медиа и дорожки:** audio и video могут содержать несколько source и track; браузер выбирает подходящий ресурс.
- **Связи элементов формы:** for у label совпадает с id поля, а list у input — с id datalist.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<a>`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-type)
- [Определение `<link>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-type)
- [Определение `<button>`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-button-type)
- [Определение `<embed>`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-embed-type)
- [Определение `<object>`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-object-type)
- [Определение `<source>`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-source-type)
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/input.html#attr-input-type)
- [Определение `<ol>`](https://html.spec.whatwg.org/multipage/grouping-content.html#attr-ol-type)
- [Определение `<script>`](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-type)
