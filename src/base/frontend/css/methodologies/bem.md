---
title: БЭМ
description: Методология БЭМ (Block, Element, Modifier) для структурирования CSS-кода
---

# БЭМ

:::info
БЭМ (Block, Element, Modifier) — методология организации CSS-кода, разработанная компанией Яндекс. Позволяет создавать переиспользуемые компоненты с понятной структурой и уникальными именами.
:::

## Основные концепции

### Блок (Block)

Независимая сущность, которая может использоваться отдельно или в составе других блоков.

```css
/* Примеры блоков */
.header { }
.form { }
.card { }
.menu { }
.button { }
```

### Элемент (Element)

Часть блока, которая не может использоваться самостоятельно за пределами блока.

```css
/* Элементы блока */
.card__title { }
.card__image { }
.card__description { }
.menu__item { }
.menu__icon { }
```

:::info
Элементы отделяются от блока двойным подчёркиванием (`__`).
:::

### Модификатор (Modifier)

Вариация или состояние блока/элемента.

```css
/* Модификаторы блока */
.btn--primary { }
.btn--secondary { }
.menu--dark { }
.menu--horizontal { }

/* Модификаторы элемента */
.menu__item--active { }
.card__title--large { }
```

:::info
Модификаторы отделяются двойным дефисом (`--`).
:::

## Структура файлов

```
block/
├── block.css           /* Стили блока */
├── block__element.css  /* Стили элемента */
├── block--modifier.css /* Стили модификатора */
├── block.mod.css       /* Стили модификатора (альтернатива) */
```

### Именование файлов

```
button/
├── button.css
├── button__icon.css
├── button--primary.css
├── button--large.css
```

:::tip
Рекомендуется разделять стили блоков, элементов и модификаторов в отдельные файлы для удобства поддержки.
:::

## Правила именования

### Блоки

```css
/* Имя блока — существительное в единственном числе */
.card { }
.form { }
.navigation { }
```

### Элементы

```css
/* Имя элемента через __ */
.card__header { }
.card__body { }
.card__footer { }
.form__input { }
.form__button { }
```

### Модификаторы

```css
/* Булевый модификатор (наличие/отсутствие) */
.card--active { }
.button--disabled { }

/* Ключевое значение модификатора */
.card--theme--dark { }
.btn--size--large { }
```

:::info
Модификаторы с ключевым значением используют двойной дефис после ключа и значения: `block--key--value`.
:::

## Миксы

Миксы позволяют комбинировать блок с элементом или модификатором другого блока.

```css
/* Микс блока с элементом */
.header__logo {
  /* Микс с блоком logo */
}

/* Микс блока с модификатором */
.button--primary {
  /* Микс с блоком button */
}
```

### Пример миксов

```html
<div class="header">
  <div class="header__logo logo">
    <img src="logo.png" alt="Logo">
  </div>
  <nav class="header__nav menu">
    <a class="menu__item menu__item--active" href="#">Главная</a>
    <a class="menu__item" href="#">Контакты</a>
  </nav>
</div>
```

```css
.logo {
  display: flex;
  align-items: center;
}

.menu {
  display: flex;
  gap: 16px;
}

.menu__item {
  color: white;
  text-decoration: none;
}

.menu__item--active {
  font-weight: bold;
}
```

## Примеры

### Навигация

```css
/* Блок navigation */
.navigation { }

/* Элемент navigation__list */
.navigation__list {
  list-style: none;
  display: flex;
  gap: 16px;
}

/* Элемент navigation__item */
.navigation__item { }

/* Элемент navigation__link */
.navigation__link {
  color: white;
  text-decoration: none;
}

/* Модификатор navigation__link--active */
.navigation__link--active {
  font-weight: bold;
  text-decoration: underline;
}
```

### Форма

```css
/* Блок form */
.form { }

/* Элемент form__group */
.form__group {
  margin-bottom: 16px;
}

/* Элемент form__label */
.form__label {
  display: block;
  margin-bottom: 4px;
}

/* Элемент form__input */
.form__input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Модификатор form__input--error */
.form__input--error {
  border-color: red;
}

/* Элемент form__error */
.form__error {
  color: red;
  font-size: 12px;
}
```

### Карточка товара

```css
/* Блок card */
.card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
}

/* Элемент card__image */
.card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* Элемент card__title */
.card__title {
  font-size: 18px;
  font-weight: bold;
  margin: 8px 0;
}

/* Элемент card__description */
.card__description {
  color: #666;
}

/* Модификатор card--highlighted */
.card--highlighted {
  border-color: orange;
  box-shadow: 0 2px 8px rgba(255, 165, 0, 0.3);
}
```

### Кнопка с состояниями

```css
/* Блок button */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

/* Модификатор button--primary */
.button--primary {
  background-color: blue;
  color: white;
}

/* Модификатор button--secondary */
.button--secondary {
  background-color: gray;
  color: white;
}

/* Модификатор button--disabled */
.button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Элемент button__icon */
.button__icon {
  margin-right: 8px;
}
```

## БЭМ с препроцессорами

### Sass/SCSS

```scss
// Блок
.card {
  border: 1px solid #eee;
  border-radius: 8px;

  // Элемент
  &__title {
    font-size: 18px;
    font-weight: bold;
  }

  &__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  // Модификатор
  &--highlighted {
    border-color: orange;
    box-shadow: 0 2px 8px rgba(255, 165, 0, 0.3);
  }
}
```

### Less

```less
// Блок
.card {
  border: 1px solid #eee;
  border-radius: 8px;

  // Элемент
  &__title {
    font-size: 18px;
    font-weight: bold;
  }

  &__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  // Модификатор
  &--highlighted {
    border-color: orange;
    box-shadow: 0 2px 8px rgba(255, 165, 0, 0.3);
  }
}
```

### Stylus

```stylus
// Блок
.card
  border: 1px solid #eee
  border-radius: 8px

  // Элемент
  &__title
    font-size: 18px
    font-weight: bold

  &__image
    width: 100%
    height: 200px
    object-fit: cover

  // Модификатор
  &--highlighted
    border-color: orange
    box-shadow: 0 2px 8px rgba(255, 165, 0, 0.3)
```

## Ошибки при использовании БЭМ

### ❌ Использование вложенности больше 3 уровней

```css
/* Плохо */
.card__header__title__text { }

/* Хорошо */
.card__title-text { }
```

### ❌ Использование элементов элементов

```css
/* Плохо */
.card__header__title { }

/* Хорошо */
.card__title { }
```

### ❌ Изменение блока через элемент

```css
/* Плохо */
.card:hover .card__title { }

/* Хорошо */
.card--hovered .card__title { }
```

### ❌ Использование идентификаторов в именах

```css
/* Плохо */
.card__title--red { }

/* Хорошо */
.card__title--color-red { }
```

:::tip
Следуйте принципу «Блок — Элемент — Модификатор» и избегайте вложенности элементов. Это сделает ваш код более предсказуемым и поддерживаемым.
:::

## История и философия

БЭМ была разработана в Яндексе в 2009 году для решения проблем поддержки больших CSS-проектов. Основные принципы:

- **Изоляция**: каждый блок независим
- **Повторное использование**: блоки можно комбинировать
- **Предсказуемость**: понятная структура именования
- **Масштабируемость**: легко добавлять новые компоненты

## Ссылки

- [Официальный сайт БЭМ](https://en.bem.info/)
- [БЭМ: методология](https://ru.bem.info/methodology/)
- [БЭМ: именование](https://ru.bem.info/methodology/naming/)
