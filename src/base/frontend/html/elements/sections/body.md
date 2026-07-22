---
title: "<body>"
description: "Содержит отображаемое содержимое HTML-документа."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<body>`

Содержит отображаемое содержимое HTML-документа.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<body>…</body>
```

Начальный и/или закрывающий тег можно опускать только при условиях, перечисленных в спецификации; явная запись обычно понятнее.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | `none` | none |
| Допустимые родители | [`html`](/base/frontend/html/elements/document-element/html) | html |
| Содержимое | потоковое (`flow`) | flow |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** нет.
- **Обработчики событий, перечисленные у элемента:** [`onafterprint`](/base/frontend/html/attributes/events/onafterprint), [`onbeforeprint`](/base/frontend/html/attributes/events/onbeforeprint), [`onbeforeunload`](/base/frontend/html/attributes/events/onbeforeunload), [`onhashchange`](/base/frontend/html/attributes/events/onhashchange), [`onlanguagechange`](/base/frontend/html/attributes/events/onlanguagechange), [`onmessage`](/base/frontend/html/attributes/events/onmessage), [`onmessageerror`](/base/frontend/html/attributes/events/onmessageerror), [`onoffline`](/base/frontend/html/attributes/events/onoffline), [`ononline`](/base/frontend/html/attributes/events/ononline), [`onpageswap`](/base/frontend/html/attributes/events/onpageswap), [`onpagehide`](/base/frontend/html/attributes/events/onpagehide), [`onpagereveal`](/base/frontend/html/attributes/events/onpagereveal), [`onpageshow`](/base/frontend/html/attributes/events/onpageshow), [`onpopstate`](/base/frontend/html/attributes/events/onpopstate), [`onrejectionhandled`](/base/frontend/html/attributes/events/onrejectionhandled), [`onstorage`](/base/frontend/html/attributes/events/onstorage), [`onunhandledrejection`](/base/frontend/html/attributes/events/onunhandledrejection), [`onunload`](/base/frontend/html/attributes/events/onunload)

## Связи с другими элементами

### Каркас документа

У html ожидаются head и body; метаданные находятся в head, отображаемое содержимое — в body.

Связанные элементы: [`html`](/base/frontend/html/elements/document-element/html), [`head`](/base/frontend/html/elements/document-metadata/head), [`title`](/base/frontend/html/elements/document-metadata/title), [`meta`](/base/frontend/html/elements/document-metadata/meta), [`body`](/base/frontend/html/elements/sections/body), [`header`](/base/frontend/html/elements/sections/header), [`main`](/base/frontend/html/elements/grouping-content/main), [`article`](/base/frontend/html/elements/sections/article), [`section`](/base/frontend/html/elements/sections/section), [`h1`](/base/frontend/html/elements/sections/h1), [`p`](/base/frontend/html/elements/grouping-content/p), [`footer`](/base/frontend/html/elements/sections/footer).

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <title>Справочник</title>
</head>
<body>
  <header><h1>Справочник</h1></header>
  <main><article><p>Содержимое страницы.</p></article></main>
  <footer>© 2026</footer>
</body>
</html>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<body />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLBodyElement`](https://html.spec.whatwg.org/multipage/sections.html#htmlbodyelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `body` в WHATWG](https://html.spec.whatwg.org/multipage/sections.html#the-body-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
