---
title: empty-cells
description: Определяет, отображать ли рамку и фон пустых ячеек таблицы.
outline: deep
---

# empty-cells

Свойство `empty-cells` управляет видимостью рамки и фона пустых ячеек.

## Значения

| Значение | Описание |
|----------|----------|
| `show` | Рамка и фон отображаются (по умолчанию) |
| `hide` | Рамка и фон скрыты |

:::info
Свойство `empty-cells` действует только при `border-collapse: separate`. При `collapse` оно игнорируется.
:::

## empty-cells: show

Значение по умолчанию. Пустые ячейки отображаются с рамкой и фоном.

```css
table {
  border-collapse: separate;
  border-spacing: 0;
}

table,
th,
td {
  border: 1px solid #ccc;
}

td {
  empty-cells: show;
  padding: 8px 12px;
}
```

## empty-cells: hide

Рамка и фон пустых ячеек полностью скрыты. Ячейка остаётся в разметке, но визуально не отображается.

```css
table {
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid #333;
}

table,
th,
td {
  border: 1px solid #333;
}

td {
  empty-cells: hide;
  padding: 8px 12px;
}
```

```html
<table>
  <thead>
    <tr><th>Имя</th><th>Email</th><th>Телефон</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>Иван</td>
      <td>ivan@example.com</td>
      <td></td> <!-- Ячейка скрыта, если пустая -->
    </tr>
    <tr>
      <td>Мария</td>
      <td></td> <!-- Ячейка скрыта -->
      <td>+7 999 123-45-67</td>
    </tr>
  </tbody>
</table>
```

## Стилизация пустых состояний

Вместо скрытия ячеек можно отображать визуальный индикатор пустого значения.

```css
td:empty {
  color: transparent;
  position: relative;
}

td:empty::after {
  content: "—";
  color: #999;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
```

:::tip
Используйте `empty-cells: hide` для таблиц, где отсутствие данных означает «неприменимо» (например, таблица тарифов). Для таблиц, где пустое значение является осознанным (например, незаполненные поля), лучше использовать `empty-cells: show` с визуальным индикатором через `td:empty`.
:::

## Практический пример

```css
.pricing-table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}

.pricing-table th,
.pricing-table td {
  border: 1px solid #e0e0e0;
  padding: 12px 16px;
  text-align: center;
}

.pricing-table td {
  empty-cells: hide;
}

.pricing-table td:empty::after {
  content: "—";
  color: #bbb;
}
```

## Ссылки

- [MDN: empty-cells](https://developer.mozilla.org/ru/docs/Web/CSS/empty-cells)
- [W3C: empty-cells](https://www.w3.org/TR/css-tables-3/#empty-cells)
