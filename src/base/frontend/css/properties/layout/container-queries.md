---
title: Container Queries
description: Адаптивная раскладка на основе размера контейнера, а не viewport.
outline: deep
---

# Container Queries

Контейнерные запросы позволяют стилизовать элементы на основе размера их **контейнера**, а не всего viewport. Это революционный подход для создания переиспользуемых компонентов.

::: info
Container Queries поддерживаются во всех основных браузерах с декабря 2023 года. Спецификация: [CSS Containment Module Level 3](https://drafts.csswg.org/css-contain-3/)
:::

## Свойства

| Свойство | Описание |
|---|---|
| `container-type` | Тип контейнера: `inline-size`, `size`, `normal` |
| `container-name` | Имя контейнера для целевых запросов |
| `container` | Shorthand для `container-type` + `container-name` |

## @container

Правило `@container` определяет стили, применяемые когда контейнер удовлетворяет условию.

```css
@container (min-width: 400px) {
  /* стили */
}
```

## Примеры

### Базовый контейнер

```css
/* Родитель — контейнер */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* Компонент внутри контейнера */
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

@container card (max-width: 399px) {
  .card {
    display: flex;
    flex-direction: column;
  }
}
```

```html
<div class="card-wrapper">
  <div class="card">
    <img src="photo.jpg" alt="Фото">
    <div class="card__content">
      <h3>Заголовок</h3>
      <p>Описание карточки</p>
    </div>
  </div>
</div>
```

### container-type

```css
/* Контейнер только по inline-оси (горизонтальной) */
.sidebar {
  container-type: inline-size;
}

/* Контейнер по обеим осям */
.page {
  container-type: size;
}

/* Отключить (по умолчанию) */
.wrapper {
  container-type: normal;
}
```

::: warning
`container-type: size` создаёт контейнер, высота которого не зависит от потомков. Используйте `inline-size` в большинстве случаев.
:::

### container-name

```css
/* Именованные контейнеры */
.header { container-type: inline-size; container-name: header; }
.sidebar { container-type: inline-size; container-name: sidebar; }
.main { container-type: inline-size; container-name: main; }

/* Целевой запрос к конкретному контейнеру */
@container header (min-width: 600px) {
  .header__nav { flex-direction: row; }
}

@container sidebar (min-width: 300px) {
  .sidebar__menu { columns: 2; }
}
```

### Container Query Units

| Единица | Описание |
|---|---|
| `cqw` | 1% от ширины контейнера |
| `cqh` | 1% от высоты контейнера |
| `cqi` | 1% от inline-размера контейнера |
| `cqb` | 1% от block-размера контейнера |
| `cqmin` | Меньшее из cqi и cqb |
| `cqmax` | Большее из cqi и cqb |

```css
.card-wrapper {
  container-type: inline-size;
}

.card__title {
  font-size: clamp(1rem, 3cqi, 2rem);
}
```

### Контейнер для typography

```css
/* Адаптивная типографика на основе ширины контейнера */
.prose {
  container-type: inline-size;
}

@container (min-width: 65ch) {
  .prose {
    font-size: 1.125rem;
    line-height: 1.7;
  }
}

@container (max-width: 40ch) {
  .prose {
    font-size: 0.9375rem;
    line-height: 1.5;
  }
}
```

### Практический пример: переиспользуемый компонент

```css
/* Компонент карточки — работает в любом контейнере */
.product-card {
  container-type: inline-size;
}

@container (min-width: 500px) {
  .product-card__layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

@container (min-width: 700px) {
  .product-card__layout {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@container (max-width: 499px) {
  .product-card__layout {
    display: flex;
    flex-direction: column;
  }
}
```

## Разница с Media Queries

| Media Query | Container Query |
|---|---|
| Спрашивает у **viewport** | Спрашивает у **контейнера** |
| Один ответ на странице | Разные ответы для разных контейнеров |
| Нельзя переиспользовать компонент | Компонент адаптируется к любому контейнеру |

::: tip
Используйте Container Queries для компонентов (карточки, виджеты, формы), а Media Queries — для общей раскладки страницы (header, sidebar, footer).
:::

## Ссылки

- [MDN: container-type](https://developer.mozilla.org/en-US/docs/Web/CSS/container-type)
- [MDN: container-name](https://developer.mozilla.org/en-US/docs/Web/CSS/container-name)
- [MDN: @container](https://developer.mozilla.org/en-US/docs/Web/CSS/@container)
- [MDN: Container query length units](https://developer.mozilla.org/en-US/docs/Web/CSS/length#container_query_length_units)
- [Can I Use: Container Queries](https://caniuse.com/css-container-queries)
