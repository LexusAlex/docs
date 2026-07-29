---
title: "Очертания (outline)"
description: "Свойства, задающие очертание вокруг элемента — линию, не влияющую на размеры."
outline: deep
---

# Очертания (outline)

Свойства `outline` задают очертание — линию вокруг элемента, которая **не влияет на размеры** и не является частью блочной модели.

## Свойства

| Свойство | Описание |
|----------|----------|
| `outline` | Шортанд (width, style, color) |
| `outline-width` | Толщина очертания |
| `outline-style` | Стиль линии |
| `outline-color` | Цвет очертания |
| `outline-offset` | Отступ очертания от border |

## Значения

| Значение | Описание |
|----------|----------|
| `outline-width` | `thin`, `medium`, `thick`, `length` |
| `outline-style` | Аналогично `border-style` (кроме `hidden`) |
| `outline-color` | Цвет или `invert` (инвертирует фон) |

:::info
В отличие от `border`, `outline` не участвует в блочной модели. Добавление или изменение `outline` не сдвигает соседние элементы и не меняет размер элемента.
:::

## Примеры

### Базовый шортанд

```css
.element {
  outline: 2px solid blue;
}

.thick {
  outline: 4px dashed red;
}

.thin {
  outline: thin dotted green;
}
```

### outline-offset

```css
/* Очертание с отступом от border */
.button:focus {
  outline: 2px solid #2196f3;
  outline-offset: 4px;
  /* Очертание на 4px дальше от border */
}

/* Отрицательный offset — очертание внутрь border */
.inner-outline {
  outline: 2px solid red;
  outline-offset: -2px;
  /* Очертание на 2px внутрь от border */
}
```

:::tip
`outline-offset` не поддерживает отрицательные значения во всех браузерах. Проверяйте поддержку.
:::

### Фокусное состояние (accessibility)

```css
/* Стандартное фокусное очертание */
input:focus {
  outline: 2px solid #2196f3;
  outline-offset: 2px;
}

/* Удаление outline (только с альтернативой!) */
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.5);
  /* Всегда предоставляйте альтернативный индикатор фокуса */
}

/* Доступный фокус */
.link:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
  text-decoration: underline;
}
```

:::warning
Никогда не удаляйте `outline` без предоставления альтернативного визуального индикатора фокуса. Это нарушает доступность для пользователей клавиатуры.
:::

### outline vs border

```css
/* Border — влияет на размеры */
.with-border {
  border: 5px solid black;
  width: 200px;
  /* Внешний размер = 210px (200 + 5 + 5) */
}

/* Outline — НЕ влияет на размеры */
.with-outline {
  outline: 5px solid black;
  width: 200px;
  /* Внешний размер = 200px */
  /* Outline рисуется поверх содержимого, не сдвигая ничего */
}

/* Outline не участвует в margin collapsing */
.parent {
  margin-bottom: 20px;
  outline: 2px solid red;
  /* Не влияет на схлопывание margin с соседями */
}
```

### Разные стили очертания

```css
.styles .solid   { outline: 3px solid black; }
.styles .dashed  { outline: 3px dashed black; }
.styles .dotted  { outline: 3px dotted black; }
.styles .double  { outline: 3px double black; }
.styles .groove  { outline: 3px groove gray; }
.styles .ridge   { outline: 3px ridge gray; }
.styles .inset   { outline: 3px inset gray; }
.styles .outset  { outline: 3px outset gray; }
```

### Инвертированное очертание

```css
/* outline-color: invert — автоматически инвертирует цвет фона */
.high-contrast {
  outline: 2px invert;
  /* Полезно для обеспечения видимости на любом фоне */
}
```

### outline в flex и grid

```css
/* Outline не влияет на компоновку flex/grid */
.grid-item {
  outline: 2px solid blue;
  /* Не сдвигает соседние элементы в grid/flex */
  /* Не влияет на расчёт доступного пространства */
}
```

:::info
`outline` рисуется поверх содержимого и не участвует в расчёте размеров. Это делает его идеальным для визуальных эффектов (фокус, выделение), которые не должны влиять на макет.
:::

## Ссылки

- [MDN: outline](https://developer.mozilla.org/en-US/docs/Web/CSS/outline)
- [MDN: outline-style](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-style)
- [MDN: outline-offset](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset)
- [CSS Backgrounds and Borders Module Level 3](https://www.w3.org/TR/css-backgrounds-3/#outline)
