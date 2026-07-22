---
title: "autocomplete"
description: "Управляет автозаполнением формы или элемента управления."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `autocomplete`

Управляет автозаполнением формы или элемента управления.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`form`](/base/frontend/html/elements/forms/form) | Default setting for autofill feature for controls in the form | " on "; " off " | [`form`](https://html.spec.whatwg.org/multipage/forms.html#attr-form-autocomplete) |
| [`input`](/base/frontend/html/elements/forms/input), [`select`](/base/frontend/html/elements/forms/select), [`textarea`](/base/frontend/html/elements/forms/textarea) | Hint for form autofill feature | Autofill field name and related tokens* | [`input`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-autocomplete), [`select`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-autocomplete), [`textarea`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-autocomplete) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<form>` — вариант 1

Точная формулировка WHATWG: `Default setting for autofill feature for controls in the form`. Формат из индекса: `" on "; " off "`.

```html
<form action="/submit" method="post" autocomplete="off">Содержимое form</form>
```

### Для `<input>`, `<select>`, `<textarea>` — вариант 2

Точная формулировка WHATWG: `Hint for form autofill feature`. Формат из индекса: `Autofill field name and related tokens*`.

```html
<input type="text" name="field" autocomplete="email">

<select autocomplete="country-name"><option>Казань</option></select>

<textarea autocomplete="street-address">Исходный текст</textarea>
```

### Составные токены

```html
<input name="card" autocomplete="section-checkout billing cc-number">
<input name="phone" autocomplete="section-contact mobile tel">
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
- [Определение `<form>`](https://html.spec.whatwg.org/multipage/forms.html#attr-form-autocomplete)
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-autocomplete)
- [Определение `<select>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-autocomplete)
- [Определение `<textarea>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-autocomplete)
