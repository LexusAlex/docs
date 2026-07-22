---
title: "value"
description: "Задаёт начальное либо машиночитаемое значение; смысл зависит от элемента."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `value`

Задаёт начальное либо машиночитаемое значение; смысл зависит от элемента.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`button`](/base/frontend/html/elements/forms/button), [`option`](/base/frontend/html/elements/forms/option) | Value to be used for form submission | Text | [`button`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-button-value), [`option`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-option-value) |
| [`data`](/base/frontend/html/elements/text-level-semantics/data) | Machine-readable value | Text * | [`data`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-data-value) |
| [`input`](/base/frontend/html/elements/forms/input) | Value of the form control | Varies* | [`input`](https://html.spec.whatwg.org/multipage/input.html#attr-input-value) |
| [`li`](/base/frontend/html/elements/grouping-content/li) | Ordinal value of the list item | Valid integer | [`li`](https://html.spec.whatwg.org/multipage/grouping-content.html#attr-li-value) |
| [`meter`](/base/frontend/html/elements/forms/meter), [`progress`](/base/frontend/html/elements/forms/progress) | Current value of the element | Valid floating-point number | [`meter`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-meter-value), [`progress`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-progress-value) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<button>`, `<option>` — вариант 1

Точная формулировка WHATWG: `Value to be used for form submission`. Формат из индекса: `Text`.

```html
<button type="button" value="save">Выполнить</button>

<select aria-label="Город">
  <option value="kzn">Казань</option>
</select>
```

### Для `<data>` — вариант 2

Точная формулировка WHATWG: `Machine-readable value`. Формат из индекса: `Text *`.

```html
<data value="SKU-42">настольная лампа</data>
```

### Для `<input>` — вариант 3

Точная формулировка WHATWG: `Value of the form control`. Формат из индекса: `Varies*`.

```html
<input type="text" name="field" value="42">
```

### Для `<li>` — вариант 4

Точная формулировка WHATWG: `Ordinal value of the list item`. Формат из индекса: `Valid integer`.

```html
<ol>
  <li value="10">Содержимое li</li>
</ol>
```

### Для `<meter>`, `<progress>` — вариант 5

Точная формулировка WHATWG: `Current value of the element`. Формат из индекса: `Valid floating-point number`.

```html
<meter value="65">Содержимое meter</meter>

<progress value="60">Содержимое progress</progress>
```

### Связь: Списки и пункты

Прямыми пунктами ol, ul и menu служат элементы li.

```html
<nav aria-label="Основная навигация">
  <ul>
    <li><a href="/docs/">Документация</a></li>
    <li><a href="/about/">О проекте</a></li>
  </ul>
</nav>
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

Если атрибут отсутствует, действует состояние по умолчанию конкретного элемента. Пустая строка и отсутствие атрибута не взаимозаменяемы, кроме случаев, явно определённых спецификацией.

## Связи

- **Списки и пункты:** Прямыми пунктами ol, ul и menu служат элементы li.
- **Связи элементов формы:** for у label совпадает с id поля, а list у input — с id datalist.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<button>`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-button-value)
- [Определение `<option>`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-option-value)
- [Определение `<data>`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-data-value)
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/input.html#attr-input-value)
- [Определение `<li>`](https://html.spec.whatwg.org/multipage/grouping-content.html#attr-li-value)
- [Определение `<meter>`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-meter-value)
- [Определение `<progress>`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-progress-value)
