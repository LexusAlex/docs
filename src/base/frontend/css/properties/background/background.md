---
title: Свойства фона (background)
description: Определяют фон элемента — цвет, изображение, размер, позицию, повторение и смешивание.
outline: deep
---

# Свойства фона

Определяют фон элемента.

::: info
Свойства фона применяются ко всем элементам. Множественные фоны задаются через запятую — первый указанный отрисовывается поверх остальных.
:::

## background-color

Задаёт цвет фона элемента.

```css
.element {
  background-color: transparent;
  background-color: tomato;
  background-color: #ff6347;
  background-color: rgb(255 99 71);
  background-color: hsl(9 100% 64%);
  background-color: oklch(0.65 0.2 25);
}
```

| Значение | Описание |
|---|---|
| `transparent` | Прозрачный фон (значение по умолчанию) |
| Именованный цвет | `tomato`, `rebeccapurple` и др. |
| HEX | `#ff6347`, `#f00` |
| `rgb()` | `rgb(255 99 71)` / `rgb(255 99 71 / 0.5)` |
| `hsl()` | `hsl(9 100% 64%)` |
| `oklch()` | `oklch(0.65 0.2 25)` |

## background-image

Задаёт изображение фона. Может принимать несколько значений через запятую.

```css
.element {
  background-image: none;
  background-image: url("pattern.png");
  background-image: linear-gradient(to bottom, #fff, #000);
  background-image: radial-gradient(circle, red, blue);
  background-image: conic-gradient(from 45deg, yellow, green);
}
```

### Множественные фоны

```css
.hero {
  background-image:
    url("overlay.png"),
    linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

::: tip
Множественные фоны накладываются друг на друга: первое изображение оказывается поверх последнего.
:::

## background-size

Определяет размер фонового изображения.

```css
.element {
  background-size: auto;
  background-size: 200px 100px;
  background-size: 50% 75%;
  background-size: cover;
  background-size: contain;
}
```

| Значение | Описание |
|---|---|
| `auto` | Размер по умолчанию (размеры изображения) |
| Длина | `200px`, `10rem 5rem` |
| Процент | `50% 75%` — относительно размеров элемента |
| `cover` | Заполняет весь элемент, сохраняя пропорции |
| `contain` | Вписывается в элемент целиком, сохраняя пропорции |

### cover vs contain

```css
/* Заполняет весь контейнер, обрезая лишнее */
.hero {
  background-size: cover;
  background-position: center;
}

/* Вписывает изображение целиком, может оставить пустоту */
.card {
  background-size: contain;
  background-repeat: no-repeat;
}
```

::: tip
Для hero-секций используйте `cover` с `background-position: center` — изображение всегда будет покрывать секцию.
:::

## background-position

Задаёт начальную позицию фонового изображения.

```css
.element {
  background-position: 0 0;
  background-position: 50% 50%;
  background-position: right 20px bottom 10px;
  background-position: center;
  background-position: top left;
}
```

| Ключевое слово | Эквивалент |
|---|---|
| `top` | `center top` / `50% 0` |
| `bottom` | `center bottom` / `50% 100%` |
| `left` | `left center` / `0 50%` |
| `right` | `right center` / `100% 50%` |
| `center` | `50% 50%` |

## background-repeat

Определяет, как повторяется фоновое изображение.

```css
.element {
  background-repeat: repeat;
  background-repeat: repeat-x;
  background-repeat: repeat-y;
  background-repeat: no-repeat;
  background-repeat: space;
  background-repeat: round;
}
```

| Значение | Описание |
|---|---|
| `repeat` | Повторяется по обеим осям (по умолчанию) |
| `repeat-x` | Повторяется только по горизонтали |
| `repeat-y` | Повторяется только по вертикали |
| `no-repeat` | Не повторяется |
| `space` | Повторяется без обрезки, равномерно распределяясь |
| `round` | Повторяется, при необходимости масштабируя изображение |

## background-attachment

Определяет, как фон привязан к области прокрутки.

```css
.element {
  background-attachment: scroll;
  background-attachment: fixed;
  background-attachment: local;
}
```

| Значение | Описание |
|---|---|
| `scroll` | Фон привязан к элементу, прокручивается с содержимым (по умолчанию) |
| `fixed` | Фон привязан к области просмотра — не двигается при прокрутке |
| `local` | Фон прокручивается вместе с содержимым элемента |

### Параллакс-эффект

```css
.parallax {
  background-image: url("bg.jpg");
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}
```

::: warning
`background-attachment: fixed` может вызвать проблемы с производительностью на мобильных устройствах. Используйте аккуратно.
:::

## background-origin

Определяет начальную позицию фона относительно границ элемента.

```css
.element {
  background-origin: padding-box;
  background-origin: border-box;
  background-origin: content-box;
}
```

| Значение | Описание |
|---|---|
| `padding-box` | Фон начинается от внутренней границы padding (по умолчанию) |
| `border-box` | Фон начинается от внешней границы border |
| `content-box` | Фон начинается от границы content |

## background-clip

Определяет область, в которой отрисовывается фон.

```css
.element {
  background-clip: border-box;
  background-clip: padding-box;
  background-clip: content-box;
  background-clip: text;
  -webkit-background-clip: text;
}
```

| Значение | Описание |
|---|---|
| `border-box` | Фон рисуется до border включительно (по умолчанию) |
| `padding-box` | Фон рисуется до padding |
| `content-box` | Фон рисуется только в области content |
| `text` | Фон обрезается по тексту (требует `-webkit-` префикс) |

### Градиентный текст

```css
.gradient-text {
  background: linear-gradient(45deg, #f093fb, #f5576c);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

## background-blend-mode

Определяет режим смешивания множественных фонов.

```css
.element {
  background-blend-mode: normal;
  background-blend-mode: multiply;
  background-blend-mode: screen;
  background-blend-mode: overlay;
  background-blend-mode: darken;
  background-blend-mode: lighten;
}
```

| Значение | Описание |
|---|---|
| `normal` | Без смешивания (по умолчанию) |
| `multiply` | Умножение — затемняет |
| `screen` | Экран — осветляет |
| `overlay` | Наложение — комбинация multiply и screen |
| `darken` | Выбирает более тёмный цвет |
| `lighten` | Выбирает более светлый цвет |
| `color-dodge` | Осветление по цвету |
| `color-burn` | Затемнение по цвету |
| `hard-light` | Жёсткий свет |
| `soft-light` | Мягкий свет |
| `difference` | Разность |
| `exclusion` | Исключение |
| `hue` | Тон |
| `saturation` | Насыщенность |
| `color` | Цвет |
| `luminosity` | Яркость |

### Пример со смешиванием

```css
.blended {
  background-image:
    url("texture.png"),
    linear-gradient(135deg, #667eea, #764ba2);
  background-blend-mode: overlay;
}
```

## background (сокращённое)

Сокращённое свойство для задания всех свойств фона за одну строку.

```css
.element {
  background: #ff6347 url("bg.png") center / cover no-repeat;
  background: linear-gradient(135deg, #667eea, #764ba2) center / cover fixed;
  background: red;
}
```

### Порядок значений

```
background: [color] [image] [position] [size] [repeat] [attachment] [origin] [clip];
```

```css
.element {
  background:
    linear-gradient(to right, #ff6347, #ff4500)  /* image */
    center                                      /* position */
    / cover                                     /* size */
    no-repeat                                   /* repeat */
    fixed                                       /* attachment */
    border-box                                  /* origin */
    padding-box;                                /* clip */
}
```

::: tip
Порядок значений важен: `position` и `size` разделяются `/`, а `origin` и `clip` указываются по порядку (первое — origin, второе — clip).
:::

## Рекомендации по производительности

- Используйте CSS-градиенты вместо изображений, где это возможно — они масштабируются без потери качества.
- Избегайте `background-attachment: fixed` на мобильных устройствах.
- Для декоративных изображений используйте `loading="lazy"` или `content-visibility: auto`.
- Сжимайте фоновые изображения и используйте форматы WebP/AVIF.

## Спецификации

- [CSS Backgrounds and Borders Level 4 — W3C](https://www.w3.org/TR/css-backgrounds-4/)
- [CSS Backgrounds and Borders Level 3 — W3C](https://www.w3.org/TR/css-backgrounds-3/)

## Смотрите также

- [MDN: background](https://developer.mozilla.org/ru/docs/Web/CSS/background)
- [MDN: background-color](https://developer.mozilla.org/ru/docs/Web/CSS/background-color)
- [MDN: background-image](https://developer.mozilla.org/ru/docs/Web/CSS/background-image)
- [MDN: background-size](https://developer.mozilla.org/ru/docs/Web/CSS/background-size)
- [MDN: background-position](https://developer.mozilla.org/ru/docs/Web/CSS/background-position)
- [MDN: background-repeat](https://developer.mozilla.org/ru/docs/Web/CSS/background-repeat)
- [MDN: background-attachment](https://developer.mozilla.org/ru/docs/Web/CSS/background-attachment)
- [MDN: background-origin](https://developer.mozilla.org/ru/docs/Web/CSS/background-origin)
- [MDN: background-clip](https://developer.mozilla.org/ru/docs/Web/CSS/background-clip)
- [MDN: background-blend-mode](https://developer.mozilla.org/ru/docs/Web/CSS/background-blend-mode)
