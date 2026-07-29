---
title: Глобальные ключевые слова CSS
description: Ключевые слова initial, inherit, unset, revert и revert-layer для управления наследованием и каскадом
---

# Initial, inherit, unset, revert

:::info
Глобальные ключевые слова CSS позволяют управлять наследованием и каскадом стилей. Они применяются к любому CSS-свойству и определяют, как значение свойства вычисляется.
:::

## Ключевые слова

| Ключевое слово | Описание |
|----------------|----------|
| `initial` | Сбрасывает свойство к значению по спецификации |
| `inherit` | Свойство наследует значение родительского элемента |
| `unset` | Наследуемые свойства → `inherit`, ненаследуемые → `initial` |
| `revert` | Откатывает к стилям user-agent (браузера) |
| `revert-layer` | Откатывает к предыдущему каскадному слою |

## initial

Сбрасывает свойство к значению, определённому в спецификации CSS.

```css
.element {
  color: initial;       /* Сброс к цвету по умолчанию (обычно black) */
  font-size: initial;   /* Сброс к medium (обычно 16px) */
  margin: initial;      /* Сброс к 0 */
  display: initial;     /* Сброс к inline */
}
```

:::tip
`initial` полезен, когда нужно сбросить конкретное свойство к значению по умолчанию, не затрагивая другие.
:::

### Пример: сброс отступов

```css
/* Убираем только margin, оставляя padding и border */
.reset-margin {
  margin: initial;
}

/* Убираем все отступы */
.reset-spacing {
  margin: initial;
  padding: initial;
}
```

## inherit

Принудительно наследует значение от родительского элемента.

```css
.parent {
  color: blue;
  font-size: 20px;
}

.child {
  color: inherit;        /* Наследует blue от родителя */
  font-size: inherit;    /* Наследует 20px от родителя */
}
```

### Пример: ссылки в навигации

```css
.nav {
  color: white;
}

.nav a {
  color: inherit;        /* Ссылки наследуют белый цвет */
  text-decoration: none;
}
```

### Пример: принудительное наследование

```css
/* Переопределяем стили по умолчанию */
ul {
  list-style: none;
  padding: 0;
}

ul li {
  list-style: inherit;   /* Восстанавливаем маркеры */
}
```

## unset

Комбинирует поведение `initial` и `inherit`:
- Наследуемые свойства → `inherit`
- Наследуемые свойства → `inherit`
- Наследуемые свойства → `inherit`
- Наследуемые свойства → `inherit`

```css
/* Наследуемое свойство: color */
.unset-color {
  color: unset;          /*=color: inherit */
}

/* Ненаследуемое свойство: background-color */
.unset-bg {
  background-color: unset;  /* background-color: initial */
}
```

### Пример: сброс стилей формы

```css
/* Убираем стили формы, сохраняя наследуемые */
form {
  all: unset;
  font: inherit;
  color: inherit;
}

input {
  all: unset;
  font: inherit;
  color: inherit;
}
```

:::info
`unset` часто используется для удаления стандартных стилей формы (margin, padding, border), которые браузер применяет по умолчанию.
:::

## revert

Откатывает свойство к стилям user-agent (браузера). Это позволяет вернуть поведение по умолчанию для конкретного свойства.

```css
/* Откатываем стили формы к поведению браузера */
.reverted-input {
  all: revert;
}

/* Откатываем конкретное свойство */
.custom-button {
  background-color: revert;
  border: revert;
  padding: revert;
}
```

### Пример: возврат стилей по умолчанию

```css
/* Браузерные стили для заголовков */
.reverted-heading {
  font-weight: bold;
  font-size: revert;
  margin: revert;
}
```

## revert-layer

Откатывает свойство к предыдущему каскадному слою. Используется с `@layer`.

```css
@layer base {
  .element {
    color: blue;
  }
}

@layer theme {
  .element {
    color: red;
    color: revert-layer;  /* Откатывает к blue из base */
  }
}
```

### Пример: каскадные слои

```css
@layer reset {
  * {
    margin: 0;
    padding: 0;
  }
}

@layer components {
  .button {
    all: unset;
    color: revert-layer;  /* Восстанавливаем из reset */
  }
}
```

## Практические примеры

### Сброс стилей для изоляции компонента

```css
/* Полная изоляция компонента */
.isolated-widget {
  all: initial;
  font-family: system-ui, sans-serif;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}
```

### Восстановление наследуемых свойств

```css
/* Убираем стили, но сохраняем наследование */
.stripped {
  all: unset;
  font: inherit;
  color: inherit;
}
```

### Сброс формы к поведению браузера

```css
/* Убираем авторские стили, возвращаем браузерные */
.default-form {
  all: revert;
}
```

## Разница между ключевыми словами

```css
/* initial: значение по спецификации */
.a { color: initial; }

/* inherit: значение родителя */
.b { color: inherit; }

/* unset: гибкий сброс */
.c { color: unset; }

/* revert: откат к user-agent */
.d { color: revert; }
```

:::tip
Для полного сброса стилей используйте `all: initial` или `all: unset`. Для восстановления браузерных стилей — `all: revert`.
:::

## Связанные темы

- [all](all.md)

## Ссылки

- [MDN: Каскад и наследование](https://developer.mozilla.org/ru/docs/Web/CSS/Cascade)
- [MDN: initial](https://developer.mozilla.org/ru/docs/Web/CSS/initial)
- [MDN: inherit](https://developer.mozilla.org/ru/docs/Web/CSS/inherit)
- [MDN: unset](https://developer.mozilla.org/ru/docs/Web/CSS/unset)
- [MDN: revert](https://developer.mozilla.org/ru/docs/Web/CSS/revert)
- [MDN: revert-layer](https://developer.mozilla.org/ru/docs/Web/CSS/revert-layer)
- [W3C: Cascading and Inheritance](https://drafts.csswg.org/css-cascade-5/#inherit-initial)
