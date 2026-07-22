---
title: "<iframe>"
description: "Встраивает дочерний контекст навигации."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<iframe>`

Встраивает дочерний контекст навигации.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<iframe></iframe>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), фразовое (`phrasing`), встраиваемое (`embedded`), интерактивное (`interactive`), ощутимое (`palpable`) | flow ; phrasing ; embedded ; interactive ; palpable |
| Допустимые родители | фразовое (`phrasing`) | phrasing |
| Содержимое | `empty` | empty |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`src`](/base/frontend/html/attributes/element-specific/src), [`srcdoc`](/base/frontend/html/attributes/element-specific/srcdoc), [`name`](/base/frontend/html/attributes/element-specific/name), [`sandbox`](/base/frontend/html/attributes/element-specific/sandbox), [`allow`](/base/frontend/html/attributes/element-specific/allow), [`allowfullscreen`](/base/frontend/html/attributes/element-specific/allowfullscreen), [`width`](/base/frontend/html/attributes/element-specific/width), [`height`](/base/frontend/html/attributes/element-specific/height), [`referrerpolicy`](/base/frontend/html/attributes/element-specific/referrerpolicy), [`loading`](/base/frontend/html/attributes/element-specific/loading).
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

Специальных структурных связей в общем каталоге не выделено; применяйте модель содержимого ниже.

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<iframe src="/help/" title="Справка"></iframe>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<iframe />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLIFrameElement`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#htmliframeelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `iframe` в WHATWG](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-iframe-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
