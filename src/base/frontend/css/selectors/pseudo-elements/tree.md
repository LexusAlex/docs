---
title: "Псевдоэлемент дерева"
description: "Псевдоэлементы для стилизации внутренней структуры элементов."
outline: [2, 3]
---

# Псевдоэлементы дерева

Псевдоэлементы дерева позволяют стилизовать внутренние части элементов, которые не являются простым текстовым содержимым — внутренности `<details>`, маркеры списков и т. д.

## Список

| Псевдоэлемент | Описание |
|---|---|
| `::details-content` | Внутренности элемента `<details>` (содержимое, раскрываемое при открытии) |
| `::marker` | Маркер списка (описан в [текстовых псевдоэлементах](text.md#marker)) |

## ::details-content

Псевдоэлемент `::details-content` позволяет стилизовать содержимое элемента `<details>`, которое скрывается/показывается при переключении состояния.

### Синтаксис

```css
details::details-content {
  /* стили содержимого */
}
```

### Примеры

#### Базовая стилизация

```css
details::details-content {
  padding: 1rem;
  background: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 0 0 4px 4px;
}
```

```html
<details>
  <summary>Подробнее</summary>
  <p>Содержимое, которое раскрывается.</p>
</details>
```

#### Анимация раскрытия

```css
details::details-content {
  padding: 1rem;
  overflow: hidden;
  block-size: 0;
  transition: block-size 0.3s ease, padding 0.3s ease;
  padding-block: 0;
}

details[open]::details-content {
  block-size: auto;
  padding: 1rem;
  padding-block: 1rem;
}
```

::: info
Псевдоэлемент `::details-content` поддерживается в Chromium. Для анимации раскрытия `display: block` → `display: none` не анимируется, поэтому используют `block-size` или `height`.
:::

#### Кастомная стрелка

```css
summary::marker {
  content: "▶ ";
  color: #0066cc;
}

details[open] > summary::marker {
  content: "▼ ";
}
```

## Спецификация

- [CSS Pseudo-Elements Module 4 — Tree-Abiding Pseudo-elements](https://www.w3.org/TR/css-pseudo-4/#tree-abiding)
- [CSS Pseudo-Elements Module 4 — ::details-content](https://www.w3.org/TR/css-pseudo-4/#details-content)
