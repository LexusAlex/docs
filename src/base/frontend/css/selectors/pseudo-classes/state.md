---
title: "Псевдоклассы состояния"
description: "Псевдоклассы, отражающие интерактивное состояние элемента."
outline: [2, 3]
---

# Псевдоклассы состояния

Псевдоклассы состояния определяют текущее интерактивное или визуальное состояние элемента — наведение, фокус, посещённость ссылки и т. д.

## Список

| Псевдокласс | Описание |
|---|---|
| `:hover` | Мышь над элементом |
| `:active` | Элемент в процессе нажатия |
| `:focus` | Элемент получил фокус |
| `:focus-visible` | Элемент получил видимый фокус (для клавиатуры) |
| `:focus-within` | Элемент или его потомок имеет фокус |
| `:link` | Не посещённая ссылка |
| `:visited` | Посещённая ссылка |
| `:any-link` | Любой элемент-ссылка (`<a>`, `<area>`, `<link>`) с атрибутом `href` |
| `:target` | Элемент, чей `id` совпадает с фрагментом URL |
| `:target-current` | Элемент, чей `id` совпадает с текущим `:target` |
| `:target-within` | Элемент, содержащий `:target` |
| `:current` | Текущий элемент в цепочке навигации |
| `:current-within` | Родитель текущего элемента |
| `:playing` | Медиаэлемент в состоянии воспроизведения |
| `:paused` | Медиаэлемент на паузе |
| `:muted` | Медиаэлемент без звука |
| `:volume-locked` | Громкость заблокирована браузером |
| `:user-invalid` | Элемент с невалидным значением (после взаимодействия) |
| `:user-valid` | Элемент с валидным значением (после взаимодействия) |

## Примеры

### Hover и Active

```css
.btn {
  background: #0066cc;
  color: #fff;
  transition: background 0.2s ease;
}

.btn:hover {
  background: #0052a3;
}

.btn:active {
  background: #003d7a;
  transform: translateY(1px);
}
```

### Focus и Focus-Visible

```css
/* Общий фокус */
.btn:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* Только фокус с клавиатуры — не показывать при клике мышью */
.btn:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

### Focus-Within

```css
/* Родитель подсвечивается, если хотя бы один потомок в фокусе */
.form-group:focus-within {
  border-color: #0066cc;
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.2);
}
```

### Target

```css
/* Подсветка секции при переходе по якорю */
:target {
  background: #fffde7;
  border-left: 4px solid #fbc02d;
}
```

### Visited и Link

```css
a:link {
  color: #0066cc;
}

a:visited {
  color: #551a8b;
}

/* Порядок важен: :link и :visited должны идти перед :hover и :active */
a:hover {
  text-decoration: underline;
}

a:active {
  color: #cc0000;
}
```

### Порядок LVHA

Для ссылок соблюдайте порядок специфичности:

```css
a:link    { } /* 1. Ссылка */
a:visited { } /* 2. Посещённая */
a:hover   { } /* 3. Наведение */
a:active  { } /* 4. Нажатие */
```

Или используйте `:any-link` для объединения:

```css
a:any-link {
  color: blue;
}
```

::: tip
`:focus-visible` — современная альтернатива поле `outline: none`. Она показывает outline только при навигации клавиатурой, не при клике мышью.
:::

## Спецификация

- [CSS Selectors Level 4 — The :hover, :active, and :focus pseudo-classes](https://www.w3.org/TR/selectors-4/#useraction-pseudos)
- [CSS Selectors Level 4 — The :target pseudo-class](https://www.w3.org/TR/selectors-4/#the-target-pseudo)
