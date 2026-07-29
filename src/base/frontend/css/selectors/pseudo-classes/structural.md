---
title: "Структурные псевдоклассы"
description: "Псевдоклассы, определяющие положение элемента в DOM-дереве."
outline: [2, 3]
---

# Структурные псевдоклассы

Структурные псевдоклассы позволяют выбирать элементы на основе их положения в DOM-дереве — порядка, типа, наличия потомков и т. д.

## Простые структурные

| Псевдокласс | Описание |
|---|---|
| `:root` | Корневой элемент документа (`<html>`) |
| `:first-child` | Первый дочерний элемент родителя |
| `:last-child` | Последний дочерний элемент родителя |
| `:first-of-type` | Первый элемент данного типа среди siblings |
| `:last-of-type` | Последний элемент данного типа среди siblings |
| `:only-child` | Единственный дочерний элемент родителя |
| `:only-of-type` | Единственный элемент данного типа среди siblings |
| `:empty` | Элемент без дочерних узлов (текст, комментарии, пробелы) |

## Функциональные псевдоклассы

| Псевдокласс | Описание |
|---|---|
| `:nth-child(An+B)` | Элемент является n-м дочерним по формуле |
| `:nth-last-child(An+B)` | То же, но считает с конца |
| `:nth-of-type(An+B)` | n-й элемент данного типа |
| `:nth-last-of-type(An+B)` | То же, но считает с конца |
| `:not(S)` | Элемент НЕ соответствует селектору `S` |
| `:is(S1, S2, ...)` | Элемент соответствует одному из селекторов (специфичность = самый специфичный из аргументов) |
| `:where(S1, S2, ...)` | Как `:is()`, но специфичность всегда `0-0-0` |
| `:has(> S)` | Элемент содержит потомка, соответствующего `S` |
| `:scope` | Элемент, являющийся scope (обычно `:root`) |

## Примеры

### :root для CSS-переменных

```css
:root {
  --color-primary: #0066cc;
  --color-text: #333;
  --spacing-unit: 8px;
}

.card {
  color: var(--color-text);
  padding: calc(var(--spacing-unit) * 2);
}
```

### :nth-child()

```css
/* Чётные строки таблицы */
tr:nth-child(even) {
  background: #f5f5f5;
}

/* Нечётные строки */
tr:nth-child(odd) {
  background: #fff;
}

/* Каждый третий элемент */
li:nth-child(3n) {
  border-bottom: 1px solid #eee;
}

/* Первые 5 элементов */
li:nth-child(-n+5) {
  font-weight: bold;
}
```

### :nth-of-type()

```css
/* Первый абзац в секции */
article p:first-of-type {
  font-size: 1.125rem;
  font-weight: 600;
}

/* Каждое второе изображение */
img:nth-of-type(even) {
  float: right;
  margin-left: 1rem;
}
```

### :not()

```css
/* Все ссылки, кроме внешних */
a:not([href^="http"]) {
  color: inherit;
}

/* Все элементы, кроме последнего */
li:not(:last-child) {
  border-bottom: 1px solid #eee;
}
```

### :is() и :where()

```css
/* :is() — специфичность = самый специфичный аргумент (0-1-0) */
:is(h1, h2, h3, h4, h5, h6) {
  line-height: 1.2;
}

/* :where() — специфичность всегда 0-0-0 */
:where(h1, h2, h3, h4, h5, h6) {
  margin: 0;
}
```

### :has() — «родительский селектор»

```css
/* Карточка с изображением получает другой layout */
.card:has(img) {
  display: grid;
  grid-template-columns: 200px 1fr;
}

/* Форма с ошибкой */
.form:has(.error) {
  border-color: red;
}

/* Секция с заголовком h2 */
section:has(> h2) {
  padding-top: 2rem;
}
```

### :empty

```css
/* Скрыть пустые абзацы */
p:empty {
  display: none;
}

/* Плейсхолдер для пустых контейнеров */
.box:empty::before {
  content: "Пусто";
  color: #999;
}
```

### :scope

```css
/* В контексте :scope — текущий scope элемент */
:scope > .child {
  /* стиль */
}
```

## Специфичность

- `:not()` — специфичность берётся из аргумента
- `:is()` — специфичность = самый специфичный из аргументов
- `:where()` — специфичность всегда `0-0-0`
- `:has()` — специфичность берётся из аргумента
- Остальные структурные — `0-1-0`

::: tip
`:where()` идеально подходит для сброса стилей (reset), потому что он не увеличивает специфичность и легко переопределяется.
:::

## Спецификация

- [CSS Selectors Level 4 — Structural pseudo-classes](https://www.w3.org/TR/selectors-4/#structural-pseudos)
- [CSS Selectors Level 4 — :is() pseudo-class](https://www.w3.org/TR/selectors-4/#matches)
- [CSS Selectors Level 4 — :has() pseudo-class](https://www.w3.org/TR/selectors-4/#relational)
