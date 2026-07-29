---
title: "Каскад и наследование"
description: Порядок разрешения конфликтов CSS-правил, наследование и специфичность.
outline: deep
---

# Каскад и наследование

Каскад — фундаментальный механизм CSS, определяющий, какое правило применяется, когда несколько правил конфликтуют.

## Порядок каскада (Cascade Layers)

CSS-правила разрешаются в следующем порядке (от низшего к высшему):

1. **Пользовательские агентские стили** (браузер по умолчанию)
2. **Пользовательские нормальные стили** (User styles)
3. **Авторские нормальные стили** (Developer styles)
4. **Авторские `!important` стили**
5. **Пользовательские `!important` стили**
6. **Агентские `!important` стили**

## Специфичность (Specificity)

Специфичность определяет, какой из конфликтующих селекторов имеет больший вес. Вычисляется как тройка чисел `(a, b, c)`:

| Уровень | Тип | Специфичность | Пример |
|---|---|---|---|
| `a` | Селектор ID | `1-0-0` | `#header` |
| `b` | Селектор класса, атрибута, псевдокласса | `0-1-0` | `.btn`, `[type="text"]`, `:hover` |
| `c` | Селектор типа, псевдоэлемента | `0-0-1` | `div`, `::before` |

```css
/* 0-0-1 */
p { color: black; }

/* 0-1-0 — победит */
.text { color: blue; }

/* 1-0-0 — победит */
#main { color: red; }
```

### Функциональные псевдоклассы и специфичность

| Псевдокласс | Специфичность |
|---|---|
| `:not(S)` | = специфичность аргумента `S` |
| `:is(S)` | = самый специфичный из аргументов |
| `:where()` | всегда `0-0-0` |
| `:has(S)` | = специфичность аргумента `S` |

```css
/* :where() не добавляет специфичность */
:where(p) { color: red; } /* 0-0-0 */

/* :is() берёт специфичность аргумента */
:is(.card, p) { color: blue; } /* 0-1-0 (класс > тег) */
```

## Наследование (Inheritance)

Многие CSS-свойства наследуются от родительского элемента к дочерним.

### Наследуемые свойства

`color`, `font-*`, `line-height`, `text-align`, `text-indent`, `text-shadow`, `letter-spacing`, `word-spacing`, `visibility`, `cursor`, `direction`, `white-space`, `list-style-*`, `quotes`

### Ненаследуемые свойства

`display`, `position`, `width`, `height`, `margin`, `padding`, `border`, `background`, `overflow`, `z-index`, `opacity`, `transform`, `transition`

### Управление наследованием

```css
/* Принудительное наследование */
.child {
  color: inherit; /* берёт значение родителя */
}

/* Сброс к значению по умолчанию */
.element {
  color: initial; /* значение по спецификации */
}

/* Универсальный сброс */
.reset {
  all: unset; /* inherit для наследуемых, initial для остальных */
}
```

### Ключевые слова наследования

| Ключевое слово | Поведение |
|---|---|
| `inherit` | Наследует значение родителя |
| `initial` | Устанавливает значение по спецификации |
| `unset` | Наследуемые → `inherit`, остальные → `initial` |
| `revert` | Откатывает к стилям предыдущего уровня каскада |
| `revert-layer` | Откатывает к предыдущему слою |

## `!important`

Ключевое слово `!important` увеличивает приоритет правила, делая его более приоритетным.

```css
/* Обычное правило */
.text { color: black; } /* специфичность 0-1-0 */

/* !important побеждает */
.text { color: blue !important; } /* побеждает всё кроме другого !important */
```

::: warning
Избегайте `!important` — он ломает естественный каскад и затрудняет поддержку. Используйте только для utility-классов (Tailwind-style) или исправления стилей сторонних библиотек.
:::

### Порядок разрешения !important

```css
/* 1. Авторские normal */
.a { color: red; }

/* 2. Авторские !important */
.b { color: blue !important; } /* побеждает .a */

/* 3. Пользовательские !important (если есть) побеждают авторские */
```

## @layer (Cascade Layers)

`@layer` позволяет явно управлять порядком каскада, разделяя стили на слои.

```css
/* Объявление слоёв (порядок важен!) */
@layer base, components, utilities;

/* Базовые стили — самый низкий приоритет */
@layer base {
  p { margin: 0; }
  h1 { font-size: 2rem; }
}

/* Компоненты — средний приоритет */
@layer components {
  .card { border: 1px solid #eee; }
  .btn { padding: 0.5em 1em; }
}

/* Утилиты — самый высокий приоритет */
@layer utilities {
  .hidden { display: none; }
  .sr-only { position: absolute; width: 1px; height: 1px; }
}
```

### Неименованные слои

```css
/* Правила вне слоя имеют наивысший приоритет среди normal */
p { color: red; } /* вне слоя */

@layer base {
  p { color: blue; } /* будет перекрыто правилом вне слоя */
}
```

### @layer с @import

```css
@import url("reset.css") layer(base);
@import url("components.css") layer(components);
@import url("utilities.css") layer(utilities);
```

### Не-слоёвые стили

```css
/* Внешние библиотеки без слоёв — приоритетнее всех слоёв */
@import url("third-party.css");

/* Ваши стили в слоях */
@layer base, components;

@layer base {
  /* third-party.css перекроет это */
}
```

::: tip
`@layer` решает проблему «specificity wars» — все стили в слое `utilities` перекрывают `components`, независимо от специфичности селекторов.
:::

## Каскад: полный пример

```css
/* 1. Сброс (самый низкий) */
@layer reset {
  * { margin: 0; box-sizing: border-box; }
}

/* 2. Базовые стили */
@layer base {
  p { line-height: 1.6; }
}

/* 3. Компоненты */
@layer components {
  .card { border: 1px solid #eee; }
}

/* 4. Утилиты (самый высокий в каскаде слоёв) */
@layer utilities {
  .hidden { display: none; }
}

/* 5. Вне слоя — перекрывает всё в слоях */
.specific { color: red; }

/* 6. !important — перекрывает всё */
.override { color: blue !important; }
```

## Ссылки

- [MDN: CSS Cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade)
- [MDN: Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
- [MDN: Inheritance](https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance)
- [MDN: @layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
- [CSS Cascading and Inheritance Level 5](https://www.w3.org/TR/css-cascade-5/)
