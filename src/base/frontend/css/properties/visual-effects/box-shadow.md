---
title: box-shadow
description: Добавляет тень вокруг элемента или внутри него.
outline: deep
---

# box-shadow

Свойство `box-shadow` добавляет тень вокруг элемента или внутри него.

## Значения

```css
box-shadow: h-offset v-offset blur spread color inset;
```

- `h-offset` — горизонтальное смещение тени (обязательное)
- `v-offset` — вертикальное смещение тени (обязательное)
- `blur` — радиус размытия (по умолчанию 0)
- `spread` — радиус расширения тени (по умолчанию 0)
- `color` — цвет тени (по умолчанию — цвет элемента)
- `inset` — тень внутри элемента

## Базовая тень

```css
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

## Внутренняя тень (inset)

Создаёт эффект внутреннего свечения или вдавливания.

```css
.inset-shadow {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}
```

:::tip
Inset-тени полезны для создания эффекта «вдавленности» у форменных полей и кнопок.
:::

## Множественные тени

Тени можно комбинировать, разделяя запятой.

```css
.depth-card {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.05),
    0 8px 16px rgba(0, 0, 0, 0.03);
}
```

:::info
Тени отрисовываются в порядке объявления — первая тень будет поверх второй.
:::

## Паттерны теней для карточек

```css
/* Левая тень */
.card-left {
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.1);
}

/* Нижняя тень */
.card-bottom {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Рамка-тень */
.card-border {
  box-shadow: 0 0 0 2px #3b82f6;
}
```

## Фокусное кольцо

```css
:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
```

:::info
Использование `box-shadow` вместо `outline` для фокуса даёт более стабильную работу во всех браузерах и поддержку `border-radius`.
:::

## Производительность: will-change

При анимации теней используйте `will-change` для оптимизации.

```css
.animated-card {
  will-change: box-shadow;
  transition: box-shadow 0.3s ease;
}

.animated-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
```

:::warning
Не злоупотребляйте `will-change` — каждое такое объявление создаёт отдельный слой компоновки.
:::

## Ссылки

- [MDN: box-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)
- [CSS Backgrounds and Module Level 3](https://www.w3.org/TR/css-backgrounds-3/#box-shadow)
