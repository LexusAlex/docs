---
title: "for"
description: "Связывает label или output с другими элементами по id."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `for`

Связывает label или output с другими элементами по id.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`label`](/base/frontend/html/elements/forms/label) | Associate the label with form control | ID * | [`label`](https://html.spec.whatwg.org/multipage/forms.html#attr-label-for) |
| [`output`](/base/frontend/html/elements/forms/output) | Specifies controls from which the output was calculated | Unordered set of unique space-separated tokens consisting of IDs* | [`output`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-output-for) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<label>` — вариант 1

Точная формулировка WHATWG: `Associate the label with form control`. Формат из индекса: `ID *`.

```html
<label for="email">Email</label>
<input id="email" name="email" type="email">
```

### Для `<output>` — вариант 2

Точная формулировка WHATWG: `Specifies controls from which the output was calculated`. Формат из индекса: `Unordered set of unique space-separated tokens consisting of IDs*`.

```html
<input id="price" type="number" value="100"> ×
<input id="quantity" type="number" value="2"> =
<output for="price quantity">200</output>
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
- [Определение `<label>`](https://html.spec.whatwg.org/multipage/forms.html#attr-label-for)
- [Определение `<output>`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-output-for)
