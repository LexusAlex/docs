---
title: "Селекторы атрибутов"
description: "Выбирает элементы по presence или значению их атрибутов."
outline: [2, 3]
---

# Селекторы атрибутов

Селекторы атрибутов позволяют выбирать элементы на основе наличия или значения их HTML-атрибутов.

## Синтаксис и виды

| Селектор | Описание | Пример |
|---|---|---|
| `[attr]` | Элемент имеет атрибут `attr` | `[disabled]` |
| `[attr=value]` | Атрибут `attr` точно равен `value` | `[type="text"]` |
| `[attr~=value]` | Атрибут `attr` содержит слово `value` | `[class~="btn"]` |
| `[attr\|=value]` | Атрибут `attr` начинается с `value` или `value-` | `[lang\|="en"]` |
| `[attr^=value]` | Атрибут `attr` начинается со строки `value` | `[href^="https"]` |
| `[attr$=value]` | Атрибут `attr` заканчивается строкой `value` | `[href$=".pdf"]` |
| `[attr*=value]` | Атрибут `attr` содержит подстроку `value` | `[title*="error"]` |

## Примеры

### Наличие атрибута

```css
/* Все ссылки */
a[href] {
  color: blue;
}

/* Все изображения с атрибутом alt */
img[alt] {
  border: 1px solid #ccc;
}
```

### Точное совпадение

```css
/* Кнопки-сабмиты */
input[type="submit"] {
  background: green;
  color: white;
}

/* Ссылки на внешние ресурсы */
a[target="_blank"]::after {
  content: " ↗";
}
```

### Начало строки (`^=`)

```css
/* Все HTTPS-ссылки */
a[href^="https"] {
  color: green;
}

/* Все email-ссылки */
a[href^="mailto:"] {
  color: purple;
}
```

### Конец строки (`$=`)

```css
/* Ссылки на PDF-файлы */
a[href$=".pdf"]::before {
  content: "📄 ";
}

/* Изображения .png */
img[src$=".png"] {
  image-rendering: pixelated;
}
```

### Подстрока (`*=`)

```css
/* Все элементы с class содержащим "btn" */
[class*="btn"] {
  cursor: pointer;
}
```

### Словесное совпадение (`~=`)

```css
/* Элементы с class содержащим слово "active" */
[class~="active"] {
  opacity: 1;
}
```

### Языковой префикс (`|=`)

```css
/* Элементы на английском языке */
[lang|="en"] {
  font-family: serif;
}

/* Включая подязыки: en-US, en-GB */
[lang|="en"]::after {
  content: " (English)";
}
```

### Комбинация

```css
/* Все изображения .jpg с атрибутом alt */
img[alt][src$=".jpg"] {
  border-radius: 8px;
}
```

## Специфичность

Специфичность селектора атрибута — `0-1-0` (аналогично селектору класса).

```css
/* 0-0-1 */
p { color: black; }

/* 0-1-0 */
p[class="intro"] { color: blue; }
```

::: tip
Селекторы атрибутов — мощный инструмент для стилизации компонентов. В комбинации с `data-*` атрибутами они позволяют создавать семантичные, самодокументируемые стили.
:::

## Спецификация

- [CSS Selectors Level 4 — Attribute selectors](https://www.w3.org/TR/selectors-4/#attribute-selectors)
