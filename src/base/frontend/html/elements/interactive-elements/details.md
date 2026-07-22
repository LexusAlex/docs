---
title: "<details>"
description: "Раскрывающийся блок дополнительной информации."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<details>`

Раскрывающийся блок дополнительной информации.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<details>…</details>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), интерактивное (`interactive`), ощутимое (`palpable`) | flow ; interactive ; palpable |
| Допустимые родители | потоковое (`flow`) | flow |
| Содержимое | [`summary`](/base/frontend/html/elements/interactive-elements/summary), потоковое (`flow`) | summary *; flow |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`name`](/base/frontend/html/attributes/element-specific/name), [`open`](/base/frontend/html/attributes/element-specific/open).
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

### Раскрытие и диалог

summary является подписью details; button может декларативно управлять dialog через commandfor.

Связанные элементы: [`details`](/base/frontend/html/elements/interactive-elements/details), [`summary`](/base/frontend/html/elements/interactive-elements/summary), [`dialog`](/base/frontend/html/elements/interactive-elements/dialog), [`button`](/base/frontend/html/elements/forms/button).

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<details>
  <summary>Условия</summary>
  <p>Текст условий.</p>
</details>
<button command="show-modal" commandfor="confirm-dialog">Открыть</button>
<dialog id="confirm-dialog" closedby="any">Подтвердите действие.</dialog>
```

### Группа взаимоисключающих раскрытий

Одинаковый name объединяет несколько details в группу.

```html
<details name="faq" open><summary>Доставка</summary><p>От двух дней.</p></details>
<details name="faq"><summary>Оплата</summary><p>Картой или переводом.</p></details>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<details />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLDetailsElement`](https://html.spec.whatwg.org/multipage/interactive-elements.html#htmldetailselement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `details` в WHATWG](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
