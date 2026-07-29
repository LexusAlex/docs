---
title: Шаблон сетки
description: Определяет структуру сетки — столбцы, строки и именованные области
outline: deep
---

# Шаблон сетки

Определяет структуру сетки — столбцы, строки и именованные области.

## Свойства

| Свойство | Описание |
| --- | --- |
| `grid-template-columns` | Определяет количество и размер столбцов сетки |
| `grid-template-rows` | Определяет количество и размер строк сетки |
| `grid-template-areas` | Определяет именованные области сетки |
| `grid` | Сокращённое свойство для всех свойств шаблона сетки |
| `grid-area` | Имя или позиция элемента в именованной области |

## Значения

| Значение | Описание |
| --- | --- |
| `length` | Абсолютная или относительная длина (px, em, rem) |
| `percentage` | Процент от размера контейнера |
| `fr` | Дробная единица — доступное пространство делится между столбцами/строками |
| `minmax()` | Ограничивает размер минимальными и максимальными значениями |
| `repeat()` | Повторяет шаблон столбцов или строк |
| `auto` | Размер определяется содержимым |
| `min-content` | Минимальный размер содержимого |
| `max-content` | Максимальный размер содержимого |
| `fit-content()` | Размер вписывается в указанный максимум |
| `subgrid` | Наследует столбцы/строки родительской сетки |

## Примеры

### grid-template-columns с единицами fr

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 1rem;
}
```

Три столбца: боковые по 1 единице, центральный — в 2 раза шире.

### grid-template-rows с minmax()

```css
.grid {
  display: grid;
  grid-template-rows: minmax(100px, auto);
}
```

Строки будут минимум 100px, но расширятся, если содержимое больше.

### Именованные области

```css
.grid {
  display: grid;
  grid-template-areas:
    "header  header  header"
    "sidebar content content"
    "footer  footer  footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer  { grid-area: footer; }
```

:::info
Именованные области позволяют задать структуру раскладки декларативно — каждая ячейка получает имя, а элементы размещаются по этому имени.
:::

### repeat() с auto-fill и auto-fit

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
```

- `auto-fill` — создаёт максимальное количество столбцов, даже если элементов мало
- `auto-fit` — создаёт только столько столбцов, сколько нужно, и растягивает их

:::tip
Используйте `auto-fit` + `minmax()` для полностью адаптивной сетки без медиа-запросов.
:::

### minmax() для адаптивных столбцов

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(150px, 1fr));
}
```

Каждый столбец минимум 150px, но растягивается до равного деления доступного пространства.

### Практические примеры

#### Дашборд

```css
.dashboard {
  display: grid;
  grid-template-areas:
    "nav     nav     nav"
    "sidebar main    aside"
    "sidebar widgets aside"
    "footer  footer  footer";
  grid-template-columns: 220px 1fr 280px;
  grid-template-rows: 60px 1fr 260px 50px;
  min-height: 100vh;
  gap: 0;
}
```

#### Holy Grail Layout

```css
.layout {
  display: grid;
  grid-template:
    "header  header  header" auto
    "nav     main    aside"  1fr
    "footer  footer  footer" auto
    / 200px  1fr     200px;
}
```

:::tip
Сокращённое свойство `grid` задаёт строки, столбцы и области в одном объявлении: `/` разделяет строки от столбцов.
:::

#### Карточная сетка

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}
```

## Ссылки

- [MDN: grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns)
- [MDN: grid-template-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows)
- [MDN: grid-template-areas](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas)
- [MDN: grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid)
- [MDN: grid-area](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area)
- [CSS Grid Layout Level 2 (W3C)](https://www.w3.org/TR/css-grid-2/)
