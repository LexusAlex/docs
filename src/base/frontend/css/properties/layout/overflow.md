---
title: overflow
description: Определяет, что происходит с содержимым, выходящим за границы блока.
outline: deep
---

# overflow

Определяет, что происходит с содержимым, выходящим за границы блока.

- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)

## Свойства

| Свойство | Описание |
|----------|----------|
| `overflow` | Сокращённое для `overflow-x` и `overflow-y` |
| `overflow-x` | Поведение по горизонтальной оси |
| `overflow-y` | Поведение по вертикальной оси |
| `overflow-wrap` | Перенос длинных слов |
| `overflow-clip-margin` | Граница отсечения |

## Значения overflow

| Значение | Описание |
|----------|----------|
| `visible` | Содержимое видно за пределами блока (по умолчанию) |
| `hidden` | Содержимое обрезается, скролл недоступен |
| `scroll` | Содержимое обрезается, скролл всегда виден |
| `auto` | Скролл появляется при необходимости |
| `clip` | Как `hidden`, но без создания scrolling mechanism |
| `overlay` | Скролл поверх содержимого |

## Примеры

### overflow: hidden для BFC

```css
.parent {
  overflow: hidden; /* создаёт Block Formatting Context */
}

.child {
  float: left;
}
```

:::info
`overflow: hidden` создаёт BFC, поэтому дочерние float-элементы очищаются.
:::

### overflow: auto vs scroll

```css
/* Скролл только при переполнении */
.scrollable {
  overflow: auto;
  max-height: 300px;
}

/* Скролл всегда виден */
.always-scroll {
  overflow: scroll;
  max-height: 300px;
}
```

### overflow-x/y для осей

```css
/* Горизонтальный скролл, вертикальное скрытие */
.container {
  overflow-x: auto;
  overflow-y: hidden;
}
```

### overflow: clip

```css
/* Обрезка без скролла — производительнее чем hidden */
.clipped {
  overflow: clip;
  max-width: 200px;
}
```

:::tip
`overflow: clip` не создаёт scrolling mechanism и не влияет на layout соседних элементов.
:::

### overflow-wrap: break-word vs word-break

```css
/* Перенос длинных слов */
.break-word {
  overflow-wrap: break-word;
  max-width: 200px;
}

/* Разрыв по любому символу */
.word-break {
  word-break: break-all;
  max-width: 200px;
}
```
