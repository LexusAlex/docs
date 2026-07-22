---
title: "loading"
description: "Подсказывает, загружать ресурс сразу или лениво."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# `loading`

Подсказывает, загружать ресурс сразу или лениво.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


## Применимость и значение

| Элементы | Значение в индексе WHATWG | Формат значения | Определение |
|---|---|---|---|
| [`iframe`](/base/frontend/html/elements/embedded-content/iframe), [`img`](/base/frontend/html/elements/embedded-content/img), [`audio`](/base/frontend/html/elements/embedded-content/audio), [`video`](/base/frontend/html/elements/embedded-content/video) | Used when determining loading deferral | " lazy "; " eager " | [`iframe`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-loading), [`img`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-loading), [`audio`](https://html.spec.whatwg.org/multipage/media.html#attr-media-loading), [`video`](https://html.spec.whatwg.org/multipage/media.html#attr-media-loading) |

Английские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.

## Примеры использования

### Для `<iframe>`, `<img>`, `<audio>`, `<video>`

Точная формулировка WHATWG: `Used when determining loading deferral`. Формат из индекса: `" lazy "; " eager "`.

```html
<iframe src="/help/" title="Справка" loading="lazy"></iframe>

<img src="photo.jpg" alt="Горная долина" loading="lazy">

<audio controls loading="lazy">Скачать аудио</audio>

<video controls loading="lazy">Скачать видео</video>
```

Если атрибут отсутствует, действует состояние по умолчанию конкретного элемента. Пустая строка и отсутствие атрибута не взаимозаменяемы, кроме случаев, явно определённых спецификацией.

## Связи

- Специальная межэлементная связь в общем каталоге не выделена; область применения указана в таблице.

## DOM

`element.getAttribute(name)` возвращает исходную строку или `null`, а `element.hasAttribute(name)` проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.

## Доступность и безопасность

Атрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.

## Спецификация

- [Индекс атрибутов WHATWG](https://html.spec.whatwg.org/multipage/indices.html#attributes-3)
- [Определение `<iframe>`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-loading)
- [Определение `<img>`](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-loading)
- [Определение `<audio>`](https://html.spec.whatwg.org/multipage/media.html#attr-media-loading)
- [Определение `<video>`](https://html.spec.whatwg.org/multipage/media.html#attr-media-loading)
