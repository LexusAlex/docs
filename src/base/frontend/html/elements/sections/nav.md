---
title: "<nav>"
description: "Раздел с основными навигационными ссылками."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<nav>`

Раздел с основными навигационными ссылками.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<nav>…</nav>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), секционное (`sectioning`), ощутимое (`palpable`) | flow ; sectioning ; palpable |
| Допустимые родители | потоковое (`flow`) | flow |
| Содержимое | потоковое (`flow`) | flow |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** нет.
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

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<nav />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLElement`](https://html.spec.whatwg.org/multipage/dom.html#htmlelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `nav` в WHATWG](https://html.spec.whatwg.org/multipage/sections.html#the-nav-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
