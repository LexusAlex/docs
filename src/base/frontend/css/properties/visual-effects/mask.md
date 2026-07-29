---
title: mask
description: Маскирует элементы, скрывая или показывая части.
outline: deep
---

# mask

Свойства маскирования позволяют скрывать или показывать части элемента, используя маски. Пиксели маски соответствуют пикселям элемента.

## Свойства маски

| Свойство | Описание |
|----------|----------|
| `mask` | Шorthand-свойство |
| `mask-image` | Изображение или градиент маски |
| `mask-size` | Размер маски |
| `mask-position` | Позиция маски |
| `mask-repeat` | Повторение маски |
| `mask-origin` | Область позиционирования |
| `mask-clip` | Область обрезки |
| `mask-composite` | Композиция масок |

## mask-image — градиент для эффекта затухания

```css
.fade-out {
  mask-image: linear-gradient(
    to bottom,
    black 0%,
    black 70%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    black 0%,
    black 70%,
    transparent 100%
  );
}
```

:::tip
Для кросс-браузерной поддержки добавляйте `-webkit-mask-image`.
:::

## mask-image — маскирование изображением

```css
.shape-mask {
  mask-image: url('mask.png');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
}
```

## mask-composite — комбинирование масок

```css
.combined-mask {
  mask-image: linear-gradient(black, transparent), radial-gradient(circle, black, transparent);
  mask-composite: intersect;
}
```

## Маскирование с фоновыми свойствами

Свойства маски аналогичны фоновым и могут использоваться вместе.

```css
.complex-mask {
  mask-image: radial-gradient(circle, black 40%, transparent 70%);
  mask-size: 100% 100%;
  mask-position: center;
  mask-repeat: no-repeat;
}
```

:::info
`mask-clip` и `mask-origin` работают аналогично `background-clip` и `background-origin`.
:::

## mask vs clip-path

| Особенность | mask | clip-path |
|-------------|------|-----------|
| Плавные края | Да | Нет |
| Градиенты | Да | Да |
| Геометрические фигуры | Через изображения | Нативная поддержка |
| Производительность | Выше при сложных масках | Лучше для анимаций |
| Переходы | Ограничены | Полная поддержка |

:::tip
Используйте `clip-path` для анимаций и геометрических фигур, а `mask` — для градиентных эффектов и сложных масок на основе изображений.
:::

## Анимация маски

```css
.animate-mask {
  mask-image: linear-gradient(black, transparent);
  mask-size: 100% 200%;
  mask-position: 0% 0%;
  transition: mask-position 0.5s ease;
}

.animate-mask:hover {
  mask-position: 0% 100%;
}
```

## Ссылки

- [MDN: mask](https://developer.mozilla.org/en-US/docs/Web/CSS/mask)
- [MDN: mask-image](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image)
- [CSS Masking Module Level 1](https://www.w3.org/TR/css-masking-1/)
