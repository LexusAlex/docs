---
title: Функции цвета
description: Функции определения цвета в CSS
outline: deep
---

# Функции цвета

Функции определения цвета в CSS.

## Основные форматы

```css
/* Ключевые слова */
.color {
  color: red;
  background-color: transparent;
  border-color: currentColor;
}

/* Современный синтаксис (без запятых) */
.color-rgb {
  color: rgb(255 128 0);
  background: rgb(255 128 0 / 0.5);
}

/* Старый синтаксис (с запятыми, устаревший) */
.color-rgb-legacy {
  color: rgb(255, 128, 0);
  background: rgba(255, 128, 0, 0.5);
}

/* HSL */
.color-hsl {
  color: hsl(30 100% 50%);
  background: hsl(30 100% 50% / 0.3);
}
```

:::info
Современный синтаксис `rgb(255 128 0 / 0.5)` без запятых рекомендуется CSS Color Level 4. Старый формат с запятями `rgb(255, 128, 0, 0.5)` по-прежнему поддерживается.
:::

## oklch() — воспринимаемо равномерные цвета

```css
/* oklch(lightness chroma hue) */
.card {
  --primary: oklch(0.7 0.15 250);
  color: var(--primary);
}

/* Масштабирование яркости для генерации оттенков */
:root {
  --blue-50: oklch(0.97 0.02 250);
  --blue-100: oklch(0.93 0.04 250);
  --blue-200: oklch(0.87 0.08 250);
  --blue-300: oklch(0.78 0.12 250);
  --blue-400: oklch(0.68 0.16 250);
  --blue-500: oklch(0.55 0.18 250);
  --blue-600: oklch(0.45 0.16 250);
  --blue-700: oklch(0.38 0.14 250);
  --blue-800: oklch(0.30 0.12 250);
  --blue-900: oklch(0.22 0.10 250);
}
```

:::tip
oklch() создаёт визуально равномерные оттенки при изменении только одного параметра (lightness), что невозможно в HSL.
:::

## oklab() — манипуляция цветами

```css
/* oklab(lightness a b) */
.element {
  --base: oklab(0.6 -0.1 0.1);
  color: oklab(0.8 -0.1 0.1); /* Осветление */
  border-color: oklab(0.6 -0.2 0.1); /* Насыщенность */
}
```

## color() — широкий цветовой охват

```css
/* display-p3, srgb, a98-rgb, prophoto-rgb, rec2020 */
.wide-gamut {
  color: color(display-p3 1 0.5 0);
  background: color(display-p3 0.2 0.8 0.3 / 0.9);
}

/* Fallback для браузеров без поддержки */
.supported {
  color: color(display-p3 1 0.5 0);
}

.unsupported {
  color: rgb(255 128 0); /* Fallback */
}
```

:::info
`display-p3` охватывает ~50% видимого спектра, в то время как `srgb` — только ~33%. Используйте `@supports` для проверки поддержки.
:::

## color-mix() — смешивание цветов

```css
/* color-mix(in <colorspace>, <color1> <percentage>, <color2> <percentage>) */
.button {
  background: color-mix(in oklch, var(--primary) 70%, black);
  border: 2px solid color-mix(in srgb, blue 50%, red);
}

/* Автоматическое создание оттенков */
:root {
  --primary-100: color-mix(in oklch, var(--primary) 90%, white);
  --primary-200: color-mix(in oklch, var(--primary) 75%, white);
  --primary-300: color-mix(in oklch, var(--primary) 60%, white);
  --primary-600: color-mix(in oklch, var(--primary) 80%, black);
  --primary-700: color-mix(in oklch, var(--primary) 65%, black);
}
```

## Контраст и доступность (WCAG)

```css
/* Минимальный контраст 4.5:1 для текста (WCAG AA) */
.text {
  color: #1a1a1a; /* Контраст ~16:1 на белом */
  background: #ffffff;
}

/* Недостаточный контраст — ошибка */
.bad-contrast {
  color: #999999; /* Контраст ~2.8:1 на белом */
  background: #ffffff;
}

/* Использование color-mix для динамического контраста */
.dynamic-text {
  --bg: var(--surface);
  color: oklch(from var(--bg) l c h);
}
```

:::tip
Используйте `color-mix()` для автоматического создания цветов с нужным контрастом. Инструменты вроде WebAIM Contrast Checker помогают проверить соответствия WCAG.
:::

## Ссылки

- [MDN: CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)
- [MDN: oklch()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch)
- [MDN: oklab()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklab)
- [MDN: color()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color)
- [MDN: color-mix()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix)
- [W3C: CSS Color Level 4](https://www.w3.org/TR/css-color-4/)
