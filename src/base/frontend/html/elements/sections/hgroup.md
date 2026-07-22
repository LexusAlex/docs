---
title: "<hgroup>"
description: "Группирует заголовок с подзаголовком или альтернативным названием."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<hgroup>`

Группирует заголовок с подзаголовком или альтернативным названием.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<hgroup>…</hgroup>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), ощутимое (`palpable`) | flow ; palpable |
| Допустимые родители | [`legend`](/base/frontend/html/elements/forms/legend), [`summary`](/base/frontend/html/elements/interactive-elements/summary), потоковое (`flow`) | legend ; summary ; flow |
| Содержимое | [`h1`](/base/frontend/html/elements/sections/h1), [`h2`](/base/frontend/html/elements/sections/h2), [`h3`](/base/frontend/html/elements/sections/h3), [`h4`](/base/frontend/html/elements/sections/h4), [`h5`](/base/frontend/html/elements/sections/h5), [`h6`](/base/frontend/html/elements/sections/h6), [`p`](/base/frontend/html/elements/grouping-content/p), `script-supporting elements` | h1 ; h2 ; h3 ; h4 ; h5 ; h6 ; p ; script-supporting elements |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** нет.
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

Специальных структурных связей в общем каталоге не выделено; применяйте модель содержимого ниже.

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<hgroup>
  <h1>Руководство по HTML</h1>
  <p>Практический справочник</p>
</hgroup>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<hgroup />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLElement`](https://html.spec.whatwg.org/multipage/dom.html#htmlelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `hgroup` в WHATWG](https://html.spec.whatwg.org/multipage/sections.html#the-hgroup-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
