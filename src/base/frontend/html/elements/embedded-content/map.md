---
title: "<map>"
description: "Карта изображения, связывающая img с интерактивными областями area."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<map>`

Карта изображения, связывающая img с интерактивными областями area.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<map>…</map>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), фразовое (`phrasing`), ощутимое (`palpable`) | flow ; phrasing *; palpable |
| Допустимые родители | фразовое (`phrasing`) | phrasing |
| Содержимое | `transparent`, [`area`](/base/frontend/html/elements/embedded-content/area) | transparent ; area * |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`name`](/base/frontend/html/attributes/element-specific/name).
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

### Карта изображения

Фрагмент usemap у img совпадает с name элемента map; интерактивные области задаются через area.

Связанные элементы: [`map`](/base/frontend/html/elements/embedded-content/map), [`area`](/base/frontend/html/elements/embedded-content/area), [`img`](/base/frontend/html/elements/embedded-content/img).

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<img src="office.png" alt="План офиса" usemap="#office-map">
<map name="office-map">
  <area shape="rect" coords="0,0,160,120" href="/rooms/1" alt="Переговорная">
</map>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<map />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLMapElement`](https://html.spec.whatwg.org/multipage/image-maps.html#htmlmapelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `map` в WHATWG](https://html.spec.whatwg.org/multipage/image-maps.html#the-map-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
