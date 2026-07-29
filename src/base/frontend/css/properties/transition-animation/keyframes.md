---
title: "@keyframes"
description: Определяет промежуточные кадры анимации — начальное, конечное и промежуточные состояния.
outline: deep
---

# @keyframes

Определяет промежуточные кадры анимации — начальное, конечное и промежуточные состояния.

::: info
Спецификация: [CSS Animations Level 2](https://drafts.csswg.org/css-animations-2/)
:::

## Синтаксис

```css
@keyframes name {
  from { /* начальное состояние */ }
  to { /* конечное состояние */ }
}
```

```css
@keyframes name {
  0% { /* начальное состояние */ }
  100% { /* конечное состояние */ }
}
```

## Процентные ключевые кадры

Используйте проценты от `0%` до `100%` для определения промежуточных состояний:

```css
@keyframes slide {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0); }
  100% { transform: translateX(100%); }
}
```

::: tip
`0%` эквивалентно `from`, а `100%` эквивалентно `to`.
:::

## Ключевые слова from/to

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

## Примеры

### Появление и исчезновение

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

.fade-in {
  animation: fadeIn 0.5s ease forwards;
}
```

### Скольжение слева

```css
@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in {
  animation: slideInLeft 0.5s ease-out forwards;
}
```

### Эффект прыжка

```css
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translateY(0);
  }
  40%, 43% {
    transform: translateY(-30px);
  }
  70% {
    transform: translateY(-15px);
  }
  90% {
    transform: translateY(-4px);
  }
}

.bounce {
  animation: bounce 1s ease infinite;
}
```

### Вращение

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spinReverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}

.spinner-reverse {
  animation: spinReverse 1s linear infinite;
}
```

### Сложная многоэтапная анимация

```css
@keyframes complexAnimation {
  0% {
    transform: scale(0.5) rotate(0deg);
    background-color: #2196f3;
    border-radius: 0;
  }
  25% {
    transform: scale(1.1) rotate(90deg);
    background-color: #4caf50;
    border-radius: 25%;
  }
  50% {
    transform: scale(0.9) rotate(180deg);
    background-color: #ff9800;
    border-radius: 50%;
  }
  75% {
    transform: scale(1.05) rotate(270deg);
    background-color: #e91e63;
    border-radius: 25%;
  }
  100% {
    transform: scale(1) rotate(360deg);
    background-color: #2196f3;
    border-radius: 0;
  }
}

.complex {
  animation: complexAnimation 4s ease-in-out infinite;
}
```

### CSS-переменные в ключевых кадрах

```css
@keyframes moveToVar {
  from {
    transform: translateX(var(--start-x, 0));
    opacity: var(--start-opacity, 0);
  }
  to {
    transform: translateX(var(--end-x, 100px));
    opacity: var(--end-opacity, 1);
  }
}

.animated {
  --start-x: -50px;
  --end-x: 50px;
  animation: moveToVar 0.5s ease forwards;
}
```

::: info
CSS-переменные в `@keyframes` позволяют создавать параметризованные анимации, переиспользуемые с разными начальными и конечными значениями.
:::

## Ссылки

- [MDN: @keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)
- [CSS Animations Level 2](https://drafts.csswg.org/css-animations-2/)
