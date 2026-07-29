---
title: CSS-переменные
description: Пользовательские свойства (CSS-переменные)
outline: deep
---

# CSS-переменные

Пользовательские свойства (CSS-переменные).

## Синтаксис

```css
/* Объявление */
:root {
  --primary-color: #3498db;
  --spacing-unit: 8px;
  --font-size-base: 16px;
}

/* Использование */
.element {
  color: var(--primary-color);
  padding: var(--spacing-unit) calc(var(--spacing-unit) * 2);
  font-size: var(--font-size-base);
}

/* С фолбэк-значением */
.element-fallback {
  color: var(--undefined-var, red);
}
```

## Темы через :root

```css
:root {
  --bg: #ffffff;
  --text: #1a1a1a;
  --border: #e0e0e0;
  --accent: #3498db;
  --surface: #f5f5f5;
}

/* Тёмная тема */
[data-theme="dark"] {
  --bg: #1a1a1a;
  --text: #f0f0f0;
  --border: #333333;
  --accent: #5dade2;
  --surface: #2d2d2d;
}

body {
  background: var(--bg);
  color: var(--text);
}

.card {
  border: 1px solid var(--border);
  background: var(--surface);
}
```

:::tip
Объявляйте переменные в `:root` для глобальной доступности, или в контейнере для локальной области видимости.
:::

## Фолбэк-значения

```css
/* Базовый фолбэк */
.element {
  color: var(--primary, blue);
}

/* Цепочка фолбэков */
.element {
  color: var(--primary, var(--secondary, blue));
}

/* Фолбэк с вычислением */
.element {
  padding: var(--spacing, calc(16px * 0.5));
}

/* Проверка существования */
.element {
  /* Если --size определена, используем её, иначе 1rem */
  font-size: var(--size, 1rem);
}
```

## @property — типизированные переменные

```css
@property --hue {
  syntax: "<number>";
  inherits: false;
  initial-value: 0;
}

@property --gradient-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

/* Теперь можно анимировать! */
.gradient-box {
  --gradient-angle: 0deg;
  background: oklch(0.7 0.15 var(--hue));
  transition: --gradient-angle 0.5s ease;
}

.gradient-box:hover {
  --gradient-angle: 360deg;
}

/* Анимация градиента */
.animated-gradient {
  animation: rotateGradient 3s linear infinite;
}

@keyframes rotateGradient {
  to {
    --gradient-angle: 360deg;
  }
}
```

:::info
`@property` позволяет указать тип переменной (`<number>`, `<color>`, `<length>`, `<percentage>`, `<angle>` и др.), что делает возможной анимацию и валидацию значений.
:::

## Наследование и область видимости

```css
/* Глобальная переменная */
:root {
  --global: blue;
}

/* Локальная переменная */
.parent {
  --local: red;
  color: var(--local);
}

.child {
  color: var(--local); /* Наследует от родителя */
  color: var(--global); /* Наследует от :root */
}

/* Переопределение в контейнере */
.card {
  --card-padding: 16px;
  padding: var(--card-padding);
}

.card--compact {
  --card-padding: 8px; /* Переопределение */
}

/* Область действия в @media */
:root {
  --columns: 4;
  --gutter: 24px;
}

@media (max-width: 768px) {
  :root {
    --columns: 2;
    --gutter: 16px;
  }
}
```

## Динамические темы с JavaScript

```css
:root {
  --hue: 210;
  --primary: oklch(0.6 0.15 var(--hue));
}
```

```javascript
// Изменение темы
document.documentElement.style.setProperty('--hue', '140');

// Чтение значения
const primary = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary');

// Массовое обновление
const themes = {
  blue: { '--hue': '210' },
  green: { '--hue': '140' },
  purple: { '--hue': '280' },
};

function setTheme(name) {
  const vars = themes[name];
  for (const [key, value] of Object.entries(vars)) {
    document.documentElement.style.setProperty(key, value);
  }
}
```

:::tip
Используйте CSS-переменные для динамических тем — они обновляются мгновенно через `style.setProperty()`, в отличие от переключения классов.
:::

## Адаптивный дизайн

```css
:root {
  /* Типографика */
  --text-xs: clamp(0.7rem, 0.65rem + 0.25vw, 0.75rem);
  --text-sm: clamp(0.8rem, 0.75rem + 0.25vw, 0.875rem);
  --text-base: clamp(0.9rem, 0.85rem + 0.25vw, 1rem);
  --text-lg: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
  --text-xl: clamp(1.15rem, 1rem + 0.75vw, 1.5rem);

  /* Отступы */
  --space-1: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
  --space-2: clamp(0.5rem, 0.4rem + 0.5vw, 1rem);
  --space-3: clamp(1rem, 0.8rem + 1vw, 2rem);

  /* Сетка */
  --container-max: min(1200px, 100% - 2rem);
}

body {
  font-size: var(--text-base);
  line-height: 1.6;
}

.container {
  width: var(--container-max);
  margin-inline: auto;
  padding: var(--space-3);
}
```

## Ссылки

- [MDN: Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [MDN: @property](https://developer.mozilla.org/en-US/docs/Web/CSS/@property)
- [W3C: CSS Custom Properties Level 1](https://www.w3.org/TR/css-variables-1/)
- [W3C: CSS Properties and Values API Level 1](https://www.w3.org/TR/css-properties-values-api-1/)
