---
title: "Текст"
description: "Управляют форматированием текста."
outline: deep
---

# Текст

Свойства текста определяют выравнивание, декорацию, трансформацию и другие параметры отображения текста.

## Свойства

### text-align

Задаёт горизонтальное выравнивание текста внутри блочного элемента.

```css
.left {
  text-align: left;
}

.right {
  text-align: right;
}

.center {
  text-align: center;
}

.justify {
  text-align: justify;
}

/* Logical properties */
.start {
  text-align: start;
}

.end {
  text-align: end;
}
```

:::info
Значения `start` и `end` зависят от направления текста (LTR/RTL) и являются предпочтительными для мультиязычных проектов.
:::

### text-decoration

Задаёт декорацию текста: подчёркивание, зачёркивание и т.д.

```css
/* Basic decorations */
.underline {
  text-decoration: underline;
}

.overline {
  text-decoration: overline;
}

.strikethrough {
  text-decoration: line-through;
}

.blink {
  text-decoration: blink;
}

.none {
  text-decoration: none;
}

/* With color */
.colored-underline {
  text-decoration-color: #ff6b6b;
}

/* With style */
.wavy {
  text-decoration-style: wavy;
  text-decoration-color: #4ecdc4;
  text-decoration-line: underline;
}

.dashed-underline {
  text-decoration-style: dashed;
}

.dotted-underline {
  text-decoration-style: dotted;
}

/* With thickness */
.thick-underline {
  text-decoration-thickness: 3px;
  text-decoration-line: underline;
}

.auto-thickness {
  text-decoration-thickness: auto;
  text-decoration-line: underline;
}

/* Shorthand */
.link {
  text-decoration: underline wavy #4ecdc4 2px;
}

.link-clean {
  text-decoration: none;
}
```

### text-indent

Задаёт отступ первой строки текста.

```css
.paragraph {
  text-indent: 2em;
}

.no-indent {
  text-indent: 0;
}

/* Hanging indent */
.hanging-indent {
  text-indent: -2em;
  padding-left: 2em;
}
```

### text-overflow

Определяет, как обрезается текст, который не помещается в контейнер.

```css
/* Requires overflow: hidden + white-space: nowrap */
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.clip {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;
}

/* Multi-line ellipsis (via line-clamp) */
.multi-line-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

:::tip
Для `text-overflow: ellipsis` обязательно установите `overflow: hidden` и `white-space: nowrap`. Без этих свойств многоточие не отобразится.
:::

### text-shadow

Добавляет тень к тексту.

```css
/* h-offset v-offset blur color */
.basic-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* Subtle depth */
.depth {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Glow effect */
.glow {
  text-shadow:
    0 0 10px rgba(255, 255, 255, 0.8),
    0 0 20px rgba(255, 255, 255, 0.5);
}

/* Multiple shadows */
.multi-shadow {
  text-shadow:
    1px 1px 2px rgba(0, 0, 0, 0.2),
    3px 3px 6px rgba(0, 0, 0, 0.1);
}

/* No shadow */
.no-shadow {
  text-shadow: none;
}
```

### text-transform

Задаёт трансформацию регистра текста.

```css
.uppercase {
  text-transform: uppercase;
}

.lowercase {
  text-transform: lowercase;
}

.capitalize {
  text-transform: capitalize;
}

.none {
  text-transform: none;
}

/* Useful for headings */
.section-title {
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* CSS-only small caps */
.small-caps {
  font-variant-caps: small-caps;
  text-transform: lowercase;
}
```

### text-wrap

Определяет, как текст переносится внутри контейнера.

```css
.wrap {
  text-wrap: wrap;
}

.nowrap {
  text-wrap: nowrap;
}

/* Balance line lengths — great for headings */
h1,
h2,
h3 {
  text-wrap: balance;
}

/* Pretty — reduces orphans and widows in body text */
p {
  text-wrap: pretty;
}
```

:::tip
`text-wrap: balance` делает длину строк в заголовках примерно равными, что улучшает визуальную гармонию. `text-wrap: pretty` минимизирует «вдов» и «сирот» в абзацах.
:::

### text-rendering

Управляет алгоритмами рендеринга текста.

```css
.optimize-legibility {
  text-rendering: optimizeLegibility;
}

.optimize-speed {
  text-rendering: optimizeSpeed;
}

.geometric-precision {
  text-rendering: geometricPrecision;
}
```

### hanging-punctuation

Позволяет знакам препинания выступать за край текстового блока.

```css
.article p {
  hanging-punctuation: first last;
}

/* Only opening quotes */
.quote {
  hanging-punctuation: first;
}
```

### text-combine-upright

Комбинирует несколько символов в одну позицию (для CJK текста).

```css
.combined {
  text-combine-upright: all;
}

.digits {
  text-combine-upright: digits 2;
}
```

### text-emphasis

Добавляет акцент (точки, круги) над/под текстом.

```css
/* text-emphasis-style + text-emphasis-color */
.emphasis {
  text-emphasis: filled;
  text-emphasis-color: #ff6b6b;
}

.dot {
  text-emphasis-style: dot;
  text-emphasis-color: currentColor;
}

.circle {
  text-emphasis-style: circle;
}

.double-circle {
  text-emphasis-style: double-circle;
}

.triangle {
  text-emphasis-style: triangle;
}

.semicircle {
  text-emphasis-style: sesame;
}

/* Position */
.above {
  text-emphasis-position: over;
}

.below {
  text-emphasis-position: under;
}

/* Shorthand */
.accent {
  text-emphasis: filled #4ecdc4;
}
```

## Ссылки

- [MDN: text-align](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align)
- [MDN: text-decoration](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration)
- [MDN: text-indent](https://developer.mozilla.org/en-US/docs/Web/CSS/text-indent)
- [MDN: text-overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)
- [MDN: text-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow)
- [MDN: text-transform](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform)
- [MDN: text-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap)
- [MDN: text-rendering](https://developer.mozilla.org/en-US/docs/Web/CSS/text-rendering)
- [MDN: hanging-punctuation](https://developer.mozilla.org/en-US/docs/Web/CSS/hanging-punctuation)
- [MDN: text-combine-upright](https://developer.mozilla.org/en-US/docs/Web/CSS/text-combine-upright)
- [MDN: text-emphasis](https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis)
- [W3C: CSS Text Module Level 4](https://www.w3.org/TR/css-text-4/)
