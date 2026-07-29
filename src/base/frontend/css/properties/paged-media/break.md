---
title: Break
description: Свойства break-before, break-after, break-inside и устаревшие page-break для управления разрывами страниц и колонок
outline: deep
---

# Break

Свойства `break-before`, `break-after` и `break-inside` определяют поведение разрывов страниц и колонок при печати и в мультиколонках.

## Свойства

| Свойство | Описание |
|---|---|
| `break-before` | Разрыв **перед** элементом |
| `break-after` | Разрыв **после** элемента |
| `break-inside` | Поведение разрыва **внутри** элемента |

### Устаревшие свойства

| Свойство | Аналог |
|---|---|
| `page-break-before` | `break-before` |
| `page-break-after` | `break-after` |
| `page-break-inside` | `break-inside` |

::: info
Используйте современные `break-*` свойства. `page-break-*` поддерживаются для обратной совместимости.
:::

## Значения

### break-before / break-after

| Значение | Описание |
|---|---|
| `auto` | Разрыв по умолчанию (по умолчанию) |
| `avoid` | Избегать разрыва перед/после элемента |
| `page` | Разрыв страницы |
| `recto` | Разрыв на чётную страницу (правая в книге) |
| `verso` | Разрыв на нечётную страницу (левая в книге) |
| `column` | Разрыв колонки |
| `region` | Разрыв региона |
| `avoid-page` | Избегать разрыва страницы |
| `avoid-column` | Избегать разрыва колонки |

### break-inside

| Значение | Описание |
|---|---|
| `auto` | Разрешён разрыв (по умолчанию) |
| `avoid` | Избегать разрыва внутри элемента |
| `avoid-page` | Избегать разрыва страницы внутри |
| `avoid-column` | Избегать разрыва колонки внутри |

## Примеры

### Разрыв страницы перед секцией (для печати)

```css
@media print {
  .section {
    break-before: page;
  }
}
```

Это заставит каждую секцию начинаться с новой страницы при печати.

### Избегание разрыва внутри элемента

```css
.card {
  break-inside: avoid;
}
```

::: tip
Используйте `break-inside: avoid` для элементов, которые не должны разрываться — карточек, таблиц, блоков кода, изображений с подписями.
:::

### Разрывы страниц для заголовков

```css
h1 {
  break-before: page;
}

h2 {
  break-before: page;
}
```

### Избегание сирот и вдов

```css
p {
  break-inside: avoid;
}

blockquote {
  break-inside: avoid;
  break-before: avoid;
  break-after: avoid;
}
```

### Разрыв колонки

```css
.column-break {
  break-before: column;
}
```

### Разрывы на чётные/нечётные страницы (книги)

```css
.chapter {
  break-before: recto;
}

.appendix {
  break-before: verso;
}
```

::: info
Значения `recto` и `verso` полезны при подготовке книг: `recto` — правая (чётная) страница, `verso` — левая (нечётная).
:::

### Комплексный пример для печати

```css
@media print {
  h1 {
    break-before: page;
  }

  h2, h3 {
    break-after: avoid;
  }

  pre, blockquote, table, figure {
    break-inside: avoid;
  }

  .page-break {
    break-before: page;
  }
}
```

## Устаревшие свойства

### page-break-before / page-break-after

Принимают только `auto`, `always` и `avoid`:

```css
.page-break-before {
  page-break-before: always;
}

.page-break-after {
  page-break-after: always;
}
```

| Значение | Аналог в `break-*` |
|---|---|
| `auto` | `auto` |
| `always` | `page` |
| `avoid` | `avoid` |

### page-break-inside

```css
.keep-together {
  page-break-inside: avoid;
}
```

| Значение | Аналог в `break-*` |
|---|---|
| `auto` | `auto` |
| `avoid` | `avoid` |

## Ссылки

- [MDN: break-before](https://developer.mozilla.org/en-US/docs/Web/CSS/break-before)
- [MDN: break-after](https://developer.mozilla.org/en-US/docs/Web/CSS/break-after)
- [MDN: break-inside](https://developer.mozilla.org/en-US/docs/Web/CSS/break-inside)
- [MDN: page-break-before](https://developer.mozilla.org/en-US/docs/Web/CSS/page-break-before)
- [MDN: page-break-after](https://developer.mozilla.org/en-US/docs/Web/CSS/page-break-after)
- [MDN: page-break-inside](https://developer.mozilla.org/en-US/docs/Web/CSS/page-break-inside)
- [W3C: CSS Fragmentation Module Level 3](https://www.w3.org/TR/css-break-3/)
