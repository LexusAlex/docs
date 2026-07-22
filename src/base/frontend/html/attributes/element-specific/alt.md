---
title: "alt"
description: "Задаёт текстовую альтернативу изображению или области карты."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `alt`

Задаёт текстовую альтернативу изображению или области карты.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`area`](/base/frontend/html/elements/embedded-content/area), [`img`](/base/frontend/html/elements/embedded-content/img), [`input`](/base/frontend/html/elements/forms/input) | Replacement text for use when images are not available | Text * | [`area`](https://html.spec.whatwg.org/multipage/image-maps.html#attr-area-alt), [`img`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-alt), [`input`](https://html.spec.whatwg.org/multipage/input.html#attr-input-alt) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<area>`, `<img>`, `<input>`

Точная формулировка WHATWG: `Replacement text for use when images are not available`. Формат из индекса: `Text *`.

```html
<map name="office-map">
  <area shape="rect" coords="0,0,160,120" href="/rooms/1" alt="Горная долина">
</map>

<img src="photo.jpg" alt="Горная долина">

<input type="image" name="field" src="send.svg" alt="Горная долина">
```

### Связь: Иллюстрация с подписью

figcaption, если есть, является первым или последним дочерним элементом figure.

```html
<figure>
  <img src="diagram.svg" alt="Схема потока данных" width="640" height="360">
  <figcaption>Поток данных приложения.</figcaption>
</figure>
```

### Связь: Адаптивное изображение

picture содержит source перед обязательным img; img остаётся источником по умолчанию и носителем alt.

```html
<picture>
  <source media="(min-width: 800px)" srcset="hero-wide.webp" type="image/webp">
  <img src="hero.jpg" alt="Горная долина">
</picture>
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

- **Иллюстрация с подписью:** figcaption, если есть, является первым или последним дочерним элементом figure.
- **Адаптивное изображение:** picture содержит source перед обязательным img; img остаётся источником по умолчанию и носителем alt.
- **Карта изображения:** Фрагмент usemap у img совпадает с name элемента map; интерактивные области задаются через area.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<area>`](https://html.spec.whatwg.org/multipage/image-maps.html#attr-area-alt)
- [Определение `<img>`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-alt)
- [Определение `<input>`](https://html.spec.whatwg.org/multipage/input.html#attr-input-alt)
