---
title: "name"
description: "Задаёт имя элемента для отправки, навигации или поиска."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `name`

Задаёт имя элемента для отправки, навигации или поиска.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`button`](/base/frontend/html/elements/forms/button), [`fieldset`](/base/frontend/html/elements/forms/fieldset), [`input`](/base/frontend/html/elements/forms/input), [`output`](/base/frontend/html/elements/forms/output), [`select`](/base/frontend/html/elements/forms/select), [`textarea`](/base/frontend/html/elements/forms/textarea) | Name of the element to use for form submission and in the form.elements API | Text * | [`button`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-name), [`fieldset`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-name), [`input`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-name), [`output`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-name), [`select`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-name), [`textarea`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-name) |
| [`details`](/base/frontend/html/elements/interactive-elements/details) | Name of group of mutually-exclusive details elements | Text * | [`details`](https://html.spec.whatwg.org/multipage/interactive-elements.html#attr-details-name) |
| [`form`](/base/frontend/html/elements/forms/form) | Name of form to use in the document.forms API | Text * | [`form`](https://html.spec.whatwg.org/multipage/forms.html#attr-form-name) |
| [`iframe`](/base/frontend/html/elements/embedded-content/iframe), [`object`](/base/frontend/html/elements/embedded-content/object) | Name of content navigable | Valid navigable target name or keyword | [`iframe`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-name), [`object`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-object-name) |
| [`map`](/base/frontend/html/elements/embedded-content/map) | Name of image map to reference from the usemap attribute | Text * | [`map`](https://html.spec.whatwg.org/multipage/image-maps.html#attr-map-name) |
| [`meta`](/base/frontend/html/elements/document-metadata/meta) | Metadata name | Text * | [`meta`](https://html.spec.whatwg.org/multipage/semantics.html#attr-meta-name) |
| [`slot`](/base/frontend/html/elements/scripting/slot) | Name of shadow tree slot | Text | [`slot`](https://html.spec.whatwg.org/multipage/scripting.html#attr-slot-name) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<button>`, `<fieldset>`, `<input>`, `<output>`, `<select>`, `<textarea>` — вариант 1

Точная формулировка WHATWG: `Name of the element to use for form submission and in the form.elements API`. Формат из индекса: `Text *`.

```html
<button type="button" name="email">Выполнить</button>

<fieldset name="email">Содержимое fieldset</fieldset>

<input type="text" name="email">

<output name="total">42</output>

<select name="city"><option>Казань</option></select>

<textarea name="comment">Исходный текст</textarea>
```

### Для `<details>` — вариант 2

Точная формулировка WHATWG: `Name of group of mutually-exclusive details elements`. Формат из индекса: `Text *`.

```html
<details name="faq"><summary>Подробнее</summary><p>Дополнительная информация.</p></details>
```

### Для `<form>` — вариант 3

Точная формулировка WHATWG: `Name of form to use in the document.forms API`. Формат из индекса: `Text *`.

```html
<form action="/submit" method="post" name="search">Содержимое form</form>
```

### Для `<iframe>`, `<object>` — вариант 4

Точная формулировка WHATWG: `Name of content navigable`. Формат из индекса: `Valid navigable target name or keyword`.

```html
<iframe src="/help/" title="Справка" name="preview"></iframe>

<object data="manual.pdf" type="application/pdf" name="manual">Содержимое object</object>
```

### Для `<map>` — вариант 5

Точная формулировка WHATWG: `Name of image map to reference from the usemap attribute`. Формат из индекса: `Text *`.

```html
<map name="office-map">Содержимое map</map>
```

### Для `<meta>` — вариант 6

Точная формулировка WHATWG: `Metadata name`. Формат из индекса: `Text *`.

```html
<meta name="description" content="Описание страницы">
```

### Для `<slot>` — вариант 7

Точная формулировка WHATWG: `Name of shadow tree slot`. Формат из индекса: `Text`.

```html
<slot name="title">Содержимое slot</slot>
```

### Связь: Карта изображения

Фрагмент usemap у img совпадает с name элемента map; интерактивные области задаются через area.

```html
<img src="office.png" alt="План офиса" usemap="#office-map">
<map name="office-map">
  <area shape="rect" coords="0,0,160,120" href="/rooms/1" alt="Переговорная">
</map>
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

### Связь: Шаблон и слот компонента

Declarative Shadow DOM создаётся через template[shadowrootmode], а slot принимает распределённое содержимое.

```html
<article-card>
  <span slot="title">Новая статья</span>
  <template shadowrootmode="open">
    <h2><slot name="title"></slot></h2>
    <slot></slot>
  </template>
  <p>Краткое описание.</p>
</article-card>
```

Если атрибут отсутствует, действует состояние по умолчанию конкретного элемента. Пустая строка и отсутствие атрибута не взаимозаменяемы, кроме случаев, явно определённых спецификацией.

## Связи

- **Карта изображения:** Фрагмент usemap у img совпадает с name элемента map; интерактивные области задаются через area.
- **Связи элементов формы:** for у label совпадает с id поля, а list у input — с id datalist.
- **Шаблон и слот компонента:** Declarative Shadow DOM создаётся через template[shadowrootmode], а slot принимает распределённое содержимое.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<button>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-name)
- [Определение `<fieldset>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-name)
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-name)
- [Определение `<output>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-name)
- [Определение `<select>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-name)
- [Определение `<textarea>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-name)
- [Определение `<details>`](https://html.spec.whatwg.org/multipage/interactive-elements.html#attr-details-name)
- [Определение `<form>`](https://html.spec.whatwg.org/multipage/forms.html#attr-form-name)
- [Определение `<iframe>`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-name)
- [Определение `<object>`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-object-name)
- [Определение `<map>`](https://html.spec.whatwg.org/multipage/image-maps.html#attr-map-name)
- [Определение `<meta>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-meta-name)
- [Определение `<slot>`](https://html.spec.whatwg.org/multipage/scripting.html#attr-slot-name)
