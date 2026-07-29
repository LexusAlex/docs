---
title: "Рамки (border)"
description: "Свойства, задающие рамку вокруг элемента."
outline: deep
---

# Рамки (border)

Свойства `border` задают рамку вокруг элемента — линию между padding и margin.

## Свойства

| Свойство | Описание |
|----------|----------|
| `border` | Шортанд (width, style, color) |
| `border-top` | Рамка сверху |
| `border-right` | Рамка справа |
| `border-bottom` | Рамка снизу |
| `border-left` | Рамка слева |
| `border-width` | Толщина рамки |
| `border-style` | Стиль линии |
| `border-color` | Цвет рамки |
| `border-radius` | Скругление углов |
| `border-start-start-radius` | Логическое скругление |
| `border-start-end-radius` | Логическое скругление |
| `border-end-start-radius` | Логическое скругление |
| `border-end-end-radius` | Логическое скругление |

## Значения border-style

| Значение | Описание |
|----------|----------|
| `none` | Нет рамки |
| `hidden` | Скрытая рамка (приоритет в таблицах) |
| `solid` | Сплошная линия |
| `dashed` | Пунктир |
| `dotted` | Точечная линия |
| `double` | Двойная линия |
| `groove` | Выпуклая 3D-рамка |
| `ridge` | Вогнутая 3D-рамка |
| `inset` | Внутренняя 3D-рамка |
| `outset` | Внешняя 3D-рамка |

## Примеры

### Шортанд

```css
/* Все стороны: width style color */
.element {
  border: 1px solid black;
}

/* Только толщина и стиль */
.element {
  border: 2px dashed;
}

/* Разные стороны */
.element {
  border-top: 3px solid red;
  border-bottom: 3px solid red;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
}
```

### Индивидуальные свойства

```css
.card {
  border-width: 2px;
  border-style: solid;
  border-color: #e0e0e0;
}

.card:hover {
  border-color: #2196f3;
}
```

### Значения стилей

```css
.styles-demo .none    { border: 3px none black; }
.styles-demo .solid   { border: 3px solid black; }
.styles-demo .dashed  { border: 3px dashed black; }
.styles-demo .dotted  { border: 3px dotted black; }
.styles-demo .double  { border: 3px double black; }
.styles-demo .groove  { border: 3px groove gray; }
.styles-demo .ridge   { border: 3px ridge gray; }
.styles-demo .inset   { border: 3px inset gray; }
.styles-demo .outset  { border: 3px outset gray; }
```

:::info
3D-стили (`groove`, `ridge`, `inset`, `outset`) зависят от `border-color`. Для их корректного отображения лучше задавать цвет явно.
:::

### border-radius

```css
/* Все углы одинаковые */
.circle {
  border-radius: 50%;
  width: 200px;
  height: 200px;
}

.rounded {
  border-radius: 8px;
}

/* Разные углы: top-left top-right bottom-right bottom-left */
.asymmetric {
  border-radius: 10px 20px 30px 40px;
}

/* Диагональные пары: vertical / horizontal */
.elliptical {
  border-radius: 50% / 25%;
  /* Эллиптическое скругление */
}

/* Индивидуальные углы */
.custom-corners {
  border-top-left-radius: 20px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 0;
}

/* Логические углы */
.logical-radius {
  border-start-start-radius: 10px;
  border-start-end-radius: 5px;
  border-end-start-radius: 5px;
  border-end-end-radius: 10px;
}
```

:::tip
`border-radius: 50%` создаёт круг, если элемент квадратный. Для эллипса задайте разные значения для горизонтального и вертикального радиусов: `border-radius: 50% / 25%`.
:::

### Разные рамки для сторон

```css
/* Три разные рамки */
.three-borders {
  border-top: 3px solid red;
  border-right: 2px dashed blue;
  border-bottom: 1px dotted green;
  border-left: 2px solid orange;
}

/* Только одна сторона */
.only-bottom {
  border: none;
  border-bottom: 1px solid #ccc;
}
```

### border-collapse для таблиц

```css
table {
  border-collapse: collapse;
  /* Рамки ячеек объединяются в одну линию */
}

table td,
table th {
  border: 1px solid #333;
  padding: 8px 12px;
}

/* Отдельные рамки */
table.separate {
  border-collapse: separate;
  border-spacing: 4px;
}
```

### border и box-sizing

```css
/* border-box — border входит в width/height */
.border-box {
  box-sizing: border-box;
  width: 300px;
  border: 5px solid black;
  padding: 10px;
  /* Внешняя ширина = 300px, внутренняя = 280px */
}

/* content-box — border добавляется к width/height */
.content-box {
  box-sizing: content-box;
  width: 300px;
  border: 5px solid black;
  /* Внешняя ширина = 310px */
}
```

:::warning
Используйте `box-sizing: border-box`, чтобы border не ломал макет. Это стандартная практика.
:::

## Ссылки

- [MDN: border](https://developer.mozilla.org/en-US/docs/Web/CSS/border)
- [MDN: border-style](https://developer.mozilla.org/en-US/docs/Web/CSS/border-style)
- [MDN: border-radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius)
- [MDN: border-collapse](https://developer.mozilla.org/en-US/docs/Web/CSS/border-collapse)
- [CSS Backgrounds and Borders Module Level 3](https://www.w3.org/TR/css-backgrounds-3/#borders)
