---
title: "Размеры элемента"
description: "Свойства, определяющие размеры элемента и способ вычисления размеров."
outline: deep
---

# Свойства размеров элемента

Свойства размеров определяют ширину, высоту, соотношение сторон и способ вычисления размеров элемента.

## Свойства

| Свойство | Описание |
|----------|----------|
| `width` | Задаёт ширину элемента |
| `min-width` | Минимальная ширина |
| `max-width` | Максимальная ширина |
| `height` | Задаёт высоту элемента |
| `min-height` | Минимальная высота |
| `max-height` | Максимальная высота |
| `box-sizing` | Определяет, включаются ли padding и border в ширину/высоту |
| `aspect-ratio` | Задаёт соотношение сторон |
| `contain-intrinsic-size` | Задаёт «виртуальный» размер для `content-visibility: auto` |
| `contain-intrinsic-block-size` | Размер в блочном направлении |
| `contain-intrinsic-inline-size` | Размер в строчном направлении |

:::info
Все размеры могут принимать значения: `length` (px, em, rem, vw, vh), `percentage`, `auto`, `min-content`, `max-content`, `fit-content`, `clamp()`, `min()`, `max()`.
:::

## Примеры

### Базовые единицы

```css
.fixed {
  width: 300px;
  height: 200px;
}

.relative {
  width: 50%;
  height: 20em;
}

.viewport {
  width: 100vw;
  height: 100vh;
}

.rem-based {
  width: 20rem;
  min-height: 10rem;
}
```

### min/max-width/height

```css
.responsive {
  width: 100%;
  min-width: 320px;
  max-width: 1200px;
  min-height: 100px;
  max-height: 80vh;
}
```

:::tip
Сочетание `width: 100%` с `max-width` — классический приём для адаптивных контейнеров.
:::

### box-sizing

```css
/* По умолчанию — padding и border добавляются к ширине */
.content-box {
  box-sizing: content-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Итоговая ширина = 300 + 20×2 + 5×2 = 350px */
}

/* padding и border включаются в заданную ширину */
.border-box {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Итоговая ширина = 300px (внутренняя область = 250px) */
}
```

:::warning
Рекомендуется глобально задать `box-sizing: border-box`, чтобы избежать проблем с расчётом размеров в макетах.
:::

```css
/* Глобальная установка */
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

### aspect-ratio

```css
.video-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.square {
  width: 200px;
  aspect-ratio: 1;
}

.portrait {
  height: 400px;
  aspect-ratio: 3 / 4;
}
```

:::info
Если заданы и `width`, и `height`, то `aspect-ratio` игнорируется. Если задан только `width` или `height`, то второй размер вычисляется по соотношению сторон.
:::

### contain-intrinsic-size

```css
.lazy-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
  /* Первое значение — ширина, второе — высота */
  /* Элемент занимает 500px по высоте до загрузки контента */
}
```

```css
.lazy-section {
  content-visibility: auto;
  contain-intrinsic-block-size: 500px;
  /* Только для блочного направления */
}
```

:::tip
`contain-intrinsic-size` полезен для элементов с `content-visibility: auto`, чтобы браузер знал, сколько места выделить до полной отрисовки контента.
:::

## Значения функций

```css
.clamp-size {
  width: clamp(320px, 50%, 1200px);
}

.fit-content-box {
  width: fit-content(800px);
  /* Не превышает 800px, но сжимается до содержимого */
}
```

## Ссылки

- [MDN: width](https://developer.mozilla.org/en-US/docs/Web/CSS/width)
- [MDN: height](https://developer.mozilla.org/en-US/docs/Web/CSS/height)
- [MDN: box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)
- [MDN: aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio)
- [MDN: contain-intrinsic-size](https://developer.mozilla.org/en-US/docs/Web/CSS/contain-intrinsic-size)
- [CSS Sizing Module Level 3](https://www.w3.org/TR/css-sizing-3/)
