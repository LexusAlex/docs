---
title: "slot"
description: "Назначает элемент именованному slot в теневом дереве."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `slot`

Назначает элемент именованному slot в теневом дереве.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| Все HTML-элементы | The element's desired slot | Text | [WHATWG](https://html.spec.whatwg.org/multipage/dom.html#attr-slot) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для всех HTML-элементов

Точная формулировка WHATWG: `The element's desired slot`. Формат из индекса: `Text`.

```html
<article-card>
  <span slot="title">Новая статья</span>
  <template shadowrootmode="open"><h2><slot name="title"></slot></h2></template>
</article-card>
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
- [Определение для всех HTML-элементов](https://html.spec.whatwg.org/multipage/dom.html#attr-slot)
