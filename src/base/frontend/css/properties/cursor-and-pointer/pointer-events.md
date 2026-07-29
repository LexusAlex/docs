---
title: "pointer-events"
description: "Определяет, реагирует ли элемент на события указателя"
outline: deep
---

# pointer-events

Определяет, реагирует ли элемент на события указателя (мышь, тач, перо).

## Значения

| Значение | Описание |
|----------|----------|
| `auto` | Элемент реагирует на события указателя (поведение по умолчанию) |
| `none` | Элемент не реагирует на события указателя, они проходят сквозь него |
| `visiblePainted` | Реагирует только на видимую область (только для SVG) |
| `visibleFill` | Реагирует на видимую заливку (только для SVG) |
| `visibleStroke` | Реагирует на видимый штрих (только для SVG) |
| `visible` | Реагирует на видимую область (только для SVG) |
| `painted` | Реагирует на закрашенную область (только для SVG) |
| `fill` | Реагирует на область заливки (только для SVG) |
| `stroke` | Реагирует на штрих (только для SVG) |
| `all` | Реагирует на любую область (только для SVG) |

:::info
В HTML-документах обычно используются только `auto` и `none`. Остальные значения предназначены для SVG-элементов.
:::

## Примеры

### Пропуск событий сквозь оверлей

```css
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  pointer-events: none;
  z-index: 1000;
}

.overlay-content {
  pointer-events: auto;
}
```

:::tip
Это стандартный паттерн для модальных окон и оверлеев: сам оверлей пропускает события, а его содержимое — нет.
:::

### Отключение взаимодействия на декоративных элементах

```css
.decorative-icon {
  pointer-events: none;
  user-select: none;
}

.watermark {
  pointer-events: none;
  opacity: 0.3;
  position: fixed;
  bottom: 20px;
  right: 20px;
}
```

### Управление взаимодействием на конкретных элементах

```css
.disabled-overlay {
  pointer-events: none;
}

.clickable-layer {
  pointer-events: auto;
}

.hidden-interactive {
  pointer-events: none;
  visibility: hidden;
}
```

### Взаимосвязь с z-index

```css
/* Нижний слой — кликабельный */
.bottom-layer {
  position: relative;
  z-index: 1;
  cursor: pointer;
}

/* Верхний слой — прозрачный для событий */
.top-layer {
  position: relative;
  z-index: 2;
  pointer-events: none;
}
```

:::tip
Элемент с `pointer-events: none` не блокирует события для элементов под ним, даже если его `z-index` выше. Это полезно для наложения декоративных слоёв.
:::

### Сочетание с JavaScript

```css
.no-interaction {
  pointer-events: none;
  user-select: none;
}
```

```js
// Временное отключение обработчиков
element.style.pointerEvents = "none";

// Восстановление
element.style.pointerEvents = "auto";
```

## Ссылки

- [MDN: pointer-events](https://developer.mozilla.org/ru/docs/Web/CSS/pointer-events)
- [W3C: pointer-events](https://www.w3.org/TR/SVG/interact.html#PointerEventsProperty)
