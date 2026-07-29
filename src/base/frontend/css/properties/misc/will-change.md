---
title: will-change
description: Свойство will-change подсказывает браузеру о грядущих изменениях для оптимизации производительности
---

# will-change

:::info
Свойство `will-change` информирует браузер о том, что определённые свойства будут изменены в будущем, что позволяет браузеру оптимизировать рендеринг заранее.
:::

## Синтаксис

```css
will-change: auto;
will-change: scroll-position;
will-change: contents;
will-change: transform;
will-change: opacity;
will-change: transform, opacity;
```

## Значения

| Значение | Описание |
|----------|----------|
| `auto` | Браузер применяет обычные оптимизации |
| `scroll-position` | Позиция прокрутки будет изменена |
| `contents` | Содержимое DOM будет изменено |
| `custom-ident` | Имя свойства (например, `transform`, `opacity`) |
| `<animateable-feature>` | `transform`, `opacity`, `clip-path`, `filter` и др. |

## Примеры

### Анимация transform

```css
.animated-element {
  will-change: transform;
  transition: transform 0.3s ease;
}

.animated-element:hover {
  transform: translateX(100px);
}
```

### Плавное затухание

```css
.fade-element {
  will-change: opacity;
  transition: opacity 0.5s ease;
}

.fade-element.hidden {
  opacity: 0;
}
```

### Динамическое содержимое

```css
.dynamic-content {
  will-change: contents;
}
```

### Комбинация свойств

```css
.complex-animation {
  will-change: transform, opacity;
}
```

:::tip
Не используйте `will-change` на множестве элементов одновременно — это потребляет много памяти. Применяйте только к тем элементам, которые действительно будут анимироваться.
:::

## Производительность

### Когда использовать

- Элементы с CSS-трансформациями
- Анимации прозрачности
- Элементы с частыми изменениями DOM
- Сложные композиции с `transform`, `opacity`, `filter`

### Когда НЕ использовать

- Статичные элементы без анимаций
- Элементы, которые редко меняются
- Множество элементов одновременно

### Удаление после анимации

```css
.element {
  will-change: transform;
}

.element.animating {
  will-change: transform;
}

/* Удаляем после завершения анимации */
.element.done {
  will-change: auto;
}
```

:::tip
Всегда удаляйте `will-change` после завершения анимации, чтобы освободить ресурсы браузера.
:::

## will-change vs transform: translateZ(0)

:::info
Старый трюк `transform: translateZ(0)` или `transform: translate3d(0, 0, 0)` использовался для принудительного создания GPU-слоя. `will-change` — более современный и семантичный способ.
:::

```css
/* Старый способ (не рекомендуется) */
.old-trick {
  transform: translateZ(0);
}

/* Современный способ */
.modern-way {
  will-change: transform;
}
```

## Связанные темы

- [Transition и анимации](../../transition-animation/)
- [Трансформации](../../transform/)

## Ссылки

- [MDN: will-change](https://developer.mozilla.org/ru/docs/Web/CSS/will-change)
- [W3C: will-change](https://drafts.csswg.org/css-will-change/)
