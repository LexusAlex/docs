---
title: "id"
description: "Задаёт уникальный в документе идентификатор без ASCII-пробелов."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `id`

Задаёт уникальный в документе идентификатор без ASCII-пробелов.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| Все HTML-элементы | The element's ID | Text * | [WHATWG](https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для всех HTML-элементов

Точная формулировка WHATWG: `The element's ID`. Формат из индекса: `Text *`.

```html
<div id="main-content">Содержимое div</div>
```

### Фрагмент, подпись поля и выбор из JavaScript

```html
<h2 id="install">Установка</h2>
<a href="#install">Перейти к установке</a>
<label for="email">Email</label>
<input id="email" type="email">
```

### Связь: Связи элементов формы

for у label совпадает с id поля, а list у input — с id datalist.

```html
<form action="/subscribe" method="post">
  <fieldset>
    <legend>Подписка</legend>
    <label for="email">Email</label>
    <input id="email" name="email" type="email" required>
    <button type="submit">Подписаться</button>
  </fieldset>
</form>
```

### Связь: Popover и управляющая кнопка

popovertarget ссылается на id элемента с popover.

```html
<button popovertarget="filters">Фильтры</button>
<div id="filters" popover>Настройки фильтрации</div>
```

Если атрибут отсутствует, действует состояние по умолчанию конкретного элемента. Пустая строка и отсутствие атрибута не взаимозаменяемы, кроме случаев, явно определённых спецификацией.

## Связи

- **Связи элементов формы:** for у label совпадает с id поля, а list у input — с id datalist.
- **Popover и управляющая кнопка:** popovertarget ссылается на id элемента с popover.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение для всех HTML-элементов](https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute)
