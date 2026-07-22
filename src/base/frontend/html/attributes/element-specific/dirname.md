---
title: "dirname"
description: "Добавляет направление текста поля к отправляемым данным формы."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `dirname`

Добавляет направление текста поля к отправляемым данным формы.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`input`](/base/frontend/html/elements/forms/input), [`textarea`](/base/frontend/html/elements/forms/textarea) | Name of form control to use for sending the element's directionality in form submission | Text * | [`input`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-dirname), [`textarea`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-dirname) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<input>`, `<textarea>`

Точная формулировка WHATWG: `Name of form control to use for sending the element's directionality in form submission`. Формат из индекса: `Text *`.

```html
<input type="text" name="query" dirname="query.dir">

<textarea dirname="comment.dir">Исходный текст</textarea>
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
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-dirname)
- [Определение `<textarea>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-dirname)
