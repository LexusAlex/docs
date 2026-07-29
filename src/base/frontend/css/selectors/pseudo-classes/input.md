---
title: "Псевдоклассы полей ввода"
description: "Псевдоклассы для стилизации форм и полей ввода."
outline: [2, 3]
---

# Псевдоклассы полей ввода

Псевдоклассы полей ввода позволяют стилизовать элементы форм в зависимости от их состояния — валидность, доступность, заполненность и т. д.

## Список

| Псевдокласс | Описание |
|---|---|
| `:enabled` | Элемент доступен для взаимодействия |
| `:disabled` | Элемент заблокирован |
| `:read-only` | Элемент только для чтения |
| `:read-write` | Элемент доступен для редактирования |
| `:required` | Поле обязательно для заполнения |
| `:optional` | Поле необязательно |
| `:valid` | Значение поля проходит валидацию |
| `:invalid` | Значение поля не проходит валидацию |
| `:in-range` | Значение в допустимом диапазоне |
| `:out-of-range` | Значение за пределами диапазона |
| `:placeholder-shown` | Отображается placeholder (поле пустое) |
| `:autofill` | Браузер автоматически заполнил поле |
| `:default` | Элемент по умолчанию в группе |
| `:checked` | Чекбокс или радиокнопка отмечены |
| `:indeterminate` | Состояние «не определено» (checkbox с неопределённым состоянием, radio group, progress) |

## Примеры

### Базовая стилизация полей

```css
input:enabled {
  border: 1px solid #ccc;
  padding: 0.5rem;
}

input:disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}
```

### Валидация

```css
input:valid {
  border-color: #2e7d32;
}

input:invalid {
  border-color: #c62828;
}

input:invalid:focus {
  box-shadow: 0 0 0 2px rgba(198, 40, 40, 0.2);
}
```

### Обязательные и необязательные поля

```css
input:required {
  border-left: 3px solid #c62828;
}

input:optional {
  border-left: 3px solid transparent;
}
```

### Range-поля

```css
input[type="number"]:in-range {
  border-color: #2e7d32;
}

input[type="number"]:out-of-range {
  border-color: #c62828;
  background: #ffebee;
}
```

### Placeholder

```css
input:placeholder-shown {
  font-style: italic;
  color: #999;
}

/* Подсказка при пустом поле */
input:not(:placeholder-shown) + .hint {
  display: none;
}
```

### Чекбоксы и радиокнопки

```css
input[type="checkbox"]:checked {
  accent-color: #0066cc;
}

input[type="radio"]:checked {
  box-shadow: inset 0 0 0 3px #0066cc;
}

/* Стилизация label при checked */
input:checked + label {
  font-weight: bold;
  color: #0066cc;
}
```

### Default и Indeterminate

```css
/* Кнопка по умолчанию в форме */
button:default {
  background: #0066cc;
  color: white;
}

/* Чекбокс в indeterminate-состоянии */
input[type="checkbox"]:indeterminate {
  accent-color: #ff9800;
}

/* Progress bar */
progress:indeterminate {
  animation: indeterminate 1.5s linear infinite;
}
```

### Autofill

```css
input:autofill {
  box-shadow: 0 0 0 2px #ffeb3b inset;
}

input:autofill:focus {
  box-shadow: 0 0 0 2px #ffeb3b inset, 0 0 0 3px rgba(255, 235, 59, 0.3);
}
```

## Специфичность

Все псевдоклассы полей ввода имеют специфичность `0-1-0` (аналогично селектору класса).

::: tip
Псевдоклассы `:valid` / `:invalid` и `:required` / `:optional` работают с нативной валидацией HTML. Используйте атрибуты `required`, `pattern`, `min`, `max` для определения правил валидации.
:::

## Спецификация

- [CSS Selectors Level 4 — The :checked pseudo-class](https://www.w3.org/TR/selectors-4/#checked)
- [CSS Selectors Level 4 — The :disabled pseudo-class](https://www.w3.org/TR/selectors-4/#enableddisabled)
- [CSS Selectors Level 4 — The :valid and :invalid pseudo-classes](https://www.w3.org/TR/selectors-4/#valid)
