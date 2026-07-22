---
title: "media"
description: "Задаёт условие, при котором ресурс или source применим."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `media`

Задаёт условие, при котором ресурс или source применим.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`link`](/base/frontend/html/elements/document-metadata/link), [`meta`](/base/frontend/html/elements/document-metadata/meta), [`source`](/base/frontend/html/elements/embedded-content/source), [`style`](/base/frontend/html/elements/document-metadata/style) | Applicable media | Valid media query list | [`link`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-media), [`meta`](https://html.spec.whatwg.org/multipage/semantics.html#attr-meta-media), [`source`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-source-media), [`style`](https://html.spec.whatwg.org/multipage/semantics.html#attr-style-media) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<link>`, `<meta>`, `<source>`, `<style>`

Точная формулировка WHATWG: `Applicable media`. Формат из индекса: `Valid media query list`.

```html
<link rel="stylesheet" href="styles.css" media="(min-width: 800px)">

<meta name="theme-color" content="#ffffff" media="(min-width: 800px)">

<picture>
  <source type="image/webp" srcset="hero-wide.webp 1280w" media="(min-width: 800px)">
  <img src="hero.jpg" alt="Горная долина">
</picture>

<style media="(min-width: 800px)">.notice { color: #b42318; }</style>
```

### Связь: Адаптивное изображение

picture содержит source перед обязательным img; img остаётся источником по умолчанию и носителем alt.

```html
<picture>
  <source media="(min-width: 800px)" srcset="hero-wide.webp" type="image/webp">
  <img src="hero.jpg" alt="Горная долина">
</picture>
```

Если атрибут отсутствует, действует состояние по умолчанию конкретного элемента. Пустая строка и отсутствие атрибута не взаимозаменяемы, кроме случаев, явно определённых спецификацией.

## Связи

- **Адаптивное изображение:** picture содержит source перед обязательным img; img остаётся источником по умолчанию и носителем alt.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<link>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-media)
- [Определение `<meta>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-meta-media)
- [Определение `<source>`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-source-media)
- [Определение `<style>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-style-media)
