---
title: "required"
description: "Требует непустое допустимое значение перед отправкой формы."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `required`

Требует непустое допустимое значение перед отправкой формы.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`input`](/base/frontend/html/elements/forms/input), [`select`](/base/frontend/html/elements/forms/select), [`textarea`](/base/frontend/html/elements/forms/textarea) | Whether the control is required for form submission | Boolean attribute | [`input`](https://html.spec.whatwg.org/multipage/input.html#attr-input-required), [`select`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-select-required), [`textarea`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-textarea-required) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

### Булева семантика

Это булев атрибут: присутствие означает истину независимо от строки значения. Используйте `required`, `required=""` или `required="required"`; запись `required="false"` всё равно означает истину.

## Примеры использования

### Для `<input>`, `<select>`, `<textarea>`

Точная формулировка WHATWG: `Whether the control is required for form submission`. Формат из индекса: `Boolean attribute`.

```html
<input type="text" name="field" required>

<select required><option>Казань</option></select>

<textarea required>Исходный текст</textarea>
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

- **Связи элементов формы:** for у label совпадает с id поля, а list у input — с id datalist.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/input.html#attr-input-required)
- [Определение `<select>`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-select-required)
- [Определение `<textarea>`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-textarea-required)
