---
title: "dir"
description: "Задаёт направление текста элемента."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `dir`

Задаёт направление текста элемента.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| Все HTML-элементы | The text directionality of the element | " ltr "; " rtl "; " auto " | [WHATWG](https://html.spec.whatwg.org/multipage/dom.html#attr-dir) |
| [`bdo`](/base/frontend/html/elements/text-level-semantics/bdo) | The text directionality of the element | " ltr "; " rtl " | [`bdo`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-bdo-element) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для всех HTML-элементов — вариант 1

Точная формулировка WHATWG: `The text directionality of the element`. Формат из индекса: `" ltr "; " rtl "; " auto "`.

```html
<div dir="rtl">Содержимое div</div>
```

### Для `<bdo>` — вариант 2

Точная формулировка WHATWG: `The text directionality of the element`. Формат из индекса: `" ltr "; " rtl "`.

```html
<bdo dir="rtl">Содержимое bdo</bdo>
```

### Явное и автоматическое направление

```html
<p dir="rtl" lang="ar">مرحبا بالعالم</p>
<p dir="auto">Пользовательский текст с неизвестным направлением</p>
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
- [Определение для всех HTML-элементов](https://html.spec.whatwg.org/multipage/dom.html#attr-dir)
- [Определение `<bdo>`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-bdo-element)
