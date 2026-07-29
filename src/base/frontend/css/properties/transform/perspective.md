---
title: "Perspective"
description: "Задаёт эффект перспективы для 3D-трансформаций."
outline: deep
---

# Perspective

## Связанные свойства

| Свойство | Описание |
| --- | --- |
| [perspective](#perspective) | Задаёт расстояние до точки наблюдения |
| [perspective-origin](#perspective-origin) | Определяет точку наблюдения |

---

## perspective

Свойство `perspective` задаёт расстояние от пользователя до плоскости `z = 0`. Чем меньше значение, тем выраженнее 3D-эффект.

```css
.element {
  perspective: none | <length>;
}
```

| Значение | Описание |
| --- | --- |
| `none` | Перспектива не задана (по умолчанию) |
| `<length>` | Расстояние до точки наблюдения (например, `800px`) |

:::info
Спецификация: [CSS Transforms Level 2](https://drafts.csswg.org/css-transforms-2/#perspective-property)
:::

```css
/* Родитель задаёт перспективу для дочерних элементов */
.parent {
  perspective: 800px;
}

.child {
  transform: rotateY(45deg);
}
```

### Задача перспективы на родителе vs на элементе

```css
/* Перспектива на родителе — все дети используют одну точку наблюдения */
.parent {
  perspective: 1000px;
}

.parent .child-1,
.parent .child-2 {
  transform: rotateY(30deg);
}

/* Перспектива на самом элементе — каждая трансформация со своей перспективой */
.child-1 {
  perspective: 1000px;
  transform: rotateY(30deg);
}

.child-2 {
  perspective: 500px;
  transform: rotateY(30deg);
}
```

:::tip
Применяйте `perspective` на родителе для единообразного 3D-эффекта у дочерних элементов.
:::

---

## perspective-origin

Свойство `perspective-origin` определяет точку, от которой пользователь «смотрит» на 3D-сцену. Аналогично `transform-origin`, но для перспективы.

```css
.element {
  perspective-origin: <x> <y>;
}
```

| Значение | По умолчанию |
| --- | --- |
| `x` | `50%` |
| `y` | `50%` |

```css
/* Центр (по умолчанию) */
.parent {
  perspective: 800px;
  perspective-origin: 50% 50%;
}

/* Верхний левый угол */
.parent {
  perspective: 800px;
  perspective-origin: 0 0;
}

/* Ключевые слова */
.parent {
  perspective: 800px;
  perspective-origin: center top;
}
```

---

## Примеры

### Перспектива для 3D-детей

```css
.scene {
  perspective: 800px;
  perspective-origin: 50% 50%;
}

.box {
  width: 200px;
  height: 200px;
  background: #3498db;
  transform: rotateY(45deg);
}
```

### Переворот карточки с перспективой

```css
.card-container {
  perspective: 1000px;
  width: 300px;
  height: 400px;
}

.card {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}

.card:hover {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}
```

### Вращающийся куб

```css
.cube-scene {
  perspective: 600px;
  width: 200px;
  height: 200px;
}

.cube {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: rotate 4s infinite linear;
}

.cube-face {
  position: absolute;
  width: 200px;
  height: 200px;
  opacity: 0.8;
  border: 2px solid #333;
}

.cube-face--front  { transform: translateZ(100px); background: rgba(255, 0, 0, 0.7); }
.cube-face--back   { transform: rotateY(180deg) translateZ(100px); background: rgba(0, 255, 0, 0.7); }
.cube-face--right  { transform: rotateY(90deg) translateZ(100px); background: rgba(0, 0, 255, 0.7); }
.cube-face--left   { transform: rotateY(-90deg) translateZ(100px); background: rgba(255, 255, 0, 0.7); }
.cube-face--top    { transform: rotateX(90deg) translateZ(100px); background: rgba(255, 0, 255, 0.7); }
.cube-face--bottom { transform: rotateX(-90deg) translateZ(100px); background: rgba(0, 255, 255, 0.7); }

@keyframes rotate {
  from { transform: rotateX(0) rotateY(0); }
  to { transform: rotateX(360deg) rotateY(360deg); }
}
```

### Сравнение значений perspective

```css
/* Малая перспектива — сильная деформация */
.deep {
  perspective: 100px;
}

/* Средняя перспектива */
.medium {
  perspective: 500px;
}

/* Большая перспектива — слабая деформация, ближе к ортогональной */
.shallow {
  perspective: 2000px;
}

/* Все три элемента вращаются одинаково */
.deep .box,
.medium .box,
.shallow .box {
  transform: rotateY(45deg);
}
```

:::tip
Значения `perspective` от `500px` до `1000px` считаются наиболее естественными для типичных пользовательских интерфейсов. Меньшие значения создают драматичный эффект, бо́льшие — более плоскую проекцию.
:::

---

## Сравнение

| Значение | Эффект |
| --- | --- |
| `100px` | Экстремальная деформация, элементы «выпирают» |
| `500px` | Умеренная перспектива |
| `800px` | Стандартная перспектива для UI |
| `1000px` | Мягкая перспектива |
| `2000px` | Почти ортогональная проекция |

:::info
Дополнительно: [MDN — perspective](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective), [MDN — perspective-origin](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective-origin)
:::
