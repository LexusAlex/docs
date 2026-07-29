---
title: "Текстовые псевдоэлементы"
description: "Псевдоэлементы для стилизации частей текста."
outline: [2, 3]
---

# Текстовые псевдоэлементы

Текстовые псевдоэлементы позволяют стилизовать отдельные части текстового содержимого элемента.

## Список

| Псевдоэлемент | Описание |
|---|---|
| `::first-line` | Первая строка блочного элемента |
| `::first-letter` | Первая буква блочного элемента |
| `::selection` | Выделенный пользователем текст |
| `::placeholder` | Текст placeholder в полях ввода |
| `::marker` | Маркер списка или нумерация |
| `::spelling-error` | Орфографическая ошибка |
| `::grammar-error` | Грамматическая ошибка |
| `::highlight()` | Пользовательское выделение (Custom Highlight API) |
| `::target-text` | Текст, на который ссылается URL-фрагмент |

## Примеры

### ::first-line

```css
p::first-line {
  font-weight: bold;
  text-transform: uppercase;
}
```

Доступные свойства для `::first-line` ограничены: `font-*`, `color`, `text-decoration`, `text-transform`, `letter-spacing`, `word-spacing`, `line-height`.

### ::first-letter

```css
/* Капитель в начале абзаца */
p::first-letter {
  font-size: 2em;
  font-weight: bold;
  float: left;
  margin-right: 0.1em;
  line-height: 1;
}

/* Декоративная буква */
.lead::first-letter {
  font-family: serif;
  color: #0066cc;
}
```

### ::selection

```css
/* Кастомный цвет выделения */
::selection {
  background: #0066cc;
  color: #fff;
}

/* Выделение только в определённом блоке */
.article ::selection {
  background: #ffeb3b;
  color: #000;
}
```

::: warning
Свойства для `::selection` ограничены: `color`, `background-color`, `text-decoration`, `text-shadow`, `stroke-color`, `fill-color`, `stroke-width`.
:::

### ::placeholder

```css
input::placeholder {
  color: #999;
  font-style: italic;
  opacity: 1; /* Firefox по умолчанию ставит opacity: 0.5 */
}

textarea::placeholder {
  color: #aaa;
  font-size: 0.875rem;
}
```

### ::marker

```css
/* Стилизация маркеров списков */
li::marker {
  color: #0066cc;
  font-weight: bold;
}

/* Замена стандартного маркера */
ul li::marker {
  content: "→ ";
}

/* Нумерация задач */
ol li::marker {
  font-variant-numeric: tabular-nums;
  color: #333;
}
```

### ::spelling-error и ::grammar-error

```css
/* Подсветка орфографических ошибок */
p::spelling-error {
  text-decoration: wavy underline red;
  text-decoration-skip-ink: none;
}

/* Подсветка грамматических ошибок */
p::grammar-error {
  text-decoration: wavy underline green;
  text-decoration-skip-ink: none;
}
```

::: tip
Стили `::spelling-error` и `::grammar-error` определены в спецификации CSS Pseudo-Elements Module 4, но пока **не поддерживаются** в основных браузерах. Отслеживайте статус на [Can I Use](https://caniuse.com/css-matches-pseudo).
:::

### ::target-text

```css
/* Подсветка текста при переходе по ссылке с фрагментом */
::target-text {
  background: #ffeb3b;
  color: #000;
}
```

## Спецификация

- [CSS Pseudo-Elements Module Level 4](https://www.w3.org/TR/css-pseudo-4/)
- [CSS Selectors Level 4 — Pseudo-elements](https://www.w3.org/TR/selectors-4/#pseudo-elements)
