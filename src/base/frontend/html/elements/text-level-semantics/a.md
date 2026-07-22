---
title: "<a>"
description: "Гиперссылка или якорь назначения."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<a>`

Гиперссылка или якорь назначения.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<a>…</a>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), фразовое (`phrasing`), интерактивное (`interactive`), ощутимое (`palpable`) | flow ; phrasing *; interactive ; palpable |
| Допустимые родители | фразовое (`phrasing`) | phrasing |
| Содержимое | `transparent` | transparent * |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`href`](/base/frontend/html/attributes/element-specific/href), [`target`](/base/frontend/html/attributes/element-specific/target), [`download`](/base/frontend/html/attributes/element-specific/download), [`ping`](/base/frontend/html/attributes/element-specific/ping), [`rel`](/base/frontend/html/attributes/element-specific/rel), [`hreflang`](/base/frontend/html/attributes/element-specific/hreflang), [`type`](/base/frontend/html/attributes/element-specific/type), [`referrerpolicy`](/base/frontend/html/attributes/element-specific/referrerpolicy).
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

### Списки и пункты

Прямыми пунктами ol, ul и menu служат элементы li.

Связанные элементы: [`nav`](/base/frontend/html/elements/sections/nav), [`ol`](/base/frontend/html/elements/grouping-content/ol), [`ul`](/base/frontend/html/elements/grouping-content/ul), [`menu`](/base/frontend/html/elements/grouping-content/menu), [`li`](/base/frontend/html/elements/grouping-content/li), [`a`](/base/frontend/html/elements/text-level-semantics/a).

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<nav aria-label="Основная навигация">
  <ul>
    <li><a href="/docs/">Документация</a></li>
    <li><a href="/about/">О проекте</a></li>
  </ul>
</nav>
```

### Фрагмент, загрузка и внешний переход

Один и тот же элемент создаёт разные виды ссылок через URL и дополнительные атрибуты.

```html
<nav>
  <a href="#install">К установке</a>
  <a href="/files/guide.pdf" download>Скачать PDF</a>
  <a href="https://example.org/" target="_blank" rel="noopener">Внешний сайт</a>
</nav>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<a />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLAnchorElement`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#htmlanchorelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `a` в WHATWG](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
