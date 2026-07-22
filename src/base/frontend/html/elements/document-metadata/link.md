---
title: "<link>"
description: "Связывает документ с внешним ресурсом, чаще всего таблицей стилей или значком."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<link>`

Связывает документ с внешним ресурсом, чаще всего таблицей стилей или значком.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<link>
```

Пустой (void) элемент: закрывающий тег запрещён.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | метаданные (`metadata`), потоковое (`flow`), фразовое (`phrasing`) | metadata ; flow *; phrasing * |
| Допустимые родители | [`head`](/base/frontend/html/elements/document-metadata/head), [`noscript`](/base/frontend/html/elements/scripting/noscript), фразовое (`phrasing`) | head ; noscript *; phrasing * |
| Содержимое | `empty` | empty |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`href`](/base/frontend/html/attributes/element-specific/href), [`crossorigin`](/base/frontend/html/attributes/element-specific/crossorigin), [`rel`](/base/frontend/html/attributes/element-specific/rel), [`as`](/base/frontend/html/attributes/element-specific/as), [`media`](/base/frontend/html/attributes/element-specific/media), [`hreflang`](/base/frontend/html/attributes/element-specific/hreflang), [`type`](/base/frontend/html/attributes/element-specific/type), [`sizes`](/base/frontend/html/attributes/element-specific/sizes), [`imagesrcset`](/base/frontend/html/attributes/element-specific/imagesrcset), [`imagesizes`](/base/frontend/html/attributes/element-specific/imagesizes), [`referrerpolicy`](/base/frontend/html/attributes/element-specific/referrerpolicy), [`integrity`](/base/frontend/html/attributes/element-specific/integrity), [`blocking`](/base/frontend/html/attributes/element-specific/blocking), [`color`](/base/frontend/html/attributes/element-specific/color), [`disabled`](/base/frontend/html/attributes/element-specific/disabled), [`fetchpriority`](/base/frontend/html/attributes/element-specific/fetchpriority).
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

Специальных структурных связей в общем каталоге не выделено; применяйте модель содержимого ниже.

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<link rel="stylesheet" href="styles.css">
```

### Таблица стилей, иконка и preload

rel определяет отношение связанного ресурса к документу.

```html
<link rel="stylesheet" href="styles.css">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не добавляйте закрывающий тег `</link>`.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLLinkElement`](https://html.spec.whatwg.org/multipage/semantics.html#htmllinkelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `link` в WHATWG](https://html.spec.whatwg.org/multipage/semantics.html#the-link-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
