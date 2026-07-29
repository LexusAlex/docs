---
title: "Межбуквенный и межсловный интервал"
description: "Управляет расстоянием между буквами и словами."
outline: deep
---

# Межбуквенный и межсловный интервал

Свойства `letter-spacing` и `word-spacing` управляют расстоянием между символами и словами текста.

## Свойства

### letter-spacing

Задаёт расстояние между символами (кирнинг).

```css
/* Default */
.normal {
  letter-spacing: normal;
}

/* Positive spacing — разреженный текст */
.spaced {
  letter-spacing: 0.05em;
}

/* Negative spacing — плотный текст */
.compact {
  letter-spacing: -0.02em;
}

/* Absolute units */
.tight {
  letter-spacing: -0.5px;
}

.wide {
  letter-spacing: 2px;
}
```

:::tip
Используйте `em` вместо `px` для `letter-spacing` — так значение будет масштабироваться пропорционально размеру шрифта.
:::

### word-spacing

Задаёт расстояние между словами.

```css
/* Default */
.normal {
  word-spacing: normal;
}

/* Extra space between words */
.spacious {
  word-spacing: 0.25em;
}

/* Reduced space */
.compact {
  word-spacing: -0.05em;
}

/* Absolute units */
.wide-words {
  word-spacing: 4px;
}
```

## Примеры использования

### Заглавные буквы в верхнем регистре

```css
.section-label {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
}
```

### Оптимизация для justify-текста

```css
.article-body {
  text-align: justify;
  word-spacing: 0.05em;
}
```

### Плотный текст

```css
.data-table {
  font-size: 0.875rem;
  letter-spacing: -0.01em;
}
```

### Визуальный баланс заголовков

```css
h1 {
  font-size: 3rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
```

:::info
Отрицательный `letter-spacing` уменьшает расстояние между буквами. Это часто используется в крупных заголовках для создания более плотного, «графического» вида.
:::

## Ссылки

- [MDN: letter-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing)
- [MDN: word-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing)
- [W3C: CSS Text Module Level 4](https://www.w3.org/TR/css-text-4/)
