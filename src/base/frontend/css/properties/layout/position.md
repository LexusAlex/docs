---
title: position
description: Определяет способ позиционирования элемента в документе.
outline: deep
---

# position

Определяет способ позиционирования элемента в документе.

- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
- [W3C CSS Position Level 4](https://drafts.csswg.org/css-position-4/)

## Значения

| Значение | Описание |
|----------|----------|
| `static` | Обычный поток (по умолчанию) |
| `relative` | Позиционирование относительно обычной позиции |
| `absolute` | Абсолютное позиционирование |
| `fixed` | Фиксированное позиционирование |
| `sticky` | Липкое позиционирование |

## Примеры

### static (по умолчанию)

Элемент следует обычному потоку документа. Смещения `top`, `right`, `bottom`, `left` игнорируются.

```css
.element {
  position: static;
}
```

### relative

Смещается относительно своей обычной позиции. Исходное место остаётся занятым.

```css
.element {
  position: relative;
  top: 10px;
  left: 20px;
}
```

:::info
`relative` часто используется как контекст позиционирования для дочерних `absolute` элементов.
:::

### absolute

Выпавает из потока. Позиционируется относительно ближайшего positioned ancestor (с `position` отличным от `static`).

```css
.parent {
  position: relative; /* контекст позиционирования */
}

.child {
  position: absolute;
  top: 0;
  right: 0;
}
```

### fixed

Выпавает из потока. Позиционируется относительно viewport. Не скроллится.

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
```

### sticky

Гибридный режим: ведёт себя как `relative` до достижения порога скролла, затем становится `fixed`.

```css
.sidebar {
  position: sticky;
  top: 20px;
}
```

:::tip
`position: sticky` требует указания хотя бы одного из `top`, `right`, `bottom`, `left` для работы.
:::

## Containing Block

Containing block определяет, относительно чего вычисляются координаты элемента:

- `static` — containing block — это область контента ближайшего блочного предка.
- `relative` — тот же, что и для `static`.
- `absolute` — ближайший positioned ancestor (с `transform`, `filter`, `perspective` и др.).
- `fixed` — viewport (или ближайший ancestor с `transform`/`filter`/`perspective`).
- `sticky` — containing block — область скролла.

## Stacking Context и z-index

`z-index` работает только для элементов с `position` отличным от `static`.

```css
.element {
  position: relative;
  z-index: 10;
}
```
