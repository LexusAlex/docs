---
title: "<template>"
description: "Неактивный фрагмент разметки для последующего клонирования или Declarative Shadow DOM."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<template>`

Неактивный фрагмент разметки для последующего клонирования или Declarative Shadow DOM.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<template>…</template>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | метаданные (`metadata`), потоковое (`flow`), фразовое (`phrasing`), поддерживающее сценарии (`script-supporting`) | metadata ; flow ; phrasing ; script-supporting |
| Допустимые родители | метаданные (`metadata`), фразовое (`phrasing`), поддерживающее сценарии (`script-supporting`), [`colgroup`](/base/frontend/html/elements/tables/colgroup) | metadata ; phrasing ; script-supporting ; colgroup * |
| Содержимое | `empty` | empty |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`shadowrootmode`](/base/frontend/html/attributes/element-specific/shadowrootmode), [`shadowrootdelegatesfocus`](/base/frontend/html/attributes/element-specific/shadowrootdelegatesfocus), [`shadowrootslotassignment`](/base/frontend/html/attributes/element-specific/shadowrootslotassignment), [`shadowrootclonable`](/base/frontend/html/attributes/element-specific/shadowrootclonable), [`shadowrootserializable`](/base/frontend/html/attributes/element-specific/shadowrootserializable), [`shadowrootcustomelementregistry`](/base/frontend/html/attributes/element-specific/shadowrootcustomelementregistry).
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

### Шаблон и слот компонента

Declarative Shadow DOM создаётся через template[shadowrootmode], а slot принимает распределённое содержимое.

Связанные элементы: [`template`](/base/frontend/html/elements/scripting/template), [`slot`](/base/frontend/html/elements/scripting/slot).

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

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

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<template />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLTemplateElement`](https://html.spec.whatwg.org/multipage/scripting.html#htmltemplateelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `template` в WHATWG](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
