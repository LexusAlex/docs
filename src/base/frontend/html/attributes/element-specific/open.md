---
title: "open"
description: "Задаёт открытое состояние details или dialog."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `open`

Задаёт открытое состояние details или dialog.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`details`](/base/frontend/html/elements/interactive-elements/details) | Whether the details are visible | Boolean attribute | [`details`](https://html.spec.whatwg.org/multipage/interactive-elements.html#attr-details-open) |
| [`dialog`](/base/frontend/html/elements/interactive-elements/dialog) | Whether the dialog box is showing | Boolean attribute | [`dialog`](https://html.spec.whatwg.org/multipage/interactive-elements.html#attr-dialog-open) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

### Булева семантика

Это булев атрибут: присутствие означает истину независимо от строки значения. Используйте `open`, `open=""` или `open="open"`; запись `open="false"` всё равно означает истину.

## Примеры использования

### Для `<details>` — вариант 1

Точная формулировка WHATWG: `Whether the details are visible`. Формат из индекса: `Boolean attribute`.

```html
<details open><summary>Подробнее</summary><p>Дополнительная информация.</p></details>
```

### Для `<dialog>` — вариант 2

Точная формулировка WHATWG: `Whether the dialog box is showing`. Формат из индекса: `Boolean attribute`.

```html
<dialog open><p>Подтвердите действие.</p></dialog>
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
- [Определение `<details>`](https://html.spec.whatwg.org/multipage/interactive-elements.html#attr-details-open)
- [Определение `<dialog>`](https://html.spec.whatwg.org/multipage/interactive-elements.html#attr-dialog-open)
