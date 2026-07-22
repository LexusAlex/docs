---
title: "disabled"
description: "Отключает элемент управления или связанную группу."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `disabled`

Отключает элемент управления или связанную группу.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`button`](/base/frontend/html/elements/forms/button), [`input`](/base/frontend/html/elements/forms/input), [`optgroup`](/base/frontend/html/elements/forms/optgroup), [`option`](/base/frontend/html/elements/forms/option), [`select`](/base/frontend/html/elements/forms/select), [`textarea`](/base/frontend/html/elements/forms/textarea) | Whether the form control is disabled | Boolean attribute | [`button`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-disabled), [`input`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-disabled), [`optgroup`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-optgroup-disabled), [`option`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-option-disabled), [`select`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-disabled), [`textarea`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-disabled) |
| [`fieldset`](/base/frontend/html/elements/forms/fieldset) | Whether the descendant form controls, except any inside legend , are disabled | Boolean attribute | [`fieldset`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-fieldset-disabled) |
| [`link`](/base/frontend/html/elements/document-metadata/link) | Whether the link is disabled | Boolean attribute | [`link`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-disabled) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

### Булева семантика

Это булев атрибут: присутствие означает истину независимо от строки значения. Используйте `disabled`, `disabled=""` или `disabled="disabled"`; запись `disabled="false"` всё равно означает истину.

## Примеры использования

### Для `<button>`, `<input>`, `<optgroup>`, `<option>`, `<select>`, `<textarea>` — вариант 1

Точная формулировка WHATWG: `Whether the form control is disabled`. Формат из индекса: `Boolean attribute`.

```html
<button type="button" disabled>Выполнить</button>

<input type="text" name="field" disabled>

<select aria-label="Город">
  <optgroup disabled><option>Казань</option></optgroup>
</select>

<select aria-label="Город">
  <option disabled>Казань</option>
</select>

<select disabled><option>Казань</option></select>

<textarea disabled>Исходный текст</textarea>
```

### Для `<fieldset>` — вариант 2

Точная формулировка WHATWG: `Whether the descendant form controls, except any inside legend , are disabled`. Формат из индекса: `Boolean attribute`.

```html
<fieldset disabled>Содержимое fieldset</fieldset>
```

### Для `<link>` — вариант 3

Точная формулировка WHATWG: `Whether the link is disabled`. Формат из индекса: `Boolean attribute`.

```html
<link rel="stylesheet" href="styles.css" disabled>
```

Если атрибут отсутствует, действует состояние по умолчанию конкретного элемента. Пустая строка и отсутствие атрибута не взаимозаменяемы, кроме случаев, явно определённых спецификацией.

## Связи

- Специальная межэлементная связь в общем каталоге не выделена; область применения указана в таблице.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<button>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-disabled)
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-disabled)
- [Определение `<optgroup>`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-optgroup-disabled)
- [Определение `<option>`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-option-disabled)
- [Определение `<select>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-disabled)
- [Определение `<textarea>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-disabled)
- [Определение `<fieldset>`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-fieldset-disabled)
- [Определение `<link>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-disabled)
