---
title: "<meta>"
description: "Передаёт метаданные, которые нельзя выразить через title, base, link или style."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<meta>`

Передаёт метаданные, которые нельзя выразить через title, base, link или style.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<meta>
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

- **Специальные атрибуты:** [`name`](/base/frontend/html/attributes/element-specific/name), [`http-equiv`](/base/frontend/html/attributes/element-specific/http-equiv), [`content`](/base/frontend/html/attributes/element-specific/content), [`charset`](/base/frontend/html/attributes/element-specific/charset), [`media`](/base/frontend/html/attributes/element-specific/media).
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

### Каркас документа

У html ожидаются head и body; метаданные находятся в head, отображаемое содержимое — в body.

Связанные элементы: [`html`](/base/frontend/html/elements/document-element/html), [`head`](/base/frontend/html/elements/document-metadata/head), [`title`](/base/frontend/html/elements/document-metadata/title), [`meta`](/base/frontend/html/elements/document-metadata/meta), [`body`](/base/frontend/html/elements/sections/body), [`header`](/base/frontend/html/elements/sections/header), [`main`](/base/frontend/html/elements/grouping-content/main), [`article`](/base/frontend/html/elements/sections/article), [`section`](/base/frontend/html/elements/sections/section), [`h1`](/base/frontend/html/elements/sections/h1), [`p`](/base/frontend/html/elements/grouping-content/p), [`footer`](/base/frontend/html/elements/sections/footer).

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<meta name="description" content="Краткое описание страницы">
```

### Каркас документа

У html ожидаются head и body; метаданные находятся в head, отображаемое содержимое — в body.

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

### Кодировка, viewport и описание

Кодировку размещайте как можно раньше в head; остальные meta задают метаданные документа.

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Практический справочник HTML">
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не добавляйте закрывающий тег `</meta>`.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLMetaElement`](https://html.spec.whatwg.org/multipage/semantics.html#htmlmetaelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `meta` в WHATWG](https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
