---
title: "HTML по учебным сценариям"
description: "Связи HTML-элементов и атрибутов в практических сценариях."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# HTML по учебным сценариям

Этот индекс показывает не изолированные теги, а валидные связи между элементами. Подробности и ограничения находятся на отдельных страницах.

## Каркас документа

У html ожидаются head и body; метаданные находятся в head, отображаемое содержимое — в body.

[`html`](/base/frontend/html/elements/document-element/html), [`head`](/base/frontend/html/elements/document-metadata/head), [`title`](/base/frontend/html/elements/document-metadata/title), [`meta`](/base/frontend/html/elements/document-metadata/meta), [`body`](/base/frontend/html/elements/sections/body), [`header`](/base/frontend/html/elements/sections/header), [`main`](/base/frontend/html/elements/grouping-content/main), [`article`](/base/frontend/html/elements/sections/article), [`section`](/base/frontend/html/elements/sections/section), [`h1`](/base/frontend/html/elements/sections/h1), [`p`](/base/frontend/html/elements/grouping-content/p), [`footer`](/base/frontend/html/elements/sections/footer)

```html
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <title>Справочник</title>
</head>
<body>
  <header><h1>Справочник</h1></header>
  <main><article><p>Содержимое страницы.</p></article></main>
  <footer>© 2026</footer>
</body>
</html>
```

## Списки и пункты

Прямыми пунктами ol, ul и menu служат элементы li.

[`nav`](/base/frontend/html/elements/sections/nav), [`ol`](/base/frontend/html/elements/grouping-content/ol), [`ul`](/base/frontend/html/elements/grouping-content/ul), [`menu`](/base/frontend/html/elements/grouping-content/menu), [`li`](/base/frontend/html/elements/grouping-content/li), [`a`](/base/frontend/html/elements/text-level-semantics/a)

```html
<nav aria-label="Основная навигация">
  <ul>
    <li><a href="/docs/">Документация</a></li>
    <li><a href="/about/">О проекте</a></li>
  </ul>
</nav>
```

## Список имён и значений

В dl группы состоят из одного или нескольких dt, за которыми следуют один или несколько dd.

[`dl`](/base/frontend/html/elements/grouping-content/dl), [`dt`](/base/frontend/html/elements/grouping-content/dt), [`dd`](/base/frontend/html/elements/grouping-content/dd)

```html
<dl>
  <dt>HTML</dt>
  <dd>Язык разметки документов.</dd>
</dl>
```

## Иллюстрация с подписью

figcaption, если есть, является первым или последним дочерним элементом figure.

[`figure`](/base/frontend/html/elements/grouping-content/figure), [`figcaption`](/base/frontend/html/elements/grouping-content/figcaption), [`img`](/base/frontend/html/elements/embedded-content/img)

```html
<figure>
  <img src="diagram.svg" alt="Схема потока данных" width="640" height="360">
  <figcaption>Поток данных приложения.</figcaption>
</figure>
```

## Ruby-аннотация

rt содержит аннотацию, а rp — резервные скобки для старых реализаций.

[`ruby`](/base/frontend/html/elements/text-level-semantics/ruby), [`rt`](/base/frontend/html/elements/text-level-semantics/rt), [`rp`](/base/frontend/html/elements/text-level-semantics/rp)

```html
<ruby>漢<rp>(</rp><rt>かん</rt><rp>)</rp></ruby>
```

## Адаптивное изображение

picture содержит source перед обязательным img; img остаётся источником по умолчанию и носителем alt.

[`picture`](/base/frontend/html/elements/embedded-content/picture), [`source`](/base/frontend/html/elements/embedded-content/source), [`img`](/base/frontend/html/elements/embedded-content/img)

```html
<picture>
  <source media="(min-width: 800px)" srcset="hero-wide.webp" type="image/webp">
  <img src="hero.jpg" alt="Горная долина">
</picture>
```

## Карта изображения

Фрагмент usemap у img совпадает с name элемента map; интерактивные области задаются через area.

[`map`](/base/frontend/html/elements/embedded-content/map), [`area`](/base/frontend/html/elements/embedded-content/area), [`img`](/base/frontend/html/elements/embedded-content/img)

```html
<img src="office.png" alt="План офиса" usemap="#office-map">
<map name="office-map">
  <area shape="rect" coords="0,0,160,120" href="/rooms/1" alt="Переговорная">
</map>
```

## Медиа и дорожки

audio и video могут содержать несколько source и track; браузер выбирает подходящий ресурс.

[`audio`](/base/frontend/html/elements/embedded-content/audio), [`video`](/base/frontend/html/elements/embedded-content/video), [`source`](/base/frontend/html/elements/embedded-content/source), [`track`](/base/frontend/html/elements/embedded-content/track)

```html
<video controls poster="preview.jpg" preload="metadata">
  <source src="lesson.webm" type="video/webm">
  <source src="lesson.mp4" type="video/mp4">
  <track kind="captions" src="captions-ru.vtt" srclang="ru" label="Русские субтитры">
</video>
```

## Доступная таблица данных

caption подписывает таблицу, строки группируются, а th связывает заголовки с данными.

[`table`](/base/frontend/html/elements/tables/table), [`caption`](/base/frontend/html/elements/tables/caption), [`colgroup`](/base/frontend/html/elements/tables/colgroup), [`col`](/base/frontend/html/elements/tables/col), [`thead`](/base/frontend/html/elements/tables/thead), [`tbody`](/base/frontend/html/elements/tables/tbody), [`tfoot`](/base/frontend/html/elements/tables/tfoot), [`tr`](/base/frontend/html/elements/tables/tr), [`th`](/base/frontend/html/elements/tables/th), [`td`](/base/frontend/html/elements/tables/td)

```html
<table>
  <caption>Продажи за квартал</caption>
  <thead><tr><th scope="col">Месяц</th><th scope="col">Сумма</th></tr></thead>
  <tbody><tr><th scope="row">Январь</th><td>120 000 ₽</td></tr></tbody>
  <tfoot><tr><th scope="row">Итого</th><td>120 000 ₽</td></tr></tfoot>
</table>
```

## Связи элементов формы

for у label совпадает с id поля, а list у input — с id datalist.

[`form`](/base/frontend/html/elements/forms/form), [`fieldset`](/base/frontend/html/elements/forms/fieldset), [`legend`](/base/frontend/html/elements/forms/legend), [`label`](/base/frontend/html/elements/forms/label), [`input`](/base/frontend/html/elements/forms/input), [`datalist`](/base/frontend/html/elements/forms/datalist), [`select`](/base/frontend/html/elements/forms/select), [`optgroup`](/base/frontend/html/elements/forms/optgroup), [`option`](/base/frontend/html/elements/forms/option), [`textarea`](/base/frontend/html/elements/forms/textarea), [`button`](/base/frontend/html/elements/forms/button), [`output`](/base/frontend/html/elements/forms/output), [`progress`](/base/frontend/html/elements/forms/progress), [`meter`](/base/frontend/html/elements/forms/meter)

```html
<form action="/subscribe" method="post">
  <fieldset>
    <legend>Подписка</legend>
    <label for="email">Email</label>
    <input id="email" name="email" type="email" required>
    <button type="submit">Подписаться</button>
  </fieldset>
</form>
```

## Раскрытие и диалог

summary является подписью details; button может декларативно управлять dialog через commandfor.

[`details`](/base/frontend/html/elements/interactive-elements/details), [`summary`](/base/frontend/html/elements/interactive-elements/summary), [`dialog`](/base/frontend/html/elements/interactive-elements/dialog), [`button`](/base/frontend/html/elements/forms/button)

```html
<details>
  <summary>Условия</summary>
  <p>Текст условий.</p>
</details>
<button command="show-modal" commandfor="confirm-dialog">Открыть</button>
<dialog id="confirm-dialog" closedby="any">Подтвердите действие.</dialog>
```

## Popover и управляющая кнопка

popovertarget ссылается на id элемента с popover.

[`button`](/base/frontend/html/elements/forms/button), [`div`](/base/frontend/html/elements/grouping-content/div)

```html
<button popovertarget="filters">Фильтры</button>
<div id="filters" popover>Настройки фильтрации</div>
```

## Шаблон и слот компонента

Declarative Shadow DOM создаётся через template[shadowrootmode], а slot принимает распределённое содержимое.

[`template`](/base/frontend/html/elements/scripting/template), [`slot`](/base/frontend/html/elements/scripting/slot)

```html
<article-card>
  <span slot="title">Новая статья</span>
  <template shadowrootmode="open">
    <h2><slot name="title"></slot></h2>
    <slot></slot>
  </template>
  <p>Краткое описание.</p>
</article-card>
```

## История правок

ins и del описывают изменения документа, а datetime фиксирует время правки.

[`ins`](/base/frontend/html/elements/edits/ins), [`del`](/base/frontend/html/elements/edits/del), [`time`](/base/frontend/html/elements/text-level-semantics/time)

```html
<p>Срок: <del datetime="2026-07-20">20 июля</del> <ins datetime="2026-07-22">22 июля</ins>.</p>
```
