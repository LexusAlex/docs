---
title: "<input>"
description: "Типизированный элемент управления вводом."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<input>`

Типизированный элемент управления вводом.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<input>
```

Пустой (void) элемент: закрывающий тег запрещён.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), фразовое (`phrasing`), интерактивное (`interactive`), `listed`, `labelable`, `submittable`, `resettable`, `form-associated`, ощутимое (`palpable`) | flow ; phrasing ; interactive *; listed ; labelable ; submittable ; resettable ; form-associated ; palpable * |
| Допустимые родители | фразовое (`phrasing`) | phrasing |
| Содержимое | `empty` | empty |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`accept`](/base/frontend/html/attributes/element-specific/accept), [`alpha`](/base/frontend/html/attributes/element-specific/alpha), [`alt`](/base/frontend/html/attributes/element-specific/alt), [`autocomplete`](/base/frontend/html/attributes/element-specific/autocomplete), [`checked`](/base/frontend/html/attributes/element-specific/checked), [`colorspace`](/base/frontend/html/attributes/element-specific/colorspace), [`dirname`](/base/frontend/html/attributes/element-specific/dirname), [`disabled`](/base/frontend/html/attributes/element-specific/disabled), [`form`](/base/frontend/html/attributes/element-specific/form), [`formaction`](/base/frontend/html/attributes/element-specific/formaction), [`formenctype`](/base/frontend/html/attributes/element-specific/formenctype), [`formmethod`](/base/frontend/html/attributes/element-specific/formmethod), [`formnovalidate`](/base/frontend/html/attributes/element-specific/formnovalidate), [`formtarget`](/base/frontend/html/attributes/element-specific/formtarget), [`height`](/base/frontend/html/attributes/element-specific/height), [`list`](/base/frontend/html/attributes/element-specific/list), [`max`](/base/frontend/html/attributes/element-specific/max), [`maxlength`](/base/frontend/html/attributes/element-specific/maxlength), [`min`](/base/frontend/html/attributes/element-specific/min), [`minlength`](/base/frontend/html/attributes/element-specific/minlength), [`multiple`](/base/frontend/html/attributes/element-specific/multiple), [`name`](/base/frontend/html/attributes/element-specific/name), [`pattern`](/base/frontend/html/attributes/element-specific/pattern), [`placeholder`](/base/frontend/html/attributes/element-specific/placeholder), [`popovertarget`](/base/frontend/html/attributes/element-specific/popovertarget), [`popovertargetaction`](/base/frontend/html/attributes/element-specific/popovertargetaction), [`readonly`](/base/frontend/html/attributes/element-specific/readonly), [`required`](/base/frontend/html/attributes/element-specific/required), [`size`](/base/frontend/html/attributes/element-specific/size), [`src`](/base/frontend/html/attributes/element-specific/src), [`step`](/base/frontend/html/attributes/element-specific/step), [`type`](/base/frontend/html/attributes/element-specific/type), [`value`](/base/frontend/html/attributes/element-specific/value), [`width`](/base/frontend/html/attributes/element-specific/width).
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

### Связи элементов формы

for у label совпадает с id поля, а list у input — с id datalist.

Связанные элементы: [`form`](/base/frontend/html/elements/forms/form), [`fieldset`](/base/frontend/html/elements/forms/fieldset), [`legend`](/base/frontend/html/elements/forms/legend), [`label`](/base/frontend/html/elements/forms/label), [`input`](/base/frontend/html/elements/forms/input), [`datalist`](/base/frontend/html/elements/forms/datalist), [`select`](/base/frontend/html/elements/forms/select), [`optgroup`](/base/frontend/html/elements/forms/optgroup), [`option`](/base/frontend/html/elements/forms/option), [`textarea`](/base/frontend/html/elements/forms/textarea), [`button`](/base/frontend/html/elements/forms/button), [`output`](/base/frontend/html/elements/forms/output), [`progress`](/base/frontend/html/elements/forms/progress), [`meter`](/base/frontend/html/elements/forms/meter).

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<form action="/subscribe" method="post">
  <fieldset>
    <legend>Подписка</legend>
    <label for="email">Email</label>
    <input id="email" name="email" type="email" required>
    <button type="submit">Подписаться</button>
  </fieldset>
</form>
```

### Разные типы полей

Тип поля задаёт семантику, встроенную проверку и подходящую экранную клавиатуру.

```html
<label>Email <input name="email" type="email" autocomplete="email" required></label>
<label>Дата <input name="date" type="date"></label>
<label>Количество <input name="qty" type="number" min="1" max="10" step="1"></label>
<label><input name="agree" type="checkbox" required> Согласен</label>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не добавляйте закрывающий тег `</input>`.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLInputElement`](https://html.spec.whatwg.org/multipage/input.html#htmlinputelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `input` в WHATWG](https://html.spec.whatwg.org/multipage/input.html#the-input-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
