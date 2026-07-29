---
title: "Медиа-запросы и условия"
description: "@media, @supports, @layer и другие условные конструкции CSS."
outline: deep
---

# Медиа-запросы и условия

CSS предоставляет условные конструкции для применения стилей в зависимости от характеристик устройства, поддержки браузером функций и других условий.

## @media

Применяет стили в зависимости от характеристик устройства.

```css
/* Базовый медиа-запрос */
@media (max-width: 768px) {
  .sidebar { display: none; }
}
```

### Типы носителей

| Тип | Описание |
|---|---|
| `screen` | Экранные устройства |
| `print` | Печать |
| `all` | Все устройства (по умолчанию) |

```css
/* Только для печати */
@media print {
  .no-print { display: none; }
  body { font-size: 12pt; }
}
```

### Размерные фичи

```css
/* Минимальная ширина (mobile-first) */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }

/* Максимальная ширина (desktop-first) */
@media (max-width: 1023px) { }

/* Высота */
@media (min-height: 600px) { }

/* Соотношение сторон */
@media (min-aspect-ratio: 16/9) { }

/* Ориентация */
@media (orientation: landscape) { }
@media (orientation: portrait) { }
```

### Условия пользователя

```css
/* Предпочтение тёмной темы */
@media (prefers-color-scheme: dark) { }

/* Предпочтение уменьшения анимации */
@media (prefers-reduced-motion: reduce) { }

/* Высокий контраст */
@media (prefers-contrast: more) { }

/* Без данных (Data Saver) */
@media (prefers-reduced-data: reduce) { }

/* Светлый пользовательский интерфейс */
@media (prefers-reduced-transparency: reduce) { }
```

### Логические операторы

```css
/* AND — оба условия */
@media (min-width: 768px) and (orientation: landscape) { }

/* OR — любое из условий */
@media (min-width: 768px), (orientation: landscape) { }

/* NOT — отрицание */
@media not print { }

/* Вложенность (уровень 4) */
@media (min-width: 768px) {
  @media (orientation: landscape) { }
}
```

### Динамический диапазон (Level 5)

```css
/* Яркость экрана */
@media (dynamic-range: high) { }

/* Цветовой охват */
@media (color-gamut: srgb) { }
@media (color-gamut: p3) { }
@media (color-gamut: rec2020) { }
```

## @supports

Проверяет поддержку CSS-функций и свойств браузером.

```css
/* Проверка поддержки */
@supports (display: grid) {
  .container { display: grid; }
}

/* С отрицанием */
@supports not (display: grid) {
  .container { display: flex; }
}

/* С AND/OR */
@supports (display: grid) and (gap: 1rem) {
  .grid { display: grid; gap: 1rem; }
}

@supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
  .modal { backdrop-filter: blur(10px); }
}
```

### Практические примеры

```css
/* Progressive Enhancement */
.card {
  /* Fallback */
  background: rgba(0, 0, 0, 0.5);
  /* Если поддерживается backdrop-filter */
  @supports (backdrop-filter: blur(10px)) {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
  }
}

/* Container Queries */
@supports (container-type: inline-size) {
  .card { container-type: inline-size; }
}

/* CSS Nesting */
@supports (selector(&)) {
  .card {
    &__title { font-weight: bold; }
    &:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); }
  }
}
```

## @layer

(Подробно описан в разделе [Каскад и наследование](../cascade/))

```css
@layer base, components, utilities;

@layer base { /* ... */ }
@layer components { /* ... */ }
@layer utilities { /* ... */ }
```

## @scope

Ограничивает область действия селектора определённым поддеревом DOM.

```css
/* Стили только внутри .card, не затрагивая другие блоки */
@scope (.card) {
  p { line-height: 1.6; }
  img { border-radius: 8px; }
}

/* С областью видимости от-до */
@scope (.card) to (.card__footer) {
  /* Применяется ко всем внутри .card, кроме .card__footer */
}
```

## @starting-style

Определяет начальные стили для элементов, которые только добавляются в DOM или переходят из `display: none`.

```css
/* Анимация появления */
.dialog {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.3s, transform 0.3s;
}

@starting-style {
  .dialog {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

::: info
`@starting-style` позволяет анимировать элементы при первом рендеринге без использования JavaScript. Поддерживается в Chromium 117+.
:::

## Практический пример: адаптивный дизайн

```css
/* Mobile-first подход */
.container {
  padding: 1rem;
}

@media (min-width: 640px) {
  .container { padding: 1.5rem; }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
}

/* Тёмная тема */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --text: #f0f0f0;
  }
}

/* Без анимаций */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Ссылки

- [MDN: @media](https://developer.mozilla.org/en-US/docs/Web/CSS/@media)
- [MDN: @supports](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports)
- [MDN: @scope](https://developer.mozilla.org/en-US/docs/Web/CSS/@scope)
- [MDN: @starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)
- [MDN: @layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
- [CSS Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/)
- [CSS Conditional Rules Level 3](https://www.w3.org/TR/css-conditional-3/)
