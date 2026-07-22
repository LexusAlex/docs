---
title: "form"
description: "Связывает элемент управления с form по id вне обычного вложения."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `form`

Связывает элемент управления с form по id вне обычного вложения.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`button`](/base/frontend/html/elements/forms/button), [`fieldset`](/base/frontend/html/elements/forms/fieldset), [`input`](/base/frontend/html/elements/forms/input), [`object`](/base/frontend/html/elements/embedded-content/object), [`output`](/base/frontend/html/elements/forms/output), [`select`](/base/frontend/html/elements/forms/select), [`textarea`](/base/frontend/html/elements/forms/textarea) | Associates the element with a form element | ID * | [`button`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fae-form), [`fieldset`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fae-form), [`input`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fae-form), [`object`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fae-form), [`output`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fae-form), [`select`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fae-form), [`textarea`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fae-form) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<button>`, `<fieldset>`, `<input>`, `<object>`, `<output>`, `<select>`, `<textarea>`

Точная формулировка WHATWG: `Associates the element with a form element`. Формат из индекса: `ID *`.

```html
<form id="checkout" action="/checkout"></form>
<button type="button" form="checkout">Выполнить</button>

<form id="checkout" action="/checkout"></form>
<fieldset form="checkout">Содержимое fieldset</fieldset>

<form id="checkout" action="/checkout"></form>
<input type="text" name="field" form="checkout">

<form id="checkout" action="/checkout"></form>
<object data="manual.pdf" type="application/pdf" form="checkout">Содержимое object</object>

<form id="checkout" action="/checkout"></form>
<output form="checkout">42</output>

<form id="checkout" action="/checkout"></form>
<select form="checkout"><option>Казань</option></select>

<form id="checkout" action="/checkout"></form>
<textarea form="checkout">Исходный текст</textarea>
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
- [Определение `<button>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fae-form)
- [Определение `<fieldset>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fae-form)
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fae-form)
- [Определение `<object>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fae-form)
- [Определение `<output>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fae-form)
- [Определение `<select>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fae-form)
- [Определение `<textarea>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fae-form)
