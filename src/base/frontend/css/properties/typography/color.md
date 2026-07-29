---
title: "Цвет текста"
description: "Определяет цвет текста элемента."
outline: deep
---

# Цвет текста

Свойство `color` определяет цвет foreground содержимого элемента — в первую очередь текста.

## Свойство

### color

Задаёт цвет текста. Наследуется потомками.

```css
/* Keywords */
.default {
  color: black;
}

.white-text {
  color: white;
}

/* Hex */
.hex {
  color: #333333;
}

.hex-short {
  color: #333;
}

.hex-alpha {
  color: #33333380;
}

/* RGB */
.rgb {
  color: rgb(51, 51, 51);
}

.rgb-alpha {
  color: rgb(51, 51, 51, 0.5);
}

/* HSL */
.hsl {
  color: hsl(0, 0%, 20%);
}

.hsl-alpha {
  color: hsl(0, 0%, 20%, 0.5);
}

/* OKLCH — modern color space */
.oklch {
  color: oklch(0.25 0.01 260);
}

.oklch-alpha {
  color: oklch(0.25 0.01 260 / 0.5);
}

/* Transparent */
.transparent {
  color: transparent;
}

/* currentColor — наследует цвет из родителя или собственный computed color */
.icon {
  color: currentColor;
}
```

:::info
`currentColor` — ключевое слово, которое ссылается на вычисленное значение `color` элемента. Это позволяет использовать цвет текста в других свойствах (например, `border-color`, `fill`) без дублирования значения.
:::

## Наследование

Цвет текста наследуется по умолчанию. Все дочерние элементы получают цвет родителя, если не переопределён.

```css
/* Родитель задаёт цвет */
.parent {
  color: #666;
}

/* Дочерние элементы наследуют */
.parent p,
.parent span,
.parent a {
  /* color: inherit; — неявно */
}

/* Переопределение для конкретного элемента */
.parent .highlight {
  color: #ff6b6b;
}

/* Сброс для ссылок */
.parent a {
  color: inherit;
}
```

## Контраст и доступность

```css
/* Высокий контраст — текст / фон */
.high-contrast {
  color: #000000;
  background-color: #ffffff;
}

/* Средний контраст */
.medium-contrast {
  color: #333333;
  background-color: #f5f5f5;
}

/* Низкий контраст — НЕ рекомендуется */
.low-contrast {
  color: #aaaaaa;
  background-color: #ffffff;
}

/* Цвет для состояний */
.disabled {
  color: #999999;
}

.error {
  color: #d32f2f;
}

.success {
  color: #2e7d32;
}

.warning {
  color: #f57c00;
}
```

:::tip
Следуйте стандартам WCAG: контраст текста должен быть не менее 4.5:1 для обычного текста и 3:1 для крупного текста (18px+ или 14px+ bold). Используйте инструменты вроде Chrome DevTools для проверки контрастности.
:::

### Цветовые схемы

```css
/* Тёмная тема */
[data-theme="dark"] {
  color: #e0e0e0;
  background-color: #121212;
}

/* Светлая тема */
[data-theme="light"] {
  color: #333333;
  background-color: #ffffff;
}

/* Автоматическое переключение */
@media (prefers-color-scheme: dark) {
  .auto-theme {
    color: #e0e0e0;
  }
}

@media (prefers-color-scheme: light) {
  .auto-theme {
    color: #333333;
  }
}
```

### CSS-переменные для цветов

```css
:root {
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #666666;
  --color-text-muted: #999999;
  --color-text-inverse: #ffffff;
}

.body-text {
  color: var(--color-text-primary);
}

.caption {
  color: var(--color-text-secondary);
}

.placeholder {
  color: var(--color-text-muted);
}
```

## Ссылки

- [MDN: color](https://developer.mozilla.org/en-US/docs/Web/CSS/color)
- [MDN: currentColor](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword)
- [MDN: OKLCH](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch)
- [WCAG 2.1: Contrast (Minimum)](https://www.w3.org/TR/WCAG21/#contrast-minimum)
- [W3C: CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/)
