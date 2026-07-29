---
title: Columns
description: Свойства multi-column layout — columns, column-width, column-count, column-gap, column-rule, column-span, column-fill и разрывы колонок
outline: deep
---

# Columns

Свойства мультиколонок позволяют создавать многоколоночную раскладку, разбивая контент на одну или несколько колонок. Поведение похоже на текст в газетах и журналах.

## Свойства

| Свойство | Описание |
|---|---|
| `columns` | Шортхенд для `column-width` и `column-count` |
| `column-width` | Минимальная ширина колонки |
| `column-count` | Максимальное количество колонок |
| `column-gap` | Расстояние между колонками |
| `column-rule` | Шортхенд для разделителя между колонками |
| `column-rule-width` | Толщина разделителя |
| `column-rule-style` | Стиль разделителя |
| `column-rule-color` | Цвет разделителя |
| `column-span` | Растягивание элемента на все колонки |
| `column-fill` | Способ заполнения колонок |

## columns

Шортхенд, принимающий `column-width` и `column-count`:

```css
columns: 200px 3;
```

Здесь `200px` — минимальная ширина колонки, `3` — максимальное количество. Браузер подберёт оптимальное число колонок, исходя из доступного пространства.

## column-width

Задаёт **минимальную** ширину колонки. Фактическая ширина может быть больше, если контент не помещается:

```css
.element {
  column-width: 250px;
}
```

::: info
`column-width` работает как `min-width` для колонки. Браузер автоматически определит количество колонок по.available space.
:::

## column-count

Задаёт **максимальное** количество колонок. Фактическое число может быть меньше, если контента недостаточно:

```css
.element {
  column-count: 4;
}
```

::: tip
Если заданы оба свойства (`column-width` и `column-count`), используется значение, при котором колонок **больше** (но не больше `column-count` и не уже `column-width`).
:::

## column-gap

Определяет расстояние между колонками. По умолчанию — `normal` (примерно 1em):

```css
.element {
  column-gap: 30px;
}
```

Значение может быть длиной или `normal`.

## column-rule

Шортхенд для стиля разделителя между колонками (по сути — аналог `border`):

```css
.element {
  column-rule: 2px solid #ccc;
}
```

### column-rule-width

```css
.element {
  column-rule-width: 1px;
}
```

### column-rule-style

```css
.element {
  column-rule-style: dashed;
}
```

### column-rule-color

```css
.element {
  column-rule-color: #999;
}
```

::: info
`column-rule` не влияет на размер колонок — это только визуальный разделитель. Расстояние между колонками задаётся через `column-gap`.
:::

## column-span

Определяет, растягивается ли элемент на все колонки:

```css
.element {
  column-span: all;
}
```

| Значение | Описание |
|---|---|
| `none` | Элемент остаётся в своей колонке (по умолчанию) |
| `all` | Элемент растягивается на все колонки |

Пример — заголовок на всю ширину:

```css
.article {
  column-count: 3;
  column-width: 200px;
}

.article h2 {
  column-span: all;
  border-bottom: 2px solid #333;
}
```

## column-fill

Определяет, как заполняются колонки контентом:

```css
.element {
  column-fill: balance;
}
```

| Значение | Описание |
|---|---|
| `auto` | Колонки заполняются последовательно, высота может быть разной |
| `balance` | Контент распределяется равномерно по колонкам (по умолчанию) |
| `balance-all` | То же, что `balance`, но для всех колонок |

::: tip
В большинстве случаев используйте `balance` — это значение по умолчанию и обеспечивает наиболее ровную раскладку.
:::

## Разрывы колонок

Для управления разрывами внутри мультиколонок используются свойства `break-before`, `break-after` и `break-inside`:

```css
.element {
  break-before: column;
  break-after: column;
  break-inside: avoid;
}
```

| Значение | Описание |
|---|---|
| `auto` | Разрешён разрыв (по умолчанию) |
| `avoid` | Избегать разрыва внутри элемента |
| `column` | Разрыв колонки до/после элемента |

### Пример — разрывы колонок

```css
.section {
  break-inside: avoid;
}

h2 {
  break-after: column;
}
```

::: info
Свойства `break-*` применяются также для разрывов страниц и описаны в разделе [Печать и страницы](../paged-media/).
:::

## Примеры

### Базовая мультиколонка

```html
<div class="columns">
  <p>Длинный текст, который будет разбит на три колонки...</p>
</div>
```

```css
.columns {
  column-count: 3;
  column-gap: 24px;
}
```

### Адаптивные колонки с column-width

```css
.responsive {
  column-width: 250px;
  column-gap: 20px;
  max-width: 1200px;
}
```

При ширине контейнера 1200px будет 4 колонки по 250px (с учётом gap). При 800px — 3 колонки.

### Разделители между колонками

```css
.newspaper {
  column-count: 3;
  column-gap: 30px;
  column-rule: 1px solid #e0e0e0;
}
```

### column-span: all для полноширинных элементов

```css
.magazine {
  column-count: 2;
  column-width: 300px;
}

.magazine .full-width-title {
  column-span: all;
  text-align: center;
  margin-bottom: 1em;
}
```

### Разрывы колонок

```css
.columns-text {
  column-count: 2;
}

.columns-text h3 {
  break-after: column;
}

.columns-text .keep-together {
  break-inside: avoid;
}
```

### Журнальная раскладка

```css
.magazine-layout {
  column-count: 3;
  column-gap: 20px;
  column-rule: 2px solid #333;
  column-fill: balance;
}

.magazine-layout .headline {
  column-span: all;
  font-size: 2em;
  font-weight: bold;
  border-bottom: 3px double #333;
  margin-bottom: 1em;
}

.magazine-layout .pullquote {
  break-inside: avoid;
  font-style: italic;
  border-left: 3px solid #c00;
  padding-left: 1em;
}
```

## Ссылки

- [MDN: CSS Multi-column Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_multicol_layout)
- [MDN: columns](https://developer.mozilla.org/en-US/docs/Web/CSS/columns)
- [MDN: column-width](https://developer.mozilla.org/en-US/docs/Web/CSS/column-width)
- [MDN: column-count](https://developer.mozilla.org/en-US/docs/Web/CSS/column-count)
- [MDN: column-gap](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap)
- [MDN: column-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule)
- [MDN: column-span](https://developer.mozilla.org/en-US/docs/Web/CSS/column-span)
- [MDN: column-fill](https://developer.mozilla.org/en-US/docs/Web/CSS/column-fill)
- [W3C: CSS Multi-column Layout Module Level 1](https://www.w3.org/TR/css-multicol-1/)
