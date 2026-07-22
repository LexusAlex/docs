---
title: "target"
description: "Задаёт контекст навигации для ссылки, base или формы."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `target`

Задаёт контекст навигации для ссылки, base или формы.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`a`](/base/frontend/html/elements/text-level-semantics/a), [`area`](/base/frontend/html/elements/embedded-content/area) | Navigable for hyperlink navigation | Valid navigable target name or keyword | [`a`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-target), [`area`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-target) |
| [`base`](/base/frontend/html/elements/document-metadata/base) | Default navigable for hyperlink navigation and form submission | Valid navigable target name or keyword | [`base`](https://html.spec.whatwg.org/multipage/semantics.html#attr-base-target) |
| [`form`](/base/frontend/html/elements/forms/form) | Navigable for form submission | Valid navigable target name or keyword | [`form`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fs-target) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<a>`, `<area>` — вариант 1

Точная формулировка WHATWG: `Navigable for hyperlink navigation`. Формат из индекса: `Valid navigable target name or keyword`.

```html
<a href="/docs/" target="_blank">Документация</a>

<map name="office-map">
  <area shape="rect" coords="0,0,160,120" href="/rooms/1" alt="Переговорная" target="_self">
</map>
```

### Для `<base>` — вариант 2

Точная формулировка WHATWG: `Default navigable for hyperlink navigation and form submission`. Формат из индекса: `Valid navigable target name or keyword`.

```html
<base href="https://example.com/docs/" target="_self">
```

### Для `<form>` — вариант 3

Точная формулировка WHATWG: `Navigable for form submission`. Формат из индекса: `Valid navigable target name or keyword`.

```html
<form action="/submit" method="post" target="_blank">Содержимое form</form>
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
- [Определение `<a>`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-target)
- [Определение `<area>`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-target)
- [Определение `<base>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-base-target)
- [Определение `<form>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fs-target)
