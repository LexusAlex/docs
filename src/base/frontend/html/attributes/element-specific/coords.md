---
title: "coords"
description: "Задаёт координаты области карты изображения."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `coords`

Задаёт координаты области карты изображения.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`area`](/base/frontend/html/elements/embedded-content/area) | Coordinates for the shape to be created in an image map | Valid list of floating-point numbers * | [`area`](https://html.spec.whatwg.org/multipage/image-maps.html#attr-area-coords) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<area>`

Точная формулировка WHATWG: `Coordinates for the shape to be created in an image map`. Формат из индекса: `Valid list of floating-point numbers *`.

```html
<map name="office-map">
  <area shape="rect" coords="0,0,160,120" href="/rooms/1" alt="Переговорная">
</map>
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

- **Карта изображения:** Фрагмент usemap у img совпадает с name элемента map; интерактивные области задаются через area.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<area>`](https://html.spec.whatwg.org/multipage/image-maps.html#attr-area-coords)
