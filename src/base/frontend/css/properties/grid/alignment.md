---
title: Выравнивание
description: Выравнивание содержимого внутри грид-ячеек и всего содержимого сетки
outline: deep
---

# Выравнивание

Выравнивание содержимого внутри грид-ячеек и всего содержимого сетки. Свойства общие с Flexbox, но ведут себя иначе в контексте Grid.

## Свойства контейнера

| Свойство | Описание |
| --- | --- |
| `justify-items` | Выравнивание содержимого по горизонтали внутри ячеек |
| `align-items` | Выравнивание содержимого по вертикали внутри ячеек |
| `place-items` | Сокращение для `align-items` и `justify-items` |
| `justify-content` | Выравнивание сетки по горизонтали внутри контейнера |
| `align-content` | Выравнивание сетки по вертикали внутри контейнера |
| `place-content` | Сокращение для `align-content` и `justify-content` |

## Свойства элемента

| Свойство | Описание |
| --- | --- |
| `justify-self` | Выравнивание содержимого по горизонтали внутри одной ячейки |
| `align-self` | Выравнивание содержимого по вертикали внутри одной ячейки |
| `place-self` | Сокращение для `align-self` и `justify-self` |

## Примеры

### Выравнивание содержимого ячеек (justify-items, align-items)

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 150px);
  justify-items: center;
  align-items: center;
}
```

Все элементы будут отцентрированы внутри своих ячеек.

### Выравнивание сетки в контейнере (justify-content, align-content)

```css
.grid {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px;
  justify-content: space-between;
  align-content: center;
  gap: 1rem;
  height: 100vh;
}
```

:::info
`justify-content` и `align-content` работают только когда общая ширина/высота сетки меньше контейнера. Если столбцы заполняют всё пространство, свойства не окажут влияния.
:::

### Индивидуальное выравнивание элемента (justify-self, align-self)

```css
.item-center {
  justify-self: center;
  align-self: center;
}

.item-stretch {
  justify-self: stretch;
  align-self: stretch;
}

.item-start {
  justify-self: start;
  align-self: start;
}
```

### Сокращения place-items и place-content

```css
.grid {
  /* place-items: <align-items> <justify-items> */
  place-items: center;

  /* place-content: <align-content> <justify-content> */
  place-content: space-between center;
}

.item {
  /* place-self: <align-self> <justify-self> */
  place-self: end start;
}
```

### Практика: центрирование в ячейках сетки

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
  place-items: center;
  gap: 1rem;
}
```

Все элементы автоматически отцентрированы и по горизонтали, и по вертикали.

:::tip
Для простого центрирования одного элемента в контейнере проще использовать `display: grid; place-items: center;` — это самый короткий способ в CSS.
:::

## Значения для выравнивания

| Значение | Описание |
| --- | --- |
| `start` | Выравнивание по началу |
| `end` | Выравнивание по концу |
| `center` | Центрирование |
| `stretch` | Растягивание (по умолчанию для `justify-items`/`align-items`) |
| `space-between` | Равное пространство между элементами |
| `space-around` | Равное пространство вокруг элементов |
| `space-evenly` | Равное пространство между и вокруг элементов |

## Ссылки

- [MDN: justify-items](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items)
- [MDN: align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)
- [MDN: justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)
- [MDN: align-content](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content)
- [MDN: justify-self](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self)
- [MDN: align-self](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self)
