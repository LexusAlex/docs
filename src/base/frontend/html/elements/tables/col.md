---
title: "<col>"
description: "Столбец внутри colgroup."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<col>`

Столбец внутри colgroup.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<col>
```

Пустой (void) элемент: закрывающий тег запрещён.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | `none` | none |
| Допустимые родители | [`colgroup`](/base/frontend/html/elements/tables/colgroup) | colgroup |
| Содержимое | `empty` | empty |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`span`](/base/frontend/html/attributes/element-specific/span).
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

### Доступная таблица данных

caption подписывает таблицу, строки группируются, а th связывает заголовки с данными.

Связанные элементы: [`table`](/base/frontend/html/elements/tables/table), [`caption`](/base/frontend/html/elements/tables/caption), [`colgroup`](/base/frontend/html/elements/tables/colgroup), [`col`](/base/frontend/html/elements/tables/col), [`thead`](/base/frontend/html/elements/tables/thead), [`tbody`](/base/frontend/html/elements/tables/tbody), [`tfoot`](/base/frontend/html/elements/tables/tfoot), [`tr`](/base/frontend/html/elements/tables/tr), [`th`](/base/frontend/html/elements/tables/th), [`td`](/base/frontend/html/elements/tables/td).

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<table>
  <colgroup><col span="2" class="numeric"></colgroup>
  <tbody><tr><td>10</td><td>20</td></tr></tbody>
</table>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не добавляйте закрывающий тег `</col>`.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLTableColElement`](https://html.spec.whatwg.org/multipage/tables.html#htmltablecolelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `col` в WHATWG](https://html.spec.whatwg.org/multipage/tables.html#the-col-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
