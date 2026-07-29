---
title: border-collapse
description: Определяет, как рамки ячеек таблицы взаимодействуют друг с другом.
outline: deep
---

# border-collapse

Свойства `border-collapse` и `border-spacing` управляют отображением рамок в таблицах.

## border-collapse

Свойство `border-collapse` определяет, будут ли рамки соседних ячеек объединены или разделены.

### Значения

| Значение | Описание |
|----------|----------|
| `separate` | Рамки ячеек разделены (по умолчанию) |
| `collapse` | Рамки соседних ячеек объединяются в одну |

### border-collapse: collapse

При объединении рамок соседних ячеек отображается только одна рамка между ними. Первая рамка в порядке стека имеет приоритет.

```css
table {
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid #333;
}
```

:::info
При `collapse` свойства `border-spacing` и `empty-cells` игнорируются.
:::

### border-collapse: separate

Рамки ячеек остаются независимыми. Между ними можно задать отступ через `border-spacing`.

```css
table {
  border-collapse: separate;
  border-spacing: 8px;
}

table,
th,
td {
  border: 1px solid #333;
}
```

## border-spacing

Свойство `border-spacing` задаёт расстояние между рамками соседних ячеек. Работает только при `border-collapse: separate`.

### Синтаксис

```css
/* Одно значение — одинаковый отступ по горизонтали и вертикали */
table {
  border-spacing: 10px;
}

/* Два значения — горизонтальный и вертикальный отступы */
table {
  border-spacing: 10px 5px;
}
```

### Значения

| Формат | Описание |
|--------|----------|
| `length` | Одно значение для обоих направлений |
| `length length` | Первое — горизонталь, второе — вертикаль |

## Визуальное сравнение

### Separate (по умолчанию)

```css
.separate-table {
  border-collapse: separate;
  border-spacing: 6px;
}

.separate-table td {
  border: 2px solid #2196F3;
  padding: 12px;
}
```

### Collapse

```css
.collapse-table {
  border-collapse: collapse;
}

.collapse-table td {
  border: 2px solid #4CAF50;
  padding: 12px;
}
```

## Лучшие практики

```css
/* Рекомендуемый стиль таблицы */
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

thead th {
  border-bottom: 2px solid #333;
  font-weight: 600;
}

tbody tr:hover {
  background-color: #f5f5f5;
}
```

:::tip
Для современных таблиц используйте `border-collapse: collapse` с лёгкими горизонтальными линиями вместо полной сетки — это выглядит чище и проще.
:::

## Ссылки

- [MDN: border-collapse](https://developer.mozilla.org/ru/docs/Web/CSS/border-collapse)
- [MDN: border-spacing](https://developer.mozilla.org/ru/docs/Web/CSS/border-spacing)
- [W3C: border-collapse](https://www.w3.org/TR/css-tables-3/#border-collapse)
