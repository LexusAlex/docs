---
title: "<optgroup>"
description: "Именованная группа option внутри select."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<optgroup>`

Именованная группа option внутри select.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<optgroup>…</optgroup>
```

Закрывающий тег можно опустить только при условиях из спецификации; в примерах он записан явно.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | `none` | none |
| Допустимые родители | [`select`](/base/frontend/html/elements/forms/select), [`div`](/base/frontend/html/elements/grouping-content/div) | select ; div * |
| Содержимое | [`option`](/base/frontend/html/elements/forms/option), `script-supporting elements`, [`noscript`](/base/frontend/html/elements/scripting/noscript), [`div`](/base/frontend/html/elements/grouping-content/div), [`legend`](/base/frontend/html/elements/forms/legend) | option *; script-supporting elements *; noscript *; div *; legend * |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`disabled`](/base/frontend/html/attributes/element-specific/disabled), [`label`](/base/frontend/html/attributes/element-specific/label).
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

### Связи элементов формы

for у label совпадает с id поля, а list у input — с id datalist.

Связанные элементы: [`form`](/base/frontend/html/elements/forms/form), [`fieldset`](/base/frontend/html/elements/forms/fieldset), [`legend`](/base/frontend/html/elements/forms/legend), [`label`](/base/frontend/html/elements/forms/label), [`input`](/base/frontend/html/elements/forms/input), [`datalist`](/base/frontend/html/elements/forms/datalist), [`select`](/base/frontend/html/elements/forms/select), [`optgroup`](/base/frontend/html/elements/forms/optgroup), [`option`](/base/frontend/html/elements/forms/option), [`textarea`](/base/frontend/html/elements/forms/textarea), [`button`](/base/frontend/html/elements/forms/button), [`output`](/base/frontend/html/elements/forms/output), [`progress`](/base/frontend/html/elements/forms/progress), [`meter`](/base/frontend/html/elements/forms/meter).

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<select aria-label="Город">
  <optgroup label="Россия"><option>Казань</option></optgroup>
</select>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<optgroup />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLOptGroupElement`](https://html.spec.whatwg.org/multipage/form-elements.html#htmloptgroupelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `optgroup` в WHATWG](https://html.spec.whatwg.org/multipage/form-elements.html#the-optgroup-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
