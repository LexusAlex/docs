---
title: "user-select"
description: "Определяет, может ли пользователь выделять текст"
outline: deep
---

# user-select

Определяет, может ли пользователь выделять текст в элементе.

## Значения

| Значение | Описание |
|----------|----------|
| `auto` | Поведение определяется браузером (по умолчанию) |
| `none` | Текст нельзя выделить |
| `all` | Выделяется весь текст при одном клике |
| `contain` | Выделение ограничено пределами элемента |

:::info
Значение `contain` поддерживается не во всех браузерах. Проверяйте совместимость перед использованием в продакшне.
:::

## Примеры

### Запрет выделения на заголовках

```css
h1,
h2,
h3,
h4,
h5,
h6 {
  user-select: none;
}
```

### Полное выделение кодовых блоков

```css
code,
pre,
pre code {
  user-select: all;
}
```

:::tip
`user-select: all` удобен для кодовых блоков — один клик выделяет весь фрагмент, что упрощает копирование.
:::

### Отключение выделения на интерактивных элементах

```css
.button,
.nav-link,
.tab {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.text-input,
.textarea,
[contenteditable="true"] {
  user-select: text;
}
```

### Ограничение выделения пределами элемента

```css
.bounded-selection {
  user-select: contain;
  overflow: hidden;
  max-height: 200px;
}
```

### Декоративные элементы

```css
.watermark,
.badge,
.label {
  user-select: none;
  -webkit-user-select: none;
}

.icon-text {
  user-select: none;
  pointer-events: none;
}
```

### Полная страница без выделения (презентации)

```css
.presentation-mode {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.presentation-mode * {
  user-select: none;
}
```

:::warning
Не отключайте выделение текста на всей странице в обычных приложениях — это мешает пользователям копировать контент и ухудшает доступность.
:::

## Ссылки

- [MDN: user-select](https://developer.mozilla.org/ru/docs/Web/CSS/user-select)
- [W3C: user-select](https://www.w3.org/TR/css-ui-4/#user-select)
