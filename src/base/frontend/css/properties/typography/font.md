---
title: "Шрифты"
description: "Определяют внешний вид текста и шрифтов."
outline: deep
---

# Шрифты

Свойства шрифтов определяют внешний вид текста: семейство, размер, вес, стиль и другие параметры.

## Свойства

### font-family

Задаёт семейство шрифта. Поддерживает generic families и кастомные шрифты с fallback.

```css
/* Generic families */
.serif {
  font-family: serif;
}

.sans-serif {
  font-family: sans-serif;
}

.monospace {
  font-family: monospace;
}

.cursive {
  font-family: cursive;
}

.fantasy {
  font-family: fantasy;
}

/* Custom fonts with fallbacks */
body {
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
}

code {
  font-family: "JetBrains Mono", "Fira Code", "Cascadia Code", monospace;
}

/* System fonts */
.system-ui {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
```

:::info
Системные шрифты (`system-ui`, `-apple-system`, `BlinkMacSystemFont`) позволяют использовать нативный шрифт операционной системы для максимальной производительности.
:::

### font-size

Задаёт размер шрифта. Поддерживает абсолютные и относительные единицы.

```css
/* Absolute units */
h1 {
  font-size: 32px;
}

/* Relative to parent element */
.component {
  font-size: 0.875em;
}

/* Relative to root element */
p {
  font-size: 1rem;
}

/* Percentage */
.small {
  font-size: 80%;
}

/* Viewport units */
.hero-title {
  font-size: 5vw;
}

/* Keyword sizes */
h1 {
  font-size: x-large;
}

/* Responsive with clamp() — preferred modern approach */
h1 {
  font-size: clamp(1.5rem, 2.5vw + 1rem, 3rem);
}

body {
  font-size: clamp(1rem, 0.925rem + 0.25vw, 1.125rem);
}
```

:::tip
Используйте `clamp()` для адаптивной типографики — это позволяет задать минимальное, предпочтительное и максимальное значение размера шрифта без медиа-запросов.
:::

### font-weight

Задаёт толщину шрифта. Значения от `100` до `900` или ключевые слова.

```css
/* Numeric scale */
.thin {
  font-weight: 100;
}

.light {
  font-weight: 300;
}

.regular {
  font-weight: 400; /* normal */
}

.medium {
  font-weight: 500;
}

.semibold {
  font-weight: 600;
}

.bold {
  font-weight: 700; /* bold */
}

.extrabold {
  font-weight: 800;
}

.black {
  font-weight: 900;
}

/* Relative weight */
.compact {
  font-weight: lighter;
}

.emphasized {
  font-weight: bolder;
}
```

### font-style

Задаёт стиль шрифта — обычный, курсив или наклонный.

```css
.normal {
  font-style: normal;
}

.italic {
  font-style: italic;
}

.oblique {
  font-style: oblique;
}

/* Oblique with custom angle */
.steep-oblique {
  font-style: oblique 20deg;
}
```

:::info
`oblique` отличается от `italic`: курсивные glyphs могут отличаться от прямых, тогда как наклонные — это просто наклонённые прямые glyphs. Используйте `italic`, если шрифт содержит отдельный курсивный дизайн.
:::

### font-variant

Задаёт вариант шрифта — например, мелкий шрифт (small-caps).

```css
.small-caps {
  font-variant: small-caps;
}

.all-small-caps {
  font-variant: all-small-caps;
}

/* Numeric settings */
.tabular-nums {
  font-variant-numeric: tabular-nums;
}

.oldstyle-nums {
  font-variant-numeric: oldstyle-nums;
}

.fraction {
  font-variant-numeric: stacked-fractions;
}
```

### font-stretch

Задаёт ширину глифов — от сжатых до расширенных.

```css
.condensed {
  font-stretch: condensed;
}

.normal {
  font-stretch: normal;
}

.expanded {
  font-stretch: expanded;
}

/* Percentage values */
.wide {
  font-stretch: 125%;
}
```

### font-optical-sizing

Управляет оптической подстройкой размера шрифта.

```css
.optical-sizing {
  font-optical-sizing: auto;
}

.no-optical-sizing {
  font-optical-sizing: none;
}
```

### font-variation-settings

Управляет осами переменного шрифта.

```css
.variable {
  font-variation-settings:
    "wght" 400,
    "wdth" 100,
    "slnt" 0,
    "opsz" 14;
}

/* Transition between variations */
.variable-animated {
  font-variation-settings: "wght" 400;
  transition: font-variation-settings 0.3s ease;
}

.variable-animated:hover {
  font-variation-settings: "wght" 700;
}
```

### font-feature-settings

Управляет OpenType features.

```css
.ligatures {
  font-feature-settings: "liga" 1, "calt" 1;
}

.no-ligatures {
  font-feature-settings: "liga" 0;
}

/* Common features */
.stylistic-set {
  font-feature-settings: "ss01" 1;
}

.alternates {
  font-feature-settings: "salt" 1;
}

.fractions {
  font-feature-settings: "frac" 1;
}
```

### font-synthesis

Определяет, может ли браузер синтезировать отсутствующие варианты шрифта.

```css
.no-synthesis {
  font-synthesis: none;
}

.only-weight {
  font-synthesis: weight;
}

.only-style {
  font-synthesis: style;
}

.only-small-caps {
  font-synthesis: small-caps;
}

.full-synthesis {
  font-synthesis: weight style small-caps;
}
```

### font-display

Определяет, как отображается шрифт во время загрузки.

```css
@font-face {
  font-family: "CustomFont";
  src: url("custom-font.woff2") format("woff2");
  font-display: swap;
}

@font-face {
  font-family: "CustomFont";
  src: url("custom-font-bold.woff2") format("woff2");
  font-weight: 700;
  font-display: swap;
}
```

:::tip
`font-display: swap` — рекомендуемое значение: показывает fallback-шрифт мгновенно, затем заменяет на веб-шрифт, когда он загрузится.
:::

### line-height

Задаёт высоту строки (интерлиньяж). Не является свойством шрифта, но часто задаётся через shorthand `font`.

```css
/* Unitless (recommended) — множитель от размера шрифта */
p {
  line-height: 1.5;
}

h1 {
  line-height: 1.2;
}

/* Length */
.tight {
  line-height: 1.5em;
}

/* Percentage */
.relative {
  line-height: 150%;
}

/* Normal — значение по умолчанию браузера */
.default {
  line-height: normal;
}
```

:::tip
Используйте unitless значения (`1.5` вместо `1.5em` или `150%`). Unitless line-height наследуется как число, а не вычисляется от размера шрифта каждого элемента, что даёт предсказуемый результат.
:::

### font (shorthand)

Краткая запись для всех свойств шрифта.

```css
/* Порядок: style variant weight stretch size/line-height family */
body {
  font: normal 400 16px/1.5 "Inter", sans-serif;
}

/* Минимальная запись — только size и family */
p {
  font: 1rem/1.6 "Inter", sans-serif;
}

/* С весом и стилем */
blockquote {
  font: italic 600 1.25rem/1.4 "Georgia", serif;
}

/* Variable font */
.hero {
  font: 500 2rem/1.2 "Inter", sans-serif;
}
```

:::info
В shorthand `font` обязательны только `size` и `family`. Остальные свойства опциональны и принимают значения по умолчанию (`normal`). Порядок значений важен.
:::

## Шрифтовые стеки

```css
/* Modern system fonts */
.ui-text {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
}

/* Serif stack */
.article-body {
  font-family:
    "Noto Serif",
    "Georgia",
    "Cambria",
    "Times New Roman",
    serif;
}

/* Monospace stack */
.code {
  font-family:
    "JetBrains Mono",
    "Fira Code",
    "Cascadia Code",
    "Source Code Pro",
    monospace;
}
```

## Ссылки

- [MDN: font-family](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family)
- [MDN: font-size](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size)
- [MDN: font-weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)
- [MDN: font-style](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style)
- [MDN: font-variant](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant)
- [MDN: font-stretch](https://developer.mozilla.org/en-US/docs/Web/CSS/font-stretch)
- [MDN: font-optical-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/font-optical-sizing)
- [MDN: font-variation-settings](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings)
- [MDN: font-feature-settings](https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings)
- [MDN: font-synthesis](https://developer.mozilla.org/en-US/docs/Web/CSS/font-synthesis)
- [MDN: font-display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display)
- [MDN: line-height](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height)
- [MDN: font](https://developer.mozilla.org/en-US/docs/Web/CSS/font)
- [W3C: CSS Fonts Module Level 4](https://www.w3.org/TR/css-fonts-4/)
