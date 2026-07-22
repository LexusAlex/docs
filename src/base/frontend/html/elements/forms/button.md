---
title: "<button>"
description: "Кнопка, отправляющая форму или выполняющая команду."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<button>`

Кнопка, отправляющая форму или выполняющая команду.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<button>…</button>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), фразовое (`phrasing`), интерактивное (`interactive`), `listed`, `labelable`, `submittable`, `form-associated`, ощутимое (`palpable`) | flow ; phrasing ; interactive ; listed ; labelable ; submittable ; form-associated ; palpable |
| Допустимые родители | фразовое (`phrasing`), [`select`](/base/frontend/html/elements/forms/select) | phrasing ; select * |
| Содержимое | фразовое (`phrasing`) | phrasing * |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`command`](/base/frontend/html/attributes/element-specific/command), [`commandfor`](/base/frontend/html/attributes/element-specific/commandfor), [`disabled`](/base/frontend/html/attributes/element-specific/disabled), [`form`](/base/frontend/html/attributes/element-specific/form), [`formaction`](/base/frontend/html/attributes/element-specific/formaction), [`formenctype`](/base/frontend/html/attributes/element-specific/formenctype), [`formmethod`](/base/frontend/html/attributes/element-specific/formmethod), [`formnovalidate`](/base/frontend/html/attributes/element-specific/formnovalidate), [`formtarget`](/base/frontend/html/attributes/element-specific/formtarget), [`name`](/base/frontend/html/attributes/element-specific/name), [`popovertarget`](/base/frontend/html/attributes/element-specific/popovertarget), [`popovertargetaction`](/base/frontend/html/attributes/element-specific/popovertargetaction), [`type`](/base/frontend/html/attributes/element-specific/type), [`value`](/base/frontend/html/attributes/element-specific/value).
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

### Связи элементов формы

for у label совпадает с id поля, а list у input — с id datalist.

Связанные элементы: [`form`](/base/frontend/html/elements/forms/form), [`fieldset`](/base/frontend/html/elements/forms/fieldset), [`legend`](/base/frontend/html/elements/forms/legend), [`label`](/base/frontend/html/elements/forms/label), [`input`](/base/frontend/html/elements/forms/input), [`datalist`](/base/frontend/html/elements/forms/datalist), [`select`](/base/frontend/html/elements/forms/select), [`optgroup`](/base/frontend/html/elements/forms/optgroup), [`option`](/base/frontend/html/elements/forms/option), [`textarea`](/base/frontend/html/elements/forms/textarea), [`button`](/base/frontend/html/elements/forms/button), [`output`](/base/frontend/html/elements/forms/output), [`progress`](/base/frontend/html/elements/forms/progress), [`meter`](/base/frontend/html/elements/forms/meter).

### Раскрытие и диалог

summary является подписью details; button может декларативно управлять dialog через commandfor.

Связанные элементы: [`details`](/base/frontend/html/elements/interactive-elements/details), [`summary`](/base/frontend/html/elements/interactive-elements/summary), [`dialog`](/base/frontend/html/elements/interactive-elements/dialog), [`button`](/base/frontend/html/elements/forms/button).

### Popover и управляющая кнопка

popovertarget ссылается на id элемента с popover.

Связанные элементы: [`button`](/base/frontend/html/elements/forms/button), [`div`](/base/frontend/html/elements/grouping-content/div).

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

### Раскрытие и диалог

summary является подписью details; button может декларативно управлять dialog через commandfor.

```html
<details>
  <summary>Условия</summary>
  <p>Текст условий.</p>
</details>
<button command="show-modal" commandfor="confirm-dialog">Открыть</button>
<dialog id="confirm-dialog" closedby="any">Подтвердите действие.</dialog>
```

### Popover и управляющая кнопка

popovertarget ссылается на id элемента с popover.

```html
<button popovertarget="filters">Фильтры</button>
<div id="filters" popover>Настройки фильтрации</div>
```

### Обычная и отправляющая кнопки

В форме явно задавайте type, если кнопка не должна отправлять данные.

```html
<form action="/search">
  <input name="q" type="search">
  <button type="submit">Найти</button>
  <button type="button" id="clear">Очистить</button>
</form>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<button />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLButtonElement`](https://html.spec.whatwg.org/multipage/form-elements.html#htmlbuttonelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `button` в WHATWG](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
