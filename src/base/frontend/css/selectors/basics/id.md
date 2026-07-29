---
title: "Селектор ID"
description: "Выбирает элемент по значению атрибута id."
outline: [2, 3]
---

# Селектор ID

Селектор ID выбирает ровно один элемент с указанным значением атрибута `id`. Обозначается решёткой `#` перед именем.

## Синтаксис

```css
#main-header {
  background: #333;
  color: #fff;
}
```

## Примеры

### Уникальный элемент

```html
<header id="main-header">Сайт</header>
```

```css
#main-header {
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}
```

### Сцепление ID и класса

```css
#sidebar.active {
  transform: translateX(0);
}
```

### Как ссылка внутри CSS

```css
/* Ссылка на section с id="about" */
#about {
  scroll-margin-top: 4rem;
}
```

```html
<section id="about">О нас</section>
```

## Специфичность

Специфичность селектора ID — `1-0-0`. Это самая высокая специфичность среди простых селекторов.

```css
/* 0-1-0 */
.card { border: 1px solid #ccc; }

/* 1-0-0 — победит */
#featured-card { border: 2px solid gold; }
```

::: warning
Не используйте селекторы ID для стилизации, если планируется повторное использование стилей. Селекторы ID создают проблемы с переиспользованием из-за высокой специфичности и уникальности ID на странице. Предпочитайте классы.
:::

## Спецификация

- [CSS Selectors Level 4 — ID selector](https://www.w3.org/TR/selectors-4/#id-selectors)
