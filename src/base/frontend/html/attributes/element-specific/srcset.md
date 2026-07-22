---
title: "srcset"
description: "Задаёт набор кандидатов изображения и их дескрипторы."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `srcset`

Задаёт набор кандидатов изображения и их дескрипторы.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`img`](/base/frontend/html/elements/embedded-content/img), [`source`](/base/frontend/html/elements/embedded-content/source) | Images to use in different situations, e.g., high-resolution displays, small monitors, etc. | Comma-separated list of image candidate strings | [`img`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-srcset), [`source`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-source-srcset) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<img>`, `<source>`

Точная формулировка WHATWG: `Images to use in different situations, e.g., high-resolution displays, small monitors, etc.`. Формат из индекса: `Comma-separated list of image candidate strings`.

```html
<img src="photo.jpg" alt="Горная долина" srcset="photo-640.jpg 640w, photo-1280.jpg 1280w">

<picture>
  <source type="image/webp" srcset="photo-640.jpg 640w, photo-1280.jpg 1280w">
  <img src="hero.jpg" alt="Горная долина">
</picture>
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
- [Определение `<img>`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-srcset)
- [Определение `<source>`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-source-srcset)
