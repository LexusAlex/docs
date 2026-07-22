---
title: "shadowrootmode"
description: "Создаёт декларативный Shadow Root в режиме open или closed."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `shadowrootmode`

Создаёт декларативный Shadow Root в режиме open или closed.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`template`](/base/frontend/html/elements/scripting/template) | Enables streaming declarative shadow roots | " open "; " closed " | [`template`](https://html.spec.whatwg.org/multipage/scripting.html#attr-template-shadowrootmode) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<template>`

Точная формулировка WHATWG: `Enables streaming declarative shadow roots`. Формат из индекса: `" open "; " closed "`.

```html
<template shadowrootmode="open">Содержимое template</template>
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

- **Шаблон и слот компонента:** Declarative Shadow DOM создаётся через template[shadowrootmode], а slot принимает распределённое содержимое.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<template>`](https://html.spec.whatwg.org/multipage/scripting.html#attr-template-shadowrootmode)
