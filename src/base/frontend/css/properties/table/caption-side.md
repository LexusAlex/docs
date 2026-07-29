---
title: caption-side
description: Определяет положение заголовка таблицы относительно самой таблицы.
outline: deep
---

# caption-side

Свойство `caption-side` определяет, где отображается заголовок таблицы (`<caption>`).

## Значения

| Значение | Описание |
|----------|----------|
| `top` | Заголовок над таблицей (по умолчанию) |
| `bottom` | Заголовок под таблицей |
| `inline-start` | Заголовок в начале блока (логическое свойство) |
| `inline-end` | Заголовок в конце блока (логическое свойство) |

## caption-side: top

Значение по умолчанию. Заголовок располагается над таблицей.

```css
caption {
  caption-side: top;
  font-size: 1.2em;
  font-weight: bold;
  padding-bottom: 8px;
  text-align: left;
}
```

```html
<table>
  <caption>Продажи по кварталам</caption>
  <thead>
    <tr><th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th></tr>
  </thead>
  <tbody>
    <tr><td>100</td><td>150</td><td>200</td><td>250</td></tr>
  </tbody>
</table>
```

## caption-side: bottom

Заголовок располагается под таблицей.

```css
caption {
  caption-side: bottom;
  font-size: 0.9em;
  color: #666;
  padding-top: 8px;
  text-align: right;
}
```

:::info
В некоторых версиях спецификации `bottom` поддерживался не всеми браузерами. На данный момент поддержка широкая, но лучше проверять для legacy-проектов.
:::

## Логические свойства

Значения `inline-start` и `inline-end` относятся к логическим свойствам CSS. Они зависят от направления текста (`writing-mode`).

```caption-side: inline-start```

Заголовок будет в начале блока — сверху для горизонтального текста (`horizontal-tb`) и слева для вертикального текста (`vertical-rl`).

```css
/* Для горизонтального направления — аналог top */
caption {
  caption-side: inline-start;
}

/* Для вертикального направления — заголовок слева */
[data-writing-mode="vertical-rl"] caption {
  caption-side: inline-start;
}
```

```caption-side: inline-end```

Заголовок будет в конце блока — снизу для горизонтального текста и справа для вертикального.

```css
caption {
  caption-side: inline-end;
}
```

:::tip
Используйте логические свойства (`inline-start` / `inline-end`), если ваш интерфейс поддерживает разные направления письма (например, арабский или языки с вертикальным текстом).
:::

## Пример: стилизация caption

```css
table {
  width: 100%;
  border-collapse: collapse;
}

caption {
  caption-side: top;
  padding: 12px 0;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: left;
  color: #1a1a1a;
}

caption + thead th {
  background-color: #f8f9fa;
}
```

## Ссылки

- [MDN: caption-side](https://developer.mozilla.org/ru/docs/Web/CSS/caption-side)
- [W3C: caption-side](https://www.w3.org/TR/css-tables-3/#caption-side)
