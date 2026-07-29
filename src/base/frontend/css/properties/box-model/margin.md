---
title: "Отступы (margin)"
description: "Свойства, задающие внешние отступы элемента."
outline: deep
---

# Отступы (margin)

Свойства `margin` задают внешние отступы элемента — пространство между элементом и его соседями.

## Свойства

| Свойство | Описание |
|----------|----------|
| `margin` | Шортанд для всех сторон |
| `margin-top` | Отступ сверху |
| `margin-right` | Отступ справа |
| `margin-bottom` | Отступ снизу |
| `margin-left` | Отступ слева |
| `margin-block` | Отступы в блочном направлении (шортанд) |
| `margin-inline` | Отступы в строчном направлении (шортанд) |
| `margin-block-start` | Отступ в начале блочного направления |
| `margin-block-end` | Отступ в конце блочного направления |
| `margin-inline-start` | Отступ в начале строчного направления |
| `margin-inline-end` | Отступ в конце строчного направления |

## Значения

| Значение | Описание |
|----------|----------|
| `length` | px, em, rem и др. |
| `percentage` | Процент от ширины контейнера |
| `auto` | Автоматический расчёт (для центрирования) |

## Примеры

### Шортанд

```css
/* Все стороны */
.element {
  margin: 20px;
}

/* Вертикаль / Горизонталь */
.element {
  margin: 10px 20px;
}

/* Верх / Горизонталь / Низ */
.element {
  margin: 10px 20px 30px;
}

/* Верх / Право / Низ / Лево (по часовой) */
.element {
  margin: 10px 20px 30px 40px;
}
```

### Центрирование блочных элементов

```css
.centered {
  width: 600px;
  margin: 0 auto;
  /* Элемент центрируется горизонтально */
}

.centered-flex {
  margin: auto;
  /* Работает и в flex/grid контейнерах */
}
```

:::tip
Для центрирования блочного элемента горизонтально достаточно `margin: 0 auto`. Элемент должен иметь явную ширину.
:::

### Схлопывание отступов (margin collapsing)

```css
/* Соседние блочные элементы */
.block-a {
  margin-bottom: 30px;
}

.block-b {
  margin-top: 20px;
}

/* Итоговый зазор = max(30, 20) = 30px, а НЕ 50px */
```

:::info
Схлопывание происходит только для блочных элементов в normal flow, между вертикальными отступами. Не происходит внутри flex, grid или absolute-позиционированных контейнеров.
:::

```css
/* Схлопывание с родителем */
.parent {
  margin-top: 20px;
}

.child {
  margin-top: 40px;
  /* Отступ родителя = max(20, 40) = 40px */
  /* Чтобы избежать: задайте padding или border родителю */
}
```

### Отрицательные отступы

```css
.negative-top {
  margin-top: -20px;
  /* Элемент поднимается вверх */
}

.negative-left {
  margin-left: -30px;
  /* Элемент сдвигается влево */
}

.pull-up {
  margin-bottom: -50px;
  /* Следующий элемент поднимается */
}
```

:::warning
Отрицательные отступы могут приводить к непредсказуемому поведению и нарушению потока документа. Используйте с осторожностью.
:::

### Логические свойства

```css
/* Физические — всегда привязаны к сторонам экрана */
.physical {
  margin-left: 10px;
  margin-right: 20px;
}

/* Логические — зависят от направления письма */
.logical {
  margin-inline-start: 10px;
  margin-inline-end: 20px;
  /* В LTR: start = left, end = right */
  /* В RTL: start = right, end = left */
}

.logical-block {
  margin-block-start: 10px;
  margin-block-end: 20px;
  /* В горизонтальном writing-mode: start = top, end = bottom */
}

.logical-shorthand {
  margin-inline: 10px 20px;
  margin-block: 30px 40px;
}
```

:::info
Логические свойства рекомендуются для поддержки разных направлений письма (LTR/RTL).
:::

### Auto-отступы для выравнивания в flex/grid

```css
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-push-right {
  display: flex;
  justify-content: space-between;
}

.flex-auto-right {
  display: flex;
}

.flex-auto-right .spacer {
  margin-left: auto;
  /* Прижимает элемент вправо */
}

.grid-center {
  display: grid;
  place-items: center;
}
```

## Ссылки

- [MDN: margin](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)
- [MDN: margin-top](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top)
- [MDN: margin-block](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-block)
- [MDN: margin-inline](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline)
- [CSS Box Model Module Level 3](https://www.w3.org/TR/css-box-3/#margin-props)
