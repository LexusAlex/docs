---
title: "<dl>"
description: "Список групп «имя — значение»."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<dl>`

Список групп «имя — значение».

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<dl>…</dl>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), ощутимое (`palpable`) | flow ; palpable |
| Допустимые родители | потоковое (`flow`) | flow |
| Содержимое | [`dt`](/base/frontend/html/elements/grouping-content/dt), [`dd`](/base/frontend/html/elements/grouping-content/dd), [`div`](/base/frontend/html/elements/grouping-content/div), `script-supporting elements` | dt *; dd *; div *; script-supporting elements |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** нет.
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

### Список имён и значений

В dl группы состоят из одного или нескольких dt, за которыми следуют один или несколько dd.

Связанные элементы: [`dl`](/base/frontend/html/elements/grouping-content/dl), [`dt`](/base/frontend/html/elements/grouping-content/dt), [`dd`](/base/frontend/html/elements/grouping-content/dd).

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<dl>
  <dt>HTML</dt>
  <dd>Язык разметки документов.</dd>
</dl>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<dl />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLDListElement`](https://html.spec.whatwg.org/multipage/grouping-content.html#htmldlistelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `dl` в WHATWG](https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
