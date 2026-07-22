---
title: "datetime"
description: "Задаёт машиночитаемую дату или время для time, ins и del."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `datetime`

Задаёт машиночитаемую дату или время для time, ins и del.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`del`](/base/frontend/html/elements/edits/del), [`ins`](/base/frontend/html/elements/edits/ins) | Date and (optionally) time of the change | Valid date string with optional time | [`del`](https://html.spec.whatwg.org/multipage/edits.html#attr-mod-datetime), [`ins`](https://html.spec.whatwg.org/multipage/edits.html#attr-mod-datetime) |
| [`time`](/base/frontend/html/elements/text-level-semantics/time) | Machine-readable value | Valid month string , valid date string , valid yearless date string , valid time string , valid local date and time string , valid time-zone offset string , valid global date and time string , valid week string , valid non-negative integer , or valid duration string | [`time`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<del>`, `<ins>` — вариант 1

Точная формулировка WHATWG: `Date and (optionally) time of the change`. Формат из индекса: `Valid date string with optional time`.

```html
<del datetime="2026-07-20">Содержимое del</del>

<ins datetime="2026-07-22">Содержимое ins</ins>
```

### Для `<time>` — вариант 2

Точная формулировка WHATWG: `Machine-readable value`. Формат из индекса: `Valid month string , valid date string , valid yearless date string , valid time string , valid local date and time string , valid time-zone offset string , valid global date and time string , valid week string , valid non-negative integer , or valid duration string`.

```html
<time datetime="2026-07-22T18:30:00+03:00">Содержимое time</time>
```

### Связь: История правок

ins и del описывают изменения документа, а datetime фиксирует время правки.

```html
<p>Срок: <del datetime="2026-07-20">20 июля</del> <ins datetime="2026-07-22">22 июля</ins>.</p>
```

Если атрибут отсутствует, действует состояние по умолчанию конкретного элемента. Пустая строка и отсутствие атрибута не взаимозаменяемы, кроме случаев, явно определённых спецификацией.

## Связи

- **История правок:** ins и del описывают изменения документа, а datetime фиксирует время правки.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<del>`](https://html.spec.whatwg.org/multipage/edits.html#attr-mod-datetime)
- [Определение `<ins>`](https://html.spec.whatwg.org/multipage/edits.html#attr-mod-datetime)
- [Определение `<time>`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime)
