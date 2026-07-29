---
title: content-visibility
description: Позволяет отложить отрисовку содержимого элемента для повышения производительности.
outline: deep
---

# content-visibility

Позволяет отложить отрисовку содержимого элемента для повышения производительности.

- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility)
- [W3C CSS Containment Module Level 2](https://drafts.csswg.org/css-contain-2/)

## Значения

| Значение | Описание |
|----------|----------|
| `visible` | Содержимое рендерится как обычно (по умолчанию) |
| `hidden` | Содержимое не рендерится и скрыто |
| `auto` | Ленивая отрисовка при приближении к viewport |

## Примеры

### content-visibility: auto

```css
/* Ленивая отрисовка для секций за пределами viewport */
.section {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}
```

:::info
`content-visibility: auto` пропускает рендеринг содержимого, пока элемент не приблизится к viewport. Требует `contain-intrinsic-size` для корректного скроллбара.
:::

### content-visibility: hidden

```css
.offscreen-content {
  content-visibility: hidden;
}
```

:::warning
`content-visibility: hidden` полностью скрывает содержимое и не рендерит его. Подходит для контента, который никогда не будет виден.
:::

### Производительность

```css
/* До оптимизации — все секции рендерятся сразу */
.section {
  /* content-visibility: visible */
}

/* После оптимизации — только видимые секции */
.section {
  content-visibility: auto;
  contain-intrinsic-size: auto 300px;
}
```

:::tip
`contain-intrinsic-size: auto 300px` указывает браузеру предполагаемую высоту элемента для корректного скроллбара. Значение `auto` запоминает последний известный размер.
:::

## Практический пример

```css
/* Оптимизация для длинных статей */
.article > section {
  content-visibility: auto;
  contain-intrinsic-size: auto 600px;
}

/* Скрытие невидимого контента */
.tab-content:not(.active) {
  content-visibility: hidden;
  contain-intrinsic-size: 0 1000px;
}
```
