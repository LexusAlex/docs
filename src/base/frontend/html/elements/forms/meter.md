---
title: "<meter>"
description: "Скалярное значение в известном диапазоне."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<meter>`

Скалярное значение в известном диапазоне.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<meter>…</meter>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), фразовое (`phrasing`), `labelable`, ощутимое (`palpable`) | flow ; phrasing ; labelable ; palpable |
| Допустимые родители | фразовое (`phrasing`) | phrasing |
| Содержимое | фразовое (`phrasing`) | phrasing * |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`value`](/base/frontend/html/attributes/element-specific/value), [`min`](/base/frontend/html/attributes/element-specific/min), [`max`](/base/frontend/html/attributes/element-specific/max), [`low`](/base/frontend/html/attributes/element-specific/low), [`high`](/base/frontend/html/attributes/element-specific/high), [`optimum`](/base/frontend/html/attributes/element-specific/optimum).
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

### Связи элементов формы

for у label совпадает с id поля, а list у input — с id datalist.

Связанные элементы: [`form`](/base/frontend/html/elements/forms/form), [`fieldset`](/base/frontend/html/elements/forms/fieldset), [`legend`](/base/frontend/html/elements/forms/legend), [`label`](/base/frontend/html/elements/forms/label), [`input`](/base/frontend/html/elements/forms/input), [`datalist`](/base/frontend/html/elements/forms/datalist), [`select`](/base/frontend/html/elements/forms/select), [`optgroup`](/base/frontend/html/elements/forms/optgroup), [`option`](/base/frontend/html/elements/forms/option), [`textarea`](/base/frontend/html/elements/forms/textarea), [`button`](/base/frontend/html/elements/forms/button), [`output`](/base/frontend/html/elements/forms/output), [`progress`](/base/frontend/html/elements/forms/progress), [`meter`](/base/frontend/html/elements/forms/meter).

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<label for="disk">Диск</label>
<meter id="disk" min="0" max="100" low="20" high="80" value="65">65%</meter>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<meter />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLMeterElement`](https://html.spec.whatwg.org/multipage/form-elements.html#htmlmeterelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `meter` в WHATWG](https://html.spec.whatwg.org/multipage/form-elements.html#the-meter-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
