---
title: "width"
description: "Задаёт ширину в CSS-пикселях для поддерживающих элементов."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `width`

Задаёт ширину в CSS-пикселях для поддерживающих элементов.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`canvas`](/base/frontend/html/elements/scripting/canvas), [`embed`](/base/frontend/html/elements/embedded-content/embed), [`iframe`](/base/frontend/html/elements/embedded-content/iframe), [`img`](/base/frontend/html/elements/embedded-content/img), [`input`](/base/frontend/html/elements/forms/input), [`object`](/base/frontend/html/elements/embedded-content/object), [`source`](/base/frontend/html/elements/embedded-content/source), [`video`](/base/frontend/html/elements/embedded-content/video) | Horizontal dimension | Valid non-negative integer | [`canvas`](https://html.spec.whatwg.org/multipage/canvas.html#attr-canvas-width), [`embed`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-width), [`iframe`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-width), [`img`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-width), [`input`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-width), [`object`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-width), [`source`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-width), [`video`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-width) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<canvas>`, `<embed>`, `<iframe>`, `<img>`, `<input>`, `<object>`, `<source>`, `<video>`

Точная формулировка WHATWG: `Horizontal dimension`. Формат из индекса: `Valid non-negative integer`.

```html
<canvas width="640">Содержимое canvas</canvas>

<embed src="diagram.svg" type="image/svg+xml" width="640">

<iframe src="/help/" title="Справка" width="640"></iframe>

<img src="photo.jpg" alt="Горная долина" width="640">

<input type="image" name="field" src="send.svg" alt="Отправить" width="640">

<object data="manual.pdf" type="application/pdf" width="640">Содержимое object</object>

<picture>
  <source type="image/webp" srcset="hero-wide.webp 1280w" width="640">
  <img src="hero.jpg" alt="Горная долина">
</picture>

<video controls width="640">Скачать видео</video>
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
- [Определение `<canvas>`](https://html.spec.whatwg.org/multipage/canvas.html#attr-canvas-width)
- [Определение `<embed>`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-width)
- [Определение `<iframe>`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-width)
- [Определение `<img>`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-width)
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-width)
- [Определение `<object>`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-width)
- [Определение `<source>`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-width)
- [Определение `<video>`](https://html.spec.whatwg.org/multipage/embedded-content-other.html#attr-dim-width)
