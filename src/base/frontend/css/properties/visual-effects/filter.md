---
title: filter
description: Применяет графические эффекты к элементу.
outline: deep
---

# filter

Свойство `filter` применяет графические эффекты к элементу, такие как размытие, яркость, контраст и другие.

## Функции фильтров

```css
filter: blur() brightness() contrast() drop-shadow() grayscale()
        hue-rotate() invert() opacity() saturate() sepia() url() none;
```

| Функция | Описание | Пример |
|---------|----------|--------|
| `blur()` | Размытие по Гауссу | `blur(5px)` |
| `brightness()` | Яркость | `brightness(1.5)` |
| `contrast()` | Контрастность | `contrast(200%)` |
| `drop-shadow()` | Тень по альфа-каналу | `drop-shadow(0 4px 4px black)` |
| `grayscale()` | Оттенки серого | `grayscale(100%)` |
| `hue-rotate()` | Вращение оттенка | `hue-rotate(90deg)` |
| `invert()` | Инвертирование цветов | `invert(100%)` |
| `opacity()` | Прозрачность | `opacity(50%)` |
| `saturate()` | Насыщенность | `saturate(200%)` |
| `sepia()` | Сепия | `sepia(100%)` |
| `url()` | SVG-фильтр | `url(#filter-id)` |
| `none` | Без фильтров | `none` |

## blur() — эффект матового стекла

```css
.frosted-glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
```

:::tip
Для кросс-браузерной поддержки добавляйте `-webkit-backdrop-filter`.
:::

## brightness() — эффект при наведении

```css
.image {
  filter: brightness(1);
  transition: filter 0.3s ease;
}

.image:hover {
  filter: brightness(1.2);
}
```

## grayscale() — неактивное состояние

```css
.disabled {
  filter: grayscale(100%);
  opacity: 0.6;
  pointer-events: none;
}
```

## drop-shadow() vs box-shadow

`drop-shadow()` создаёт тень, следующую контуру элемента (включая прозрачные области), в отличие от `box-shadow`.

```css
.icon-shadow {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.box-shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
```

:::info
`drop-shadow()` полезен для иконок и изображений с прозрачным фоном — тень будет повторять форму, а не прямоугольник.
:::

## backdrop-filter

Свойство `backdrop-filter` применяет эффект к области за элементом.

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
```

## Комбинирование фильтров

Несколько фильтров можно комбинировать в одном объявлении.

```css
.combined {
  filter:
    contrast(1.2)
    saturate(1.5)
    drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}
```

:::warning
Порядок фильтров важен — результат предыдущего фильтра передаётся как входной следующему.
:::

## Ссылки

- [MDN: filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)
- [MDN: backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [Filter Effects Level 1](https://www.w3.org/TR/filter-effects-1/)
