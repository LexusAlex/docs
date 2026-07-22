---
title: "readonly"
description: "Запрещает изменение значения пользователем, сохраняя участие в форме."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `readonly`

Запрещает изменение значения пользователем, сохраняя участие в форме.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`input`](/base/frontend/html/elements/forms/input), [`textarea`](/base/frontend/html/elements/forms/textarea) | Whether to allow the value to be edited by the user | Boolean attribute | [`input`](https://html.spec.whatwg.org/multipage/input.html#attr-input-readonly), [`textarea`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-textarea-readonly) |
| form-associated custom elements | Affects willValidate , plus any behavior added by the custom element author | Boolean attribute | [WHATWG](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-face-readonly) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

### Булева семантика

Это булев атрибут: присутствие означает истину независимо от строки значения. Используйте `readonly`, `readonly=""` или `readonly="readonly"`; запись `readonly="false"` всё равно означает истину.

## Примеры использования

### Для `<input>`, `<textarea>` — вариант 1

Точная формулировка WHATWG: `Whether to allow the value to be edited by the user`. Формат из индекса: `Boolean attribute`.

```html
<input type="text" name="field" readonly>

<textarea readonly>Исходный текст</textarea>
```

### Для form-associated custom elements — вариант 2

Точная формулировка WHATWG: `Affects willValidate , plus any behavior added by the custom element author`. Формат из индекса: `Boolean attribute`.

```html
<x-rating readonly>4</x-rating>
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
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/input.html#attr-input-readonly)
- [Определение `<textarea>`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-textarea-readonly)
- [Определение для form-associated custom elements](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-face-readonly)
