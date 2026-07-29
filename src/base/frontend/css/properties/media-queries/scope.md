---
title: "@scope и @starting-style"
description: Ограничение области видимости и начальные стили для анимаций появления.
outline: deep
---

# @scope и @starting-style

Две новые директивы CSS Level 5-6, расширяющие возможности стилизации.

## @scope

Ограничивает область действия селектора определённым поддеревом DOM.

### Синтаксис

```css
@scope (селектор-области) {
  /* стили только внутри этого поддерева */
}
```

### Базовый пример

```css
/* Стили .card__title и .card__text применяются ТОЛЬКО внутри .card */
@scope (.card) {
  p { line-height: 1.6; }
  img { border-radius: 8px; }
  h3 { font-weight: 700; }
}
```

```html
<div class="card">
  <h3>Заголовок</h3>
  <p>Текст внутри card — будет стилизован</p>
</div>

<p>Текст вне card — НЕ будет стилизован</p>
```

### Ограничение видимости (scope limit)

```css
/* Стили внутри .card, но НЕ внутри .card__footer */
@scope (.card) to (.card__footer) {
  p { line-height: 1.6; }
  img { border-radius: 8px; }
}
```

```html
<div class="card">
  <p>Будет стилизован</p>
  <div class="card__footer">
    <p>НЕ будет стилизован</p>
  </div>
</div>
```

### Практический пример: переиспользуемые компоненты

```css
/* Каждый компонент изолирован */
@scope (.auth-form) {
  input { padding: 0.5rem; border: 1px solid #ccc; }
  button { background: #0066cc; color: white; }
  .error { color: red; }
}

@scope (.search-form) {
  input { padding: 0.75rem; border-radius: 999px; }
  button { background: transparent; border: 1px solid #000; }
}
```

::: info
`@scope` решает проблему BEM-именования — стили автоматически ограничиваются компонентом, без необходимости создавать уникальные классы.
:::

### Специфичность

Специфичность `@scope (.card)` — `0-1-0` (как у класса). Внутри `@scope` селекторы работают как обычно.

## @starting-style

Определяет начальные стили для элементов, которые только добавляются в DOM или переходят из `display: none`.

### Синтаксис

```css
@starting-style {
  .element {
    /* начальные стили до первого кадра */
  }
}
```

### Анимация появления

```css
/* Конечные стили */
.dialog {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.3s, transform 0.3s;
}

/* Начальные стили (до первого кадра) */
@starting-style {
  .dialog {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

### Переход из display: none

```css
/* Элемент скрыт */
.tooltip {
  display: none;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.2s, transform 0.2s;
}

/* Когда display: block — анимируется из начальных стилей */
.tooltip.visible {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

@starting-style {
  .tooltip.visible {
    opacity: 0;
    transform: translateY(8px);
  }
}
```

### Анимация popover

```css
/* Popover автоматически анимируется */
[popover] {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.3s, transform 0.3s, display 0.3s allow-discrete;
}

@starting-style {
  [popover] {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

::: info
`@starting-style` позволяет анимировать элементы при первом рендеринге без JavaScript-хаков вроде `requestAnimationFrame`. Поддерживается в Chromium 117+, Safari 17.5+.
:::

### transition-behavior

```css
/* Разрешаем.transition для display */
.dialog {
  transition: opacity 0.3s, display 0.3s allow-discrete;
  display: block;
  opacity: 1;
}

.dialog.hidden {
  display: none;
  opacity: 0;
}

@starting-style {
  .dialog {
    opacity: 0;
  }
}
```

## Ссылки

- [MDN: @scope](https://developer.mozilla.org/en-US/docs/Web/CSS/@scope)
- [MDN: @starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)
- [CSS Scoping Level 1](https://drafts.csswg.org/css-scoping/)
- [CSS Transitions Level 2](https://drafts.csswg.org/css-transitions-2/)
