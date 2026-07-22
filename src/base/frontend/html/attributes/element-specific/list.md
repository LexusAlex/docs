---
title: "list"
description: "Связывает input с datalist по id."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `list`

Связывает input с datalist по id.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`input`](/base/frontend/html/elements/forms/input) | List of autocomplete options | ID * | [`input`](https://html.spec.whatwg.org/multipage/input.html#attr-input-list) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<input>`

Точная формулировка WHATWG: `List of autocomplete options`. Формат из индекса: `ID *`.

```html
<label for="city">Город</label>
<input id="city" name="city" list="cities">
<datalist id="cities"><option value="Казань"></option></datalist>
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
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/input.html#attr-input-list)
