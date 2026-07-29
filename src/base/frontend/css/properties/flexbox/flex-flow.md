---
title: flex-flow
description: Управляют направлением и оборачиванием флекс-контейнера.
outline: deep
---

# flex-flow

::: info
Свойства `flex-direction`, `flex-wrap` и `flex-flow` применяются к флекс-контейнеру и определяют направление основной оси и правила оборачивания элементов.
:::

## flex-direction

Задаёт направление основной оси флекс-контейнера.

| Значение | Описание |
| --- | --- |
| `row` | Элементы располагаются горизонтально слева направо |
| `row-reverse` | Элементы располагаются горизонтально справа налево |
| `column` | Элементы располагаются вертикально сверху вниз |
| `column-reverse` | Элементы располагаются вертикально снизу вверх |

```css
.container {
  display: flex;
  flex-direction: row;
}
```

```css
.container {
  display: flex;
  flex-direction: column;
}
```

## flex-wrap

Определяет, должны ли элементы оборачиваться на новые строки.

| Значение | Описание |
| --- | --- |
| `nowrap` | Элементы не оборачиваются (по умолчанию) |
| `wrap` | Элементы оборачиваются на новую строку |
| `wrap-reverse` | Элементы оборачиваются в обратном порядке |

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
```

## flex-flow

Шorthand-свойство, объединяющее `flex-direction` и `flex-wrap`.

```css
.container {
  display: flex;
  flex-flow: row wrap;
}
```

```css
.container {
  display: flex;
  flex-flow: column nowrap;
}
```

## Примеры

### Шапка — основное содержимое — подвал

```css
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  flex-shrink: 0;
}

.main {
  flex: 1;
}

.footer {
  flex-shrink: 0;
}
```

### Боковая панель и контент

```css
.layout {
  display: flex;
  flex-flow: row wrap;
}

.sidebar {
  flex: 0 0 250px;
}

.content {
  flex: 1;
}
```

::: tip
Используйте `flex-flow: row wrap` для создания отзывчивых раскладок, где элементы автоматически переносятся при нехватке места.
:::

## Ссылки

- [MDN: flex-direction](https://developer.mozilla.org/ru/docs/Web/CSS/flex-direction)
- [MDN: flex-wrap](https://developer.mozilla.org/ru/docs/Web/CSS/flex-wrap)
- [MDN: flex-flow](https://developer.mozilla.org/ru/docs/Web/CSS/flex-flow)
- [CSS Flexible Box Layout Level 1](https://www.w3.org/TR/css-flexbox-1/#flex-flow-property)
