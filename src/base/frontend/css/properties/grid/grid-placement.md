---
title: Размещение элементов
description: Определяет позицию элемента в сетке по столбцам и строкам
outline: deep
---

# Размещение элементов

Определяет позицию элемента в сетке по столбцам и строкам.

## Свойства

| Свойство | Описание |
| --- | --- |
| `grid-column` | Сокращение для `grid-column-start` и `grid-column-end` |
| `grid-row` | Сокращение для `grid-row-start` и `grid-row-end` |
| `grid-column-start` | Начальная линия столбца |
| `grid-column-end` | Конечная линия столбца |
| `grid-row-start` | Начальная линия строки |
| `grid-row-end` | Конечная линия строки |
| `grid-area` | Именованная область или сокращение для всех свойств размещения |

## Значения

| Значение | Описание |
| --- | --- |
| `auto` | Позиция определяется автоматически |
| `span N` | Элемент занимает N линий (столбцов или строк) |
| `N` | Номер линии сетки (начинается с 1) |
| `имя-линии` | Именованная линия из `grid-template-areas` или `grid-template-columns/rows` |

## Примеры

### grid-column: start / end

```css
.item {
  grid-column: 1 / 3;
}
```

Элемент занимает столбцы от 1-й до 3-й линии (т.е. 2 столбца).

### grid-row: span 2

```css
.item {
  grid-row: span 2;
}
```

Элемент занимает 2 строки от текущей позиции.

:::info
Если не указать конечную линию, элемент автоматически займет пространство для `span 1`.
:::

### grid-area с именем

```css
.parent {
  display: grid;
  grid-template-areas:
    "header header"
    "main   sidebar";
}

.child {
  grid-area: header;
}
```

### Совмещение элементов

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 100px);
}

.item-a {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
  background: rgba(255, 0, 0, 0.3);
}

.item-b {
  grid-column: 2 / 4;
  grid-row: 2 / 4;
  background: rgba(0, 0, 255, 0.3);
}
```

Элементы перекрываются, создавая эффект наложения.

:::tip
Совмещение элементов полезно для создания визуальных эффектов — например, плашек с заголовком поверх изображения.
:::

### Сокращение grid-area

```css
.item {
  /* grid-row-start / grid-column-start / grid-row-end / grid-column-end */
  grid-area: 1 / 1 / 3 / 3;
}
```

Четыре значения размещают элемент по строке-начала, столбцу-начала, строке-конца и столбцу-конца.

## Ссылки

- [MDN: grid-column](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column)
- [MDN: grid-row](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row)
- [MDN: grid-column-start](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start)
- [MDN: grid-column-end](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end)
- [MDN: grid-row-start](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start)
- [MDN: grid-row-end](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end)
- [MDN: grid-area](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area)
