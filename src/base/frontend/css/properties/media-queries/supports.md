---
title: "@supports"
description: Проверка поддержки CSS-свойств и функций браузером.
outline: deep
---

# @supports

Директива `@supports` проверяет, поддерживает ли браузер указанное CSS-свойство или значение, и применяет стили условно.

## Синтаксис

```css
@supports (свойство: значение) {
  /* стили если поддерживается */
}
```

## Операторы

### AND

```css
@supports (display: grid) and (gap: 1rem) {
  .grid {
    display: grid;
    gap: 1rem;
  }
}
```

### OR

```css
@supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
  .modal {
    backdrop-filter: blur(10px);
  }
}
```

### NOT

```css
@supports not (display: grid) {
  .container {
    display: flex;
  }
}
```

### Комбинация

```css
@supports ((display: grid) and (gap: 1rem)) or (display: flex) {
  .container {
    display: flex;
  }
}
```

## Практические примеры

### Progressive Enhancement

```css
/* Fallback: полупрозрачный фон */
.card {
  background: rgba(0, 0, 0, 0.5);
}

/* Улучшение: backdrop-filter */
@supports (backdrop-filter: blur(10px)) {
  .card {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
  }
}
```

### Container Queries

```css
/* Fallback: фиксированная раскладка */
.card {
  display: flex;
}

/* Улучшение: адаптивная раскладка */
@supports (container-type: inline-size) {
  .card {
    container-type: inline-size;
  }

  @container (min-width: 400px) {
    .card {
      display: grid;
      grid-template-columns: 200px 1fr;
    }
  }
}
```

### CSS Nesting

```css
/* Fallback: плоские селекторы */
.card__title { font-weight: bold; }
.card:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); }

/* Улучшение: вложенность */
@supports (selector(&)) {
  .card {
    &__title { font-weight: bold; }
    &:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); }
  }
}
```

### Cascade Layers

```css
@supports (at-rules(@layer)) {
  @layer base, components, utilities;
}
```

### color-mix()

```css
.button {
  background: #0066cc;
}

@supports (background: color-mix(in srgb, red 50%, blue)) {
  .button {
    background: color-mix(in srgb, var(--primary) 80%, black);
  }
}
```

### @scope

```css
@supports (at-rules(@scope)) {
  @scope (.card) {
    p { line-height: 1.6; }
    img { border-radius: 8px; }
  }
}
```

## Порядок проверки

::: tip
Проверяйте поддержку от базовых свойств к более новым. Если `@supports` не поддерживается (очень старые браузеры), блок внутри него не применяется — это и есть Progressive Enhancement.
:::

```css
/* 1. Базовый fallback */
.container { display: block; }

/* 2. Flexbox если поддерживается */
@supports (display: flex) {
  .container { display: flex; }
}

/* 3. Grid если поддерживается */
@supports (display: grid) {
  .container { display: grid; }
}
```

## Ссылки

- [MDN: @supports](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports)
- [CSS Conditional Rules Level 3](https://www.w3.org/TR/css-conditional-3/)
