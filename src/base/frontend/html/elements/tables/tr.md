---
title: "<tr>"
description: "Строка таблицы."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<tr>`

Строка таблицы.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<tr>…</tr>
```

Закрывающий тег можно опустить только при условиях из спецификации; в примерах он записан явно.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | `none` | none |
| Допустимые родители | [`table`](/base/frontend/html/elements/tables/table), [`thead`](/base/frontend/html/elements/tables/thead), [`tbody`](/base/frontend/html/elements/tables/tbody), [`tfoot`](/base/frontend/html/elements/tables/tfoot) | table ; thead ; tbody ; tfoot |
| Содержимое | [`th`](/base/frontend/html/elements/tables/th), [`td`](/base/frontend/html/elements/tables/td), `script-supporting elements` | th *; td ; script-supporting elements |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** нет.
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
  <caption>Продажи за квартал</caption>
  <thead><tr><th scope="col">Месяц</th><th scope="col">Сумма</th></tr></thead>
  <tbody><tr><th scope="row">Январь</th><td>120 000 ₽</td></tr></tbody>
  <tfoot><tr><th scope="row">Итого</th><td>120 000 ₽</td></tr></tfoot>
</table>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<tr />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLTableRowElement`](https://html.spec.whatwg.org/multipage/tables.html#htmltablerowelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `tr` в WHATWG](https://html.spec.whatwg.org/multipage/tables.html#the-tr-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
