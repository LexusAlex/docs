---
title: "<p>"
description: "Абзац текста."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<p>`

Абзац текста.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<p>…</p>
```

Закрывающий тег можно опустить только при условиях из спецификации; в примерах он записан явно.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), ощутимое (`palpable`) | flow ; palpable |
| Допустимые родители | потоковое (`flow`) | flow |
| Содержимое | фразовое (`phrasing`) | phrasing |

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

### Раскрытие и диалог

summary является подписью details; button может декларативно управлять dialog через commandfor.

```html
<details>
  <summary>Условия</summary>
  <p>Текст условий.</p>
</details>
<button command="show-modal" commandfor="confirm-dialog">Открыть</button>
<dialog id="confirm-dialog" closedby="any">Подтвердите действие.</dialog>
```

### Шаблон и слот компонента

Declarative Shadow DOM создаётся через template[shadowrootmode], а slot принимает распределённое содержимое.

```html
<article-card>
  <span slot="title">Новая статья</span>
  <template shadowrootmode="open">
    <h2><slot name="title"></slot></h2>
    <slot></slot>
  </template>
  <p>Краткое описание.</p>
</article-card>
```

### История правок

ins и del описывают изменения документа, а datetime фиксирует время правки.

```html
<p>Срок: <del datetime="2026-07-20">20 июля</del> <ins datetime="2026-07-22">22 июля</ins>.</p>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<p />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLParagraphElement`](https://html.spec.whatwg.org/multipage/grouping-content.html#htmlparagraphelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `p` в WHATWG](https://html.spec.whatwg.org/multipage/grouping-content.html#the-p-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
