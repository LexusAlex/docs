---
title: "sandbox"
description: "Накладывает ограничения на содержимое iframe с помощью токенов."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `sandbox`

Накладывает ограничения на содержимое iframe с помощью токенов.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`iframe`](/base/frontend/html/elements/embedded-content/iframe) | Security rules for nested content | Unordered set of unique space-separated tokens , ASCII case-insensitive , consisting of " allow-downloads " " allow-forms " " allow-modals " " allow-orientation-lock " " allow-pointer-lock " " allow-popups " " allow-popups-to-escape-sandbox " " allow-presentation " " allow-same-origin " " allow-scripts " " allow-top-navigation " " allow-top-navigation-by-user-activation " " allow-top-navigation-to-custom-protocols " | [`iframe`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<iframe>`

Точная формулировка WHATWG: `Security rules for nested content`. Формат из индекса: `Unordered set of unique space-separated tokens , ASCII case-insensitive , consisting of " allow-downloads " " allow-forms " " allow-modals " " allow-orientation-lock " " allow-pointer-lock " " allow-popups " " allow-popups-to-escape-sandbox " " allow-presentation " " allow-same-origin " " allow-scripts " " allow-top-navigation " " allow-top-navigation-by-user-activation " " allow-top-navigation-to-custom-protocols "`.

```html
<iframe src="/help/" title="Справка" sandbox="allow-forms allow-scripts"></iframe>
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
- [Определение `<iframe>`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox)
