---
title: Автоматическая раскладка
description: Управляет автоматическим размещением элементов в неявных столбцах и строках
outline: deep
---

# Автоматическая раскладка

Управляет автоматическим размещением элементов в неявных столбцах и строках.

## Свойства

| Свойство | Описание |
| --- | --- |
| `grid-auto-rows` | Размер строк, создаваемых автоматически |
| `grid-auto-columns` | Размер столбцов, создаваемых автоматически |
| `grid-auto-flow` | Поток размещения элементов |

## grid-auto-flow

Определяет направление и порядок автоматического размещения.

| Значение | Описание |
| --- | --- |
| `row` | Элементы заполняют строки по порядку (по умолчанию) |
| `column` | Элементы заполняют столбцы по порядку |
| `dense` | Пытается заполнить пустые ячейки в начале сетки |
| `row dense` | Плотное заполнение по строкам |
| `column dense` | Плотное заполнение по столбцам |

## Примеры

### grid-auto-rows с minmax()

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 1rem;
}
```

Неявные строки будут минимум 100px, но расширятся при необходимости.

:::info
Неявные строки и столбцы создаются, когда элементы размещаются за пределами явно определённого шаблона.
:::

### grid-auto-columns для неявных столбцов

```css
.grid {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 200px;
  gap: 1rem;
  overflow-x: auto;
}
```

Горизонтальная прокручиваемая область с фиксированной шириной столбцов.

### grid-auto-flow: dense для заполнения пробелов

```css
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: dense;
  gap: 1rem;
}

.item-wide {
  grid-column: span 2;
}
```

:::tip
Свойство `dense` переставляет элементы, чтобы заполнить пустые ячейки, но порядок элементов в DOM может нарушиться. Используйте осторожно.
:::

### Разные размеры неявных строк

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 80px 120px;
}
```

Неявные строки чередуются: 80px, 120px, 80px, 120px и так далее.

## Ссылки

- [MDN: grid-auto-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows)
- [MDN: grid-auto-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns)
- [MDN: grid-auto-flow](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow)
