---
title: "Transform"
description: "Применяет 2D/3D-трансформации к элементу."
outline: deep
---

# Transform

## Связанные свойства

| Свойство | Описание |
| --- | --- |
| [transform](#transform) | Применяет трансформацию к элементу |
| [transform-origin](#transform-origin) | Задаёт точку.origin трансформации |
| [transform-style](#transform-style) | Определяет, как вложенные элементы обрабатываются в 3D |
| [backface-visibility](#backface-visibility) | Управляет видимостью задней грани элемента |

## transform

Свойство `transform` применяет 2D- или 3D-трансформацию к элементу.

:::info
Спецификация: [CSS Transforms Level 2](https://drafts.csswg.org/css-transforms-2/)
:::

```css
.element {
  transform: <transform-function>+;
}
```

### Функции трансформации

#### Перемещение

```css
/* Перемещение по обеим осям */
.element {
  transform: translate(50px, 100px);
}

/* Только по оси X */
.element {
  transform: translateX(50px);
}

/* Только по оси Y */
.element {
  transform: translateY(100px);
}

/* 3D-перемещение (включая ось Z) */
.element {
  transform: translate3d(50px, 100px, 200px);
}

/* Перемещение по оси Z */
.element {
  transform: translateZ(200px);
}
```

#### Масштабирование

```css
/* Масштаб по обеим осям */
.element {
  transform: scale(1.5);
}

/* Масштаб по оси X */
.element {
  transform: scaleX(2);
}

/* Масштаб по оси Y */
.element {
  transform: scaleY(0.5);
}
```

#### Вращение

```css
/* Вращение на 45 градусов */
.element {
  transform: rotate(45deg);
}

/* Вращение вокруг оси X */
.element {
  transform: rotateX(45deg);
}

/* Вращение вокруг оси Y */
.element {
  transform: rotateY(45deg);
}

/* Вращение вокруг оси Z (аналог rotate) */
.element {
  transform: rotateZ(45deg);
}
```

#### Наклон

```css
/* Наклон по обеим осям */
.element {
  transform: skew(10deg, 20deg);
}

/* Наклон только по оси X */
.element {
  transform: skewX(10deg);
}

/* Наклон только по оси Y */
.element {
  transform: skewY(20deg);
}
```

#### Матрицы

```css
/* 2D-матрица: matrix(a, b, c, d, tx, ty) */
.element {
  transform: matrix(1, 0, 0, 1, 50, 100);
}

/* 3D-матрица: matrix3d(16 значений) */
.element {
  transform: matrix3d(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  );
}
```

### Порядок трансформаций

:::warning
Порядок функций важен! Результат зависит от последовательности трансформаций.
:::

```css
/* Сначала поворот, потом перемещение */
.element-a {
  transform: rotate(45deg) translateX(100px);
}

/* Сначала перемещение, потом поворот — другой результат */
.element-b {
  transform: translateX(100px) rotate(45deg);
}
```

### Примеры

#### Перемещение элемента

```css
.button:hover {
  transform: translateX(20px);
}
```

#### Поворот элемента

```css
.icon:hover {
  transform: rotate(180deg);
}
```

#### Масштабирование при наведении

```css
.card:hover {
  transform: scale(1.05);
}
```

#### Наклон

```css
.skewed {
  transform: skewX(-5deg);
}
```

#### Комбинированные трансформации

```css
.complex {
  transform: rotate(15deg) scale(1.2) translateX(30px);
}
```

#### Кастомная точка трансформации

```css
.corner-rotate {
  transform-origin: top left;
  transform: rotate(45deg);
}
```

#### 3D-трансформации с перспективой

```css
.parent {
  perspective: 800px;
}

.child {
  transform: rotateY(45deg);
}
```

#### Переворот карточки (card flip)

```css
.card {
  perspective: 1000px;
}

.card-inner {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}
```

#### Глубина с translateZ

```css
.layer-1 { transform: translateZ(0); }
.layer-2 { transform: translateZ(50px); }
.layer-3 { transform: translateZ(100px); }
```

#### Оптимизация производительности

```css
.animated-element {
  will-change: transform;
  transition: transform 0.3s ease;
}
```

---

## transform-origin

Свойство `transform-origin` задаёт точку, вокруг которой выполняется трансформация.

```css
.element {
  transform-origin: <x> <y> <z>;
}
```

| Значение | По умолчанию |
| --- | --- |
| `x` | `50%` |
| `y` | `50%` |
| `z` | `0` |

```css
/* Центр элемента (по умолчанию) */
.default {
  transform-origin: 50% 50% 0;
}

/* Верхний левый угол */
.top-left {
  transform-origin: 0 0;
}

/* Правый нижний угол */
.bottom-right {
  transform-origin: 100% 100%;
}

/* Ключевые слова */
.keywords {
  transform-origin: center top;
}

/* 3D-точка */
.origin-3d {
  transform-origin: 50% 50% 100px;
}
```

---

## transform-style

Свойство `transform-style` определяет, должны ли дочерние элементы в 3D-пространстве сохранять плоскость или разделяться.

```css
.element {
  transform-style: flat | preserve-3d;
}
```

| Значение | Описание |
| --- | --- |
| `flat` | Дочерние элементы рендерятся в плоскости родителя (по умолчанию) |
| `preserve-3d` | Дочерние элементы сохраняют 3D-позиционирование |

```css
.container {
  transform-style: preserve-3d;
}

.child {
  transform: rotateY(45deg) translateZ(50px);
}
```

:::tip
`transform-style: preserve-3d` не работает, если на элементе задан `overflow: hidden`, `opacity` меньше 1 или `filter`.
:::

---

## backface-visibility

Свойство `backface-visibility` определяет, видна ли задняя грань элемента при повороте.

```css
.element {
  backface-visibility: visible | hidden;
}
```

| Значение | Описание |
| --- | --- |
| `visible` | Задняя грань видна (по умолчанию) |
| `hidden` | Задняя грань скрыта |

```css
.card-front,
.card-back {
  backface-visibility: hidden;
  position: absolute;
}

.card-back {
  transform: rotateY(180deg);
}
```

:::info
Дополнительно: [MDN — transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform), [MDN — transform-origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin), [MDN — transform-style](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style), [MDN — backface-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility)
:::
