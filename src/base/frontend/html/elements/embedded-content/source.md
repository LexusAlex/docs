---
title: "<source>"
description: "Альтернативный источник для picture, audio или video."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<source>`

Альтернативный источник для picture, audio или video.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<source>
```

Пустой (void) элемент: закрывающий тег запрещён.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | `none` | none |
| Допустимые родители | [`picture`](/base/frontend/html/elements/embedded-content/picture), [`video`](/base/frontend/html/elements/embedded-content/video), [`audio`](/base/frontend/html/elements/embedded-content/audio) | picture ; video ; audio |
| Содержимое | `empty` | empty |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`type`](/base/frontend/html/attributes/element-specific/type), [`media`](/base/frontend/html/attributes/element-specific/media), [`src`](/base/frontend/html/attributes/element-specific/src), [`srcset`](/base/frontend/html/attributes/element-specific/srcset), [`sizes`](/base/frontend/html/attributes/element-specific/sizes), [`width`](/base/frontend/html/attributes/element-specific/width), [`height`](/base/frontend/html/attributes/element-specific/height).
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

### Адаптивное изображение

picture содержит source перед обязательным img; img остаётся источником по умолчанию и носителем alt.

Связанные элементы: [`picture`](/base/frontend/html/elements/embedded-content/picture), [`source`](/base/frontend/html/elements/embedded-content/source), [`img`](/base/frontend/html/elements/embedded-content/img).

### Медиа и дорожки

audio и video могут содержать несколько source и track; браузер выбирает подходящий ресурс.

Связанные элементы: [`audio`](/base/frontend/html/elements/embedded-content/audio), [`video`](/base/frontend/html/elements/embedded-content/video), [`source`](/base/frontend/html/elements/embedded-content/source), [`track`](/base/frontend/html/elements/embedded-content/track).

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<picture>
  <source media="(min-width: 800px)" srcset="hero-wide.webp" type="image/webp">
  <img src="hero.jpg" alt="Горная долина">
</picture>
```

### Медиа и дорожки

audio и video могут содержать несколько source и track; браузер выбирает подходящий ресурс.

```html
<video controls poster="preview.jpg" preload="metadata">
  <source src="lesson.webm" type="video/webm">
  <source src="lesson.mp4" type="video/mp4">
  <track kind="captions" src="captions-ru.vtt" srclang="ru" label="Русские субтитры">
</video>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не добавляйте закрывающий тег `</source>`.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLSourceElement`](https://html.spec.whatwg.org/multipage/embedded-content.html#htmlsourceelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `source` в WHATWG](https://html.spec.whatwg.org/multipage/embedded-content.html#the-source-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
