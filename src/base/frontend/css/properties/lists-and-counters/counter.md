---
title: counter
description: CSS-счётчики — автоматическая нумерация элементов, секций и навигационных цепочек.
outline: deep
---

# counter

CSS-счётчики позволяют автоматически нумеровать элементы, секции и создавать пользовательские схемы нумерации без JavaScript.

## counter-reset

Создаёт новый счётчик и задаёт его начальное значение (по умолчанию `0`).

```css
body {
  counter-reset: section;
}

article {
  counter-reset: subsection;
}
```

:::info
Счётчики наследуются. Если объявить `counter-reset` на родителе, все потомки будут использовать один и тот же счётчик.
:::

## counter-increment

Увеличивает значение счётчика на заданную величину (по умолчанию `1`).

```css
h2::before {
  counter-increment: section;
  content: counter(section) ". ";
}
```

```css
h3::before {
  counter-increment: subsection;
  content: counter(section) "." counter(subsection) " ";
}
```

## counter-set

Устанавливает значение счётчика без увеличения (аналог `counter-reset`, но без перезапуска).

```css
h2::before {
  counter-set: section 0;
  counter-increment: section;
  content: counter(section) ". ";
}
```

:::tip
`counter-set` полезен, когда нужно явно задать значение счётчика в определённой точке, не сбрасывая его полностью.
:::

## Функции counter() и counters()

| Функция | Описание |
|---------|----------|
| `counter(name)` | Выводит текущее значение счётчика |
| `counter(name, style)` | Выводит значение в указанном стиле нумерации |
| `counters(name, separator)` | Выводит значения всех вложенных счётчиков с разделителем |

```css
/* Простой счётчик */
h2::before {
  counter-increment: section;
  content: counter(section) ". ";
}

/* Счётчик с пользовательским стилем */
h2::before {
  counter-increment: section;
  content: counter(section, upper-roman) ". ";
}

/* Вложенные счётчики с разделителем */
li::before {
  counter-increment: listcounter;
  content: counters(listcounter, ".") " ";
}
```

## Базовый пример — нумерованный список

```css
ol {
  counter-reset: listcounter;
  list-style: none;
  padding-left: 0;
}

ol li {
  counter-increment: listcounter;
}

ol li::before {
  content: counter(listcounter) ". ";
  font-weight: bold;
  color: #e74c3c;
}
```

## Вложенные счётчики с counters()

```css
ol {
  counter-reset: listcounter;
  list-style: none;
  padding-left: 1.5em;
}

ol li {
  counter-increment: listcounter;
}

ol li::before {
  content: counters(listcounter, ".") " ";
  color: #3498db;
}
```

:::info
Функция `counters()` автоматически собирает значения всех вложенных счётчиков с тем же именем. Например, результат для третьего элемента второго списка будет `1.3`.
:::

## @counter-style — пользовательские стили маркеров

Директива `@counter-style` позволяет создать собственный стиль нумерации.

```css
@counter-style thumbs {
  system: cyclic;
  symbols: "\1F44D";
  suffix: " ";
}

ul {
  list-style: thumbs;
}
```

### Параметры @counter-style

| Параметр | Описание |
|----------|----------|
| `system` | Алгоритм генерации: `cyclic`, `numeric`, `alphabetic`, `symbolic`, `additive`, `fixed` |
| `symbols` | Символы для построения маркеров |
| `suffix` | Текст после маркера (по умолчанию `". "`) |
| `prefix` | Текст перед маркером |
| `range` | Диапазон допустимых значений |
| `pad` | Дополнение до минимальной ширины |
| `fallback` | Запасной стиль при выходе за range |

```css
@counter-style circle-number {
  system: numeric;
  symbols: "❶" "❷" "❸" "❹" "❺" "❻" "❼" "❽" "❾" "❿";
  suffix: " ";
}

@counter-style checkmark {
  system: cyclic;
  symbols: "✔";
  suffix: " ";
}
```

## Хлебные крошки (breadcrumbs) на основе счётчиков

```css
nav {
  counter-reset: breadcrumb;
}

nav a::after {
  counter-increment: breadcrumb;
  content: " › " counter(breadcrumb);
}

nav a:last-child::after {
  content: " › " counter(breadcrumb) " (текущая)";
  font-weight: bold;
}
```

```html
<nav>
  <a href="/">Главная</a>
  <a href="/catalog">Каталог</a>
  <a href="/catalog/item">Товар</a>
</nav>
```

## Пошаговая нумерация шагов

```css
ol.steps {
  counter-reset: step;
  list-style: none;
  padding-left: 0;
}

ol.steps li {
  counter-increment: step;
  padding: 0.5em 0 0.5em 3em;
  position: relative;
}

ol.steps li::before {
  content: "Шаг " counter(step);
  position: absolute;
  left: 0;
  font-weight: bold;
  color: #2c3e50;
}
```

## Нумерация секций и заголовков

```css
body {
  counter-reset: h2counter h3counter;
}

h2 {
  counter-reset: h3counter;
  counter-increment: h2counter;
}

h2::before {
  content: counter(h2counter) ". ";
  color: #2c3e50;
}

h3 {
  counter-increment: h3counter;
}

h3::before {
  content: counter(h2counter) "." counter(h3counter) " ";
  color: #7f8c8d;
}
```

:::tip
Для нумерации заголовков `counter-increment` и `counter-set` задаются непосредственно на элементах заголовков, а не через псевдоэлементы.
:::

## Ссылки

- [MDN: CSS counter-increment](https://developer.mozilla.org/ru/docs/Web/CSS/counter-increment)
- [MDN: CSS counter-reset](https://developer.mozilla.org/ru/docs/Web/CSS/counter-reset)
- [MDN: CSS counter-set](https://developer.mozilla.org/ru/docs/Web/CSS/counter-set)
- [MDN: @counter-style](https://developer.mozilla.org/ru/docs/Web/CSS/@counter-style)
- [MDN: counter()](https://developer.mozilla.org/ru/docs/Web/CSS/counter())
- [MDN: counters()](https://developer.mozilla.org/ru/docs/Web/CSS/counters())
- [W3C CSS Lists Module Level 3](https://www.w3.org/TR/css-lists-3/)
