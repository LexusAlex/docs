---
title: "Перенос строк"
description: "Определяют, как обрабатываются пробелы и переносы строк."
outline: deep
---

# Перенос строк

Свойства переноса строк определяют, как браузер обрабатывает пробелы, переносы длинных слов и дефисы.

## Свойства

### white-space

Определяет, как обрабатываются пробелы и переводы строк.

```css
/* Default — пробелы схлопываются, переносы строк игнорируются */
.normal {
  white-space: normal;
}

/* Пробелы сохраняются, переносы строк игнорируются */
.nowrap {
  white-space: nowrap;
}

/* Все пробелы и переносы сохраняются, перенос слов отключён */
.pre {
  white-space: pre;
}

/* Как pre, но длинные строки переносятся */
.pre-wrap {
  white-space: pre-wrap;
}

/* Пробелы схлопываются, переносы строк сохраняются */
.pre-line {
  white-space: pre-line;
}

/* Пробелы сохраняются, разрешены разрывы строк */
.break-spaces {
  white-space: break-spaces;
}
```

:::info
`word-wrap` — это устаревший псевдоним для `overflow-wrap`. Используйте `overflow-wrap` в новом коде.
:::

### word-break

Определяет, где разрешается разрыв длинных слов.

```css
/* Default */
.normal {
  word-break: normal;
}

/* Разрешает разрыв в любом месте */
.break-all {
  word-break: break-all;
}

/* Запрещает разрыв внутри слов */
.keep-all {
  word-break: keep-all;
}

/* Разрешает разрыв, если слово не помещается */
.break-word {
  word-break: break-word;
}
```

### overflow-wrap

Определяет, разрешает ли браузер разрыв строк внутри слов, если они не помещаются.

```css
.normal {
  overflow-wrap: normal;
}

.break-word {
  overflow-wrap: break-word;
}

/* Разрешает разрыв в любом месте, если необходимо */
.anywhere {
  overflow-wrap: anywhere;
}
```

:::tip
`overflow-wrap: break-word` безопаснее, чем `word-break: break-all`, так как разрывает слова только когда они действительно не помещаются, а не при любой возможности.
:::

### hyphens

Управляет автоматической расстановкой дефисов при переносе слов.

```css
/* Deactivated */
.none {
  hyphens: none;
}

/* Auto — браузер сам расставляет дефисы */
.auto {
  hyphens: auto;
}

/* Manual — дефисы расставляются только вручную (символ &) */
.manual {
  hyphens: manual;
}

/* Язык для расстановки дефисов */
.russian-text {
  hyphens: auto;
  lang: ru;
}

.english-text {
  hyphens: auto;
  lang: en;
}
```

:::info
Для автоматической расстановки дефисов необходимо указать атрибут `lang` на элементе или его предке, чтобы браузер знал правила переноса для конкретного языка.
:::

### line-break

Определяет строгость правил переноса строк.

```css
.auto {
  line-break: auto;
}

.loose {
  line-break: loose;
}

.normal {
  line-break: normal;
}

.strict {
  line-break: strict;
}
```

## Примеры использования

### Блоки кода

```css
pre,
code {
  white-space: pre;
}
```

### Многоточие в одну строку

```css
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

### Длинные URL-адреса

```css
.article a {
  word-break: break-all;
  overflow-wrap: anywhere;
}
```

### Длинные слова

```css
.content {
  overflow-wrap: break-word;
  word-break: break-word;
}
```

### Текст с justify

```css
.justified {
  text-align: justify;
  hyphens: auto;
  lang: ru;
}
```

## Ссылки

- [MDN: white-space](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
- [MDN: word-break](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break)
- [MDN: overflow-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap)
- [MDN: hyphens](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens)
- [MDN: line-break](https://developer.mozilla.org/en-US/docs/Web/CSS/line-break)
- [W3C: CSS Text Module Level 4](https://www.w3.org/TR/css-text-4/)
