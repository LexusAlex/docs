---
title: opacity
description: Задаёт прозрачность элемента
outline: deep
---

# opacity

Задаёт прозрачность элемента.

## Синтаксис

```css
/* Значения от 0 (полностью прозрачный) до 1 (непрозрачный) */
.opacity-number {
  opacity: 0;
  opacity: 0.5;
  opacity: 1;
}

/* Процентные значения */
.opacity-percent {
  opacity: 0%;
  opacity: 50%;
  opacity: 100%;
}
```

## Базовое использование

```css
.hidden {
  opacity: 0; /* Элемент невидим, но занимает место */
}

.semi-transparent {
  opacity: 0.6;
}

/* Отключение интерактивности при прозрачности */
.disabled {
  opacity: 0.4;
  pointer-events: none;
}
```

:::info
Значение `opacity: 0` делает элемент невидимым, но он **по-прежнему занимает место** в макете и остаётся интерактивным. Для полного скрытия используйте `visibility: hidden` или `display: none`.
:::

## opacity vs rgba()

```css
/* opacity применяется ко ВСЕМУ элементу, включая дочерние */
.parent {
  opacity: 0.5;
}
/* Дочерние элементы тоже станут полупрозрачными! */

/* rgba() влияет только на сам элемент */
.parent-rgba {
  background: rgba(0, 0, 0, 0.5);
  /* Дочерние элементы остаются непрозрачными */
}

.child {
  color: red; /* Будет отображаться нормально */
}
```

:::warning
`opacity` на родителе наследуется всеми дочерними элементами. Используйте `rgba()` или `rgb()` с альфа-каналом, если нужно полупрозрачность только фона.
:::

## Переходы с opacity

```css
.fade-in {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.fade-in:hover {
  opacity: 1;
}

/* Плавное появление */
.animate-in {
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
```

## Эффект бэкдропа

```css
/* Затемнение фона модального окна */
.overlay {
  position: fixed;
  inset: 0;
  background: black;
  opacity: 0.5;
  z-index: 10;
}

.modal {
  position: relative;
  z-index: 20;
  background: white;
  /* Контент остаётся непрозрачным */
}

/* Современный подход с backdrop-filter */
.backdrop {
  position: fixed;
  inset: 0;
  backdrop-filter: blur(4px) brightness(0.7);
}
```

:::tip
Для эффектов размытия фона лучше использовать `backdrop-filter` вместо `opacity`, так как `opacity` влияет на весь элемент целиком.
:::

## Ссылки

- [MDN: opacity](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity)
- [W3C: CSS Transitions](https://www.w3.org/TR/css-transitions-1/)
- [MDN: backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
