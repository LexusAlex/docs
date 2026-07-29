---
title: "Единицы измерения"
description: Абсолютные, относительные, специальные и контекстные единицы измерения CSS.
outline: deep
---

# Единицы измерения

CSS предоставляет различные единицы для задания размеров, длин и других значений.

## Абсолютные единицы

Не зависят от контекста и других элементов.

| Единица | Описание |
|---|---|
| `px` | Пиксели — основная абсолютная единица |
| `cm` | Сантиметры |
| `mm` | Миллиметры |
| `Q` | Четверти миллиметра |
| `in` | Дюймы (1in = 96px) |
| `pt` | Пункты (1pt = 1/72in) |
| `pc` | Пики (1pc = 12pt) |

```css
/* Абсолютные единицы */
.element {
  width: 300px;
  font-size: 12pt;
  margin: 1in;
}
```

::: tip
В веб-разработке практически всегда используется `px`. Остальные абсолютные единицы предназначены для печати.
:::

## Относительные единицы (шрифт)

Зависят от размера шрифта родителя или самого элемента.

| Единица | Относительно | Описание |
|---|---|---|
| `em` | `font-size` родителя | Каскадное масштабирование |
| `rem` | `font-size` корня (`html`) | Предсказуемое масштабирование |
| `ex` | x-height шрифта | Высота строчной буквы |
| `ch` | ширина `0` | Ширина символа нуля |
| `ic` | ширина `水` (CJK) | Ширина ideографического символа |
| `cap` | cap-height | Высота заглавных букв |
| `lh` | line-height | Высота строки |
| `rlh` | line-height корня | Высота строки корневого элемента |

```css
/* em — каскадное масштабирование */
.parent { font-size: 16px; }
.parent .child { font-size: 1.5em; } /* 24px */
.parent .child .grandchild { font-size: 1.5em; } /* 36px! */

/* rem — от корня, предсказуемо */
html { font-size: 16px; }
.element { font-size: 1.5rem; } /* всегда 24px */
```

::: warning
`em` создают каскадное масштабирование: `1.5em` внутри `1.5em` = `2.25em` от исходного. Используйте `rem` для предсказуемых размеров.
:::

## Относительные единицы (viewport)

Зависят от размеров области просмотра.

| Единица | Относительно | Описание |
|---|---|---|
| `vw` | ширина viewport | 1vw = 1% ширины |
| `vh` | высота viewport | 1vh = 1% высоты |
| `vmin` | меньшая сторона | min(vw, vh) |
| `vmax` | большая сторона | max(vw, vh) |
| `svw`/`svh` | small viewport | Без полосы прокрутки |
| `lvw`/`lvh` | large viewport | С полосой прокрутки |
| `dvw`/`dvh` | dynamic viewport | Адаптивный к адресной строке |

```css
/* Полноэкранный блок */
.hero {
  width: 100vw;
  min-height: 100vh;
}

/* Адаптивный текст */
.title {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

/* Карточка на всю высоту минус header */
.page {
  min-height: 100dvh;
}
```

### Разница между viewport единицами

```css
/* svh — без полосы прокрутки (когда адресная строка скрыта) */
/* lvh — с полосой прокрутки (когда адресная строка видна) */
/* dvh — динамическая (адаптируется к текущему состоянию) */

/* Рекомендация: используйте dvh для высоты */
.container {
  min-height: 100dvh;
}
```

## Контекстные единицы

Зависят от контейнера (Container Queries).

| Единица | Относительно |
|---|---|
| `cqw` | 1% ширины контейнера |
| `cqh` | 1% высоты контейнера |
| `cqi` | 1% inline-размера контейнера |
| `cqb` | 1% block-размера контейнера |
| `cqmin` | min(cqi, cqb) |
| `cqmax` | max(cqi, cqb) |

```css
.card-wrapper {
  container-type: inline-size;
}

.card__title {
  font-size: clamp(1rem, 3cqi, 2rem);
}
```

## Процентные единицы

| Единица | Относительно |
|---|---|
| `%` | Размер родительского элемента |

```css
/* Проценты от ширины родителя */
.column {
  width: 33.33%;
}

/* Проценты padding от ширины САМОГО элемента */
.box {
  width: 300px;
  padding-top: 50%; /* 150px — создаёт квадрат */
}
```

::: info
`padding-top` в процентах считается от **ширины самого элемента**, а не от высоты родителя. Это позволяет создавать квадратные элементы с фиксированным соотношением сторон.
:::

## CSS-функции для размеров

```css
/* clamp() — значение в диапазоне */
.title {
  font-size: clamp(1rem, 2.5vw, 3rem); /* минимум, предпочтение, максимум */
}

/* min() — меньшее из значений */
.container {
  width: min(1200px, 100% - 2rem);
}

/* max() — большее из значений */
.element {
  min-width: max(300px, 50%);
}

/* calc() — вычисления */
.sidebar {
  width: calc(100% - 300px);
  margin-top: calc(1rem + 2vw);
}

/* fit-content() — до max-width, но не шире содержимого */
.nav {
  width: fit-content(200px);
}
```

## Сравнение

| Сценарий | Рекомендация |
|---|---|
| Размер шрифта | `rem` (глобальная шкала) |
| Внутренние отступы компонента | `em` (масштабируется с текстом) |
| Gap, margin | `rem` или `em` |
| Ширина контейнера | `%`, `vw`, `clamp()` |
| Высота на всю страницу | `100dvh` |
| Адаптивный размер | `clamp(min, предпочтение, max)` |
| Квадратный элемент | `aspect-ratio: 1` или `padding-top: 100%` |

## Ссылки

- [MDN: CSS Units](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units)
- [MDN: em](https://developer.mozilla.org/en-US/docs/Web/CSS/length#em)
- [MDN: rem](https://developer.mozilla.org/en-US/docs/Web/CSS/length#rem)
- [MDN: vw/vh](https://developer.mozilla.org/en-US/docs/Web/CSS/length#viewport-relative_lengths)
- [MDN: Container query length units](https://developer.mozilla.org/en-US/docs/Web/CSS/length#container_query_length_units)
- [CSS Values and Units Level 5](https://www.w3.org/TR/css-values-5/)
