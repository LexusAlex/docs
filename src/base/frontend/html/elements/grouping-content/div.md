---
title: "<div>"
description: "Универсальный контейнер потокового содержимого без собственной семантики."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<div>`

Универсальный контейнер потокового содержимого без собственной семантики.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<div>…</div>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), ощутимое (`palpable`) | flow ; palpable |
| Допустимые родители | потоковое (`flow`), [`dl`](/base/frontend/html/elements/grouping-content/dl), [`option`](/base/frontend/html/elements/forms/option), [`optgroup`](/base/frontend/html/elements/forms/optgroup), [`select`](/base/frontend/html/elements/forms/select) | flow ; dl ; option ; optgroup ; select |
| Содержимое | потоковое (`flow`) | flow * |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** нет.
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

### Popover и управляющая кнопка

popovertarget ссылается на id элемента с popover.

Связанные элементы: [`button`](/base/frontend/html/elements/forms/button), [`div`](/base/frontend/html/elements/grouping-content/div).

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<button popovertarget="filters">Фильтры</button>
<div id="filters" popover>Настройки фильтрации</div>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<div />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLDivElement`](https://html.spec.whatwg.org/multipage/grouping-content.html#htmldivelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `div` в WHATWG](https://html.spec.whatwg.org/multipage/grouping-content.html#the-div-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
