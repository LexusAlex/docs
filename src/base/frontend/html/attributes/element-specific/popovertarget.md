---
title: "popovertarget"
description: "Связывает кнопку с popover по id."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `popovertarget`

Связывает кнопку с popover по id.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`button`](/base/frontend/html/elements/forms/button), [`input`](/base/frontend/html/elements/forms/input) | Targets a popover element to toggle, show, or hide | ID * | [`button`](https://html.spec.whatwg.org/multipage/popover.html#attr-popovertarget), [`input`](https://html.spec.whatwg.org/multipage/popover.html#attr-popovertarget) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<button>`, `<input>`

Точная формулировка WHATWG: `Targets a popover element to toggle, show, or hide`. Формат из индекса: `ID *`.

```html
<button type="button" popovertarget="filters" popovertargetaction="toggle">Фильтры</button>
<div id="filters" popover>Настройки фильтрации</div>

<input type="button" value="Фильтры" popovertarget="filters" popovertargetaction="toggle">
<div id="filters" popover>Настройки фильтрации</div>
```

### Связь: Popover и управляющая кнопка

popovertarget ссылается на id элемента с popover.

```html
<button popovertarget="filters">Фильтры</button>
<div id="filters" popover>Настройки фильтрации</div>
```

Если атрибут отсутствует, действует состояние по умолчанию конкретного элемента. Пустая строка и отсутствие атрибута не взаимозаменяемы, кроме случаев, явно определённых спецификацией.

## Связи

- **Popover и управляющая кнопка:** popovertarget ссылается на id элемента с popover.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<button>`](https://html.spec.whatwg.org/multipage/popover.html#attr-popovertarget)
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/popover.html#attr-popovertarget)
