---
title: "Комбинатор общего sibling"
description: "Выбирает все последующие элементы после указанного."
outline: [2, 3]
---

# Комбинатор общего sibling ( general sibling combinator )

Комбинатор общего sibling обозначается символом `~` между двумя селекторами. Он выбирает все элементы, которые идут после указанного элемента и являются его sibling (имеют общего родителя).

## Синтаксис

```css
A ~ B {
  /* стили */
}
```

Элементы `B` выбираются, если они идут **после** `A` (не обязательно сразу) и являются его sibling.

## Примеры

### Все абзацы после заголовка

```css
h2 ~ p {
  margin-left: 1rem;
}
```

```html
<h2>Заголовок</h2>
<p>Первый абзац — будет стилизован</p>
<div>Промежуточный элемент</div>
<p>Второй абзац — тоже будет стилизован</p>
```

### Активное состояние меню

```html
<ul class="tabs">
  <li class="tab active">Вкладка 1</li>
  <li class="tab">Вкладка 2</li>
  <li class="tab">Вкладка 3</li>
</ul>
```

```css
.tab.active ~ .tab {
  opacity: 0.5;
  filter: grayscale(0.5);
}
```

### Формы: стилизация всех полей после первого

```css
input:first-of-type {
  border-radius: 4px 0 0 4px;
}

input:first-of-type ~ input {
  border-radius: 0 4px 4px 0;
  margin-left: -1px;
}
```

### Соседние секции

```css
section.active ~ section {
  opacity: 0.6;
  pointer-events: none;
}
```

## Разница с смежным sibling

```css
/* Только следующий элемент */
h2 + p { margin-top: 0; }

/* Все последующие элементы */
h2 ~ p { margin-top: 0; }
```

## Специфичность

Комбинатор общего sibling **не добавляет** специфичность.

::: tip
Комбинатор `~` полезен для стилизации групп элементов на основе состояния одного из них — например, для вкладок, форм и секций.
:::

## Спецификация

- [CSS Selectors Level 4 — General sibling combinator](https://www.w3.org/TR/selectors-4/#general-sibling-combinators)
