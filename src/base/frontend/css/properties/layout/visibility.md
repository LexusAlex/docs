---
title: visibility
description: Определяет видимость элемента.
outline: deep
---

# visibility

Определяет видимость элемента.

- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility)

## Значения

| Значение | Описание |
|----------|----------|
| `visible` | Элемент виден (по умолчанию) |
| `hidden` | Элемент скрыт, но сохраняет место |
| `collapse` | Элемент скрыт, место схлопывается |

## Примеры

### visibility: hidden vs display: none

```css
/* Элемент скрыт, но место сохраняется */
.hidden-visibility {
  visibility: hidden;
}

/* Элемент полностью удалён из потока */
.hidden-display {
  display: none;
}
```

:::info
`visibility: hidden` — элемент невидим, но продолжает участвовать в layout (занимает место).
:::

### collapse для таблиц

```css
/* Скрытие строки таблицы без влияния на layout */
tr.hidden-row {
  visibility: collapse;
}

/* Эквивалент display: none для строк таблицы */
tr.hidden-row-alt {
  display: none;
}
```

:::warning
`visibility: collapse` для строк/столбцов таблиц работает как `display: none` для не-табличных элементов.
:::

### Наследование

```css
.parent {
  visibility: hidden; /* дочерние элементы тоже скрыты */
}

.parent > .child {
  visibility: visible; /* восстанавливает видимость */
}
```
