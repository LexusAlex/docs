---
title: "Генерируемое содержимое"
description: "Псевдоэлементы ::before и ::after для вставки декоративного содержимого."
outline: [2, 3]
---

# Генерируемое содержимое ( ::before, ::after )

Псевдоэлементы `::before` и `::after` создают фантомные дочерние элементы внутри выбранного элемента. Они используются для декоративного содержимого, иконок, разделителей и других CSS-приёмов.

## Синтаксис

```css
element::before {
  content: "...";
}

element::after {
  content: "...";
}
```

::: warning
Свойство `content` обязательно. Без него псевдоэлемент не отображается.
:::

## Примеры

### Иконка перед ссылкой

```css
a[href^="https"]::before {
  content: "🔗 ";
}

a[href$=".pdf"]::before {
  content: "📄 ";
}
```

```html
<a href="https://example.com">Сайт</a>
<a href="file.pdf">Документ</a>
```

### Кавычки для цитат

```css
blockquote::before {
  content: "«";
  font-size: 2em;
  color: #999;
}

blockquote::after {
  content: "»";
  font-size: 2em;
  color: #999;
}
```

### Тултип

```css
.tooltip {
  position: relative;
}

.tooltip::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.25rem 0.5rem;
  background: #333;
  color: #fff;
  font-size: 0.75rem;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.tooltip:hover::after {
  opacity: 1;
}
```

```html
<span class="tooltip" data-tooltip="Подсказка">Наведи</span>
```

### Кастомный чекбокс

```css
.custom-checkbox {
  position: relative;
  padding-left: 1.5rem;
}

.custom-checkbox::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 1rem;
  height: 1rem;
  border: 2px solid #ccc;
  border-radius: 3px;
}

.custom-checkbox.checked::before {
  background: #0066cc;
  border-color: #0066cc;
}

.custom-checkbox.checked::after {
  content: "✓";
  position: absolute;
  left: 0.15rem;
  top: -0.1rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}
```

### Очистка с clearfix

```css
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

### Счётчик

```css
ol {
  counter-reset: item;
}

ol li {
  counter-increment: item;
}

ol li::before {
  content: counter(item) ". ";
  font-weight: bold;
  color: #0066cc;
}
```

### Градиентная полоса

```css
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 102, 204, 0.1) 0%,
    rgba(0, 200, 83, 0.1) 100%
  );
  z-index: -1;
}
```

## Доступные свойства

Псевдоэлементы `::before` и `::after` поддерживают все CSS-свойства, за исключением:
- Свойства для работы с деревом (`display`, `content` и др.)
- Некоторые свойства позиционирования (зависят от `display`)

## Специфичность

Специфичность псевдоэлемента `::before` / `::after` — `0-0-0` (не добавляет веса). Специфичность определяется селектором, к которому он присоединён.

```css
/* Специфичность = 0-1-0 */
.card::before {
  content: "";
}
```

## Спецификация

- [CSS Pseudo-Elements Module 4 — Generating Content Pseudo-elements](https://www.w3.org/TR/css-pseudo-4/#generated)
