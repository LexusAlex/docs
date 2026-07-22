---
title: "<dialog>"
description: "Диалоговое окно или другой отдельный интерактивный компонент."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<dialog>`

Диалоговое окно или другой отдельный интерактивный компонент.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<dialog>…</dialog>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`) | flow |
| Допустимые родители | потоковое (`flow`) | flow |
| Содержимое | потоковое (`flow`) | flow |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`open`](/base/frontend/html/attributes/element-specific/open).
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

### Закрытие через форму

Форма method="dialog" закрывает диалог и передаёт value нажатой кнопки в returnValue.

```html
<dialog id="confirm">
  <form method="dialog">
    <p>Удалить запись?</p>
    <button value="cancel">Отмена</button>
    <button value="delete">Удалить</button>
  </form>
</dialog>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<dialog />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLDialogElement`](https://html.spec.whatwg.org/multipage/interactive-elements.html#htmldialogelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `dialog` в WHATWG](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
