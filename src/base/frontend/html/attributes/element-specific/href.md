---
title: "href"
description: "Задаёт адрес гиперссылки или внешнего ресурса."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `href`

Задаёт адрес гиперссылки или внешнего ресурса.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`a`](/base/frontend/html/elements/text-level-semantics/a), [`area`](/base/frontend/html/elements/embedded-content/area) | Address of the hyperlink | Valid URL potentially surrounded by spaces | [`a`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-href), [`area`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-href) |
| [`link`](/base/frontend/html/elements/document-metadata/link) | Address of the hyperlink | Valid non-empty URL potentially surrounded by spaces | [`link`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-href) |
| [`base`](/base/frontend/html/elements/document-metadata/base) | Document base URL | Valid URL potentially surrounded by spaces | [`base`](https://html.spec.whatwg.org/multipage/semantics.html#attr-base-href) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<a>`, `<area>` — вариант 1

Точная формулировка WHATWG: `Address of the hyperlink`. Формат из индекса: `Valid URL potentially surrounded by spaces`.

```html
<a href="/docs/">Документация</a>

<map name="office-map">
  <area shape="rect" coords="0,0,160,120" href="/rooms/1" alt="Переговорная">
</map>
```

### Для `<link>` — вариант 2

Точная формулировка WHATWG: `Address of the hyperlink`. Формат из индекса: `Valid non-empty URL potentially surrounded by spaces`.

```html
<link rel="stylesheet" href="styles.css">
```

### Для `<base>` — вариант 3

Точная формулировка WHATWG: `Document base URL`. Формат из индекса: `Valid URL potentially surrounded by spaces`.

```html
<base href="https://example.com/docs/">
```

### Связь: Списки и пункты

Прямыми пунктами ol, ul и menu служат элементы li.

```html
<nav aria-label="Основная навигация">
  <ul>
    <li><a href="/docs/">Документация</a></li>
    <li><a href="/about/">О проекте</a></li>
  </ul>
</nav>
```

### Связь: Карта изображения

Фрагмент usemap у img совпадает с name элемента map; интерактивные области задаются через area.

```html
<img src="office.png" alt="План офиса" usemap="#office-map">
<map name="office-map">
  <area shape="rect" coords="0,0,160,120" href="/rooms/1" alt="Переговорная">
</map>
```

Если атрибут отсутствует, действует состояние по умолчанию конкретного элемента. Пустая строка и отсутствие атрибута не взаимозаменяемы, кроме случаев, явно определённых спецификацией.

## Связи

- **Списки и пункты:** Прямыми пунктами ol, ul и menu служат элементы li.
- **Карта изображения:** Фрагмент usemap у img совпадает с name элемента map; интерактивные области задаются через area.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<a>`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-href)
- [Определение `<area>`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-href)
- [Определение `<link>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-href)
- [Определение `<base>`](https://html.spec.whatwg.org/multipage/semantics.html#attr-base-href)
