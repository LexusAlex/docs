---
title: list-style
description: Свойства стилизации маркеров списков — тип, позиция и изображение маркера.
outline: deep
---

# list-style

Свойства `list-style-type`, `list-style-position`, `list-style-image` и shorthand `list-style` определяют внешний вид маркеров списков.

## list-style-type

Задаёт тип маркера (пульта) для элемента списка.

| Значение | Описание |
|----------|----------|
| `disc` | Заполненный круг (по умолчанию) |
| `circle` | Пустой круг |
| `square` | Заполненный квадрат |
| `decimal` | Десятичная нумерация: `1`, `2`, `3` … |
| `decimal-leading-zero` | Нумерация с ведущим нулём: `01`, `02`, `03` … |
| `lower-roman` | Строчные римские: `i`, `ii`, `iii` … |
| `upper-roman` | Заглавные римские: `I`, `II`, `III` … |
| `lower-alpha` | Строчные латинские: `a`, `b`, `c` … |
| `upper-alpha` | Заглавные латинские: `A`, `B`, `C` … |
| `lower-greek` | Строчные греческие: `α`, `β`, `γ` … |
| `cjk-decimal` | Десятичные символы CJK: `一`, `二`, `三` … |
| `none` | Без маркера |

```css
ol(decimal) {
  list-style-type: decimal;
}

ol(roman) {
  list-style-type: upper-roman;
}

ul(square-list) {
  list-style-type: square;
}

ul(circle-list) {
  list-style-type: circle;
}
```

## list-style-position

Определяет позицию маркера относительно блока контента.

| Значение | Описание |
|----------|----------|
| `outside` | Маркер расположен за пределами блока контента (по умолчанию) |
| `inside` | Маркер является частью блока контента и влияет на отступ текста |

```css
ul {
  list-style-position: outside;
}

ul.compact {
  list-style-position: inside;
}
```

:::info
При `list-style-position: inside` длинные строки текста будут переноситься с отступом от маркера, что может выглядеть необычно. В большинстве случаев предпочтительнее `outside`.
:::

## list-style-image

Задаёт пользовательское изображение в качестве маркера списка.

```css
ul {
  list-style-image: url("/images/bullet.svg");
}

ul.none {
  list-style-image: none;
}
```

:::tip
Используйте SVG-изображения для маркеров — они масштабируются без потери качества.
:::

## list-style (shorthand)

Краткая запись для задания всех свойств маркера одновременно.

```css
ul {
  list-style: square inside url("/images/custom-bullet.svg");
}

ol {
  list-style: upper-roman outside;
}

ul.clean {
  list-style: none;
}
```

:::info
Порядок значений в shorthand: `<type> <position> <image>`. Любое из значений может быть опущено.
:::

## Стилизация через ::marker

Современный подход — использовать псевдоэлемент `::marker` для полного контроля над маркерами:

```css
li::marker {
  color: #e74c3c;
  font-size: 1.5em;
  font-weight: bold;
}

ul.custom li::marker {
  content: "▸ ";
  color: #3498db;
}

ol.numbered li::marker {
  content: counter(list-item) ". ";
  font-weight: bold;
}
```

:::tip
Стилизация через `::marker` даёт гораздо больше возможностей, чем `list-style-type`. Вы можете менять цвет, размер, шрифт и даже содержимое маркера.
:::

## Вложенные списки с разными маркерами

```css
ul {
  list-style-type: disc;
}

ul ul {
  list-style-type: circle;
}

ul ul ul {
  list-style-type: square;
}

ol {
  list-style-type: decimal;
}

ol ol {
  list-style-type: lower-alpha;
}

ol ol ol {
  list-style-type: lower-roman;
}
```

## Удаление стандартных стилей списков

```css
ul,
ol {
  list-style: none;
  margin: 0;
  padding: 0;
}
```

:::warning
При удалении стандартных стилей убедитесь, что контент остаётся доступным для скринридеров. Элементы `<ul>` и `<ol>` сохраняют семантическое значение даже без маркеров.
:::

## Ссылки

- [MDN: list-style](https://developer.mozilla.org/ru/docs/Web/CSS/list-style)
- [MDN: list-style-type](https://developer.mozilla.org/ru/docs/Web/CSS/list-style-type)
- [MDN: list-style-position](https://developer.mozilla.org/ru/docs/Web/CSS/list-style-position)
- [MDN: list-style-image](https://developer.mozilla.org/ru/docs/Web/CSS/list-style-image)
- [MDN: ::marker](https://developer.mozilla.org/ru/docs/Web/CSS/::marker)
- [W3C CSS Lists Module Level 3](https://www.w3.org/TR/css-lists-3/)
