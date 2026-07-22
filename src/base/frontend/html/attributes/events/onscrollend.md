---
title: "onscrollend"
description: "Атрибут-обработчик события `scrollend`. Для прикладного кода обычно предпочтительнее `addEventListener()`."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `onscrollend`

Атрибут-обработчик события `scrollend`. Для прикладного кода обычно предпочтительнее `addEventListener()`.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


::: warning Встроенный JavaScript
Атрибут выполняет строку как код, смешивает разметку с поведением и может блокироваться Content Security Policy. Вариант через `addEventListener()` ниже лучше разделяет структуру и поведение.
:::

## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| Все HTML-элементы | scrollend event handler | Event handler content attribute | [WHATWG](https://html.spec.whatwg.org/multipage/webappapis.html#handler-onscrollend) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Встроенный обработчик в HTML

```html
<div id="demo" style="max-height: 8rem; overflow: auto" onscrollend="console.log(event.type)">
  <p>Длинное прокручиваемое содержимое.</p>
</div>
```

### Регистрация из JavaScript

```js
const element = document.querySelector('#demo')

element.addEventListener('scrollend', (event) => {
  console.log(event.currentTarget.scrollTop)
})
```

Без атрибута встроенный обработчик не создаётся; слушатели, зарегистрированные из JavaScript, продолжают работать независимо от него.

## Связи

- Специальная межэлементная связь в общем каталоге не выделена; область применения указана в таблице.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице. Само событие обрабатывается объектом `Event` или его специализированным подклассом.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение для всех HTML-элементов](https://html.spec.whatwg.org/multipage/webappapis.html#handler-onscrollend)
