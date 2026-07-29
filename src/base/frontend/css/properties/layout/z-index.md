---
title: z-index
description: Управляет порядком наложения элементов по оси Z.
outline: deep
---

# z-index

Управляет порядком наложения элементов по оси Z.

- Специфичность: `0-0-0`
- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index)

## Значения

| Значение | Описание |
|----------|----------|
| `auto` | Без создания нового stacking context |
| `integer` | Порядок наложения (целое число) |

## Примеры

### z-index с positioned элементами

```css
.element {
  position: relative;
  z-index: 10;
}
```

:::warning
`z-index` работает только для элементов с `position` отличным от `static`.
:::

### Создание stacking context

```css
.parent {
  position: relative;
  z-index: 1; /* создаёт stacking context */
}

.child {
  position: absolute;
  z-index: 9999; /* наложится поверх других внутри parent, но не поверх sibling parent */
}
```

### Типичные ошибки

```css
/* z-index без position — не работает */
.element {
  z-index: 100; /* бесполезно */
}

/* Правильно */
.element {
  position: relative;
  z-index: 100;
}
```

## Stacking Context

Stacking context создаётся для:

1. Корневого элемента (`<html>`)
2. Элемента с `position` отличным от `static` и `z-index` отличным от `auto`
3. Дочерних элементов flex/grid контейнера с `z-index` отличным от `auto`
4. Элементов с `opacity` < 1
5. Элементов с `transform`, `filter`, `perspective`, `clip-path` и др.

:::info
Элементы с более высоким `z-index` всегда налагаются поверх элементов с более низким, независимо от DOM-структуры.
:::

## Порядок наложения

1. Фон и border элемента
2. Потомки с `z-index: auto` или `z-index: 0`
3. Потомки с `z-index: negative`
4. Потомки с `z-index: positive`
