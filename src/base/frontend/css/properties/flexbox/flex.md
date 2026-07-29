---
title: flex
description: Определяет размер и поведение элементов внутри флекс-контейнера.
outline: deep
---

# flex

::: info
Свойства `flex-grow`, `flex-shrink`, `flex-basis` и `flex` применяются к флекс-элементам и определяют, как они распределяют доступное пространство.
:::

## flex-grow

Определяет коэффициент увеличения элемента относительно других элементов в контейнере.

| Значение | Описание |
| --- | --- |
| `0` | Элемент не растёт (по умолчанию) |
| положительное целое | Коэффициент пропорционального роста |

```css
.item {
  flex-grow: 1;
}
```

## flex-shrink

Определяет коэффициент уменьшения элемента при нехватке пространства.

| Значение | Описание |
| --- | --- |
| `1` | Элемент уменьшается пропорционально (по умолчанию) |
| `0` | Элемент не уменьшается |

```css
.item {
  flex-shrink: 0;
}
```

## flex-basis

Задаёт начальный размер элемента перед распределением свободного пространства.

| Значение | Описание |
| --- | --- |
| `auto` | Размер определяется содержимым или другими свойствами |
| длина | Конкретное значение (`200px`, `10rem`, `50%`) |
| `0` | Нулевой начальный размер |

```css
.item {
  flex-basis: 200px;
}
```

## flex

Шorthand-свойство, объединяющее `flex-grow`, `flex-shrink` и `flex-basis`.

```css
.item {
  flex: 1;
}
```

| Запись | Эквивалент | Описание |
| --- | --- | --- |
| `flex: 1` | `flex: 1 1 0%` | Равномерное распределение |
| `flex: auto` | `flex: 1 1 auto` | На основе размера содержимого |
| `flex: none` | `flex: 0 0 auto` | Жёсткий размер без роста и уменьшения |
| `flex: 0 1 auto` | — | Значение по умолчанию |

```css
.item {
  flex: 1 0 200px;
}
```

## Примеры

### Равные колонки

```css
.container {
  display: flex;
}

.column {
  flex: 1;
}
```

### Отзывчивая боковая панель

```css
.layout {
  display: flex;
}

.sidebar {
  flex: 0 0 250px;
}

.content {
  flex: 1;
}
```

::: tip
Используйте `flex: 1` для равномерного распределения пространства и `flex: none` для фиксированных размеров.
:::

```css
.item-grow {
  flex: 2;
}

.item-normal {
  flex: 1;
}

.item-fixed {
  flex: 0 0 150px;
}
```

## Ссылки

- [MDN: flex-grow](https://developer.mozilla.org/ru/docs/Web/CSS/flex-grow)
- [MDN: flex-shrink](https://developer.mozilla.org/ru/docs/Web/CSS/flex-shrink)
- [MDN: flex-basis](https://developer.mozilla.org/ru/docs/Web/CSS/flex-basis)
- [MDN: flex](https://developer.mozilla.org/ru/docs/Web/CSS/flex)
- [CSS Flexible Box Layout Level 1](https://www.w3.org/TR/css-flexbox-1/#flex-common)
