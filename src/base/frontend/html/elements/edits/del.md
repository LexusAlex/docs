---
title: "<del>"
description: "Удаление из документа."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<del>`

Удаление из документа.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<del>…</del>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), фразовое (`phrasing`), ощутимое (`palpable`) | flow ; phrasing *; palpable |
| Допустимые родители | фразовое (`phrasing`) | phrasing |
| Содержимое | `transparent` | transparent |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`cite`](/base/frontend/html/attributes/element-specific/cite), [`datetime`](/base/frontend/html/attributes/element-specific/datetime).
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

### История правок

ins и del описывают изменения документа, а datetime фиксирует время правки.

Связанные элементы: [`ins`](/base/frontend/html/elements/edits/ins), [`del`](/base/frontend/html/elements/edits/del), [`time`](/base/frontend/html/elements/text-level-semantics/time).

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<p>Срок: <del datetime="2026-07-20">20 июля</del> <ins datetime="2026-07-22">22 июля</ins>.</p>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<del />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLModElement`](https://html.spec.whatwg.org/multipage/edits.html#htmlmodelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `del` в WHATWG](https://html.spec.whatwg.org/multipage/edits.html#the-del-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
