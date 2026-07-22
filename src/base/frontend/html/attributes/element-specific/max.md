---
title: "max"
description: "Задаёт максимальное допустимое значение."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `max`

Задаёт максимальное допустимое значение.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`input`](/base/frontend/html/elements/forms/input) | Maximum value | Varies* | [`input`](https://html.spec.whatwg.org/multipage/input.html#attr-input-max) |
| [`meter`](/base/frontend/html/elements/forms/meter), [`progress`](/base/frontend/html/elements/forms/progress) | Upper bound of range | Valid floating-point number * | [`meter`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-meter-max), [`progress`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-progress-max) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<input>` — вариант 1

Точная формулировка WHATWG: `Maximum value`. Формат из индекса: `Varies*`.

```html
<input type="number" name="field" max="10">
```

### Для `<meter>`, `<progress>` — вариант 2

Точная формулировка WHATWG: `Upper bound of range`. Формат из индекса: `Valid floating-point number *`.

```html
<meter max="100">Содержимое meter</meter>

<progress max="100">Содержимое progress</progress>
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
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/input.html#attr-input-max)
- [Определение `<meter>`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-meter-max)
- [Определение `<progress>`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-progress-max)
