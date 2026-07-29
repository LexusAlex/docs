---
title: "Селектор класса"
description: "Выбирает элементы по значению атрибута class."
outline: [2, 3]
---

# Селектор класса

Селектор класса выбирает все элементы, у которых атрибут `class` содержит указанное имя. Обозначается точкой `.` перед именем.

## Синтаксис

```css
.btn {
  padding: 0.5em 1em;
  border: none;
  cursor: pointer;
}
```

## Примеры

### Одиночный класс

```html
<button class="btn">Отправить</button>
```

```css
.btn {
  background: #0066cc;
  color: #fff;
  border-radius: 4px;
}
```

### Несколько классов на элементе

```html
<button class="btn btn--primary btn--large">Отправить</button>
```

```css
.btn {
  padding: 0.5em 1em;
}

.btn--primary {
  background: #0066cc;
  color: #fff;
}

.btn--large {
  padding: 0.75em 1.5em;
  font-size: 1.125rem;
}
```

### Сцепление селекторов класса

```css
.card.card--featured {
  border: 2px solid gold;
}
```

Этот селектор выберет элементы, у которых есть оба класса одновременно (`class="card card--featured"`).

## Специфичность

Специфичность селектора класса — `0-1-0`. Он важнее, чем селектор типа (`0-0-1`), но слабее селектора ID (`1-0-0`).

```css
/* 0-0-1 */
p { color: black; }

/* 0-1-0 — победит */
.intro { color: blue; }
```

::: tip
Избегайте сцепления классов для повышения специфичности — это усложняет поддержку. Используйте уникальные имена классов или методологии именования (БЭМ).
:::

## Спецификация

- [CSS Selectors Level 4 — Class selector](https://www.w3.org/TR/selectors-4/#class-selectors)
