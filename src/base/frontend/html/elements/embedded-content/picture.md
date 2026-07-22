---
title: "<picture>"
description: "Набор альтернативных источников изображения с обязательным img."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<picture>`

Набор альтернативных источников изображения с обязательным img.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<picture>…</picture>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), фразовое (`phrasing`), встраиваемое (`embedded`), ощутимое (`palpable`) | flow ; phrasing ; embedded ; palpable |
| Допустимые родители | фразовое (`phrasing`) | phrasing |
| Содержимое | [`source`](/base/frontend/html/elements/embedded-content/source), [`img`](/base/frontend/html/elements/embedded-content/img), `script-supporting elements` | source *; one img ; script-supporting elements |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** нет.
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

### Адаптивное изображение

picture содержит source перед обязательным img; img остаётся источником по умолчанию и носителем alt.

Связанные элементы: [`picture`](/base/frontend/html/elements/embedded-content/picture), [`source`](/base/frontend/html/elements/embedded-content/source), [`img`](/base/frontend/html/elements/embedded-content/img).

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<picture>
  <source media="(min-width: 800px)" srcset="hero-wide.webp" type="image/webp">
  <img src="hero.jpg" alt="Горная долина">
</picture>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<picture />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLPictureElement`](https://html.spec.whatwg.org/multipage/embedded-content.html#htmlpictureelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `picture` в WHATWG](https://html.spec.whatwg.org/multipage/embedded-content.html#the-picture-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
