---
title: Функции ускорения
description: Функции ускорения (easing) для переходов и анимаций — управление скоростью изменения во времени.
outline: deep
---

# Функции ускорения

Функции ускорения определяют, как скорость изменения свойств меняется на протяжении перехода или анимации.

::: info
Спецификация: [CSS Easing Functions Level 2](https://drafts.csswg.org/css-easing-2/)
:::

## Встроенные функции

| Функция | Описание |
|---|---|
| `ease` | Медленное начало, быстрый рост, медленное завершение (по умолчанию) |
| `linear` | Равномерное изменение |
| `ease-in` | Медленное начало, быстрое завершение |
| `ease-out` | Быстрое начало, медленное завершение |
| `ease-in-out` | Медленное начало и завершение |

```css
transition: transform 0.3s ease;
transition: transform 0.3s linear;
transition: transform 0.3s ease-in;
transition: transform 0.3s ease-out;
transition: transform 0.3s ease-in-out;
```

## Сравнение стандартных функций

```css
.ease       { transition: transform 1s ease; }
.linear     { transition: transform 1s linear; }
.ease-in    { transition: transform 1s ease-in; }
.ease-out   { transition: transform 1s ease-out; }
.ease-in-out { transition: transform 1s ease-in-out; }
```

Все элементы перемещаются слева направо, но с разным ускорением.

## cubic-bezier()

Создаёт пользовательскую кривую Безье с двумя контрольными точками.

```css
transition: transform 0.3s cubic-bezier(x1, y1, x2, y2);
```

- `x1`, `y1` — первая контрольная точка
- `x2`, `y2` — вторая контрольная точка
- Значения `x` от `0` до `1`, `y` могут выходить за пределы `0..1`

```css
/* Material Design standard easing */
transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Material Design decelerate */
transition: transform 0.3s cubic-bezier(0, 0, 0.2, 1);

/* Material Design accelerate */
transition: transform 0.3s cubic-bezier(0.4, 0, 1, 1);

/* Пружинный эффект */
transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

::: tip
Используйте [cubic-bezier.com](https://cubic-bezier.com) для визуального создания и тестирования кривых.
:::

## steps()

Создаёт ступенчатую (дискретную) анимацию с фиксированным количеством шагов.

```css
transition: transform 0.5s steps(5, end);
```

Параметры `direction`:

| Значение | Описание |
|---|---|
| `jump-start` | Шаг в начале интервала |
| `jump-end` | Шаг в конце интервала (по умолчанию) |
| `jump-both` | Шаг в начале и конце |
| `jump-none` | Без шагов на границах |
| `start` | То же `jump-start` |
| `end` | То же `jump-end` |

### Эффект печатной машинки

```css
@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}

.typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid;
  animation:
    typewriter 2s steps(20) forwards,
    blink 0.7s step-end infinite;
}

@keyframes blink {
  50% { border-color: transparent; }
}
```

### Переключение между состояниями

```css
@keyframes stepAnimation {
  0% { background-color: red; }
  33% { background-color: green; }
  66% { background-color: blue; }
  100% { background-color: red; }
}

.stepped {
  animation: stepAnimation 3s steps(3, end) infinite;
}
```

## linear() (Level 2)

Позволяет определить пользовательскую кривую с несколькими контрольными точками.

```css
transition: transform 0.5s linear(0, 0.25, 0.5, 0.75, 1);
```

```css
/* Точная копия ease */
transition: transform 0.5s linear(
  0, 0.004, 0.016, 0.035, 0.063, 0.098, 0.141, 0.191,
  0.25, 0.316, 0.391, 0.473, 0.563, 0.66, 0.766, 0.878, 1
);
```

::: info
`linear()` полезен, когда нужно приблизить стандартную кривую или создать кривую с несколькими «plateau» (участками замедления).
:::

## spring() (Level 2)

Создаёт пружинную анимацию на основе физической модели.

```css
transition: transform 0.5s spring(0.5, 80, 10);
```

Параметры:

- `mass` — масса объекта (по умолчанию `1`)
- `stiffness` — жёсткость пружины (по умолчанию `100`)
- `damping` — демпфирование (по умолчанию `10`)

```css
/* Мягкая пружина */
transition: transform 0.5s spring(1, 50, 5);

/* Жёсткая пружина */
transition: transform 0.3s spring(0.8, 200, 12);

/* Слабое демпфирование — пружина «трясётся» */
transition: transform 0.8s spring(1, 100, 3);
```

::: tip
`spring()` автоматически определяет длительность на основе физических параметров, поэтому `animation-duration` может быть опущена.
:::

## Кривые Material Design

```css
/* Standard */
.standard {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Decelerate */
.decelerate {
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

/* Accelerate */
.accelerate {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}
```

## Инструменты

- [cubic-bezier.com](https://cubic-bezier.com) — визуальный редактор кривых
- [easings.net](https://easings.net) — справочник функций ускорения с графиками
- [Material Design Easing](https://m3.material.io/styles/motion/easing-and-duration) — рекомендации Google

## Ссылки

- [MDN: easing](https://developer.mozilla.org/en-US/docs/Web/CSS/easing)
- [MDN: cubic-bezier()](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/cubic-bezier)
- [MDN: steps()](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/steps)
- [MDN: linear()](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/linear)
- [CSS Easing Functions Level 2](https://drafts.csswg.org/css-easing-2/)
