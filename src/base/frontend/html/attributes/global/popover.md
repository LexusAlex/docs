---
title: "popover"
description: "Превращает элемент в popover и задаёт режим его поведения."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `popover`

Превращает элемент в popover и задаёт режим его поведения.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| Все HTML-элементы | Makes the element a popover element | " auto "; " manual "; " hint "; the empty string | [WHATWG](https://html.spec.whatwg.org/multipage/popover.html#attr-popover) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для всех HTML-элементов

Точная формулировка WHATWG: `Makes the element a popover element`. Формат из индекса: `" auto "; " manual "; " hint "; the empty string`.

```html
<div popover="auto">Содержимое div</div>
```

### Режимы auto, manual и hint

```html
<div id="menu" popover="auto">Меню</div>
<div id="status" popover="manual">Статус операции</div>
<div id="tip" popover="hint">Краткая подсказка</div>
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
- [Определение для всех HTML-элементов](https://html.spec.whatwg.org/multipage/popover.html#attr-popover)
