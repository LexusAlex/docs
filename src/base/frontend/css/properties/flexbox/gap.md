---
title: gap
description: Определяет размер зазора между элементами в флекс-контейнере.
outline: deep
---

# gap

::: info
Свойства `gap`, `row-gap` и `column-gap` задают расстояние между флекс-элементами. В отличие от отступов через `margin`, `gap` не добавляет пространство по краям контейнера.
:::

## Значения

| Значение | Описание |
| --- | --- |
| длина | Конкретное значение (`10px`, `1rem`, `2em`) |
| процент | Процент от размера контейнера (`5%`) |

## gap

Shorthand-свойство, задающее `row-gap` и `column-gap` одновременно.

```css
.container {
  display: flex;
  gap: 16px;
}
```

При указании двух значений первое задаёт `row-gap`, второе — `column-gap`.

```css
.container {
  display: flex;
  gap: 20px 10px;
}
```

## row-gap

Задаёт размер зазора между строками.

```css
.container {
  display: flex;
  flex-wrap: wrap;
  row-gap: 16px;
}
```

## column-gap

Задаёт размер зазора между колонками.

```css
.container {
  display: flex;
  column-gap: 24px;
}
```

## Примеры

### Gap с flex-wrap

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.item {
  flex: 0 0 calc(33.333% - 11px);
}
```

### Gap по осям отдельно

```css
.container {
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 12px;
}
```

### Сравнение с margin

```css
/* С использованием gap — чище */
.container {
  display: flex;
  gap: 16px;
}

/* С использованием margin — необходимо компенсировать отступы по краям */
.container-with-margin > * + * {
  margin-left: 16px;
}
```

::: tip
`gap` — предпочтительный способ добавления расстояния между флекс-элементами. Он не требует компенсации отступов по краям контейнера и работает предсказуемо с `flex-wrap`.
:::

### Сетка с разным шагом

```css
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 24px;
}

.grid-item {
  flex: 0 0 calc(25% - 18px);
}
```

## Ссылки

- [MDN: gap](https://developer.mozilla.org/ru/docs/Web/CSS/gap)
- [MDN: row-gap](https://developer.mozilla.org/ru/docs/Web/CSS/row-gap)
- [MDN: column-gap](https://developer.mozilla.org/ru/docs/Web/CSS/column-gap)
- [CSS Flexible Box Layout Level 1](https://www.w3.org/TR/css-flexbox-1/#gap-property)
