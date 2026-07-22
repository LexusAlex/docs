---
title: "<img>"
description: "Изображение с текстовой альтернативой."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<img>`

Изображение с текстовой альтернативой.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<img>
```

Пустой (void) элемент: закрывающий тег запрещён.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), фразовое (`phrasing`), встраиваемое (`embedded`), интерактивное (`interactive`), `form-associated`, ощутимое (`palpable`) | flow ; phrasing ; embedded ; interactive *; form-associated ; palpable |
| Допустимые родители | фразовое (`phrasing`), [`picture`](/base/frontend/html/elements/embedded-content/picture) | phrasing ; picture |
| Содержимое | `empty` | empty |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`alt`](/base/frontend/html/attributes/element-specific/alt), [`src`](/base/frontend/html/attributes/element-specific/src), [`srcset`](/base/frontend/html/attributes/element-specific/srcset), [`sizes`](/base/frontend/html/attributes/element-specific/sizes), [`crossorigin`](/base/frontend/html/attributes/element-specific/crossorigin), [`usemap`](/base/frontend/html/attributes/element-specific/usemap), [`ismap`](/base/frontend/html/attributes/element-specific/ismap), [`controls`](/base/frontend/html/attributes/element-specific/controls), [`width`](/base/frontend/html/attributes/element-specific/width), [`height`](/base/frontend/html/attributes/element-specific/height), [`referrerpolicy`](/base/frontend/html/attributes/element-specific/referrerpolicy), [`decoding`](/base/frontend/html/attributes/element-specific/decoding), [`loading`](/base/frontend/html/attributes/element-specific/loading), [`fetchpriority`](/base/frontend/html/attributes/element-specific/fetchpriority).
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

### Иллюстрация с подписью

figcaption, если есть, является первым или последним дочерним элементом figure.

Связанные элементы: [`figure`](/base/frontend/html/elements/grouping-content/figure), [`figcaption`](/base/frontend/html/elements/grouping-content/figcaption), [`img`](/base/frontend/html/elements/embedded-content/img).

### Адаптивное изображение

picture содержит source перед обязательным img; img остаётся источником по умолчанию и носителем alt.

Связанные элементы: [`picture`](/base/frontend/html/elements/embedded-content/picture), [`source`](/base/frontend/html/elements/embedded-content/source), [`img`](/base/frontend/html/elements/embedded-content/img).

### Карта изображения

Фрагмент usemap у img совпадает с name элемента map; интерактивные области задаются через area.

Связанные элементы: [`map`](/base/frontend/html/elements/embedded-content/map), [`area`](/base/frontend/html/elements/embedded-content/area), [`img`](/base/frontend/html/elements/embedded-content/img).

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<figure>
  <img src="diagram.svg" alt="Схема потока данных" width="640" height="360">
  <figcaption>Поток данных приложения.</figcaption>
</figure>
```

### Адаптивное изображение

picture содержит source перед обязательным img; img остаётся источником по умолчанию и носителем alt.

```html
<picture>
  <source media="(min-width: 800px)" srcset="hero-wide.webp" type="image/webp">
  <img src="hero.jpg" alt="Горная долина">
</picture>
```

### Карта изображения

Фрагмент usemap у img совпадает с name элемента map; интерактивные области задаются через area.

```html
<img src="office.png" alt="План офиса" usemap="#office-map">
<map name="office-map">
  <area shape="rect" coords="0,0,160,120" href="/rooms/1" alt="Переговорная">
</map>
```

### Размер, отложенная загрузка и плотность пикселей

width и height резервируют место, loading управляет загрузкой, srcset позволяет выбрать плотность.

```html
<img src="avatar.png" srcset="avatar.png 1x, avatar@2x.png 2x" alt="Анна Смирнова" width="96" height="96" loading="lazy">
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не добавляйте закрывающий тег `</img>`.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLImageElement`](https://html.spec.whatwg.org/multipage/embedded-content.html#htmlimageelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `img` в WHATWG](https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
