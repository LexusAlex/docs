---
title: display
description: Определяет тип box-модели элемента и способ его отображения в потоке документа.
outline: deep
---

# display

Определяет тип box-модели элемента и способ его отображения в потоке документа.

- Специфичность: `0-0-0`
- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
- [W3C CSS Display Level 3](https://drafts.csswg.org/css-display-3/)

## Значения

| Значение | Описание |
|----------|----------|
| `block` | Блочный элемент |
| `inline` | Строчный элемент |
| `inline-block` | Строчный блок |
| `flex` | Flex-контейнер |
| `grid` | Grid-контейнер |
| `inline-flex` | Строчный flex-контейнер |
| `inline-grid` | Строчный grid-контейнер |
| `table` | Таблица |
| `table-row` | Строка таблицы |
| `table-cell` | Ячейка таблицы |
| `table-column` | Столбец таблицы |
| `contents` | Удаляет box элемента, сохраняя потомков |
| `none` | Элемент не отображается |
| `list-item` | Элемент списка |
| `flow-root` | Новый BFC |

## Примеры

### block vs inline vs inline-block

:::info
Блочные элементы занимают всю ширину, строчные — только занимаемое пространство.
:::

```css
.block {
  display: block;
  width: 200px;
  background: #e0e0ff;
}

.inline {
  display: inline;
  width: 200px; /* игнорируется */
  background: #ffe0e0;
}

.inline-block {
  display: inline-block;
  width: 200px; /* работает */
  background: #e0ffe0;
}
```

### display: flex

:::tip
Подробнее о flexbox см. в разделе [Flexbox](../flexbox/).
:::

```css
.container {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.item {
  flex: 1;
}
```

### display: grid

:::tip
Подробнее о grid см. в разделе [Grid](../grid/).
:::

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
```

### display: none vs visibility: hidden

:::info
`display: none` полностью удаляет элемент из потока, а `visibility: hidden` скрывает его, но сохраняет место.
:::

```css
.hidden-layout {
  display: none; /* элемент отсутствует в потоке */
}

.hidden-visibility {
  visibility: hidden; /* элемент невидим, но занимает место */
}
```

### display: contents

Удаляет box элемента, но сохраняет его потомков. Полезно для обёрток.

```css
.wrapper {
  display: contents; /* box исчезает, потомки становятся прямыми потомками родителя */
}
```

:::warning
Использование `contents` может сломать accessibility, так как семантическая структура теряется.
:::

### display: flow-root

Создаёт новый Block Formatting Context (BFC).

```css
.parent {
  display: flow-root; /* новый BFC — очищает float */
}

.child {
  float: left;
}
```

### table display values

Эмулируют таблицу с помощью CSS.

```css
.table {
  display: table;
  border-collapse: collapse;
}

.row {
  display: table-row;
}

.cell {
  display: table-cell;
  padding: 0.5rem 1rem;
}
```
