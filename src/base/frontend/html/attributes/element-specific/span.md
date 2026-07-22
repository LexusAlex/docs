---
title: "span"
description: "Задаёт число столбцов в col или colgroup."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `span`

Задаёт число столбцов в col или colgroup.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`col`](/base/frontend/html/elements/tables/col), [`colgroup`](/base/frontend/html/elements/tables/colgroup) | Number of columns spanned by the element | Valid non-negative integer greater than zero | [`col`](https://html.spec.whatwg.org/multipage/tables.html#attr-col-span), [`colgroup`](https://html.spec.whatwg.org/multipage/tables.html#attr-colgroup-span) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<col>`, `<colgroup>`

Точная формулировка WHATWG: `Number of columns spanned by the element`. Формат из индекса: `Valid non-negative integer greater than zero`.

```html
<table>
  <colgroup><col span="2"></colgroup>
  <tr><td>Данные</td></tr>
</table>

<table>
  <colgroup span="2"><col><col></colgroup>
  <tr><td>Данные</td></tr>
</table>
```

Если атрибут отсутствует, действует состояние по умолчанию конкретного элемента. Пустая строка и отсутствие атрибута не взаимозаменяемы, кроме случаев, явно определённых спецификацией.

## Связи

- Специальная межэлементная связь в общем каталоге не выделена; область применения указана в таблице.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<col>`](https://html.spec.whatwg.org/multipage/tables.html#attr-col-span)
- [Определение `<colgroup>`](https://html.spec.whatwg.org/multipage/tables.html#attr-colgroup-span)
