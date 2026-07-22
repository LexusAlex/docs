---
title: "<select>"
description: "Элемент выбора из списка вариантов."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<select>`

Элемент выбора из списка вариантов.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<select>…</select>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), фразовое (`phrasing`), интерактивное (`interactive`), `listed`, `labelable`, `submittable`, `resettable`, `form-associated`, ощутимое (`palpable`) | flow ; phrasing ; interactive ; listed ; labelable ; submittable ; resettable ; form-associated ; palpable |
| Допустимые родители | фразовое (`phrasing`) | phrasing |
| Содержимое | [`option`](/base/frontend/html/elements/forms/option), [`optgroup`](/base/frontend/html/elements/forms/optgroup), [`hr`](/base/frontend/html/elements/grouping-content/hr), `script-supporting elements`, [`noscript`](/base/frontend/html/elements/scripting/noscript), [`div`](/base/frontend/html/elements/grouping-content/div), [`button`](/base/frontend/html/elements/forms/button) | option *; optgroup *; hr *; script-supporting elements *; noscript *; div *; button * |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`autocomplete`](/base/frontend/html/attributes/element-specific/autocomplete), [`disabled`](/base/frontend/html/attributes/element-specific/disabled), [`form`](/base/frontend/html/attributes/element-specific/form), [`multiple`](/base/frontend/html/attributes/element-specific/multiple), [`name`](/base/frontend/html/attributes/element-specific/name), [`required`](/base/frontend/html/attributes/element-specific/required), [`size`](/base/frontend/html/attributes/element-specific/size).
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

### Связи элементов формы

for у label совпадает с id поля, а list у input — с id datalist.

Связанные элементы: [`form`](/base/frontend/html/elements/forms/form), [`fieldset`](/base/frontend/html/elements/forms/fieldset), [`legend`](/base/frontend/html/elements/forms/legend), [`label`](/base/frontend/html/elements/forms/label), [`input`](/base/frontend/html/elements/forms/input), [`datalist`](/base/frontend/html/elements/forms/datalist), [`select`](/base/frontend/html/elements/forms/select), [`optgroup`](/base/frontend/html/elements/forms/optgroup), [`option`](/base/frontend/html/elements/forms/option), [`textarea`](/base/frontend/html/elements/forms/textarea), [`button`](/base/frontend/html/elements/forms/button), [`output`](/base/frontend/html/elements/forms/output), [`progress`](/base/frontend/html/elements/forms/progress), [`meter`](/base/frontend/html/elements/forms/meter).

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<label for="city">Город</label>
<select id="city" name="city">
  <optgroup label="Россия"><option>Казань</option></optgroup>
</select>
```

### Множественный выбор

multiple разрешает выбрать несколько option; сервер получает несколько значений одного name.

```html
<label for="topics">Темы</label>
<select id="topics" name="topics" multiple size="4">
  <option value="html">HTML</option>
  <option value="css">CSS</option>
  <option value="js">JavaScript</option>
</select>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<select />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLSelectElement`](https://html.spec.whatwg.org/multipage/form-elements.html#htmlselectelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `select` в WHATWG](https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
