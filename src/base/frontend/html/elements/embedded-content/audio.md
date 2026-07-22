---
title: "<audio>"
description: "Аудиопроигрыватель и связанный медиаресурс."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `<audio>`

Аудиопроигрыватель и связанный медиаресурс.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Синтаксис

```html
<audio>…</audio>
```

Начальный и закрывающий теги обязательны.

## Модель содержимого

| Свойство | Практическое резюме | Точная запись WHATWG |
|---|---|---|
| Категории | потоковое (`flow`), фразовое (`phrasing`), встраиваемое (`embedded`), интерактивное (`interactive`), ощутимое (`palpable`) | flow ; phrasing ; embedded ; interactive ; palpable * |
| Допустимые родители | фразовое (`phrasing`) | phrasing |
| Содержимое | [`source`](/base/frontend/html/elements/embedded-content/source), [`track`](/base/frontend/html/elements/embedded-content/track), `transparent` | source *; track *; transparent * |

Звёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.

## Атрибуты

Все элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).

- **Специальные атрибуты:** [`src`](/base/frontend/html/attributes/element-specific/src), [`crossorigin`](/base/frontend/html/attributes/element-specific/crossorigin), [`preload`](/base/frontend/html/attributes/element-specific/preload), [`autoplay`](/base/frontend/html/attributes/element-specific/autoplay), [`loading`](/base/frontend/html/attributes/element-specific/loading), [`loop`](/base/frontend/html/attributes/element-specific/loop), [`muted`](/base/frontend/html/attributes/element-specific/muted), [`controls`](/base/frontend/html/attributes/element-specific/controls).
- **Обработчики событий, перечисленные у элемента:** специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).

## Связи с другими элементами

### Медиа и дорожки

audio и video могут содержать несколько source и track; браузер выбирает подходящий ресурс.

Связанные элементы: [`audio`](/base/frontend/html/elements/embedded-content/audio), [`video`](/base/frontend/html/elements/embedded-content/video), [`source`](/base/frontend/html/elements/embedded-content/source), [`track`](/base/frontend/html/elements/embedded-content/track).

## Примеры использования

### Базовый пример

Самостоятельный или минимальный контекст использования.

```html
<audio controls>
  <source src="podcast.ogg" type="audio/ogg">
  <source src="podcast.mp3" type="audio/mpeg">
  <a href="podcast.mp3">Скачать запись</a>
</audio>
```

## Типичные ошибки

- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.
- Не нарушайте контекст и модель содержимого из таблицы выше.
- Не используйте XML-запись `<audio />` как замену закрывающему тегу в HTML.

## DOM-интерфейс

Элемент представлен интерфейсом [`HTMLAudioElement`](https://html.spec.whatwg.org/multipage/media.html#htmlaudioelement). Для чтения исходных атрибутов всегда доступны `getAttribute()`, `setAttribute()` и `removeAttribute()`; специализированные IDL-свойства описаны в спецификации интерфейса.

## Спецификация

- [Определение `audio` в WHATWG](https://html.spec.whatwg.org/multipage/media.html#the-audio-element)
- [Общий индекс элементов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
