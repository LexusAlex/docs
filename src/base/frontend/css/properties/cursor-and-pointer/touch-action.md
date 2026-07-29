---
title: "touch-action"
description: "Определяет, как браузер обрабатывает жесты касания"
outline: deep
---

# touch-action

Определяет, как браузер обрабатывает жесты касания на элементе (скроллинг, масштабирование, свайпы).

## Значения

| Значение | Описание |
|----------|----------|
| `auto` | Браузер определяет обработку жестов (по умолчанию) |
| `none` | Браузер не обрабатывает жесты — все жесты обрабатываются JavaScript |
| `pan-x` | Разрешён горизонтальный скроллинг |
| `pan-y` | Разрешён вертикальный скроллинг |
| `manipulation` | Разрешён скроллинг и pinch-зум (но без двойного тапа) |
| `pinch-zoom` | Разрешено только масштабирование щипком |
| `cross-slide-x` | Разрешено горизонтальное касание с перехватом |
| `cross-slide-y` | Разрешено вертикальное касание с перехватом |

:::info
Свойство `touch-action` важно для производительности. Когда браузер знает, что элемент не обрабатывает жесты, он может начать обработку прокрутки раньше, не дожидаясь завершения жеста.
:::

## Примеры

### Только тап без скроллинга

```css
.button,
.tap-area {
  touch-action: manipulation;
}
```

:::tip
`manipulation` — рекомендуемое значение для кнопок и тап-областей. Оно отключает двойной тап для зума, что делает отклик быстрее.
:::

### Кастомная обработка тач-событий

```css
.custom-touch-handler {
  touch-action: none;
}
```

```js
element.addEventListener('touchstart', handleTouch, { passive: false });
element.addEventListener('touchmove', handleTouch, { passive: false });
```

### Контейнеры прокрутки

```css
/* Вертикальная прокрутка */
.vertical-scroll {
  overflow-y: auto;
  touch-action: pan-y;
}

/* Горизонтальная прокрутка */
.horizontal-scroll {
  overflow-x: auto;
  touch-action: pan-x;
}

/* Оба направления */
.free-scroll {
  overflow: auto;
  touch-action: pan-x pan-y;
}
```

### Производительность: композитные анимации

```css
.animated-element {
  touch-action: none;
  will-change: transform;
}

@keyframes slide-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
```

:::tip
Установка `touch-action: none` на анимируемых элементах позволяет браузеру обрабатывать жесты на композитном уровне, что устраняет задержки и дёрганье при прокрутке.
:::

### Ограничение жестов в 특정 направлениях

```css
/* Только вертикальный скроллинг, горизонтальный перехватывается */
.slider {
  touch-action: pan-y pinch-zoom;
}

/* Только масштабирование */
.zoomable-image {
  touch-action: pinch-zoom;
}
```

### Комбинация значений

```css
.complex-interaction {
  touch-action: pan-x pan-y pinch-zoom;
}
```

## Ссылки

- [MDN: touch-action](https://developer.mozilla.org/ru/docs/Web/CSS/touch-action)
- [W3C: touch-action](https://www.w3.org/TR/pointerevents3/#the-touch-action-css-property)
