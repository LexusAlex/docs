---
title: "<object>"
description: "Встраивает внешний ресурс с возможным резервным содержимым."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<object>`

Встраивает внешний ресурс с возможным резервным содержимым.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<object>…</object>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), фразовое (`phrasing`), встраиваемое (`embedded`), интерактивное (`interactive`), `listed`, `form-associated`, ощутимое (`palpable`) | flow ; phrasing ; embedded ; interactive *; listed ; form-associated ; palpable |
| Допустимые родители | фразовое (`phrasing`) | phrasing |
| Содержимое | `transparent` | transparent |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`data`](/base/frontend/html/attributes/element-specific/data), [`type`](/base/frontend/html/attributes/element-specific/type), [`name`](/base/frontend/html/attributes/element-specific/name), [`form`](/base/frontend/html/attributes/element-specific/form), [`width`](/base/frontend/html/attributes/element-specific/width), [`height`](/base/frontend/html/attributes/element-specific/height).
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

Специальных структурных связей в общем каталоге не выделено; применяйте модель содержимого ниже.

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<object data="manual.pdf" type="application/pdf">
  <a href="manual.pdf">Скачать инструкцию</a>
</object>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<object />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLObjectElement`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#htmlobjectelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `object` в WHATWG](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-object-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
