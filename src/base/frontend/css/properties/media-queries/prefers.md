---
title: "prefers-*"
description: "Медиафичи для определения предпочтений пользователя: тема, анимация, контраст, прозрачность."
outline: deep
---

# prefers-* (Предпочтения пользователя)

Медиафичи `prefers-*` позволяют адаптировать стили под настройки операционной системы пользователя.

## prefers-color-scheme

Определяет, использует ли пользователь светлую или тёмную тему.

```css
:root {
  --bg: #ffffff;
  --text: #1a1a1a;
  --border: #e0e0e0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --text: #f0f0f0;
    --border: #333333;
  }
}
```

```css
/* Светлая тема по умолчанию, тёмная — по запросу */
.light-only { display: block; }
.dark-only { display: none; }

@media (prefers-color-scheme: dark) {
  .light-only { display: none; }
  .dark-only { display: block; }
}
```

## prefers-reduced-motion

Определяет, предпочитает ли пользователь уменьшение или отключение анимаций.

| Значение | Описание |
|---|---|
| `no-preference` | Пользователь не установил ограничений |
| `reduce` | Пользователь предпочитает минимум анимаций |

```css
/* Базовые анимации */
.animate {
  transition: transform 0.3s ease;
  animation: fadeIn 0.5s ease;
}

/* Убираем анимации для пользователей с prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .animate {
    transition: none;
    animation: none;
  }

  /* Глобально отключаем все анимации */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

::: warning
Всегда учитывайте `prefers-reduced-motion`. Некоторые пользователи испытывают головокружение или тошноту от анимаций.
:::

## prefers-contrast

Определяет, предпочитает ли пользователь повышенный или пониженный контраст.

| Значение | Описание |
|---|---|
| `no-preference` | Без предпочтений |
| `more` | Повышенный контраст |
| `less` | Пониженный контраст |
| `custom` | Пользовательские настройки контраста |

```css
@media (prefers-contrast: more) {
  :root {
    --border: #000000;
    --text: #000000;
    --bg: #ffffff;
  }

  .card {
    border: 2px solid #000;
    box-shadow: none;
  }
}

@media (prefers-contrast: less) {
  :root {
    --border: #cccccc;
    --text: #444444;
  }
}
```

## prefers-reduced-transparency

Определяет, предпочитает ли пользователь уменьшение прозрачных эффектов.

| Значение | Описание |
|---|---|
| `no-preference` | Без предпочтений |
| `reduce` | Уменьшить прозрачность |

```css
/* Обычный blur */
.modal {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

@media (prefers-reduced-transparency: reduce) {
  .modal {
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: none;
  }
}
```

## prefers-reduced-data

Определяет, предпочитает ли пользователь экономить трафик (Data Saver).

```css
/* Обычные изображения */
.hero {
  background-image: url("hero-highres.webp");
}

@media (prefers-reduced-data: reduce) {
  .hero {
    background-image: url("hero-lowres.webp");
  }

  /* Отключаем предзагрузку изображений */
  img[loading="lazy"] {
    display: none;
  }
}
```

::: info
`prefers-reduced-data` пока не поддерживается во всех браузерах. Следите за статусом на [Can I Use](https://caniuse.com/prefers-reduced-data).
:::

## prefers-reduced-noise

Определяет, предпочитает ли пользователь уменьшение визуального «шума» (текстуры, гранулярность).

```css
/* Гладкий фон по умолчанию */
.surface {
  background: var(--surface-color);
}

@media (prefers-reduced-noise: reduce) {
  .surface {
    background-image: none;
  }
}
```

::: info
`prefers-reduced-noise` — Level 6 спецификации. Пока не поддерживается основными браузерами.
:::

## Комбинация медиафичей

```css
/* Тёмная тема + повышенный контраст */
@media (prefers-color-scheme: dark) and (prefers-contrast: more) {
  :root {
    --bg: #000000;
    --text: #ffffff;
    --border: #ffffff;
  }
}

/* Тёмная тема + без анимаций */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --text: #f0f0f0;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
```

## Ссылки

- [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [MDN: prefers-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast)
- [MDN: prefers-reduced-transparency](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency)
- [MDN: prefers-reduced-data](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-data)
- [CSS Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/)
