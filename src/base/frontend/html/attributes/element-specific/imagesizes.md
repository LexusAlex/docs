---
title: "imagesizes"
description: "Задаёт размеры адаптивного изображения, предзагружаемого через link."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `imagesizes`

Задаёт размеры адаптивного изображения, предзагружаемого через link.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`link`](/base/frontend/html/elements/document-metadata/link) | Image sizes for different page layouts (for rel =" preload ") | Valid source size list | [`link`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesizes) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<link>`

Точная формулировка WHATWG: `Image sizes for different page layouts (for rel =" preload ")`. Формат из индекса: `Valid source size list`.

```html
<link rel="preload" href="hero.jpg" as="image" imagesizes="(min-width: 800px) 50vw, 100vw">
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
- [Определение `<link>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesizes)
