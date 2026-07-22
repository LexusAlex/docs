---
title: "formtarget"
description: "Переопределяет контекст навигации результата отправки формы."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `formtarget`

Переопределяет контекст навигации результата отправки формы.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`button`](/base/frontend/html/elements/forms/button), [`input`](/base/frontend/html/elements/forms/input) | Navigable for form submission | Valid navigable target name or keyword | [`button`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fs-formtarget), [`input`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fs-formtarget) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<button>`, `<input>`

Точная формулировка WHATWG: `Navigable for form submission`. Формат из индекса: `Valid navigable target name or keyword`.

```html
<button type="button" formtarget="_blank">Выполнить</button>

<input type="submit" name="field" formtarget="_blank">
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
- [Определение `<button>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fs-formtarget)
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fs-formtarget)
