---
title: "closedby"
description: "Ограничивает способы, которыми пользователь может закрыть dialog."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `closedby`

Ограничивает способы, которыми пользователь может закрыть dialog.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


::: warning Проверяйте поддержку
Эта возможность есть в Living Standard, но может быть реализована неравномерно. Перед использованием проверьте актуальную поддержку целевых браузеров.
:::

## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`dialog`](/base/frontend/html/elements/interactive-elements/dialog) | Which user actions will close the dialog | " any "; " closerequest "; " none "; | [`dialog`](https://html.spec.whatwg.org/multipage/interactive-elements.html#attr-dialog-closedby) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<dialog>`

Точная формулировка WHATWG: `Which user actions will close the dialog`. Формат из индекса: `" any "; " closerequest "; " none ";`.

```html
<dialog closedby="any"><p>Подтвердите действие.</p></dialog>
```

### Три режима закрытия диалога

```html
<dialog closedby="any">Закрывается также лёгким закрытием.</dialog>
<dialog closedby="closerequest">Закрывается запросом пользователя.</dialog>
<dialog closedby="none">Закрывается только кодом.</dialog>
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
- [Определение `<dialog>`](https://html.spec.whatwg.org/multipage/interactive-elements.html#attr-dialog-closedby)
