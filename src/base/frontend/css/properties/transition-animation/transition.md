---
title: Transition
description: Определяет плавные переходы между состояниями элементов при изменении свойств.
outline: deep
---

# Transition

Определяет плавные переходы между состояниями элементов при изменении CSS-свойств.

::: info
Спецификация: [CSS Transitions Level 1](https://www.w3.org/TR/css-transitions-1/)
:::

## Свойства

| Свойство | Описание |
|---|---|
| `transition` | Шorthand-свойство для всех параметров перехода |
| `transition-property` | Какие CSS-свойства анимировать |
| `transition-duration` | Длительность перехода |
| `transition-timing-function` | Функция ускорения |
| `transition-delay` | Задержка перед началом перехода |

## Shorthand

```css
transition: [property] [duration] [timing-function] [delay];
```

```css
/* Все свойства, 0.3s, ease, без задержки */
transition: all 0.3s ease;

/* Только opacity и transform */
transition: opacity 0.3s ease, transform 0.5s ease-in-out;

/* С задержкой 0.2s */
transition: opacity 0.3s ease 0.2s;
```

## transition-property

Указывает, какие CSS-свойства будут анимироваться.

```css
/* Все изменяемые свойства */
transition-property: all;

/* Только конкретные свойства */
transition-property: opacity, transform, background-color;

/* Без анимации */
transition-property: none;
```

::: tip
Используйте конкретные свойства вместо `all` для лучшей производительности.
:::

## transition-duration

Длительность перехода в секундах (`s`) или миллисекундах (`ms`).

```css
transition-duration: 0.3s;
transition-duration: 300ms;
transition-duration: 0s; /* мгновенное изменение */
```

## transition-timing-function

Функция ускорения, определяющая скорость изменения во времени.

```css
transition-timing-function: ease;           /* по умолчанию */
transition-timing-function: linear;         /* равномерно */
transition-timing-function: ease-in;        /* медленное начало */
transition-timing-function: ease-out;       /* медленное завершение */
transition-timing-function: ease-in-out;    /* медленное начало и конец */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); /* Material Design */
transition-timing-function: steps(5, end);  /* ступенчатое изменение */
```

## transition-delay

Задержка перед началом перехода.

```css
transition-delay: 0s;     /* без задержки */
transition-delay: 0.2s;   /* задержка 200мс */
transition-delay: -0.3s;  /* отрицательная задержка — переход уже завершён */
```

## Несколько переходов

Укажите несколько переходов через запятую:

```css
.card {
  transition:
    opacity 0.3s ease,
    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s ease 0.1s;
}
```

## Примеры

### Базовый hover-переход

```css
.button {
  background-color: #2196f3;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #1976d2;
}
```

### Переход нескольких свойств

```css
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}
```

### Разные функции ускорения

```css
.ease       { transition: transform 1s ease; }
.linear     { transition: transform 1s linear; }
.ease-in    { transition: transform 1s ease-in; }
.ease-out   { transition: transform 1s ease-out; }
.ease-in-out { transition: transform 1s ease-in-out; }
```

### Переход с задержкой

```css
.menu-item {
  opacity: 0;
  transform: translateX(-20px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.menu-item:nth-child(1) { transition-delay: 0.05s; }
.menu-item:nth-child(2) { transition-delay: 0.1s; }
.menu-item:nth-child(3) { transition-delay: 0.15s; }

.menu:hover .menu-item {
  opacity: 1;
  transform: translateX(0);
}
```

### Переход всех свойств (⚠️ производительность)

```css
/* ❌ Не рекомендуется — анимирует все свойства */
.bad {
  transition: all 0.3s ease;
}

/* ✅ Анимируйте только нужные свойства */
.good {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
```

::: warning
Переход `all` заставляет браузер проверять изменение каждого свойства, что может вызвать ненужные перерисовки.
:::

### will-change для GPU-ускорения

```css
.card {
  will-change: transform, opacity;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
```

::: tip
`will-change` подсказывает браузеру о предстоящем изменении, позволяя оптимизировать рендеринг. Не злоупотребляйте — слишком много `will-change` потребляет память.
:::

### Распространённые паттерны

**Подъём карточки:**

```css
.card {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
```

**Скольжение меню:**

```css
.sidebar {
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.sidebar.open {
  transform: translateX(0);
}
```

**Кнопка-иконка:**

```css
.icon-button {
  position: relative;
}

.icon-button::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  transform: scale(0);
  transition: transform 0.3s ease;
}

.icon-button:hover::after {
  transform: scale(1);
}
```

## Ссылки

- [MDN: transition](https://developer.mozilla.org/en-US/docs/Web/CSS/transition)
- [MDN: transition-property](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property)
- [MDN: transition-duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration)
- [MDN: transition-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)
- [MDN: transition-delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay)
- [CSS Transitions Level 1](https://www.w3.org/TR/css-transitions-1/)
