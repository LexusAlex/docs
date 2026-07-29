---
title: Scroll-свойства
description: Управление поведением прокрутки, отступами и привязкой к snapshots.
outline: deep
---

# Scroll-свойства

Свойства для управления прокруткой: поведение при якорных переходах, отступы при прокрутке к элементу, привязка к snapshots и контекст стекления.

## Поведение прокрутки

### scroll-behavior

Определяет, как происходит плавная прокрутка при навигации (якоря, `scrollTo`, `scrollIntoView`).

| Значение | Описание |
|---|---|
| `auto` | Мгновенная прокрутка (по умолчанию) |
| `smooth` | Плавная анимированная прокрутка |

```css
html {
  scroll-behavior: smooth;
}
```

```html
<!-- Плавный переход к секции -->
<a href="#about">О нас</a>
...
<section id="about">О нас</section>
```

::: tip
`scroll-behavior: smooth` на `html` применяется ко всем программным прокруткам на странице. Для избирательного воздействия задавайте на конкретных контейнерах.
:::

## Отступы при прокрутке

### scroll-margin

Задаёт **внешний** отступ вокруг элемента, используемый при прокрутке к нему. Аналог `margin`, но только для scroll-snap и якорных переходов.

| Свойство | Описание |
|---|---|
| `scroll-margin` | Shorthand (1–4 значения) |
| `scroll-margin-top` | Отступ сверху |
| `scroll-margin-right` | Отступ справа |
| `scroll-margin-bottom` | Отступ снизу |
| `scroll-margin-left` | Отступ слева |
| `scroll-margin-block` | Отступ по block-оси |
| `scroll-margin-inline` | Отступ по inline-оси |

```css
section {
  scroll-margin-top: 80px; /* компенсация фиксированного header */
}
```

### scroll-padding

Задаёт **внутренний** отступ контейнера прокрутки, определяя целевую область для scroll-snap.

| Свойство | Описание |
|---|---|
| `scroll-padding` | Shorthand |
| `scroll-padding-top` | Отступ сверху |
| `scroll-padding-right` | Отступ справа |
| `scroll-padding-bottom` | Отступ снизу |
| `scroll-padding-left` | Отступ слева |
| `scroll-padding-block` | По block-оси |
| `scroll-padding-inline` | По inline-оси |

```css
.scroll-container {
  scroll-padding-top: 60px;
}
```

### Разница scroll-margin vs scroll-padding

```css
/* scroll-margin — вокруг элемента (snap target) */
section {
  scroll-margin-top: 20px;
}

/* scroll-padding — внутри контейнера прокрутки */
.scroll-wrapper {
  scroll-padding-top: 60px;
}
```

::: info
`scroll-margin` задаётся на **snap-цели** (элементе, к которому прокручиваем). `scroll-padding` задаётся на **контейнере прокрутки** (родителе со `overflow: auto/scroll`).
:::

## Scroll Snap

### scroll-snap-type

Определяет, как контейнер прокрутки привязывается к snap-точкам.

| Значение | Описание |
|---|---|
| `none` | Привязка отключена (по умолчанию) |
| `x` | Привязка по горизонтальной оси |
| `y` | Привязка по вертикальной оси |
| `block` | По block-оси |
| `inline` | По inline-оси |
| `both` | По обеим осям |
| `mandatory` | Прокрутка всегда останавливается на snap-точке |
| `proximity` | Останавливается, если snap-точка близко |

```css
/* Вертикальная привязка с обязательной остановкой */
.scroll-container {
  scroll-snap-type: y mandatory;
}

/* Горизонтальная карусель с мягкой привязкой */
.carousel {
  scroll-snap-type: x proximity;
}
```

### scroll-snap-align

Определяет, какая часть элемента является snap-точкой.

| Значение | Описание |
|---|---|
| `none` | Не является snap-точкой |
| `start` | Начало элемента |
| `end` | Конец элемента |
| `center` | Центр элемента |

```css
.slide {
  scroll-snap-align: center;
  min-width: 100%;
  min-height: 100vh;
}
```

### scroll-snap-stop

Определяет, можно ли «проскакивать» snap-точки при быстрой прокрутке.

| Значение | Описание |
|---|---|
| `normal` | Можно проскакивать (по умолчанию) |
| `always` | Нельзя проскакивать — каждая snap-точка обязательна |

```css
.slide {
  scroll-snap-stop: always;
}
```

### scroll-snap-points (устаревшее)

::: warning
`scroll-snap-points-x` и `scroll-snap-points-y` устарели. Используйте `scroll-snap-type` на контейнере и `scroll-snap-align` на элементах.
:::

## Примеры

### Карусель

```css
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 1rem;
  padding: 1rem;
}

.carousel__slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
}
```

### Навигация с фиксированным header

```css
html {
  scroll-behavior: smooth;
}

header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 60px;
}

section {
  scroll-margin-top: 60px;
}
```

### Прокрутка к секциям

```css
.scroll-wrapper {
  height: 400px;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-padding-top: 60px;
}

.scroll-section {
  scroll-snap-align: start;
  min-height: calc(100% - 60px);
}
```

### CSS-только табы

```css
.tabs {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.tab {
  scroll-snap-align: start;
  flex: 0 0 100%;
}
```

## Ссылки

- [MDN: scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)
- [MDN: scroll-margin](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin)
- [MDN: scroll-padding](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding)
- [MDN: scroll-snap-type](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type)
- [MDN: scroll-snap-align](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align)
- [MDN: scroll-snap-stop](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop)
- [CSS Scroll Snap Module Level 1](https://www.w3.org/TR/css-scroll-snap-1/)
