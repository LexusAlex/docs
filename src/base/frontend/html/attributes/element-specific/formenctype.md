---
title: "formenctype"
description: "Переопределяет формат отправки формы для кнопки отправки."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `formenctype`

Переопределяет формат отправки формы для кнопки отправки.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`button`](/base/frontend/html/elements/forms/button), [`input`](/base/frontend/html/elements/forms/input) | Entry list encoding type to use for form submission | " application/x-www-form-urlencoded "; " multipart/form-data "; " text/plain " | [`button`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fs-formenctype), [`input`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fs-formenctype) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<button>`, `<input>`

Точная формулировка WHATWG: `Entry list encoding type to use for form submission`. Формат из индекса: `" application/x-www-form-urlencoded "; " multipart/form-data "; " text/plain "`.

```html
<button type="button" formenctype="multipart/form-data">Выполнить</button>

<input type="submit" name="field" formenctype="multipart/form-data">
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
- [Определение `<button>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fs-formenctype)
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fs-formenctype)
