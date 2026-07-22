---
title: "allowfullscreen"
description: "Разрешает содержимому iframe переходить в полноэкранный режим."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `allowfullscreen`

Разрешает содержимому iframe переходить в полноэкранный режим.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`iframe`](/base/frontend/html/elements/embedded-content/iframe) | Whether to allow the iframe 's contents to use requestFullscreen() | Boolean attribute | [`iframe`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-allowfullscreen) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

### Булева семантика

Это булев атрибут: присутствие означает истину независимо от строки значения. Используйте `allowfullscreen`, `allowfullscreen=""` или `allowfullscreen="allowfullscreen"`; запись `allowfullscreen="false"` всё равно означает истину.

## Примеры использования

### Для `<iframe>`

Точная формулировка WHATWG: `Whether to allow the iframe 's contents to use requestFullscreen()`. Формат из индекса: `Boolean attribute`.

```html
<iframe src="/help/" title="Справка" allowfullscreen></iframe>
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
- [Определение `<iframe>`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-allowfullscreen)
