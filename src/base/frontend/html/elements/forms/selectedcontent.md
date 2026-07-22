---
title: "<selectedcontent>"
description: "Отображает копию содержимого выбранного option в настраиваемом select."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<selectedcontent>`

Отображает копию содержимого выбранного option в настраиваемом select.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


::: warning Проверяйте поддержку
Эта возможность есть в Living Standard, но может быть реализована неравномерно. Перед использованием проверьте актуальную поддержку целевых браузеров.
:::

## Синтаксис

```html
<selectedcontent></selectedcontent>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | `none` | none |
| Допустимые родители | [`button`](/base/frontend/html/elements/forms/button) | button |
| Содержимое | `empty` | empty |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** нет.
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

Специальных структурных связей в общем каталоге не выделено; применяйте модель содержимого ниже.

## Примеры использования

### Базовый пример

selectedcontent должен быть пустым потомком первого дочернего button элемента select; select с multiple этот механизм не использует.

```html
<select>
  <button><selectedcontent></selectedcontent></button>
  <option>Москва</option>
  <option>Казань</option>
</select>
```

### Ограничения на контекст

selectedcontent должен быть пустым потомком первого дочернего button элемента select. Этот механизм не применяется к select с multiple.

```html
<select aria-label="Город">
  <button><selectedcontent></selectedcontent></button>
  <option value="msk">Москва</option>
  <option value="kzn">Казань</option>
</select>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<selectedcontent />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLSelectedContentElement`](https://html.spec.whatwg.org/multipage/form-elements.html#htmlselectedcontentelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `selectedcontent` в WHATWG](https://html.spec.whatwg.org/multipage/form-elements.html#the-selectedcontent-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
