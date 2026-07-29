---
title: "Внутренние отступы (padding)"
description: "Свойства, задающие внутренние отступы элемента."
outline: deep
---

# Внутренние отступы (padding)

Свойства `padding` задают внутренние отступы элемента — пространство между содержимым и рамкой (border).

## Свойства

| Свойство | Описание |
|----------|----------|
| `padding` | Шортанд для всех сторон |
| `padding-top` | Отступ сверху |
| `padding-right` | Отступ справа |
| `padding-bottom` | Отступ снизу |
| `padding-left` | Отступ слева |
| `padding-block` | Отступы в блочном направлении (шортанд) |
| `padding-inline` | Отступы в строчном направлении (шортанд) |
| `padding-block-start` | Отступ в начале блочного направления |
| `padding-block-end` | Отступ в конце блочного направления |
| `padding-inline-start` | Отступ в начале строчного направления |
| `padding-inline-end` | Отступ в конце строчного направления |

## Значения

| Значение | Описание |
|----------|----------|
| `length` | px, em, rem и др. |
| `percentage` | Процент от **ширины** контейнера (даже для вертикальных padding) |

:::info
Вертикальный `padding` в процентах вычисляется относительно ширины родительского контейнера, а не высоты. Это часто используется для создания пропорциональных отступов.
:::

## Примеры

### Шортанд

```css
/* Все стороны */
.element {
  padding: 20px;
}

/* Вертикаль / Горизонталь */
.element {
  padding: 10px 20px;
}

/* Верх / Горизонталь / Низ */
.element {
  padding: 10px 20px 30px;
}

/* Верх / Право / Низ / Лево (по часовой) */
.element {
  padding: 10px 20px 30px 40px;
}
```

### Процентный padding

```css
/* Процент всегда от ширины родителя */
.proportional {
  padding: 20% 10px;
  /* 20% от ширины контейнера */
}

/* Трюк для пропорциональных блоков */
.hero-section {
  padding-top: 56.25%; /* 9/16 = aspect-ratio 16:9 */
  position: relative;
}

.hero-section .content {
  position: absolute;
  inset: 0;
}
```

:::tip
Процентный padding — удобный способ создать пропорциональные отступы, зависящие от ширины контейнера. Для фиксированного соотношения сторон используйте `aspect-ratio`.
:::

### Сравнение с margin

```css
/* padding — внутри элемента, между содержимым и border */
.card {
  padding: 20px;
  border: 1px solid #ccc;
  background: white;
}

/* margin — снаружи элемента, между элементом и соседями */
.card + .card {
  margin-top: 20px;
}
```

### Логические свойства

```css
/* Физические */
.physical {
  padding-left: 10px;
  padding-right: 20px;
}

/* Логические — следуют направлению текста */
.logical {
  padding-inline-start: 10px;
  padding-inline-end: 20px;
  /* В LTR: start = left, end = right */
  /* В RTL: start = right, end = left */
}

.logical-block {
  padding-block: 10px 20px;
  /* Верх и низ в блочном направлении */
}

.logical-shorthand {
  padding-inline: 10px 20px;
  padding-block: 30px 40px;
}
```

:::info
Логические свойства `padding-inline` и `padding-block` автоматически переключаются при смене направления письма (LTR ↔ RTL).
:::

### Padding и box-sizing

```css
/* content-box — padding добавляется к width/height */
.content-box {
  box-sizing: content-box;
  width: 300px;
  padding: 20px;
  /* Итоговая ширина = 340px (300 + 20 + 20) */
}

/* border-box — padding входит в width/height */
.border-box {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  /* Итоговая ширина = 300px, внутренняя область = 260px */
}
```

### Padding в flex и grid

```css
.flex-item {
  padding: 10px;
  /* Увеличивает визуальный размер, но не меняет flex-basis */
  /* Влияет на align-self: stretch — элемент растягивается с учётом padding */
}

.grid-cell {
  padding: 15px;
  /* Влияет на размер ячейки при auto размерах */
}
```

## Ссылки

- [MDN: padding](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)
- [MDN: padding-block](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-block)
- [MDN: padding-inline](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline)
- [CSS Box Model Module Level 3](https://www.w3.org/TR/css-box-3/#padding-props)
