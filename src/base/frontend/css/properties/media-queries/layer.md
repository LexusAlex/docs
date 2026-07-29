---
title: "@layer"
description: Управление порядком каскада через именованные слои.
outline: deep
---

# @layer (Cascade Layers)

`@layer` позволяет явно разделять CSS-стили на слои с определённым приоритетом. Решает проблему «specificity wars».

## Объявление слоёв

```css
/* Порядок объявления = порядок приоритета (последний = самый высокий) */
@layer base, components, utilities;
```

## Определение стилей слоёв

```css
@layer base {
  * { margin: 0; box-sizing: border-box; }
  p { line-height: 1.6; }
}

@layer components {
  .card { border: 1px solid #eee; padding: 1rem; }
  .btn { padding: 0.5em 1em; border: none; cursor: pointer; }
}

@layer utilities {
  .hidden { display: none; }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; }
  .text-center { text-align: center; }
}
```

## Порядок приоритета

```css
@layer low, high;

@layer low {
  p { color: blue; } /* перекрыто high */
}

@layer high {
  p { color: red; } /* побеждает low */
}

/* Вне слоя — перекрывает ВСЕ слои */
p { color: green; } /* побеждает и low, и high */
```

## Неименованные слои

```css
/* Анонимный слой */
@layer {
  .helper { display: flex; }
}

/* Именованный слой */
@layer base {
  p { margin: 0; }
}
```

::: info
Неименованные слои ведут себя как именованные, но к ним нельзя обратиться позже через `@layer name { }`.
:::

## @layer с @import

```css
/* Импорт в определённый слой */
@import url("reset.css") layer(base);
@import url("components.css") layer(components);
@import url("utilities.css") layer(utilities);

/* Импорт без слоя — создаёт неименованный слой */
@import url("third-party.css");
```

## Финальные слои

```css
/* Финальный слой — стили после него не могут быть в другом слое */
@layer base {
  p { color: black; }
}

/* Всё после — вне слоёв */
.special { color: red; }
```

## Взаимодействие с !important

```css
@layer base {
  .text { color: black; }
}

/* !important в более раннем слое перекрывает поздний */
@layer base {
  .text { color: red !important; } /* побеждает components */
}

@layer components {
  .text { color: blue; }
}
```

::: warning
`!important` в слоях ведёт себя **обратно** — `!important` в `base` перекрывает `components`. Это контринтуитивно, но логично: `!important` инвертирует порядок каскада.
:::

## Не-слоёвые библиотеки

```css
/* Стили без @layer имеют наивысший приоритет среди normal */
@import url("bootstrap.css"); /* без слоя */

@layer base, components;

@layer base {
  /* bootstrap.css перекроет это */
  p { margin: 0; }
}
```

## Практический пример

```css
/* 1. Объявляем порядок слоёв */
@layer reset, tokens, base, components, utilities;

/* 2. Сброс */
@layer reset {
  *, *::before, *::after {
    margin: 0;
    box-sizing: border-box;
  }
}

/* 3. Дизайн-токены */
@layer tokens {
  :root {
    --color-primary: #0066cc;
    --spacing-unit: 8px;
  }
}

/* 4. Базовые стили */
@layer base {
  body { font-family: system-ui, sans-serif; }
  p { line-height: 1.6; }
}

/* 5. Компоненты */
@layer components {
  .btn {
    padding: calc(var(--spacing-unit) * 1) calc(var(--spacing-unit) * 2);
    background: var(--color-primary);
    color: white;
  }
}

/* 6. Утилиты — перекрывают всё */
@layer utilities {
  .mt-4 { margin-top: calc(var(--spacing-unit) * 4); }
  .hidden { display: none; }
}
```

## Ссылки

- [MDN: @layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
- [CSS Cascading and Inheritance Level 5](https://www.w3.org/TR/css-cascade-5/#layering)
- [Web.dev: Cascade Layers](https://web.dev/articles/cascade-layers)
