---
title: "command"
description: "Задаёт команду, которую button передаёт целевому элементу."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `command`

Задаёт команду, которую button передаёт целевому элементу.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


::: warning Проверяйте поддержку
Эта возможность есть в Living Standard, но может быть реализована неравномерно. Перед использованием проверьте актуальную поддержку целевых браузеров.
:::

## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`button`](/base/frontend/html/elements/forms/button) | Indicates to the targeted element which action to take. | " toggle-popover "; " show-popover "; " hide-popover "; " close "; " request-close "; " show-modal "; a custom command keyword | [`button`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-button-command) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<button>`

Точная формулировка WHATWG: `Indicates to the targeted element which action to take.`. Формат из индекса: `" toggle-popover "; " show-popover "; " hide-popover "; " close "; " request-close "; " show-modal "; a custom command keyword`.

```html
<button command="show-modal" commandfor="confirm-dialog">Открыть</button>
<dialog id="confirm-dialog">Подтвердите действие.</dialog>
```

### Popover, dialog и пользовательская команда

```html
<button command="toggle-popover" commandfor="help">Переключить</button>
<button command="show-popover" commandfor="help">Показать</button>
<button command="hide-popover" commandfor="help">Скрыть</button>
<div id="help" popover>Справка</div>

<button command="show-modal" commandfor="confirm">Открыть диалог</button>
<dialog id="confirm">
  <button command="request-close" commandfor="confirm">Запросить закрытие</button>
  <button command="close" commandfor="confirm">Закрыть</button>
</dialog>

<div id="editor">Редактор</div>
<button command="--save" commandfor="editor">Сохранить</button>
```

### Связь: Раскрытие и диалог

summary является подписью details; button может декларативно управлять dialog через commandfor.

```html
<details>
  <summary>Условия</summary>
  <p>Текст условий.</p>
</details>
<button command="show-modal" commandfor="confirm-dialog">Открыть</button>
<dialog id="confirm-dialog" closedby="any">Подтвердите действие.</dialog>
```

Если атрибут отсутствует, действует состояние по умолчанию конкретного элемента. Пустая строка и отсутствие атрибута не взаимозаменяемы, кроме случаев, явно определённых спецификацией.

## Связи

- **Раскрытие и диалог:** summary является подписью details; button может декларативно управлять dialog через commandfor.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<button>`](https://html.spec.whatwg.org/multipage/form-elements.html#attr-button-command)
