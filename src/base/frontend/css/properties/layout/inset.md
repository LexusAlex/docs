---
title: inset
description: Сокращённое свойство для задания отступов от краёв containing block.
outline: deep
---

# inset

Сокращённое свойство для задания отступов от краёв containing block.

- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/inset)
- [W3C CSS Logical Properties and Values Level 1](https://drafts.csswg.org/css-logical-1/)

## Свойства

| Свойство | Описание |
|----------|----------|
| `top` | Отступ от верхнего края containing block |
| `right` | Отступ от правого края containing block |
| `bottom` | Отступ от нижнего края containing block |
| `left` | Отступ от левого края containing block |
| `inset` | Сокращённое для `top`, `right`, `bottom`, `left` |
| `inset-block` | Сокращённое для `block-start` и `block-end` |
| `inset-inline` | Сокращённое для `inline-start` и `inline-end` |
| `inset-block-start` | Отступ от начала блочной оси |
| `inset-block-end` | Отступ от конца блочной оси |
| `inset-inline-start` | Отступ от начала строчной оси |
| `inset-inline-end` | Отступ от конца строчной оси |

## Примеры

### Базовое позиционирование

```css
.element {
  position: absolute;
  top: 20px;
  right: 10px;
  bottom: 20px;
  left: 10px;
}
```

### inset shorthand

Сокращённое свойство для всех четырёх сторон.

```css
/* 4 значения: top right bottom left */
.element {
  position: fixed;
  inset: 10px 20px 30px 40px;
}

/* 2 значения: top/bottom left/right */
.element {
  position: fixed;
  inset: 10px 20px;
}
```

### Логические свойства

:::info
Логические свойства зависят от направления потока (`writing-mode`). Для горизонтального режима `block-start` = `top`, `inline-start` = `left`.
:::

```css
/* Эквивалент top: 0; bottom: 0 */
.element {
  inset-block: 0;
}

/* Эквивалент left: 0; right: 0 */
.element {
  inset-inline: 0;
}
```
