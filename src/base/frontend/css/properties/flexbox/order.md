---
title: order
description: Определяет порядок элементов в флекс-контейнере.
outline: deep
---

# order

::: info
Свойство `order` переупорядочивает флекс-элементы визуально, не изменяя их порядок в DOM.
:::

## Значение

| Значение | Описание |
| --- | --- |
| целое число | Порядковый номер элемента (по умолчанию `0`) |

Элементы с меньшим значением `order` отображаются первыми. Элементы с одинаковым значением сохраняют порядок из DOM.

```css
.item-first {
  order: 1;
}

.item-second {
  order: 2;
}

.item-third {
  order: 3;
}
```

## Примеры

### Переупорядочивание элементов

```css
/* В DOM: A, B, C */
.a { order: 3; }
.b { order: 1; }
.c { order: 2; }

/* Визуально: B, C, A */
```

### Мобильная раскладка

```css
/* На десктопе: sidebar — content */
.sidebar { order: 1; }
.content { order: 2; }

/* На мобильном: content — sidebar */
@media (max-width: 768px) {
  .sidebar { order: 2; }
  .content { order: 1; }
}
```

### Периодическая раскладка

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.item-a { order: 1; }
.item-b { order: 1; }
.item-c { order: 2; }
.item-d { order: 2; }
```

::: warning
Визуальный порядок через `order` не влияет на порядок фокусировки и навигации клавиатурой. Убедитесь, что логический порядок в DOM остаётся осмысленным для screen reader'ов.
:::

::: tip
Используйте `order` для адаптивных раскладок, но избегайте кардинального изменения порядка элементов — это может нарушить доступность.
:::

## Ссылки

- [MDN: order](https://developer.mozilla.org/ru/docs/Web/CSS/order)
- [CSS Flexible Box Layout Level 1](https://www.w3.org/TR/css-flexbox-1/#order-property)
