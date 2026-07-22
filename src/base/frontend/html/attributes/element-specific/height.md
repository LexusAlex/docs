---
title: "height"
description: "Задаёт высоту в CSS-пикселях для поддерживающих элементов."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `height`

Задаёт высоту в CSS-пикселях для поддерживающих элементов.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`canvas`](/base/frontend/html/elements/scripting/canvas), [`embed`](/base/frontend/html/elements/embedded-content/embed), [`iframe`](/base/frontend/html/elements/embedded-content/iframe), [`img`](/base/frontend/html/elements/embedded-content/img), [`input`](/base/frontend/html/elements/forms/input), [`object`](/base/frontend/html/elements/embedded-content/object), [`source`](/base/frontend/html/elements/embedded-content/source), [`video`](/base/frontend/html/elements/embedded-content/video) | Vertical dimension | Valid non-negative integer | [`canvas`](https://html.spec.whatwg.org/multipage/canvas.html#attr-canvas-height), [`embed`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-height), [`iframe`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-height), [`img`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-height), [`input`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-height), [`object`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-height), [`source`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-height), [`video`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-height) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<canvas>`, `<embed>`, `<iframe>`, `<img>`, `<input>`, `<object>`, `<source>`, `<video>`

Точная формулировка WHATWG: `Vertical dimension`. Формат из индекса: `Valid non-negative integer`.

```html
<canvas height="360">Содержимое canvas</canvas>

<embed src="diagram.svg" type="image/svg+xml" height="360">

<iframe src="/help/" title="Справка" height="360"></iframe>

<img src="photo.jpg" alt="Горная долина" height="360">

<input type="image" name="field" src="send.svg" alt="Отправить" height="360">

<object data="manual.pdf" type="application/pdf" height="360">Содержимое object</object>

<picture>
  <source type="image/webp" srcset="hero-wide.webp 1280w" height="360">
  <img src="hero.jpg" alt="Горная долина">
</picture>

<video controls height="360">Скачать видео</video>
```

### Связь: Иллюстрация с подписью

figcaption, если есть, является первым или последним дочерним элементом figure.

```html
<figure>
  <img src="diagram.svg" alt="Схема потока данных" width="640" height="360">
  <figcaption>Поток данных приложения.</figcaption>
</figure>
```

Если атрибут отсутствует, действует состояние по умолчанию конкретного элемента. Пустая строка и отсутствие атрибута не взаимозаменяемы, кроме случаев, явно определённых спецификацией.

## Связи

- **Иллюстрация с подписью:** figcaption, если есть, является первым или последним дочерним элементом figure.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<canvas>`](https://html.spec.whatwg.org/multipage/canvas.html#attr-canvas-height)
- [Определение `<embed>`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-height)
- [Определение `<iframe>`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-height)
- [Определение `<img>`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-height)
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-height)
- [Определение `<object>`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-height)
- [Определение `<source>`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-height)
- [Определение `<video>`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-height)
