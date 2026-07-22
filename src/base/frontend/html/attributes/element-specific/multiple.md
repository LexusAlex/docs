---
title: "multiple"
description: "Разрешает выбрать или ввести несколько значений."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `multiple`

Разрешает выбрать или ввести несколько значений.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`input`](/base/frontend/html/elements/forms/input), [`select`](/base/frontend/html/elements/forms/select) | Whether to allow multiple values | Boolean attribute | [`input`](https://html.spec.whatwg.org/multipage/input.html#attr-input-multiple), [`select`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-select-multiple) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

### Булева семантика

Это булев атрибут: присутствие означает истину независимо от строки значения. Используйте `multiple`, `multiple=""` или `multiple="multiple"`; запись `multiple="false"` всё равно означает истину.

## Примеры использования

### Для `<input>`, `<select>`

Точная формулировка WHATWG: `Whether to allow multiple values`. Формат из индекса: `Boolean attribute`.

```html
<input type="file" name="field" multiple>

<select multiple><option>Казань</option></select>
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
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/input.html#attr-input-multiple)
- [Определение `<select>`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-select-multiple)
