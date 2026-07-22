---
title: "<footer>"
description: "Справочная информация и завершение ближайшего раздела."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<footer>`

Справочная информация и завершение ближайшего раздела.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<footer>…</footer>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), ощутимое (`palpable`) | flow ; palpable |
| Допустимые родители | потоковое (`flow`) | flow |
| Содержимое | потоковое (`flow`) | flow * |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** нет.
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

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
- Не используйте XML-запись `<footer />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLElement`](https://html.spec.whatwg.org/multipage/dom.html#htmlelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `footer` в WHATWG](https://html.spec.whatwg.org/multipage/sections.html#the-footer-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
