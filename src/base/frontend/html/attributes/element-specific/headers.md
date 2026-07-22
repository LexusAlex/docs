---
title: "headers"
description: "Связывает ячейку таблицы с заголовочными ячейками по id."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `headers`

Связывает ячейку таблицы с заголовочными ячейками по id.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`td`](/base/frontend/html/elements/tables/td), [`th`](/base/frontend/html/elements/tables/th) | The header cells for this cell | Unordered set of unique space-separated tokens consisting of IDs* | [`td`](https://html.spec.whatwg.org/multipage/tables.html#attr-tdth-headers), [`th`](https://html.spec.whatwg.org/multipage/tables.html#attr-tdth-headers) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<td>`, `<th>`

Точная формулировка WHATWG: `The header cells for this cell`. Формат из индекса: `Unordered set of unique space-separated tokens consisting of IDs*`.

```html
<table>
  <tr><th id="product">Товар</th><th id="price">Цена</th></tr>
  <tr><td headers="product price">Лампа — 3 990 ₽</td></tr>
</table>

<table>
  <tr><th id="product">Товар</th><th id="price">Цена</th></tr>
  <tr><th headers="product price">Лампа — 3 990 ₽</th></tr>
</table>
```

### Связь: Доступная таблица данных

caption подписывает таблицу, строки группируются, а th связывает заголовки с данными.

```html
<table>
  <caption>Продажи за квартал</caption>
  <thead><tr><th scope="col">Месяц</th><th scope="col">Сумма</th></tr></thead>
  <tbody><tr><th scope="row">Январь</th><td>120 000 ₽</td></tr></tbody>
  <tfoot><tr><th scope="row">Итого</th><td>120 000 ₽</td></tr></tfoot>
</table>
```

Если атрибут отсутствует, действует состояние по умолчанию конкретного элемента. Пустая строка и отсутствие атрибута не взаимозаменяемы, кроме случаев, явно определённых спецификацией.

## Связи

- **Доступная таблица данных:** caption подписывает таблицу, строки группируются, а th связывает заголовки с данными.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<td>`](https://html.spec.whatwg.org/multipage/tables.html#attr-tdth-headers)
- [Определение `<th>`](https://html.spec.whatwg.org/multipage/tables.html#attr-tdth-headers)
