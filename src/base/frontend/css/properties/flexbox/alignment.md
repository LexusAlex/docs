---
title: Выравнивание
description: Управляют выравниванием элементов по главной и поперечной осям.
outline: deep
---

# Выравнивание

::: info
Свойства выравнивания определяют, как флекс-элементы распределяются вдоль главной и поперечной осей флекс-контейнера.
:::

## justify-content

Выравнивает элементы вдоль **главной оси**.

| Значение | Описание |
| --- | --- |
| `flex-start` | Элементы прижаты к началу (по умолчанию) |
| `flex-end` | Элементы прижаты к концу |
| `center` | Элементы выровнены по центру |
| `space-between` | Равные пробелы между элементами |
| `space-around` | Равные пробелы вокруг элементов |
| `space-evenly` | Равные пробелы между и вокруг элементов |

```css
.container {
  display: flex;
  justify-content: center;
}
```

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

```css
.container {
  display: flex;
  justify-content: space-evenly;
}
```

## align-items

Выравнивает элементы вдоль **поперечной оси**.

| Значение | Описание |
| --- | --- |
| `stretch` | Элементы растягиваются (по умолчанию) |
| `flex-start` | Элементы прижаты к началу поперечной оси |
| `flex-end` | Элементы прижаты к концу поперечной оси |
| `center` | Элементы выровнены по центру |
| `baseline` | Элементы выровнены по базовой линии текста |

```css
.container {
  display: flex;
  align-items: center;
}
```

```css
.container {
  display: flex;
  align-items: stretch;
}
```

## align-self

Позволяет переопределить `align-items` для **отдельного элемента**.

```css
.item {
  align-self: flex-end;
}
```

```css
.item {
  align-self: center;
}
```

## align-content

Выравнивает **строки** при многострочном расположении (`flex-wrap: wrap`).

| Значение | Описание |
| --- | --- |
| `stretch` | Строки растягиваются (по умолчанию) |
| `flex-start` | Строки прижаты к началу |
| `flex-end` | Строки прижаты к концу |
| `center` | Строки выровнены по центру |
| `space-between` | Равные пробелы между строками |
| `space-around` | Равные пробелы вокруг строк |
| `space-evenly` | Равные пробелы между и вокруг строк |

```css
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
```

## place-content

Shorthand для `align-content` + `justify-content`.

```css
.container {
  place-content: center;
}
```

```css
.container {
  place-content: space-between center;
}
```

## place-items

Shorthand для `align-items` + `justify-items`.

```css
.container {
  place-items: center;
}
```

## place-self

Shorthand для `align-self` + `justify-self`.

```css
.item {
  place-self: center;
}
```

## Примеры

### Центрирование по горизонтали и вертикали

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

### Карточка по центру экрана

```css
.card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.card {
  width: 400px;
}
```

### Навигация с равными отступами

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

::: tip
Для полного центрирования элемента используйте комбинацию `justify-content: center` и `align-items: center` на родителе.
:::

### «Прилипающий» подвал

```css
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}

.footer {
  flex-shrink: 0;
}
```

## Ссылки

- [MDN: justify-content](https://developer.mozilla.org/ru/docs/Web/CSS/justify-content)
- [MDN: align-items](https://developer.mozilla.org/ru/docs/Web/CSS/align-items)
- [MDN: align-self](https://developer.mozilla.org/ru/docs/Web/CSS/align-self)
- [MDN: align-content](https://developer.mozilla.org/ru/docs/Web/CSS/align-content)
- [MDN: place-content](https://developer.mozilla.org/ru/docs/Web/CSS/place-content)
- [MDN: place-items](https://developer.mozilla.org/ru/docs/Web/CSS/place-items)
- [MDN: place-self](https://developer.mozilla.org/ru/docs/Web/CSS/place-self)
- [CSS Flexible Box Layout Level 1](https://www.w3.org/TR/css-flexbox-1/#alignment)
