---
title: "HTML-элементы"
description: "Актуальный справочник HTML-элементов по WHATWG Living Standard."
outline: [2, 3]
---

<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->

# HTML-элементы

Справочник содержит отдельную страницу для каждого из **113 актуальных HTML-элементов**. Основная структура повторяет функциональные разделы спецификации; дополнительные индексы помогают искать элементы по модели содержимого и учебному сценарию.

::: info Актуальность
Страница сверена 2026-07-22 с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.
:::


- [По категориям содержимого](./by-category)
- [По учебным сценариям](./learning-path)
- [Устаревшие элементы и атрибуты](/base/frontend/html/obsolete)
- [Почему «блочный/строчный» — не HTML-категория](./theory/block-and-inline)

## [Корневой элемент](./document-element/)

Корень HTML-документа.

[`html`](./document-element/html)

## [Метаданные документа](./document-metadata/)

Название, базовый URL, стили и машиночитаемые сведения.

[`head`](./document-metadata/head), [`title`](./document-metadata/title), [`base`](./document-metadata/base), [`link`](./document-metadata/link), [`meta`](./document-metadata/meta), [`style`](./document-metadata/style)

## [Секции и структура](./sections/)

Семантическая структура, области страницы и заголовки.

[`body`](./sections/body), [`article`](./sections/article), [`section`](./sections/section), [`nav`](./sections/nav), [`aside`](./sections/aside), [`h1`](./sections/h1), [`h2`](./sections/h2), [`h3`](./sections/h3), [`h4`](./sections/h4), [`h5`](./sections/h5), [`h6`](./sections/h6), [`hgroup`](./sections/hgroup), [`header`](./sections/header), [`footer`](./sections/footer), [`address`](./sections/address)

## [Группировка содержимого](./grouping-content/)

Абзацы, списки, цитаты и универсальные контейнеры.

[`p`](./grouping-content/p), [`hr`](./grouping-content/hr), [`pre`](./grouping-content/pre), [`blockquote`](./grouping-content/blockquote), [`ol`](./grouping-content/ol), [`ul`](./grouping-content/ul), [`menu`](./grouping-content/menu), [`li`](./grouping-content/li), [`dl`](./grouping-content/dl), [`dt`](./grouping-content/dt), [`dd`](./grouping-content/dd), [`figure`](./grouping-content/figure), [`figcaption`](./grouping-content/figcaption), [`main`](./grouping-content/main), [`search`](./grouping-content/search), [`div`](./grouping-content/div)

## [Текстовая семантика](./text-level-semantics/)

Ссылки, выделение, цитирование и встроенная разметка.

[`a`](./text-level-semantics/a), [`em`](./text-level-semantics/em), [`strong`](./text-level-semantics/strong), [`small`](./text-level-semantics/small), [`s`](./text-level-semantics/s), [`cite`](./text-level-semantics/cite), [`q`](./text-level-semantics/q), [`dfn`](./text-level-semantics/dfn), [`abbr`](./text-level-semantics/abbr), [`ruby`](./text-level-semantics/ruby), [`rt`](./text-level-semantics/rt), [`rp`](./text-level-semantics/rp), [`data`](./text-level-semantics/data), [`time`](./text-level-semantics/time), [`code`](./text-level-semantics/code), [`var`](./text-level-semantics/var), [`samp`](./text-level-semantics/samp), [`kbd`](./text-level-semantics/kbd), [`sub`](./text-level-semantics/sub), [`sup`](./text-level-semantics/sup), [`i`](./text-level-semantics/i), [`b`](./text-level-semantics/b), [`u`](./text-level-semantics/u), [`mark`](./text-level-semantics/mark), [`bdi`](./text-level-semantics/bdi), [`bdo`](./text-level-semantics/bdo), [`span`](./text-level-semantics/span), [`br`](./text-level-semantics/br), [`wbr`](./text-level-semantics/wbr)

## [Правки](./edits/)

Добавления и удаления в документе.

[`ins`](./edits/ins), [`del`](./edits/del)

## [Встраиваемое содержимое](./embedded-content/)

Изображения, медиа, дочерние документы и внешние ресурсы.

[`picture`](./embedded-content/picture), [`source`](./embedded-content/source), [`img`](./embedded-content/img), [`iframe`](./embedded-content/iframe), [`embed`](./embedded-content/embed), [`object`](./embedded-content/object), [`video`](./embedded-content/video), [`audio`](./embedded-content/audio), [`track`](./embedded-content/track), [`map`](./embedded-content/map), [`area`](./embedded-content/area)

## [Таблицы](./tables/)

Табличные данные, группы строк и ячейки.

[`table`](./tables/table), [`caption`](./tables/caption), [`colgroup`](./tables/colgroup), [`col`](./tables/col), [`tbody`](./tables/tbody), [`thead`](./tables/thead), [`tfoot`](./tables/tfoot), [`tr`](./tables/tr), [`td`](./tables/td), [`th`](./tables/th)

## [Формы](./forms/)

Ввод, выбор, отправка и отображение результатов.

[`form`](./forms/form), [`label`](./forms/label), [`input`](./forms/input), [`button`](./forms/button), [`select`](./forms/select), [`datalist`](./forms/datalist), [`optgroup`](./forms/optgroup), [`option`](./forms/option), [`textarea`](./forms/textarea), [`output`](./forms/output), [`progress`](./forms/progress), [`meter`](./forms/meter), [`fieldset`](./forms/fieldset), [`legend`](./forms/legend), [`selectedcontent`](./forms/selectedcontent)

## [Интерактивные элементы](./interactive-elements/)

Раскрывающиеся блоки и диалоговые окна.

[`details`](./interactive-elements/details), [`summary`](./interactive-elements/summary), [`dialog`](./interactive-elements/dialog)

## [Сценарии и компоненты](./scripting/)

Скрипты, шаблоны, Shadow DOM и программная графика.

[`script`](./scripting/script), [`noscript`](./scripting/noscript), [`template`](./scripting/template), [`slot`](./scripting/slot), [`canvas`](./scripting/canvas)
