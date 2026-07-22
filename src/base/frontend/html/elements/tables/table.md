---
title: "<table>"
description: "Таблица данных в двух измерениях."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<table>`

Таблица данных в двух измерениях.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<table>…</table>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), ощутимое (`palpable`) | flow ; palpable |
| Допустимые родители | потоковое (`flow`) | flow |
| Содержимое | [`caption`](/base/frontend/html/elements/tables/caption), [`colgroup`](/base/frontend/html/elements/tables/colgroup), [`thead`](/base/frontend/html/elements/tables/thead), [`tbody`](/base/frontend/html/elements/tables/tbody), [`tfoot`](/base/frontend/html/elements/tables/tfoot), [`tr`](/base/frontend/html/elements/tables/tr), `script-supporting elements` | caption *; colgroup *; thead *; tbody *; tfoot *; tr *; script-supporting elements |

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

### Связь сложных заголовков через headers

Для нерегулярной таблицы td может явно перечислять id связанных th.

```html
<table>
  <tr><th id="product">Товар</th><th id="price">Цена</th></tr>
  <tr><th id="lamp">Лампа</th><td headers="lamp price">3 990 ₽</td></tr>
</table>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<table />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLTableElement`](https://html.spec.whatwg.org/multipage/tables.html#htmltableelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `table` в WHATWG](https://html.spec.whatwg.org/multipage/tables.html#the-table-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
