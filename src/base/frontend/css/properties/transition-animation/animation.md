---
title: Animation
description: "Управляет анимациями на базе @keyframes — повторением, направлением, заполнением и воспроизведением."
outline: deep
---

# Animation

Управляет анимациями на базе @keyframes — повторением, направлением, заполнением и воспроизведением.

::: info
Спецификация: [CSS Animations Level 2](https://drafts.csswg.org/css-animations-2/)
:::

## Свойства

| Свойство | Описание |
|---|---|
| `animation` | Шorthand-свойство для всех параметров анимации |
| `animation-name` | Имя анимации (ссылка на `@keyframes`) |
| `animation-duration` | Длительность одного цикла |
| `animation-timing-function` | Функция ускорения |
| `animation-delay` | Задержка перед началом |
| `animation-iteration-count` | Количество повторений |
| `animation-direction` | Направление воспроизведения |
| `animation-fill-mode` | Состояние элемента до и после анимации |
| `animation-play-state` | Воспроизведение или пауза |

## Shorthand

```css
animation: [name] [duration] [timing-function] [delay] [iteration-count] [direction] [fill-mode] [play-state];
```

```css
/* Базовая анимация */
animation: fadeIn 0.3s ease;

/* Бесконечная анимация с задержкой */
animation: spin 1s linear infinite;

/* Полная запись */
animation: pulse 2s ease-in-out 0.5s infinite alternate both running;
```

## animation-name

Имя анимации, определённой через `@keyframes`.

```css
animation-name: fadeIn;
animation-name: slideInLeft, pulse; /* несколько анимаций */
animation-name: none; /* отключить анимацию */
```

## animation-duration

Длительность одного цикла анимации.

```css
animation-duration: 0.3s;
animation-duration: 1500ms;
animation-duration: 0s; /* анимация не воспроизводится */
```

## animation-timing-function

Функция ускорения для всей анимации или отдельных ключевых кадров.

```css
animation-timing-function: ease;
animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
```

## animation-delay

Задержка перед началом анимации.

```css
animation-delay: 0s;
animation-delay: 0.5s;
animation-delay: -1s; /* начинает с середины анимации */
```

## animation-iteration-count

```css
animation-iteration-count: 1;      /* один раз (по умолчанию) */
animation-iteration-count: 3;      /* три раза */
animation-iteration-count: infinite; /* бесконечно */
```

## animation-direction

```css
animation-direction: normal;          /* от 0% к 100% (по умолчанию) */
animation-direction: reverse;         /* от 100% к 0% */
animation-direction: alternate;       /* чётные — normal, нечётные — reverse */
animation-direction: alternate-reverse; /* чётные — reverse, нечётные — normal */
```

::: tip
`alternate` создаёт плавное «дыхание» — анимация возвращается к началу тем же путём.
:::

## animation-fill-mode

Определяет состояние элемента до начала и после завершения анимации.

```css
animation-fill-mode: none;      /* элемент возвращается в исходное состояние */
animation-fill-mode: forwards;  /* остаётся в конечном состоянии */
animation-fill-mode: backwards; /* принимает начальное состояние до старта */
animation-fill-mode: both;      /* forwards + backwards */
```

::: warning
Без `animation-fill-mode: forwards` элемент вернётся в исходное состояние после завершения анимации.
:::

## animation-play-state

```css
animation-play-state: running; /* воспроизводится (по умолчанию) */
animation-play-state: paused;  /* на паузе */
```

```css
.animation-container:hover .animated-element {
  animation-play-state: paused;
}
```

## Несколько анимаций

```css
.element {
  animation:
    fadeIn 0.3s ease forwards,
    slideUp 0.5s ease-out 0.1s forwards,
    pulse 2s ease-in-out 0.5s infinite;
}
```

## Примеры

### Базовая анимация

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: fadeIn 0.5s ease forwards;
}
```

### Бесконечные анимации

**Спиннер:**

```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e0e0e0;
  border-top-color: #2196f3;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
```

**Пульс:**

```css
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}
```

### Направление alternate

```css
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.breathe {
  animation: breathe 3s ease-in-out infinite alternate;
}
```

### Fill-mode: forwards

```css
@keyframes slideIn {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.message {
  animation: slideIn 0.5s ease forwards;
  /* элемент останется в конечном состоянии */
}
```

### Пауза анимации

```css
@keyframes progress {
  from { width: 0%; }
  to { width: 100%; }
}

.progress-bar {
  animation: progress 3s linear forwards;
}

.progress-bar.paused {
  animation-play-state: paused;
}
```

### Несколько анимаций на элементе

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); }
  to { transform: translateY(0); }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px rgba(33, 150, 243, 0.3); }
  50% { box-shadow: 0 0 20px rgba(33, 150, 243, 0.6); }
}

.card {
  animation:
    fadeIn 0.3s ease forwards,
    slideUp 0.4s ease-out 0.1s forwards,
    glow 2s ease-in-out 0.5s infinite;
}
```

### Советы по производительности

Анимируйте только `transform` и `opacity` — это не вызывает перерисовку (repaint) и композицию (composite).

```css
/* ✅ Быстро — композитные свойства */
.good {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ❌ Медленно — вызывает repaint */
.bad {
  animation: changeBackground 0.3s ease;
}

@keyframes changeBackground {
  from { background-color: red; width: 100px; }
  to { background-color: blue; width: 200px; }
}
```

::: tip
Используйте `will-change: transform, opacity` для предупреждения браузера о предстоящей анимации.
:::

## Ссылки

- [MDN: animation](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
- [MDN: animation-name](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name)
- [MDN: animation-duration](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration)
- [MDN: animation-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function)
- [MDN: animation-delay](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay)
- [MDN: animation-iteration-count](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count)
- [MDN: animation-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction)
- [MDN: animation-fill-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode)
- [MDN: animation-play-state](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state)
- [CSS Animations Level 2](https://drafts.csswg.org/css-animations-2/)
