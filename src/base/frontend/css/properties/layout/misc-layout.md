---
title: Прочие свойства layout
description: appearance, accent-color, color-scheme, zoom и другие свойства раскладки.
outline: deep
---

# Прочие свойства layout

Дополнительные свойства, не вошедшие в основные разделы, но широко используемые в современном CSS.

## appearance

Определяет, используется ли нативный стиль элемента или он заменяется пользовательским.

```css
/* Убрать нативный стиль */
select {
  appearance: none;
  /* Кастомная стрелка */
  background-image: url("arrow.svg");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  padding-right: 2rem;
}

/* Убрать стили чекбокса */
input[type="checkbox"] {
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #ccc;
  border-radius: 3px;
}

input[type="checkbox"]:checked {
  background: #0066cc;
  border-color: #0066cc;
  background-image: url("check.svg");
}
```

::: info
Значение `-webkit-appearance` (старый префикс) все еще может понадобиться для поддержки старых браузеров. Современные браузеры поддерживают `appearance` без префикса.
:::

## accent-color

Определяет цвет акцента для элементов формы (checkboxes, radio buttons, range inputs, progress).

```css
/* Глобальный accent-color */
:root {
  accent-color: #0066cc;
}

/* Для конкретного элемента */
input[type="checkbox"] {
  accent-color: #0066cc;
}

/* Наследование */
.form {
  accent-color: #e91e63;
}

.form * {
  accent-color: inherit;
}
```

```html
<!-- Все элементы формы получат розовый accent-color -->
<div class="form">
  <input type="checkbox"> Чекбокс
  <input type="radio" name="opt"> Радио 1
  <input type="radio" name="opt"> Радио 2
  <input type="range">
  <progress value="70" max="100"></progress>
</div>
```

## color-scheme

Указывает браузеру, какие цветовые схемы поддерживаются, для правильного отображения нативных элементов.

```css
/* Поддержка светлой и тёмной темы */
html {
  color-scheme: light dark;
}

/* Только светлая тема */
.light-only {
  color-scheme: light;
}

/* Только тёмная тема */
.dark-only {
  color-scheme: dark;
}
```

::: tip
`color-scheme` влияет на нативные элементы: цвет скроллбара, плейсхолдеров, форм, autofill. В сочетании с `@media (prefers-color-scheme)` позволяет создавать адаптивные темы.
:::

### Взаимодействие с prefers-color-scheme

```css
/* Базовые стили для обеих тем */
html {
  color-scheme: light dark;
}

:root {
  --bg: #ffffff;
  --text: #1a1a1a;
}

/* Тёмная тема через CSS */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --text: #f0f0f0;
  }
}
```

## zoom

Масштабирует элемент без влияния на layout остальных элементов.

```css
/* Масштабирование при наведении */
.icon {
  transition: zoom 0.2s ease;
}

.icon:hover {
  zoom: 1.2;
}

/* Уменьшение */
.badge {
  zoom: 0.8;
}

/* Сброс */
.reset {
  zoom: 1;
}
```

::: info
`zoom` не является стандартным CSS-свойством, но поддерживается во всех основных браузерах. Спецификация находится в процессе стандартизации.
:::

## image-rendering

Определяет алгоритм масштабирования изображений.

| Значение | Описание |
|---|---|
| `auto` | Алгоритм по умолчанию (бикубическая интерполяция) |
| `crisp-edges` | Без сглаживания (pixel art) |
| `pixelated` | Пиксельное масштабирование |
| `high-quality` | Высокое качество (для фотографий) |

```css
/* Pixel art */
.pixel-art {
  image-rendering: pixelated;
}

/* Чёткие края для иконок */
.icon {
  image-rendering: crisp-edges;
}

/* Высокое качество для фотографий */
.photo {
  image-rendering: high-quality;
}
```

## pointer-events

(Разделён с `cursor-and-pointer` — здесь краткая справка)

```css
/* Элемент не перехватывает события указателя */
.overlay {
  pointer-events: none;
}

/* Только скролл колёсиком, без кликов */
.scroll-area {
  pointer-events: none;
}

.scroll-area > * {
  pointer-events: auto;
}
```

## user-select

(Разделён с `cursor-and-pointer` — здесь краткая справка)

```css
/* Запрет выделения текста */
.no-select {
  user-select: none;
}

/* Выделение всего содержимого при клике */
.code-block {
  user-select: all;
}
```

## Ссылки

- [MDN: appearance](https://developer.mozilla.org/en-US/docs/Web/CSS/appearance)
- [MDN: accent-color](https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color)
- [MDN: color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme)
- [MDN: zoom](https://developer.mozilla.org/en-US/docs/Web/CSS/zoom)
- [MDN: image-rendering](https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering)
- [MDN: pointer-events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)
- [MDN: user-select](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select)
