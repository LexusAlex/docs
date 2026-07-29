---
title: clip-path
description: Создаёт обрезочную область элемента.
outline: deep
---

# clip-path

Свойство `clip-path` создаёт обрезочную область элемента — видимой остаётся только та часть, которая находится внутри заданной фигуры.

## Значения

```css
clip-path: none | circle() | ellipse() | inset() | polygon() | url() | path();
```

## circle() — круглые аватары

```css
.avatar {
  width: 100px;
  height: 100px;
  clip-path: circle(50%);
}
```

:::tip
`circle(50%)` создаёт круг, если ширина и высота элемента совпадают.
:::

## polygon() — пользовательские фигуры

```css
.star {
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
}
```

## inset() — скруглённые контейнеры

```css
.rounded-clip {
  clip-path: inset(10px round 20px);
}

/* Скруглённые углы в процентах */
.percentage-clip {
  clip-path: inset(0 round 12%);
}
```

## Анимация clip-path для раскрытия

```css
.reveal {
  clip-path: inset(0 100% 0 0);
  animation: reveal 1s ease forwards;
}

@keyframes reveal {
  to {
    clip-path: inset(0 0 0 0);
  }
}
```

:::info
Анимация `clip-path` производительна, так как не влияет на компоновку и не вызывает перерисовку соседних элементов.
:::

## shape-outside — обтекание фигурами

Свойство `shape-outside` задаёт форму, которой элемент обтекается.

```css
.float-shape {
  float: left;
  width: 200px;
  height: 200px;
  clip-path: circle(50%);
  shape-outside: circle(50%);
  margin: 20px;
}
```

```html
<div class="float-shape"></div>
<p>Текст обтекает круглый элемент по контуру фигуры...</p>
```

:::info
`shape-outside` работает только с плавающими элементами (`float: left` или `float: right`).
:::

## Переходы между фигурами

```css
.morph {
  clip-path: circle(50%);
  transition: clip-path 0.5s ease;
}

.morph:hover {
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}
```

## Ссылки

- [MDN: clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)
- [MDN: shape-outside](https://developer.mozilla.org/en-US/docs/Web/CSS/shape-outside)
- [CSS Masking Module Level 1](https://www.w3.org/TR/css-masking-1/)
