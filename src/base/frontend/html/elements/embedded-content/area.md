---
title: "<area>"
description: "Ссылка или неактивная область внутри карты изображения."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<area>`

Ссылка или неактивная область внутри карты изображения.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<area>
```

Пустой (void) элемент: закрывающий тег запрещён.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), фразовое (`phrasing`) | flow ; phrasing |
| Допустимые родители | фразовое (`phrasing`) | phrasing * |
| Содержимое | `empty` | empty |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`alt`](/base/frontend/html/attributes/element-specific/alt), [`coords`](/base/frontend/html/attributes/element-specific/coords), [`shape`](/base/frontend/html/attributes/element-specific/shape), [`href`](/base/frontend/html/attributes/element-specific/href), [`target`](/base/frontend/html/attributes/element-specific/target), [`download`](/base/frontend/html/attributes/element-specific/download), [`ping`](/base/frontend/html/attributes/element-specific/ping), [`rel`](/base/frontend/html/attributes/element-specific/rel), [`referrerpolicy`](/base/frontend/html/attributes/element-specific/referrerpolicy).
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
- Не добавляйте закрывающий тег `</area>`.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLAreaElement`](https://html.spec.whatwg.org/multipage/image-maps.html#htmlareaelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `area` в WHATWG](https://html.spec.whatwg.org/multipage/image-maps.html#the-area-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
