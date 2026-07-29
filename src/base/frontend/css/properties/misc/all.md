---
title: all
description: Свойство all сбрасывает все свойства элемента к начальному значению, наследуемому или пользовательскому
---

# all

:::info
Свойство `all` позволяет сбросить все CSS-свойства элемента одновременно к одному из глобальных значений: `initial`, `inherit`, `unset` или `revert`.
:::

## Синтаксис

```css
all: initial;
all: inherit;
all: unset;
all: revert;
all: revert-layer;
```

## Значения

| Значение | Описание |
|----------|----------|
| `initial` | Сбрасывает все свойства к значениям по спецификации |
| `inherit` | Все свойства наследуют значение родителя |
| `unset` | Наследуемые свойства → `inherit`, остальные → `initial` |
| `revert` | Откатывает к стилям браузера (user-agent) |
| `revert-layer` | Откатывает к предыдущему каскадному слою |

## Примеры

### Полный сброс к начальным значениям

```css
.custom-reset {
  all: initial;
}
```

:::tip
Используйте `all: initial` для полного изоляции компонента от глобальных стилей.
:::

### Принудительное наследование

```css
.force-inherit {
  all: inherit;
}
```

### Удаление авторских стилей

```css
.remove-styles {
  all: unset;
}
```

### Откат к стилям браузера

```css
.revert-to-browser {
  all: revert;
}
```

## Практическое применение

### Изоляция компонента

```css
/* Сбрасываем все стили для изолированного компонента */
.standalone-widget {
  all: initial;
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #333;
}

/* Наследуем только нужные свойства */
.inheritable-widget {
  all: unset;
  font: inherit;
  color: inherit;
}
```

### Сброс формы

```css
.custom-form {
  all: initial;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.custom-form input,
.custom-form button {
  all: unset;
  /* Добавляем собственные стили */
}
```

:::info
`all: unset` полезен для удаления стандартных стилей формы, которые браузер применяет по умолчанию (отступы, рамки, фон).
:::

## Разница между значениями

```css
/* initial: сброс к спецификации */
.example-initial {
  all: initial;
}

/* inherit: наследование от родителя */
.example-inherit {
  all: inherit;
}

/* unset: гибкий сброс */
.example-unset {
  all: unset;
}

/* revert: откат к user-agent */
.example-revert {
  all: revert;
}
```

## Связанные темы

- [Initial, inherit, unset, revert](initial.md)

## Ссылки

- [MDN: all](https://developer.mozilla.org/ru/docs/Web/CSS/all)
- [W3C: all](https://drafts.csswg.org/css-cascade-5/#propdef-all)
