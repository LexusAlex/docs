---
title: contain
description: Позволяет указать, что внутренности элемента изолированы от остального документа для оптимизации рендеринга.
outline: deep
---

# contain

Позволяет указать, что внутренности элемента изолированы от остального документа для оптимизации рендеринга.

- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/contain)
- [W3C CSS Containment Module Level 2](https://drafts.csswg.org/css-contain-2/)

## Значения

| Значение | Описание |
|----------|----------|
| `none` | Без ограничений (по умолчанию) |
| `layout` | Блокирует внешние layout-зависимости |
| `style` | Изолирует scoped стили |
| `paint` | Ограничивает область отрисовки |
| `size` | Элемент размером независимо от потомков |
| `content` | Эквивалент `layout paint` |
| `inline-size` | Изоляция по inline-оси |
| `strict` | Эквивалент `size layout paint` |

## Примеры

### contain: paint

```css
.card {
  contain: paint;
}
```

:::info
`contain: paint` обрезает содержимое по border-box и создаёт новый BFC.
:::

### contain: size

```css
.widget {
  contain: size;
  width: 300px;
  height: 200px;
}
```

:::warning
`contain: size` делает элемент размером 0×0, пока не заданы explicit размеры. Потомки не влияют на размер.
:::

### contain: layout

```css
.section {
  contain: layout;
}
```

:::info
`contain: layout` создаёт новый BFC без обрезки содержимого.
:::

### contain: content

```css
.dynamic-content {
  contain: content;
}
```

### contain: strict

```css
.isolated-widget {
  contain: strict;
}
```

:::tip
`contain: strict` = `size layout paint` — максимальная изоляция.
:::

## Практический пример

```css
/* Оптимизация для длинных списков */
.list-item {
  contain: layout style;
}

/* Оптимизация для виджетов */
.widget {
  contain: content;
}
```
