---
title: "itemtype"
description: "Задаёт типы microdata-элемента как абсолютные URL."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `itemtype`

Задаёт типы microdata-элемента как абсолютные URL.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| Все HTML-элементы | Item types of a microdata item | Unordered set of unique space-separated tokens consisting of valid absolute URLs * | [WHATWG](https://html.spec.whatwg.org/multipage/microdata.html#attr-itemtype) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для всех HTML-элементов

Точная формулировка WHATWG: `Item types of a microdata item`. Формат из индекса: `Unordered set of unique space-separated tokens consisting of valid absolute URLs *`.

```html
<article itemscope itemtype="https://schema.org/Product">
  <span itemprop="name">Лампа</span>
</article>
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
- [Определение для всех HTML-элементов](https://html.spec.whatwg.org/multipage/microdata.html#attr-itemtype)
