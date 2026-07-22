---
title: "sizes"
description: "Задаёт размеры адаптивного изображения или медиазапросы для icon."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `sizes`

Задаёт размеры адаптивного изображения или медиазапросы для icon.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`link`](/base/frontend/html/elements/document-metadata/link) | Sizes of the icons (for rel =" icon ") | Unordered set of unique space-separated tokens , ASCII case-insensitive , consisting of sizes* | [`link`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-sizes) |
| [`img`](/base/frontend/html/elements/embedded-content/img), [`source`](/base/frontend/html/elements/embedded-content/source) | Image sizes for different page layouts | Valid source size list | [`img`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-sizes), [`source`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-source-sizes) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<link>` — вариант 1

Точная формулировка WHATWG: `Sizes of the icons (for rel =" icon ")`. Формат из индекса: `Unordered set of unique space-separated tokens , ASCII case-insensitive , consisting of sizes*`.

```html
<link rel="icon" href="icon-32.png" sizes="32x32">
```

### Для `<img>`, `<source>` — вариант 2

Точная формулировка WHATWG: `Image sizes for different page layouts`. Формат из индекса: `Valid source size list`.

```html
<img src="photo.jpg" alt="Горная долина" sizes="(min-width: 800px) 50vw, 100vw">

<picture>
  <source type="image/webp" srcset="hero-wide.webp 1280w" sizes="(min-width: 800px) 50vw, 100vw">
  <img src="hero.jpg" alt="Горная долина">
</picture>
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
- [Определение `<link>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-sizes)
- [Определение `<img>`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-sizes)
- [Определение `<source>`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-source-sizes)
