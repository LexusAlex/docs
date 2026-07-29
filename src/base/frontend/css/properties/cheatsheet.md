---
title: Шпаргалка по свойствам CSS
description: Сводная таблица всех основных свойств CSS с категориями и ссылками
outline: deep
---

# Шпаргалка по свойствам CSS

Быстрый справочник по основным свойствам CSS.

:::tip
Наведите на ссылку, чтобы перейти к подробному описанию свойства.
:::

## Модульная раскладка

| Свойство | Описание | Ссылка |
|----------|----------|--------|
| `display` | Тип отображения элемента (block, inline, flex, grid) | [Подробнее](./layout/display) |
| `position` | Тип позиционирования элемента | [Подробнее](./layout/position) |
| `top` / `right` / `bottom` / `left` | Смещение позиционированного элемента | [Подробнее](./layout/inset) |
| `inset` | Shorthand для top/right/bottom/left | [Подробнее](./layout/inset) |
| `z-index` | Порядок наложения элементов | [Подробнее](./layout/z-index) |
| `overflow` | Обработка содержимого за пределами блока | [Подробнее](./layout/overflow) |
| `overflow-x` / `overflow-y` | Обработка содержимого по осям | [Подробнее](./layout/overflow) |
| `visibility` | Видимость элемента (visible/hidden/collapse) | [Подробнее](./layout/visibility) |
| `contain` | Ограничение влияния элемента на layout и рендеринг | [Подробнее](./layout/contain) |
| `content-visibility` | Управление рендерингом содержимого | [Подробнее](./layout/content-visibility) |
| `container-type` | Тип контейнера для Container Queries | [Подробнее](./layout/container-queries) |
| `container-name` | Имя контейнера | [Подробнее](./layout/container-queries) |
| `container` | Shorthand для container-type и container-name | [Подробнее](./layout/container-queries) |
| `scroll-behavior` | Поведение прокрутки (auto/smooth) | [Подробнее](./layout/scroll) |
| `scroll-margin` | Внешний отступ для прокрутки | [Подробнее](./layout/scroll) |
| `scroll-padding` | Внутренний отступ для прокрутки | [Подробнее](./layout/scroll) |
| `scroll-snap-type` | Тип прилипания при прокрутке | [Подробнее](./layout/scroll) |
| `scroll-snap-align` | Выравнивание элемента при прилипании | [Подробнее](./layout/scroll) |
| `overscroll-behavior` | Поведение при переполнении прокрутки | [Подробнее](./layout/scroll) |
| `appearance` | Внешний вид элемента (none для сброса) | [Подробнее](./layout/misc-layout) |
| `zoom` | Масштабирование элемента | [Подробнее](./layout/misc-layout) |
| `color-scheme` | Предпочтительные цветовые схемы | [Подробнее](./layout/misc-layout) |
| `resize` | Разрешение изменения размера | [Подробнее](./layout/misc-layout) |
| `object-fit` | Подгонка содержимого (video/img) в контейнере | [Подробнее](./layout/misc-layout) |
| `object-position` | Позиция содержимого в контейнере | [Подробнее](./layout/misc-layout) |
| `aspect-ratio` | Соотношение сторон элемента | [Подробнее](./layout/misc-layout) |

:::code-group
```css [Flexbox]
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
```

```css [Grid]
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
```

```css [Позиционирование]
.relative { position: relative; }
.absolute {
  position: absolute;
  top: 0;
  right: 0;
}
```
:::

## Блочная модель

| Свойство | Описание | Ссылка |
|----------|----------|--------|
| `width` / `height` | Ширина и высота элемента | [Подробнее](./box-model/sizing) |
| `min-width` / `min-height` | Минимальные размеры | [Подробнее](./box-model/sizing) |
| `max-width` / `max-height` | Максимальные размеры | [Подробнее](./box-model/sizing) |
| `box-sizing` | Модель расчета размеров (content-box / border-box) | [Подробнее](./box-model/sizing) |
| `margin` | Внешние отступы | [Подробнее](./box-model/margin) |
| `margin-top` / `margin-right` / `margin-bottom` / `margin-left` | Внешние отступы по сторонам | [Подробнее](./box-model/margin) |
| `padding` | Внутренние отступы | [Подробнее](./box-model/padding) |
| `padding-top` / `padding-right` / `padding-bottom` / `padding-left` | Внутренние отступы по сторонам | [Подробнее](./box-model/padding) |
| `border` | Рамка элемента | [Подробнее](./box-model/border) |
| `border-width` | Толщина рамки | [Подробнее](./box-model/border) |
| `border-style` | Стиль рамки (solid, dashed, dotted) | [Подробнее](./box-model/border) |
| `border-color` | Цвет рамки | [Подробнее](./box-model/border) |
| `border-radius` | Скругление углов | [Подробнее](./box-model/border) |
| `border-top` / `border-right` / `border-bottom` / `border-left` | Рамка по сторонам | [Подробнее](./box-model/border) |
| `border-block` / `border-inline` | Рамка по block/inline осям | [Подробнее](./box-model/border) |
| `outline` | Контур вокруг элемента | [Подробнее](./box-model/outline) |
| `outline-width` | Толщина контура | [Подробнее](./box-model/outline) |
| `outline-style` | Стиль контура | [Подробнее](./box-model/outline) |
| `outline-color` | Цвет контура | [Подробнее](./box-model/outline) |
| `outline-offset` | Смещение контура от элемента | [Подробнее](./box-model/outline) |

```css
/* Box Model */
.card {
  box-sizing: border-box;
  width: 300px;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 0.5rem;
}
```

## Флексбокс

| Свойство | Описание | Ссылка |
|----------|----------|--------|
| `flex-direction` | Направление основной оси (row/column) | [Подробнее](./flexbox/flex-flow) |
| `flex-wrap` | Перенос элементов (nowrap/wrap) | [Подробнее](./flexbox/flex-flow) |
| `flex-flow` | Shorthand для flex-direction и flex-wrap | [Подробнее](./flexbox/flex-flow) |
| `flex-grow` | Коэффициент расширения элемента | [Подробнее](./flexbox/flex) |
| `flex-shrink` | Коэффициент сжатия элемента | [Подробнее](./flexbox/flex) |
| `flex-basis` | Начальный размер элемента перед распределением | [Подробнее](./flexbox/flex) |
| `flex` | Shorthand для grow/shrink/basis | [Подробнее](./flexbox/flex) |
| `justify-content` | Выравнивание вдоль основной оси | [Подробнее](./flexbox/alignment) |
| `align-items` | Выравнивание вдоль поперечной оси | [Подробнее](./flexbox/alignment) |
| `align-self` | Выравнивание отдельного элемента по поперечной оси | [Подробнее](./flexbox/alignment) |
| `align-content` | Выравнивание строк по поперечной оси | [Подробнее](./flexbox/alignment) |
| `place-content` | Shorthand для justify-content и align-content | [Подробнее](./flexbox/alignment) |
| `place-items` | Shorthand для justify-items и align-items | [Подробнее](./flexbox/alignment) |
| `gap` | Размер зазора между элементами | [Подробнее](./flexbox/gap) |
| `row-gap` | Зазор между строками | [Подробнее](./flexbox/gap) |
| `column-gap` | Зазор между колонками | [Подробнее](./flexbox/gap) |
| `order` | Порядок элемента в контейнере | [Подробнее](./flexbox/order) |

## CSS Grid

| Свойство | Описание | Ссылка |
|----------|----------|--------|
| `grid-template-columns` | Определение колонок | [Подробнее](./grid/grid-template) |
| `grid-template-rows` | Определение строк | [Подробнее](./grid/grid-template) |
| `grid-template-areas` | Именование областей сетки | [Подробнее](./grid/grid-template) |
| `grid-template` | Shorthand для template-columns/rows/areas | [Подробнее](./grid/grid-template) |
| `grid-auto-columns` | Размер неявных колонок | [Подробнее](./grid/grid-auto) |
| `grid-auto-rows` | Размер неявных строк | [Подробнее](./grid/grid-auto) |
| `grid-auto-flow` | Автоматическое размещение элементов | [Подробнее](./grid/grid-auto) |
| `grid-column` | Размещение элемента по колонкам | [Подробнее](./grid/grid-placement) |
| `grid-row` | Размещение элемента по строкам | [Подробнее](./grid/grid-placement) |
| `grid-area` | Размещение элемента по именованной области | [Подробнее](./grid/grid-placement) |
| `grid-column-start` / `grid-column-end` | Начало и конец колонки | [Подробнее](./grid/grid-placement) |
| `grid-row-start` / `grid-row-end` | Начало и конец строки | [Подробнее](./grid/grid-placement) |
| `justify-items` | Выравнивание по block-оси внутри ячейки | [Подробнее](./grid/alignment) |
| `align-items` | Выравнивание по inline-оси внутри ячейки | [Подробнее](./grid/alignment) |
| `justify-self` | Выравнивание отдельного элемента по block-оси | [Подробнее](./grid/alignment) |
| `align-self` | Выравнивание отдельного элемента по inline-оси | [Подробнее](./grid/alignment) |
| `justify-content` | Выравнивание сетки внутри контейнера по block-оси | [Подробнее](./grid/alignment) |
| `align-content` | Выравнивание сетки внутри контейнера по inline-оси | [Подробнее](./grid/alignment) |
| `place-content` | Shorthand для justify-content и align-content | [Подробнее](./grid/alignment) |
| `place-items` | Shorthand для justify-items и align-items | [Подробнее](./grid/alignment) |
| `gap` | Размер зазора между ячейками | [Подробнее](./grid/alignment) |
| `row-gap` | Зазор между строками | [Подробнее](./grid/alignment) |
| `column-gap` | Зазор между колонками | [Подробнее](./grid/alignment) |

## Типографика

| Свойство | Описание | Ссылка |
|----------|----------|--------|
| `font-family` | Семейство шрифта | [Подробнее](./typography/font) |
| `font-size` | Размер шрифта | [Подробнее](./typography/font) |
| `font-weight` | Толщина шрифта (100–900, normal, bold) | [Подробнее](./typography/font) |
| `font-style` | Стиль шрифта (normal, italic, oblique) | [Подробнее](./typography/font) |
| `font-variant` | Вариант шрифта (small-caps и др.) | [Подробнее](./typography/font) |
| `font-feature-settings` | OpenType-особенности шрифта | [Подробнее](./typography/font) |
| `font` | Shorthand для font-family/size/weight/style/variant/line-height | [Подробнее](./typography/font) |
| `line-height` | Межстрочный интервал | [Подробнее](./typography/font) |
| `text-align` | Выравнивание текста (left/center/right/justify) | [Подробнее](./typography/text) |
| `text-align-last` | Выравнивание последней строки | [Подробнее](./typography/text) |
| `text-indent` | Отступ первой строки | [Подробнее](./typography/text) |
| `text-decoration` | Оформление текста (underline, line-through) | [Подробнее](./typography/text) |
| `text-decoration-color` | Цвет декорации | [Подробнее](./typography/text) |
| `text-decoration-style` | Стиль декорации (solid, dashed, wavy) | [Подробнее](./typography/text) |
| `text-decoration-thickness` | Толщина декорации | [Подробнее](./typography/text) |
| `text-underline-offset` | Смещение подчёркивания | [Подробнее](./typography/text) |
| `text-transform` | Преобразование текста (uppercase, lowercase, capitalize) | [Подробнее](./typography/text) |
| `text-shadow` | Тень текста | [Подробнее](./typography/text) |
| `text-overflow` | Обработка переполнения текста (ellipsis, clip) | [Подробнее](./typography/text) |
| `letter-spacing` | Межбуквенный интервал | [Подробнее](./typography/spacing) |
| `word-spacing` | Межсловный интервал | [Подробнее](./typography/spacing) |
| `white-space` | Обработка пробелов и переносов строк | [Подробнее](./typography/white-space) |
| `word-break` | Правила переноса слов | [Подробнее](./typography/white-space) |
| `overflow-wrap` | Перенос длинных слов | [Подробнее](./typography/white-space) |
| `hyphens` | Автоматические переносы | [Подробнее](./typography/white-space) |
| `color` | Цвет текста | [Подробнее](./typography/color) |
| `tab-size` | Размер табуляции | [Подробнее](./typography/white-space) |
| `writing-mode` | Направление текста (horizontal-tb, vertical-rl) | [Подробнее](./typography/text) |
| `direction` | Направление текста (ltr, rtl) | [Подробнее](./typography/text) |
| `unicode-bidi` | Обработка bidirectional текста | [Подробнее](./typography/text) |

```css
/* Typography */
body {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #1a1a1a;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

## Фоны

| Свойство | Описание | Ссылка |
|----------|----------|--------|
| `background-color` | Цвет фона | [Подробнее](./background/background) |
| `background-image` | Изображение или градиент фона | [Подробнее](./background/background) |
| `background-position` | Позиция фона | [Подробнее](./background/background) |
| `background-size` | Размер фона | [Подробнее](./background/background) |
| `background-repeat` | Повторение фона | [Подробнее](./background/background) |
| `background-attachment` | Поведение фона при прокрутке | [Подробнее](./background/background) |
| `background-origin` | Начальная точка позиционирования фона | [Подробнее](./background/background) |
| `background-clip` | Область отображения фона | [Подробнее](./background/background) |
| `background` | Shorthand для всех background-свойств | [Подробнее](./background/background) |

## Цвета и прозрачность

| Свойство | Описание | Ссылка |
|----------|----------|--------|
| `color` | Цвет текста и контента | [Подробнее](./typography/color) |
| `opacity` | Прозрачность элемента (0–1) | [Подробнее](./color/opacity) |
| `--custom-property` | CSS-переменные (кастомные свойства) | [Подробнее](./color/custom-properties) |

:::info Функции цвета
Для задания цветов используются функции: `rgb()`, `rgba()`, `hsl()`, `hsla()`, `oklch()`, `oklab()`, `color()`. Подробнее: [Функции цвета](./color/color-functions).
:::

## Визуальные эффекты

| Свойство | Описание | Ссылка |
|----------|----------|--------|
| `box-shadow` | Тень элемента | [Подробнее](./visual-effects/box-shadow) |
| `filter` | Фильтры (blur, brightness, contrast, grayscale) | [Подробнее](./visual-effects/filter) |
| `backdrop-filter` | Фильтры на фоне позади элемента | [Подробнее](./visual-effects/filter) |
| `clip-path` | Обрезка элемента по контуру | [Подробнее](./visual-effects/clip-path) |
| `mask` | Маскирование элемента | [Подробнее](./visual-effects/mask) |
| `mask-image` | Изображение маски | [Подробнее](./visual-effects/mask) |

```css
/* Shadows */
.card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

/* Filters */
.blur { filter: blur(4px); }
.grayscale { filter: grayscale(100%); }
.brightness { filter: brightness(1.2); }

/* Clip-path */
.avatar {
  clip-path: circle(50%);
}
```

## 2D/3D-трансформации

| Свойство | Описание | Ссылка |
|----------|----------|--------|
| `transform` | 2D/3D-трансформации (rotate, scale, translate, skew) | [Подробнее](./transform/transform) |
| `transform-origin` | Точка трансформации | [Подробнее](./transform/transform) |
| `perspective` | Глубина 3D-пространства | [Подробнее](./transform/perspective) |
| `perspective-origin` | Точка наблюдения 3D-пространства | [Подробнее](./transform/perspective) |
| `transform-style` | Сохранение 3D-контекста (preserve-3d) | [Подробнее](./transform/transform) |
| `backface-visibility` | Видимость задней грани при повороте | [Подробнее](./transform/transform) |

## Анимации и переходы

| Свойство | Описание | Ссылка |
|----------|----------|--------|
| `transition` | Анимация перехода между состояниями | [Подробнее](./transition-animation/transition) |
| `transition-property` | Какое свойство анимировать | [Подробнее](./transition-animation/transition) |
| `transition-duration` | Длительность перехода | [Подробнее](./transition-animation/transition) |
| `transition-timing-function` | Функция ускорения | [Подробнее](./transition-animation/transition) |
| `transition-delay` | Задержка перед началом перехода | [Подробнее](./transition-animation/transition) |
| `animation` | Запуск ключевых анимаций | [Подробнее](./transition-animation/animation) |
| `animation-name` | Имя анимации (@keyframes) | [Подробнее](./transition-animation/animation) |
| `animation-duration` | Длительность анимации | [Подробнее](./transition-animation/animation) |
| `animation-timing-function` | Функция ускорения анимации | [Подробнее](./transition-animation/animation) |
| `animation-delay` | Задержка перед началом анимации | [Подробнее](./transition-animation/animation) |
| `animation-iteration-count` | Количество повторений (infinite) | [Подробнее](./transition-animation/animation) |
| `animation-direction` | Направление анимации (normal, reverse, alternate) | [Подробнее](./transition-animation/animation) |
| `animation-fill-mode` | Поведение до/после анимации (forwards, backwards) | [Подробнее](./transition-animation/animation) |
| `animation-play-state` | Состояние анимации (running, paused) | [Подробнее](./transition-animation/animation) |
| `@keyframes` | Определение ключевых кадров анимации | [Подробнее](./transition-animation/keyframes) |

```css
/* Transition */
.button {
  transition: background-color 0.2s ease, transform 0.1s ease;
}
.button:hover {
  transform: translateY(-1px);
}
.button:active {
  transform: translateY(0);
}

/* Animation */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.card {
  animation: fade-in 0.3s ease-out;
}
```

## Курсор и взаимодействие

| Свойство | Описание | Ссылка |
|----------|----------|--------|
| `cursor` | Тип курсора (pointer, text, grab) | [Подробнее](./cursor-and-pointer/cursor) |
| `pointer-events` | Реакция на события указателя | [Подробнее](./cursor-and-pointer/pointer-events) |
| `touch-action` | Обработка касаний (manipulation, pan-y) | [Подробнее](./cursor-and-pointer/touch-action) |
| `user-select` | Выделение текста (none, text, all) | [Подробнее](./cursor-and-pointer/user-select) |

## Списки и счётчики

| Свойство | Описание | Ссылка |
|----------|----------|--------|
| `list-style-type` | Тип маркера списка (disc, circle, square, none) | [Подробнее](./lists-and-counters/list-style) |
| `list-style-position` | Позиция маркера (inside, outside) | [Подробнее](./lists-and-counters/list-style) |
| `list-style-image` | Изображение маркера | [Подробнее](./lists-and-counters/list-style) |
| `list-style` | Shorthand для list-style-* | [Подробнее](./lists-and-counters/list-style) |
| `counter-reset` | Сброс счётчика | [Подробнее](./lists-and-counters/counter) |
| `counter-increment` | Увеличение счётчика | [Подробнее](./lists-and-counters/counter) |
| `counter()` | Использование счётчика в контенте | [Подробнее](./lists-and-counters/counter) |

## Таблицы

| Свойство | Описание | Ссылка |
|----------|----------|--------|
| `table-layout` | Алгоритм раскладки таблицы (auto, fixed) | [Подробнее](./table/table-layout) |
| `border-collapse` | Слияние рамок ячеек | [Подробнее](./table/border-collapse) |
| `border-spacing` | Расстояние между рамками ячеек | [Подробнее](./table/border-collapse) |
| `caption-side` | Позиция заголовка таблицы (top, bottom) | [Подробнее](./table/caption-side) |
| `empty-cells` | Отображение пустых ячеек | [Подробнее](./table/empty-cells) |

## Мультиколонки

| Свойство | Описание | Ссылка |
|----------|----------|--------|
| `columns` | Количество и ширина колонок | [Подробнее](./columns/columns) |
| `column-count` | Количество колонок | [Подробнее](./columns/columns) |
| `column-width` | Ширина колонки | [Подробнее](./columns/columns) |
| `column-gap` | Зазор между колонками | [Подробнее](./columns/columns) |
| `column-rule` | Линия-разделитель между колонками | [Подробнее](./columns/columns) |
| `column-span` | Объединение колонок (all, none) | [Подробнее](./columns/columns) |

## Печать и страницы

| Свойство | Описание | Ссылка |
|----------|----------|--------|
| `page-break-before` | Разрыв страницы перед элементом | [Подробнее](./paged-media/break) |
| `page-break-after` | Разрыв страницы после элемента | [Подробнее](./paged-media/break) |
| `page-break-inside` | Разрыв внутри элемента (avoid) | [Подробнее](./paged-media/break) |
| `break-before` | Современный разрыв перед элементом | [Подробнее](./paged-media/break) |
| `break-after` | Современный разрыв после элемента | [Подробнее](./paged-media/break) |
| `break-inside` | Современный разрыв внутри элемента | [Подробнее](./paged-media/break) |
| `orphans` | Минимум строк в конце страницы | [Подробнее](./paged-media/orphans-widows) |
| `widows` | Минимум строк в начале страницы | [Подробнее](./paged-media/orphans-widows) |

## Разное

| Свойство | Описание | Ссылка |
|----------|----------|--------|
| `will-change` | Подготовка к анимации (opacity, transform) | [Подробнее](./misc/will-change) |
| `all` | Сброс всех свойств (initial/inherit/unset) | [Подробнее](./misc/all) |
| `initial` | Установка начального значения | [Подробнее](./misc/initial) |
| `inherit` | Наследование значения от родителя | [Подробнее](./misc/initial) |
| `unset` | Сброс на наследуемое или начальное | [Подробнее](./misc/initial) |
| `revert` | Откат к предыдущему каскадному значению | [Подробнее](./misc/initial) |
