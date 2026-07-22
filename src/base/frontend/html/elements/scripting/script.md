---
title: "<script>"
description: "Сценарий или блок данных для обработки программой."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<script>`

Сценарий или блок данных для обработки программой.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<script>…</script>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | метаданные (`metadata`), потоковое (`flow`), фразовое (`phrasing`), поддерживающее сценарии (`script-supporting`) | metadata ; flow ; phrasing ; script-supporting |
| Допустимые родители | [`head`](/base/frontend/html/elements/document-metadata/head), фразовое (`phrasing`), поддерживающее сценарии (`script-supporting`) | head ; phrasing ; script-supporting |
| Содержимое | `script, data, or script documentation*` | script, data, or script documentation* |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`src`](/base/frontend/html/attributes/element-specific/src), [`type`](/base/frontend/html/attributes/element-specific/type), [`nomodule`](/base/frontend/html/attributes/element-specific/nomodule), [`async`](/base/frontend/html/attributes/element-specific/async), [`defer`](/base/frontend/html/attributes/element-specific/defer), [`crossorigin`](/base/frontend/html/attributes/element-specific/crossorigin), [`integrity`](/base/frontend/html/attributes/element-specific/integrity), [`referrerpolicy`](/base/frontend/html/attributes/element-specific/referrerpolicy), [`blocking`](/base/frontend/html/attributes/element-specific/blocking), [`fetchpriority`](/base/frontend/html/attributes/element-specific/fetchpriority).
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

Специальных структурных связей в общем каталоге не выделено; применяйте модель содержимого ниже.

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<script type="module" src="app.js"></script>
```

### Модуль и import map

Модуль можно загрузить по src, а importmap сопоставляет имена модулей с URL.

```html
<script type="importmap">
{ "imports": { "app": "/js/app.js" } }
</script>
<script type="module">
  import "app";
</script>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<script />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLScriptElement`](https://html.spec.whatwg.org/multipage/scripting.html#htmlscriptelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `script` в WHATWG](https://html.spec.whatwg.org/multipage/scripting.html#the-script-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
