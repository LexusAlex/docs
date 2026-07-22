import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import {
  SPEC_CHECKED_AT, SPEC_INDEX_URL, attributeGroup, attributeHref, attributeSlug,
  attributeSummaries, booleanAttributes, categoryTranslations, elementByName,
  elementGroups, elementHref, elementSummaries, eventAttributes, globalAttributes,
  groupedAttributes, obsoleteElements, relationshipScenarios, specificAttributes,
  supportCautionNames, voidElements
} from '../src/.vitepress/data/html-catalog.mjs'

const GENERATED_MARKER = '<!-- Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную. -->'
const GENERATED_JS_MARKER = '// Этот файл сгенерирован scripts/generate-html-docs.mjs. Не редактируйте вручную.'
const ROOT = fileURLToPath(new URL('..', import.meta.url))
const HTML_ROOT = 'src/base/frontend/html'

const modelTranslations = new Map([
  ['flow', 'потоковое'], ['phrasing', 'фразовое'], ['embedded', 'встраиваемое'],
  ['interactive', 'интерактивное'], ['palpable', 'ощутимое'], ['heading', 'заголовочное'],
  ['sectioning', 'секционное'], ['metadata', 'метаданные'], ['script-supporting', 'поддерживающее сценарии']
])

const optionalStartTags = new Set('html head body colgroup tbody'.split(' '))
const optionalEndTags = new Set('html head body li dt dd p rt rp optgroup option colgroup thead tbody tfoot tr td th'.split(' '))

const attributeExampleValues = {
  abbr: 'Сумма', accept: 'image/png,image/jpeg', 'accept-charset': 'UTF-8', accesskey: 's',
  action: '/orders', allow: 'fullscreen', alpha: '', alt: 'Горная долина', as: 'font',
  autocomplete: 'email', autocapitalize: 'sentences', autocorrect: 'on', blocking: 'render',
  charset: 'utf-8', cite: 'https://example.com/change/42', class: 'card card--featured',
  closedby: 'any', color: '#5a2ca0', colorspace: 'display-p3', cols: '40', colspan: '2',
  command: 'show-modal', commandfor: 'confirm-dialog', content: 'width=device-width, initial-scale=1',
  contenteditable: 'plaintext-only', coords: '0,0,160,120', crossorigin: 'anonymous',
  data: '/manual.pdf', 'data-*': '42', datetime: '2026-07-22', decoding: 'async',
  dir: 'rtl', dirname: 'message.dir', download: 'report.pdf', draggable: 'true',
  enctype: 'multipart/form-data', enterkeyhint: 'search', fetchpriority: 'high', for: 'email',
  form: 'checkout', formaction: '/save-draft', formenctype: 'multipart/form-data',
  formmethod: 'post', formtarget: '_blank', headingoffset: '2', headers: 'product price',
  height: '360', hidden: 'until-found', high: '80', href: '/docs/', hreflang: 'ru', 'http-equiv': 'refresh', id: 'main-content',
  imagesizes: '(min-width: 800px) 50vw, 100vw', imagesrcset: 'hero-640.jpg 640w, hero-1280.jpg 1280w',
  inputmode: 'numeric', integrity: 'sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC',
  is: 'plastic-button', itemid: 'https://example.com/products/42', itemprop: 'name',
  itemref: 'details', itemtype: 'https://schema.org/Product', kind: 'captions', label: 'Русский',
  lang: 'ru', list: 'cities', loading: 'lazy', low: '20', max: '100', maxlength: '120',
  media: '(min-width: 800px)', method: 'post', min: '0', minlength: '3', name: 'email', nonce: 'R4nd0m',
  open: '', optimum: '60', pattern: '[A-Z]{2}-\\d{4}', ping: 'https://analytics.example/ping',
  placeholder: 'name@example.com', popover: 'auto', popovertarget: 'filters',
  popovertargetaction: 'toggle', poster: 'preview.jpg', preload: 'metadata',
  referrerpolicy: 'no-referrer', rel: 'noopener', rows: '6', rowspan: '2',
  sandbox: 'allow-forms allow-scripts', scope: 'col', shadowrootmode: 'open',
  shadowrootslotassignment: 'named', shape: 'rect', size: '30',
  sizes: '(min-width: 800px) 50vw, 100vw', slot: 'title', span: '2', spellcheck: 'true',
  src: 'photo.jpg', srcdoc: '<p>Встроенный документ</p>', srclang: 'ru',
  srcset: 'photo-640.jpg 640w, photo-1280.jpg 1280w', start: '3', step: '0.5',
  style: 'display: grid', tabindex: '0', target: '_blank', title: 'Дополнительная информация',
  translate: 'no', type: 'email', usemap: '#office-map', value: '42', width: '640',
  wrap: 'soft', writingsuggestions: 'false'
}

const attributeExampleElements = {
  allowfullscreen: 'iframe', alpha: 'input', as: 'link', async: 'script', autocapitalize: 'input',
  autocorrect: 'textarea', autofocus: 'input', autoplay: 'video', blocking: 'link', charset: 'meta',
  checked: 'input', closedby: 'dialog', color: 'link', contenteditable: 'div', enterkeyhint: 'input',
  colorspace: 'input', command: 'button', commandfor: 'button', content: 'meta', controls: 'video',
  default: 'track', defer: 'script', disabled: 'button', fetchpriority: 'img',
  formnovalidate: 'button', headingoffset: 'section', headingreset: 'section', hidden: 'section',
  inert: 'main', inputmode: 'input', is: 'button', ismap: 'img', itemid: 'article',
  itemprop: 'span', itemref: 'article', itemscope: 'article', itemtype: 'article', loop: 'audio',
  multiple: 'input', muted: 'video', nomodule: 'script', novalidate: 'form', open: 'details', playsinline: 'video',
  readonly: 'input', required: 'input', reversed: 'ol', selected: 'option',
  shadowrootclonable: 'template', shadowrootcustomelementregistry: 'template',
  shadowrootdelegatesfocus: 'template', shadowrootmode: 'template', shadowrootserializable: 'template',
  srcdoc: 'iframe', type: 'input', value: 'input'
}

const elementExampleOverrides = {
  audio: '<audio controls>\n  <source src="podcast.ogg" type="audio/ogg">\n  <source src="podcast.mp3" type="audio/mpeg">\n  <a href="podcast.mp3">Скачать запись</a>\n</audio>',
  bdo: '<p>Код справа налево: <bdo dir="rtl">12345</bdo></p>',
  col: '<table>\n  <colgroup><col span="2" class="numeric"></colgroup>\n  <tbody><tr><td>10</td><td>20</td></tr></tbody>\n</table>',
  colgroup: '<table>\n  <colgroup><col class="name"><col class="value"></colgroup>\n  <tbody><tr><td>Товар</td><td>100 ₽</td></tr></tbody>\n</table>',
  data: '<p>Товар: <data value="SKU-42">настольная лампа</data></p>',
  hgroup: '<hgroup>\n  <h1>Руководство по HTML</h1>\n  <p>Практический справочник</p>\n</hgroup>',
  menu: '<menu>\n  <li><button type="button">Сохранить</button></li>\n  <li><button type="button">Закрыть</button></li>\n</menu>',
  ol: '<ol>\n  <li>Подготовить разметку</li>\n  <li>Проверить валидность</li>\n</ol>',
  base: '<base href="https://example.com/docs/">',
  link: '<link rel="stylesheet" href="styles.css">',
  meta: '<meta name="description" content="Краткое описание страницы">',
  style: '<style>\n  .notice { color: #b42318; }\n</style>',
  hr: '<p>Первая тема.</p>\n<hr>\n<p>Следующая тема.</p>',
  pre: '<pre><code>const answer = 42;</code></pre>',
  blockquote: '<blockquote cite="https://example.com/source">\n  <p>Короткая цитата из источника.</p>\n</blockquote>',
  search: '<search>\n  <form action="/search">\n    <label for="query">Поиск</label>\n    <input id="query" name="q" type="search">\n  </form>\n</search>',
  br: '<p>Москва<br>Тверская улица, 1</p>', wbr: '<p>very-long-domain<wbr>.example</p>',
  iframe: '<iframe src="/help/" title="Справка"></iframe>',
  embed: '<embed src="diagram.svg" type="image/svg+xml">',
  object: '<object data="manual.pdf" type="application/pdf">\n  <a href="manual.pdf">Скачать инструкцию</a>\n</object>',
  canvas: '<canvas width="320" height="180">Статическая схема: A → B.</canvas>',
  script: '<script type="module" src="app.js"></script>',
  noscript: '<noscript><p>Для интерактивной карты нужен JavaScript.</p></noscript>',
  selectedcontent: '<select>\n  <button><selectedcontent></selectedcontent></button>\n  <option>Москва</option>\n  <option>Казань</option>\n</select>',
  datalist: '<label for="city">Город</label>\n<input id="city" name="city" list="cities">\n<datalist id="cities">\n  <option value="Москва"></option>\n  <option value="Казань"></option>\n</datalist>',
  select: '<label for="city">Город</label>\n<select id="city" name="city">\n  <optgroup label="Россия"><option>Казань</option></optgroup>\n</select>',
  optgroup: '<select aria-label="Город">\n  <optgroup label="Россия"><option>Казань</option></optgroup>\n</select>',
  option: '<select aria-label="Город"><option value="kzn">Казань</option></select>',
  textarea: '<label for="comment">Комментарий</label>\n<textarea id="comment" name="comment" rows="5"></textarea>',
  output: '<form oninput="sum.value = Number(a.value) + Number(b.value)">\n  <input name="a" type="number" value="2"> +\n  <input name="b" type="number" value="3"> =\n  <output name="sum">5</output>\n</form>',
  progress: '<label for="upload">Загрузка</label>\n<progress id="upload" value="60" max="100">60%</progress>',
  meter: '<label for="disk">Диск</label>\n<meter id="disk" min="0" max="100" low="20" high="80" value="65">65%</meter>',
  abbr: '<p><abbr title="HyperText Markup Language">HTML</abbr> задаёт структуру документа.</p>',
  address: '<address>\n  Автор: <a href="mailto:editor@example.com">Редакция справочника</a>\n</address>',
  aside: '<article>\n  <h2>Основная тема</h2>\n  <p>Текст статьи.</p>\n  <aside><h3>Связанный факт</h3><p>Дополнительный контекст.</p></aside>\n</article>',
  b: '<p>Новая версия доступна в тарифе <b>Профессиональный</b>.</p>',
  bdi: '<p>Победитель: <bdi>إيان</bdi> — 1 место.</p>',
  cite: '<p>Подробнее в книге <cite>Designing with Web Standards</cite>.</p>',
  code: '<pre><code>const answer = 42;\nconsole.log(answer);</code></pre>',
  dfn: '<p><dfn id="term-dom">DOM</dfn> — объектная модель документа. См. <a href="#term-dom">определение DOM</a>.</p>',
  em: '<p>Нужно отправить отчёт <em>сегодня</em>, а не завтра.</p>',
  i: '<p>Термин <i lang="la">in situ</i> означает «на месте».</p>',
  kbd: '<p>Нажмите <kbd><kbd>Ctrl</kbd> + <kbd>S</kbd></kbd>, чтобы сохранить.</p>',
  mark: '<p>Результат поиска: настройте <mark>безопасность</mark> приложения.</p>',
  q: '<p>Рецензент отметил: <q cite="https://example.com/review">пример понятен</q>.</p>',
  s: '<p><s>4 990 ₽</s> <strong>3 990 ₽</strong></p>',
  samp: '<p>Терминал ответил: <samp>Permission denied</samp>.</p>',
  section: '<section aria-labelledby="install-title">\n  <h2 id="install-title">Установка</h2>\n  <p>Добавьте пакет в проект.</p>\n</section>',
  small: '<p><small>Цена включает НДС. Предложение действует до 31 июля.</small></p>',
  strong: '<p><strong>Внимание:</strong> действие нельзя отменить.</p>',
  sub: '<p>Формула воды: H<sub>2</sub>O.</p>',
  sup: '<p>Площадь: 24 м<sup>2</sup>. Утверждение подтверждено источником<sup><a href="#note-1">1</a></sup>.</p>',
  time: '<p>Встреча <time datetime="2026-07-22T18:30:00+03:00">22 июля в 18:30</time>.</p>',
  u: '<p>В слове <u class="spelling">инжинер</u> найдена орфографическая ошибка.</p>',
  var: '<p>Площадь круга: <var>S</var> = π × <var>r</var><sup>2</sup>.</p>'
}

const elementExtraExamples = {
  a: [
    { title: 'Фрагмент, загрузка и внешний переход', note: 'Один и тот же элемент создаёт разные виды ссылок через URL и дополнительные атрибуты.', html: '<nav>\n  <a href="#install">К установке</a>\n  <a href="/files/guide.pdf" download>Скачать PDF</a>\n  <a href="https://example.org/" target="_blank" rel="noopener">Внешний сайт</a>\n</nav>' }
  ],
  button: [
    { title: 'Обычная и отправляющая кнопки', note: 'В форме явно задавайте type, если кнопка не должна отправлять данные.', html: '<form action="/search">\n  <input name="q" type="search">\n  <button type="submit">Найти</button>\n  <button type="button" id="clear">Очистить</button>\n</form>' }
  ],
  details: [
    { title: 'Группа взаимоисключающих раскрытий', note: 'Одинаковый name объединяет несколько details в группу.', html: '<details name="faq" open><summary>Доставка</summary><p>От двух дней.</p></details>\n<details name="faq"><summary>Оплата</summary><p>Картой или переводом.</p></details>' }
  ],
  dialog: [
    { title: 'Закрытие через форму', note: 'Форма method="dialog" закрывает диалог и передаёт value нажатой кнопки в returnValue.', html: '<dialog id="confirm">\n  <form method="dialog">\n    <p>Удалить запись?</p>\n    <button value="cancel">Отмена</button>\n    <button value="delete">Удалить</button>\n  </form>\n</dialog>' }
  ],
  img: [
    { title: 'Размер, отложенная загрузка и плотность пикселей', note: 'width и height резервируют место, loading управляет загрузкой, srcset позволяет выбрать плотность.', html: '<img src="avatar.png" srcset="avatar.png 1x, avatar@2x.png 2x" alt="Анна Смирнова" width="96" height="96" loading="lazy">' }
  ],
  input: [
    { title: 'Разные типы полей', note: 'Тип поля задаёт семантику, встроенную проверку и подходящую экранную клавиатуру.', html: '<label>Email <input name="email" type="email" autocomplete="email" required></label>\n<label>Дата <input name="date" type="date"></label>\n<label>Количество <input name="qty" type="number" min="1" max="10" step="1"></label>\n<label><input name="agree" type="checkbox" required> Согласен</label>' }
  ],
  link: [
    { title: 'Таблица стилей, иконка и preload', note: 'rel определяет отношение связанного ресурса к документу.', html: '<link rel="stylesheet" href="styles.css">\n<link rel="icon" href="favicon.svg" type="image/svg+xml">\n<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>' }
  ],
  meta: [
    { title: 'Кодировка, viewport и описание', note: 'Кодировку размещайте как можно раньше в head; остальные meta задают метаданные документа.', html: '<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="description" content="Практический справочник HTML">' }
  ],
  script: [
    { title: 'Модуль и import map', note: 'Модуль можно загрузить по src, а importmap сопоставляет имена модулей с URL.', html: '<script type="importmap">\n{ "imports": { "app": "/js/app.js" } }\n</script>\n<script type="module">\n  import "app";\n</script>' }
  ],
  select: [
    { title: 'Множественный выбор', note: 'multiple разрешает выбрать несколько option; сервер получает несколько значений одного name.', html: '<label for="topics">Темы</label>\n<select id="topics" name="topics" multiple size="4">\n  <option value="html">HTML</option>\n  <option value="css">CSS</option>\n  <option value="js">JavaScript</option>\n</select>' }
  ],
  selectedcontent: [
    { title: 'Ограничения на контекст', note: 'selectedcontent должен быть пустым потомком первого дочернего button элемента select. Этот механизм не применяется к select с multiple.', html: '<select aria-label="Город">\n  <button><selectedcontent></selectedcontent></button>\n  <option value="msk">Москва</option>\n  <option value="kzn">Казань</option>\n</select>' }
  ],
  table: [
    { title: 'Связь сложных заголовков через headers', note: 'Для нерегулярной таблицы td может явно перечислять id связанных th.', html: '<table>\n  <tr><th id="product">Товар</th><th id="price">Цена</th></tr>\n  <tr><th id="lamp">Лампа</th><td headers="lamp price">3 990 ₽</td></tr>\n</table>' }
  ],
  time: [
    { title: 'Дата, время и длительность', note: 'datetime хранит машиночитаемое значение, а текст остаётся удобным для читателя.', html: '<time datetime="2026-07-22">22 июля 2026 года</time>\n<time datetime="18:30">18:30</time>\n<time datetime="PT2H30M">2 часа 30 минут</time>' }
  ],
  video: [
    { title: 'Несколько форматов и субтитры', note: 'Несколько source дают браузеру выбор, track добавляет доступные субтитры.', html: '<video controls width="640" poster="preview.jpg">\n  <source src="lesson.webm" type="video/webm">\n  <source src="lesson.mp4" type="video/mp4">\n  <track default kind="captions" src="captions-ru.vtt" srclang="ru" label="Русские">\n  <a href="lesson.mp4">Скачать видео</a>\n</video>' }
  ]
}

const attributeVariantValues = {
  'autocomplete:form': 'off', 'autocomplete:input': 'email', 'autocomplete:select': 'country-name', 'autocomplete:textarea': 'street-address',
  'datetime:del': '2026-07-20', 'datetime:ins': '2026-07-22', 'datetime:time': '2026-07-22T18:30:00+03:00',
  'disabled:fieldset': null, 'disabled:optgroup': null, 'disabled:option': null, 'disabled:select': null,
  'for:label': 'email', 'for:output': 'price quantity',
  'href:a': '/docs/', 'href:area': '/rooms/1', 'href:base': 'https://example.com/docs/', 'href:link': 'styles.css',
  'max:input': '10', 'max:meter': '100', 'max:progress': '100',
  'min:input': '1', 'min:meter': '0',
  'name:details': 'faq', 'name:form': 'search', 'name:iframe': 'preview', 'name:input': 'email', 'name:map': 'office-map', 'name:meta': 'description', 'name:object': 'manual', 'name:output': 'total', 'name:select': 'city', 'name:slot': 'title', 'name:textarea': 'comment',
  'open:details': null, 'open:dialog': null,
  'readonly:input': null, 'readonly:textarea': null,
  'rel:a': 'noopener', 'rel:area': 'help', 'rel:form': 'external', 'rel:link': 'stylesheet',
  'sizes:img': '(min-width: 800px) 50vw, 100vw', 'sizes:link': '32x32', 'sizes:source': '(min-width: 800px) 50vw, 100vw',
  'target:a': '_blank', 'target:area': '_self', 'target:base': '_self', 'target:form': '_blank',
  'title:abbr': 'HyperText Markup Language', 'title:dfn': 'Document Object Model', 'title:input': 'Формат: name@example.com',
  'type:a': 'text/html', 'type:link': 'text/css', 'type:button': 'submit', 'type:embed': 'image/svg+xml', 'type:object': 'application/pdf', 'type:source': 'video/webm', 'type:input': 'email', 'type:ol': 'I', 'type:script': 'module',
  'value:button': 'save', 'value:data': 'SKU-42', 'value:input': '42', 'value:li': '10', 'value:meter': '65', 'value:option': 'kzn', 'value:progress': '60'
}

const attributeExtraExamples = {
  autocomplete: [
    { title: 'Составные токены', html: '<input name="card" autocomplete="section-checkout billing cc-number">\n<input name="phone" autocomplete="section-contact mobile tel">' }
  ],
  closedby: [
    { title: 'Три режима закрытия диалога', html: '<dialog closedby="any">Закрывается также лёгким закрытием.</dialog>\n<dialog closedby="closerequest">Закрывается запросом пользователя.</dialog>\n<dialog closedby="none">Закрывается только кодом.</dialog>' }
  ],
  command: [
    { title: 'Popover, dialog и пользовательская команда', html: '<button command="toggle-popover" commandfor="help">Переключить</button>\n<button command="show-popover" commandfor="help">Показать</button>\n<button command="hide-popover" commandfor="help">Скрыть</button>\n<div id="help" popover>Справка</div>\n\n<button command="show-modal" commandfor="confirm">Открыть диалог</button>\n<dialog id="confirm">\n  <button command="request-close" commandfor="confirm">Запросить закрытие</button>\n  <button command="close" commandfor="confirm">Закрыть</button>\n</dialog>\n\n<div id="editor">Редактор</div>\n<button command="--save" commandfor="editor">Сохранить</button>' }
  ],
  contenteditable: [
    { title: 'Редактирование разметки и обычного текста', html: '<div contenteditable="true">Можно редактировать форматированный текст.</div>\n<pre contenteditable="plaintext-only">Вставка очищается до обычного текста.</pre>\n<div contenteditable="false">Этот потомок не редактируется.</div>' }
  ],
  dir: [
    { title: 'Явное и автоматическое направление', html: '<p dir="rtl" lang="ar">مرحبا بالعالم</p>\n<p dir="auto">Пользовательский текст с неизвестным направлением</p>' }
  ],
  headingoffset: [
    { title: 'Смещение вложенных заголовков', html: '<article headingoffset="1">\n  <h1>Вычисляется как заголовок второго уровня</h1>\n  <section headingoffset="1"><h1>Ещё на уровень глубже</h1></section>\n</article>' }
  ],
  headingreset: [
    { title: 'Новая область вычисления уровня', html: '<article headingoffset="2">\n  <h1>Заголовок статьи</h1>\n  <dialog headingreset><h1>Независимый заголовок диалога</h1></dialog>\n</article>' }
  ],
  hidden: [
    { title: 'Обычное скрытие и until-found', html: '<section hidden>Не относится к текущему состоянию страницы.</section>\n<section id="details" hidden="until-found">Браузер может раскрыть этот фрагмент при поиске.</section>' }
  ],
  id: [
    { title: 'Фрагмент, подпись поля и выбор из JavaScript', html: '<h2 id="install">Установка</h2>\n<a href="#install">Перейти к установке</a>\n<label for="email">Email</label>\n<input id="email" type="email">' }
  ],
  popover: [
    { title: 'Режимы auto, manual и hint', html: '<div id="menu" popover="auto">Меню</div>\n<div id="status" popover="manual">Статус операции</div>\n<div id="tip" popover="hint">Краткая подсказка</div>' }
  ],
  tabindex: [
    { title: 'Фокус по порядку и только программно', html: '<div tabindex="0">Попадает в последовательную навигацию.</div>\n<div id="panel" tabindex="-1">Получает фокус через panel.focus().</div>' }
  ],
  type: [
    { title: 'Основные состояния input', html: '<input type="text" name="name">\n<input type="password" name="password">\n<input type="email" name="email">\n<input type="url" name="site">\n<input type="tel" name="phone">\n<input type="search" name="q">\n<input type="number" name="count" min="0">\n<input type="range" name="volume" min="0" max="100">\n<input type="date" name="date">\n<input type="datetime-local" name="starts">\n<input type="month" name="month">\n<input type="week" name="week">\n<input type="time" name="time">\n<input type="color" name="color">\n<input type="file" name="files" multiple>\n<input type="checkbox" name="agree">\n<input type="radio" name="plan" value="pro">\n<input type="hidden" name="token" value="42">\n<input type="submit" value="Отправить">\n<input type="reset" value="Сбросить">\n<input type="button" value="Проверить">\n<input type="image" src="send.svg" alt="Отправить">' },
    { title: 'Варианты script', html: '<script src="classic.js"></script>\n<script type="module" src="app.js"></script>\n<script type="importmap">{ "imports": { "app": "/app.js" } }</script>' }
  ],
  writingsuggestions: [
    { title: 'Включение и отключение подсказок', html: '<textarea writingsuggestions="true"></textarea>\n<textarea writingsuggestions="false"></textarea>' }
  ]
}

function yamlText(value) {
  return `"${value.replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`
}

function frontmatter(title, description) {
  return `---\ntitle: ${yamlText(title)}\ndescription: ${yamlText(description)}\noutline: [2, 3]\n---\n\n${GENERATED_MARKER}\n`
}

function inlineCode(value) {
  return `\`${String(value).replaceAll('`', '\\`')}\``
}

function tableText(value) {
  return String(value || '—')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('|', '\\|')
    .replaceAll('\n', ' ')
}

function entityLink(name, href) {
  return href ? `[${inlineCode(name)}](${href})` : inlineCode(name)
}

function checkedNotice(kind, name) {
  const caution = supportCautionNames.has(name)
    ? '\n\n::: warning Проверяйте поддержку\nЭта возможность есть в Living Standard, но может быть реализована неравномерно. Перед использованием проверьте актуальную поддержку целевых браузеров.\n:::'
    : ''
  return `::: info Актуальность\nСтраница сверена ${SPEC_CHECKED_AT} с текущим индексом WHATWG HTML Living Standard. Наличие в стандарте не заменяет проверку поддержки браузерами для проекта.\n:::\n${caution}`
}

function tagRule(name) {
  if (voidElements.has(name)) return 'Пустой (void) элемент: закрывающий тег запрещён.'
  const start = optionalStartTags.has(name)
  const end = optionalEndTags.has(name)
  if (start && end) return 'Начальный и/или закрывающий тег можно опускать только при условиях, перечисленных в спецификации; явная запись обычно понятнее.'
  if (end) return 'Закрывающий тег можно опустить только при условиях из спецификации; в примерах он записан явно.'
  return 'Начальный и закрывающий теги обязательны.'
}

function syntaxForElement(name) {
  if (voidElements.has(name)) return `<${name}>`
  if (['iframe', 'selectedcontent'].includes(name)) return `<${name}></${name}>`
  return `<${name}>…</${name}>`
}

function scenariosForElement(name) {
  const pattern = new RegExp(`<${name}(?:[\\s>])`, 'u')
  return relationshipScenarios.filter((scenario) => pattern.test(scenario.html))
}

function fallbackElementExample(name, scenarios) {
  if (elementExampleOverrides[name]) return elementExampleOverrides[name]
  if (scenarios.length) return scenarios[0].html
  if (voidElements.has(name)) return `<${name}>`
  if (/^h[1-6]$/u.test(name)) return `<${name}>Заголовок раздела</${name}>`
  return `<${name}>Содержимое ${name}</${name}>`
}

function modelList(values, text) {
  if (!values.length) return inlineCode(text || 'none')
  return values.map((value) => {
    const translated = modelTranslations.get(value)
    const href = elementHref(value)
    return href ? entityLink(value, href) : translated ? `${translated} (${inlineCode(value)})` : inlineCode(value)
  }).join(', ')
}

function elementExamples(element) {
  const scenarios = scenariosForElement(element.name)
  const examples = [{
    title: 'Базовый пример',
    note: element.name === 'selectedcontent'
      ? 'selectedcontent должен быть пустым потомком первого дочернего button элемента select; select с multiple этот механизм не использует.'
      : 'Самостоятельный или минимальный контекст использования.',
    html: fallbackElementExample(element.name, scenarios)
  }]
  for (const scenario of scenarios) {
    if (examples.some(({ html }) => html === scenario.html)) continue
    examples.push({ title: scenario.title, note: scenario.note, html: scenario.html })
  }
  for (const example of elementExtraExamples[element.name] ?? []) {
    if (!examples.some(({ html }) => html === example.html)) examples.push(example)
  }
  return examples
}

function renderElementPage(element) {
  const name = element.name
  const summary = elementSummaries[name]
  const regularAttributes = element.attributes.filter((attribute) => !attribute.startsWith('on'))
  const eventHandlers = element.attributes.filter((attribute) => attribute.startsWith('on'))
  const attributes = regularAttributes.length
    ? regularAttributes.map((attribute) => entityLink(attribute, attributeHref(attribute) ?? element.attributeLinks[attribute])).join(', ')
    : 'нет'
  const events = eventHandlers.length
    ? eventHandlers.map((attribute) => entityLink(attribute, attributeHref(attribute) ?? element.attributeLinks[attribute])).join(', ')
    : 'специальных обработчиков нет; общие обработчики событий перечислены в [каталоге событий](/base/frontend/html/attributes/events/).'
  const related = relationshipScenarios.filter((item) => item.elements.includes(name))
  const relatedSection = related.length
    ? related.map((item) => `### ${item.title}\n\n${item.note}\n\nСвязанные элементы: ${item.elements.map((relatedName) => entityLink(relatedName, elementHref(relatedName))).join(', ')}.`).join('\n\n')
    : 'Специальных структурных связей в общем каталоге не выделено; применяйте модель содержимого ниже.'
  const examples = elementExamples(element).map((example) => `### ${example.title}\n\n${example.note}\n\n\`\`\`html\n${example.html}\n\`\`\``).join('\n\n')
  const sourceLink = `[Определение ${inlineCode(name)} в WHATWG](${element.specUrl})`

  return `${frontmatter(`<${name}>`, summary)}\n# ${inlineCode(`<${name}>`)}\n\n${summary}\n\n${checkedNotice('element', name)}\n\n## Синтаксис\n\n\`\`\`html\n${syntaxForElement(name)}\n\`\`\`\n\n${tagRule(name)}\n\n## Модель содержимого\n\n| Свойство | Практическое резюме | Точная запись WHATWG |\n|---|---|---|\n| Категории | ${tableText(modelList(element.categories, element.categoriesText))} | ${tableText(element.categoriesText)} |\n| Допустимые родители | ${tableText(modelList(element.parents, element.parentsText))} | ${tableText(element.parentsText)} |\n| Содержимое | ${tableText(modelList(element.children, element.childrenText))} | ${tableText(element.childrenText)} |\n\nЗвёздочка в точной записи означает условие, раскрытое в определении элемента. Практическое резюме помогает навигации, но при сложной или прозрачной модели ориентируйтесь на исходную формулировку и ссылку на спецификацию.\n\n## Атрибуты\n\nВсе элементы принимают [глобальные атрибуты](/base/frontend/html/attributes/global/).\n\n- **Специальные атрибуты:** ${attributes}.\n- **Обработчики событий, перечисленные у элемента:** ${events}\n\n## Связи с другими элементами\n\n${relatedSection}\n\n## Примеры использования\n\n${examples}\n\n## Типичные ошибки\n\n- Не выбирайте элемент по внешнему виду: семантику определяет назначение содержимого, а оформление — CSS.\n- Не нарушайте контекст и модель содержимого из таблицы выше.\n- ${voidElements.has(name) ? `Не добавляйте закрывающий тег ${inlineCode(`</${name}>`)}.` : `Не используйте XML-запись ${inlineCode(`<${name} />`)} как замену закрывающему тегу в HTML.`}\n\n## DOM-интерфейс\n\nЭлемент представлен интерфейсом ${element.interfaceUrl ? `[${inlineCode(element.interface)}](${element.interfaceUrl})` : inlineCode(element.interface)}. Для чтения исходных атрибутов всегда доступны ${inlineCode('getAttribute()')}, ${inlineCode('setAttribute()')} и ${inlineCode('removeAttribute()')}; специализированные IDL-свойства описаны в спецификации интерфейса.\n\n## Спецификация\n\n- ${sourceLink}\n- [Общий индекс элементов WHATWG](${SPEC_INDEX_URL}#elements-3)\n`
}
function attributeApplies(variant) {
  if (variant.appliesToAll) return 'Все HTML-элементы'
  if (variant.elements.length) return variant.elements.map((name) => entityLink(name, elementHref(name))).join(', ')
  return variant.appliesText
}

function attributeAppliesLabel(variant) {
  if (variant.appliesToAll) return 'всех HTML-элементов'
  if (variant.elements.length) return variant.elements.map((name) => inlineCode(`<${name}>`)).join(', ')
  return tableText(variant.appliesText)
}

function variantElements(attribute, variant) {
  if (variant.elements.length) return variant.elements
  if (/custom elements/iu.test(variant.appliesText)) return ['x-rating']
  return [attributeExampleElements[attribute.name] ?? 'div']
}

function contextualAttributeValue(name, element) {
  const key = `${name}:${element}`
  return Object.hasOwn(attributeVariantValues, key) ? attributeVariantValues[key] : attributeExampleValues[name]
}

function attributeSource(name, value) {
  const actualName = name === 'data-*' ? 'data-user-id' : name
  return booleanAttributes.has(name) || value === null ? actualName : `${actualName}="${value ?? 'value'}"`
}

function tagWithFocusedAttribute(element, name, value) {
  const attributes = new Map()
  const defaults = {
    a: { href: '/docs/' }, area: { shape: 'rect', coords: '0,0,160,120', href: '/rooms/1', alt: 'Переговорная' },
    audio: { controls: null }, base: { href: 'https://example.com/docs/' }, button: { type: 'button' },
    embed: { src: 'diagram.svg', type: 'image/svg+xml' }, form: { action: '/submit', method: 'post' },
    iframe: { src: '/help/', title: 'Справка' }, img: { src: 'photo.jpg', alt: 'Горная долина' },
    input: { type: 'text', name: 'field' }, link: { rel: 'stylesheet', href: 'styles.css' },
    meta: { name: 'description', content: 'Описание страницы' }, object: { data: 'manual.pdf', type: 'application/pdf' },
    script: { src: 'app.js' }, source: { src: 'lesson.webm', type: 'video/webm' },
    track: { kind: 'captions', src: 'captions-ru.vtt', srclang: 'ru', label: 'Русские субтитры' },
    video: { controls: null }, 'x-rating': {}
  }
  for (const [key, defaultValue] of Object.entries(defaults[element] ?? {})) attributes.set(key, defaultValue)

  if (element === 'link' && name === 'as') {
    attributes.set('rel', 'preload'); attributes.set('href', 'font.woff2'); attributes.set('crossorigin', null)
  }
  if (element === 'link' && name === 'color') {
    attributes.set('rel', 'mask-icon'); attributes.set('href', 'icon.svg')
  }
  if (element === 'link' && ['imagesizes', 'imagesrcset'].includes(name)) {
    attributes.set('rel', 'preload'); attributes.set('as', 'image'); attributes.set('href', 'hero.jpg')
  }
  if (element === 'link' && name === 'sizes') {
    attributes.set('rel', 'icon'); attributes.set('href', 'icon-32.png')
  }
  if (element === 'meta' && name === 'charset') attributes.clear()
  if (element === 'meta' && name === 'http-equiv') {
    attributes.delete('name'); attributes.set('content', '0; url=/new-location/')
  }
  if (element === 'meta' && name === 'media') {
    attributes.set('name', 'theme-color'); attributes.set('content', '#ffffff')
  }
  if (element === 'source' && ['height', 'media', 'sizes', 'srcset', 'width'].includes(name)) {
    attributes.delete('src'); attributes.set('type', 'image/webp')
    if (name !== 'srcset') attributes.set('srcset', 'hero-wide.webp 1280w')
  }
  if (element === 'input' && ['accept', 'multiple'].includes(name)) attributes.set('type', 'file')
  if (element === 'input' && ['alpha', 'colorspace'].includes(name)) attributes.set('type', 'color')
  if (element === 'input' && name === 'checked') attributes.set('type', 'checkbox')
  if (element === 'input' && ['max', 'min', 'step'].includes(name)) attributes.set('type', 'number')
  if (element === 'input' && ['alt', 'height', 'src', 'width'].includes(name)) {
    attributes.set('type', 'image'); attributes.set('src', 'send.svg'); attributes.set('alt', 'Отправить')
  }
  if (element === 'input' && ['formaction', 'formenctype', 'formmethod', 'formnovalidate', 'formtarget'].includes(name)) attributes.set('type', 'submit')
  attributes.set(name === 'data-*' ? 'data-user-id' : name, booleanAttributes.has(name) || value === null ? null : value ?? 'value')

  const renderedAttributes = [...attributes].map(([key, item]) => item === null ? key : `${key}="${item}"`).join(' ')
  const open = `<${element}${renderedAttributes ? ` ${renderedAttributes}` : ''}>`
  if (voidElements.has(element)) return open
  const text = {
    a: 'Документация', audio: 'Скачать аудио', button: 'Выполнить', data: 'настольная лампа',
    details: '<summary>Подробнее</summary><p>Дополнительная информация.</p>', dialog: '<p>Подтвердите действие.</p>',
    iframe: '', ol: '<li>Первый пункт</li>', option: 'Казань', output: '42', q: 'Короткая цитата',
    script: '', select: '<option>Казань</option>',
    colgroup: '<col><col>', optgroup: '<option>Казань</option>',
    style: '.notice { color: #b42318; }', textarea: 'Исходный текст', video: 'Скачать видео', 'x-rating': '4'
  }[element] ?? `Содержимое ${element}`
  return `${open}${text}</${element}>`
}

function specialAttributeExample(attribute, variant, element) {
  const name = attribute.name
  if (name === 'for' && element === 'label') return '<label for="email">Email</label>\n<input id="email" name="email" type="email">'
  if (name === 'for' && element === 'output') return '<input id="price" type="number" value="100"> ×\n<input id="quantity" type="number" value="2"> =\n<output for="price quantity">200</output>'
  if (name === 'form') return `<form id="checkout" action="/checkout"></form>\n${tagWithFocusedAttribute(element, name, 'checkout')}`
  if (name === 'list') return '<label for="city">Город</label>\n<input id="city" name="city" list="cities">\n<datalist id="cities"><option value="Казань"></option></datalist>'
  if (name === 'headers') return `<table>\n  <tr><th id="product">Товар</th><th id="price">Цена</th></tr>\n  <tr><${element} headers="product price">Лампа — 3 990 ₽</${element}></tr>\n</table>`
  if (name === 'usemap') return '<img src="office.png" alt="План офиса" usemap="#office-map">\n<map name="office-map"><area href="/room/1" alt="Переговорная"></map>'
  if (name === 'ismap') return '<a href="/map-click"><img src="map.png" alt="Интерактивная карта" ismap></a>'
  if (name === 'command' || name === 'commandfor') return '<button command="show-modal" commandfor="confirm-dialog">Открыть</button>\n<dialog id="confirm-dialog">Подтвердите действие.</dialog>'
  if (name === 'popovertarget' || name === 'popovertargetaction') {
    const control = element === 'input'
      ? '<input type="button" value="Фильтры" popovertarget="filters" popovertargetaction="toggle">'
      : '<button type="button" popovertarget="filters" popovertargetaction="toggle">Фильтры</button>'
    return `${control}\n<div id="filters" popover>Настройки фильтрации</div>`
  }
  if (name === 'slot') return '<article-card>\n  <span slot="title">Новая статья</span>\n  <template shadowrootmode="open"><h2><slot name="title"></slot></h2></template>\n</article-card>'
  if (name === 'itemref') return '<article itemscope itemtype="https://schema.org/Product" itemref="extra">\n  <span itemprop="name">Лампа</span>\n</article>\n<p id="extra" itemprop="description">Настольная лампа.</p>'
  if (name === 'itemid') return '<article itemscope itemtype="https://schema.org/Product" itemid="https://example.com/products/42">\n  <span itemprop="name">Лампа</span>\n</article>'
  if (name === 'itemprop') return '<article itemscope itemtype="https://schema.org/Product">\n  <span itemprop="name">Лампа</span>\n</article>'
  if (name === 'itemscope') return '<article itemscope itemtype="https://schema.org/Product">\n  <span itemprop="name">Лампа</span>\n</article>'
  if (name === 'itemtype') return '<article itemscope itemtype="https://schema.org/Product">\n  <span itemprop="name">Лампа</span>\n</article>'
  if (name === 'is') return '<button is="plastic-button" type="button">Сохранить</button>'
  if (name === 'dirname') return tagWithFocusedAttribute(element, name, `${element === 'textarea' ? 'comment' : 'query'}.dir`).replace(`name="field"`, `name="${element === 'textarea' ? 'comment' : 'query'}"`)
  return null
}

function wrapAttributeElement(element, source, name) {
  if (element === 'area') return `<map name="office-map">\n  ${source}\n</map>`
  if (element === 'caption') return `<table>\n  ${source}\n  <tr><td>Данные</td></tr>\n</table>`
  if (element === 'col') return `<table>\n  <colgroup>${source}</colgroup>\n  <tr><td>Данные</td></tr>\n</table>`
  if (element === 'colgroup') return `<table>\n  ${source}\n  <tr><td>Данные</td></tr>\n</table>`
  if (['td', 'th'].includes(element)) return `<table>\n  <tr>${source}</tr>\n</table>`
  if (element === 'tr') return `<table>\n  <tbody>${source}</tbody>\n</table>`
  if (element === 'li') return `<ol>\n  ${source}\n</ol>`
  if (['dt', 'dd'].includes(element)) return `<dl>\n  ${source}\n</dl>`
  if (element === 'option') return `<select aria-label="Город">\n  ${source}\n</select>`
  if (element === 'optgroup') return `<select aria-label="Город">\n  ${source}\n</select>`
  if (element === 'legend') return `<fieldset>\n  ${source}\n</fieldset>`
  if (element === 'summary') return `<details>\n  ${source}\n  <p>Подробности.</p>\n</details>`
  if (element === 'figcaption') return `<figure>\n  <img src="diagram.svg" alt="Схема">\n  ${source}\n</figure>`
  if (element === 'source') {
    if (['height', 'media', 'sizes', 'srcset', 'width'].includes(name)) return `<picture>\n  ${source}\n  <img src="hero.jpg" alt="Горная долина">\n</picture>`
    return `<video controls>\n  ${source}\n</video>`
  }
  if (element === 'track') return `<video controls>\n  <source src="lesson.mp4" type="video/mp4">\n  ${source}\n</video>`
  if (element === 'picture') return `<picture ${attributeSource(name, contextualAttributeValue(name, element))}>\n  <img src="hero.jpg" alt="Горная долина">\n</picture>`
  return source
}

function attributeVariantExample(attribute, variant) {
  return variantElements(attribute, variant).map((element) => {
    const special = specialAttributeExample(attribute, variant, element)
    if (special) return special
    const value = contextualAttributeValue(attribute.name, element)
    return wrapAttributeElement(element, tagWithFocusedAttribute(element, attribute.name, value), attribute.name)
  }).join('\n\n')
}

function eventExample(attribute) {
  const name = attribute.name
  const eventName = name.slice(2)
  const windowEvent = (attribute.elements.length === 1 && attribute.elements[0] === 'body') || eventName === 'resize'
  if (windowEvent) return {
    html: `<body ${name}="console.log(event.type)">Содержимое страницы</body>`,
    js: `window.addEventListener('${eventName}', (event) => {\n  console.log(event.type)\n})`
  }
  if (eventName === 'securitypolicyviolation') return {
    html: `<body ${name}="console.log(event.blockedURI)">Содержимое страницы</body>`,
    js: `document.addEventListener('${eventName}', (event) => {\n  console.log(event.blockedURI, event.violatedDirective)\n})`
  }
  if (['load', 'error'].includes(eventName)) {
    const source = eventName === 'load' ? 'photo.jpg' : 'missing.jpg'
    return {
      html: `<img id="demo" src="${source}" alt="Горная долина" ${name}="console.log(event.type)">`,
      js: `const element = document.querySelector('#demo')\n\nelement.addEventListener('${eventName}', (event) => {\n  console.log(event.type)\n})`
    }
  }
  if (eventName === 'cuechange') return {
    html: `<video controls>\n  <track id="demo" default kind="captions" src="captions-ru.vtt" srclang="ru" ${name}="console.log(event.type)">\n</video>`,
    js: `const element = document.querySelector('#demo')\n\nelement.addEventListener('${eventName}', (event) => {\n  console.log(event.target.track.activeCues)\n})`
  }
  if (eventName === 'slotchange') return {
    html: `<article-card>\n  <span slot="title">Новая статья</span>\n  <template shadowrootmode="open">\n    <slot id="demo" name="title" ${name}="console.log(event.type)"></slot>\n  </template>\n</article-card>`,
    js: `const host = document.querySelector('article-card')\nconst element = host.shadowRoot.querySelector('#demo')\n\nelement.addEventListener('${eventName}', (event) => {\n  console.log(event.target.assignedNodes())\n})`
  }
  if (['contextlost', 'contextrestored'].includes(eventName)) return {
    html: `<canvas id="demo" width="320" height="180" ${name}="console.log(event.type)"></canvas>`,
    js: `const element = document.querySelector('#demo')\n\nelement.addEventListener('${eventName}', (event) => {\n  console.log(event.type)\n})`
  }
  if (['cancel', 'close'].includes(eventName)) return {
    html: `<dialog id="demo" ${name}="console.log(event.type)">\n  <form method="dialog"><button>Закрыть</button></form>\n</dialog>`,
    js: `const element = document.querySelector('#demo')\n\nelement.addEventListener('${eventName}', (event) => {\n  console.log(event.type)\n})`
  }
  if (eventName === 'command') return {
    html: `<div id="demo" ${name}="console.log(event.command)">Редактор</div>\n<button command="--save" commandfor="demo">Сохранить</button>`,
    js: `const element = document.querySelector('#demo')\n\nelement.addEventListener('${eventName}', (event) => {\n  console.log(event.command)\n})`
  }
  if (eventName === 'beforematch') return {
    html: `<section id="demo" hidden="until-found" ${name}="console.log(event.type)">Найденный фрагмент</section>`,
    js: `const element = document.querySelector('#demo')\n\nelement.addEventListener('${eventName}', (event) => {\n  console.log(event.type)\n})`
  }
  if (['beforetoggle', 'toggle'].includes(eventName)) return {
    html: `<button popovertarget="demo">Открыть</button>\n<div id="demo" popover ${name}="console.log(event.newState)">Подсказка</div>`,
    js: `const element = document.querySelector('#demo')\n\nelement.addEventListener('${eventName}', (event) => {\n  console.log(event.oldState, event.newState)\n})`
  }
  if (['scroll', 'scrollend'].includes(eventName)) return {
    html: `<div id="demo" style="max-height: 8rem; overflow: auto" ${name}="console.log(event.type)">\n  <p>Длинное прокручиваемое содержимое.</p>\n</div>`,
    js: `const element = document.querySelector('#demo')\n\nelement.addEventListener('${eventName}', (event) => {\n  console.log(event.currentTarget.scrollTop)\n})`
  }

  const mediaEvents = new Set('abort canplay canplaythrough durationchange emptied ended loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting waitingforkey'.split(' '))
  const formEvents = new Set('formdata reset submit'.split(' '))
  const inputEvents = new Set('beforeinput blur change copy cut focus input invalid keydown keypress keyup paste select selectionchange'.split(' '))
  const dragEvents = new Set('drag dragend dragenter dragleave dragover dragstart drop'.split(' '))
  const element = mediaEvents.has(eventName) ? 'video' : formEvents.has(eventName) ? 'form' : inputEvents.has(eventName) ? 'input' : dragEvents.has(eventName) ? 'div' : 'button'
  const html = element === 'video'
    ? `<video id="demo" controls ${name}="console.log(event.type)">\n  <source src="lesson.mp4" type="video/mp4">\n</video>`
    : element === 'form'
      ? `<form id="demo" action="/submit" ${name}="console.log(event.type)"><button>Отправить</button></form>`
      : element === 'input'
        ? `<input id="demo" ${name}="console.log(event.type)">`
        : element === 'div'
          ? `<div id="demo" draggable="true" ${name}="console.log(event.type)">Перетащите блок</div>`
          : `<button id="demo" ${name}="console.log(event.type)">Проверить</button>`
  return {
    html,
    js: `const element = document.querySelector('#demo')\n\nelement.addEventListener('${eventName}', (event) => {\n  console.log(event.type)\n})`
  }
}
function renderAttributeExamples(attribute, kind) {
  if (kind === 'events') {
    const example = eventExample(attribute)
    return `### Встроенный обработчик в HTML\n\n\`\`\`html\n${example.html}\n\`\`\`\n\n### Регистрация из JavaScript\n\n\`\`\`js\n${example.js}\n\`\`\``
  }
  const variants = attribute.variants.map((variant, index) => {
    const suffix = attribute.variants.length > 1 ? ` — вариант ${index + 1}` : ''
    return `### Для ${attributeAppliesLabel(variant)}${suffix}\n\nТочная формулировка WHATWG: ${inlineCode(variant.description)}. Формат из индекса: ${inlineCode(variant.value)}.\n\n\`\`\`html\n${attributeVariantExample(attribute, variant)}\n\`\`\``
  })
  for (const extra of attributeExtraExamples[attribute.name] ?? []) {
    variants.push(`### ${extra.title}\n\n\`\`\`html\n${extra.html}\n\`\`\``)
  }
  for (const scenario of relationshipScenarios.filter(({ attributes }) => attributes.includes(attribute.name))) {
    if (!variants.some((example) => example.includes(scenario.html))) {
      variants.push(`### Связь: ${scenario.title}\n\n${scenario.note}\n\n\`\`\`html\n${scenario.html}\n\`\`\``)
    }
  }
  return variants.join('\n\n')
}
function variantDefinitionLinks(variant) {
  const links = Object.entries(variant.elementSpecUrls ?? {})
  if (!links.length) return `[WHATWG](${variant.specUrl})`
  return links.map(([element, url]) => entityLink(element, url)).join(', ')
}

function variantSpecificationItems(attribute) {
  return attribute.variants.flatMap((variant) => {
    const links = Object.entries(variant.elementSpecUrls ?? {})
    if (!links.length) return [`- [Определение для ${attributeAppliesLabel(variant)}](${variant.specUrl})`]
    return links.map(([element, url]) => `- [Определение ${inlineCode(`<${element}>`)}](${url})`)
  }).join('\n')
}

function renderVariants(attribute) {
  return attribute.variants.map((variant) => `| ${tableText(attributeApplies(variant))} | ${tableText(variant.description)} | ${tableText(variant.value)} | ${variantDefinitionLinks(variant)} |`).join('\n')
}

function renderAttributePage(attribute, kind) {
  const name = attribute.name
  const eventName = name.startsWith('on') ? name.slice(2) : null
  const summary = kind === 'events'
    ? `Атрибут-обработчик события ${inlineCode(eventName)}. Для прикладного кода обычно предпочтительнее ${inlineCode('addEventListener()')}.`
    : attributeSummaries[name]
  const variants = kind === 'events' ? [{ ...attribute, variants: [attribute] }] : [attribute]
  const rows = kind === 'events'
    ? `| ${tableText(attributeApplies(attribute))} | ${tableText(attribute.description)} | ${tableText(attribute.value)} | [WHATWG](${attribute.specUrl}) |`
    : renderVariants(attribute)
  const scenarioMatches = relationshipScenarios.filter((scenario) => scenario.attributes.includes(name))
  const relations = scenarioMatches.length
    ? scenarioMatches.map((scenario) => `- **${scenario.title}:** ${scenario.note}`).join('\n')
    : '- Специальная межэлементная связь в общем каталоге не выделена; область применения указана в таблице.'
  const booleanNote = booleanAttributes.has(name)
    ? `\n\n### Булева семантика\n\nЭто булев атрибут: присутствие означает истину независимо от строки значения. Используйте ${inlineCode(name)}, ${inlineCode(`${name}=""`)} или ${inlineCode(`${name}="${name}"`)}; запись ${inlineCode(`${name}="false"`)} всё равно означает истину.`
    : ''
  const eventNote = kind === 'events'
    ? `\n\n::: warning Встроенный JavaScript\nАтрибут выполняет строку как код, смешивает разметку с поведением и может блокироваться Content Security Policy. Вариант через ${inlineCode('addEventListener()')} ниже лучше разделяет структуру и поведение.\n:::`
    : ''
  const absenceNote = kind === 'events'
    ? 'Без атрибута встроенный обработчик не создаётся; слушатели, зарегистрированные из JavaScript, продолжают работать независимо от него.'
    : 'Если атрибут отсутствует, действует состояние по умолчанию конкретного элемента. Пустая строка и отсутствие атрибута не взаимозаменяемы, кроме случаев, явно определённых спецификацией.'

  return `${frontmatter(name, summary)}\n# ${inlineCode(name)}\n\n${summary}\n\n${checkedNotice('attribute', name)}${eventNote}\n\n## Применимость и значение\n\n| Элементы | Значение в индексе WHATWG | Формат значения | Определение |\n|---|---|---|---|\n${rows}\n\nАнглийские формулировки в таблице сохранены из официального индекса, чтобы не потерять нормативные различия одноимённых атрибутов.${booleanNote}\n\n## Примеры использования\n\n${renderAttributeExamples(attribute, kind)}\n\n${absenceNote}\n\n## Связи\n\n${relations}\n\n## DOM\n\n${inlineCode('element.getAttribute(name)')} возвращает исходную строку или ${inlineCode('null')}, а ${inlineCode('element.hasAttribute(name)')} проверяет присутствие. IDL-свойство, тип отражения и нормализация зависят от определения конкретного атрибута; ориентируйтесь на ссылки в таблице.${kind === 'events' ? ` Само событие обрабатывается объектом ${inlineCode('Event')} или его специализированным подклассом.` : ''}\n\n## Доступность и безопасность\n\nАтрибут не заменяет корректную семантику элемента и доступное имя. Для URL, встроенного кода, навигации, загрузки ресурсов и пользовательского ввода отдельно учитывайте CSP, CORS, политику referrer и проверку данных — когда они применимы.\n\n## Спецификация\n\n- [Индекс атрибутов WHATWG](${SPEC_INDEX_URL}#attributes-3)\n${variants.map((item) => variantSpecificationItems(item)).join('\n')}\n`
}
function pageList(items, hrefFor, descriptionFor) {
  return items.map((item) => `- [${inlineCode(item.name ?? item)}](${hrefFor(item.name ?? item)}) — ${descriptionFor(item.name ?? item)}`).join('\n')
}

function renderElementIndex() {
  const groups = elementGroups.map((group) => `## [${group.title}](./${group.slug}/)\n\n${group.description}\n\n${group.names.map((name) => entityLink(name, `./${group.slug}/${name}`)).join(', ')}`).join('\n\n')
  return `${frontmatter('HTML-элементы', 'Актуальный справочник HTML-элементов по WHATWG Living Standard.')}\n# HTML-элементы\n\nСправочник содержит отдельную страницу для каждого из **113 актуальных HTML-элементов**. Основная структура повторяет функциональные разделы спецификации; дополнительные индексы помогают искать элементы по модели содержимого и учебному сценарию.\n\n${checkedNotice('index', 'elements')}\n\n- [По категориям содержимого](./by-category)\n- [По учебным сценариям](./learning-path)\n- [Устаревшие элементы и атрибуты](/base/frontend/html/obsolete)\n- [Почему «блочный/строчный» — не HTML-категория](./theory/block-and-inline)\n\n${groups}\n`
}

function renderElementGroupIndex(group) {
  const items = group.names.map((name) => ({ name }))
  return `${frontmatter(group.title, group.description)}\n# ${group.title}\n\n${group.description}\n\n${pageList(items, (name) => `./${name}`, (name) => elementSummaries[name])}\n`
}

function renderCategoryIndex() {
  const categories = new Map()
  for (const element of elementByName.values()) {
    for (const category of element.categories) {
      const values = categories.get(category) ?? []
      values.push(element.name)
      categories.set(category, values)
    }
  }
  const sections = [...categories].sort(([a], [b]) => a.localeCompare(b, 'en')).map(([category, names]) => `## ${categoryTranslations[category] ?? category} (${inlineCode(category)})\n\n${names.map((name) => entityLink(name, elementHref(name))).join(', ')}`).join('\n\n')
  return `${frontmatter('Элементы по категориям содержимого', 'Альтернативный индекс HTML-элементов по категориям WHATWG.')}\n# Элементы по категориям содержимого\n\nОдин элемент может входить в несколько категорий, иногда только при выполнении условий. Нормативные условия приведены на странице элемента и в спецификации.\n\n${sections}\n`
}

function renderLearningIndex() {
  const sections = relationshipScenarios.map((scenario) => `## ${scenario.title}\n\n${scenario.note}\n\n${scenario.elements.map((name) => entityLink(name, elementHref(name))).join(', ')}\n\n\`\`\`html\n${scenario.html}\n\`\`\``).join('\n\n')
  return `${frontmatter('HTML по учебным сценариям', 'Связи HTML-элементов и атрибутов в практических сценариях.')}\n# HTML по учебным сценариям\n\nЭтот индекс показывает не изолированные теги, а валидные связи между элементами. Подробности и ограничения находятся на отдельных страницах.\n\n${sections}\n`
}

function renderAttributesIndex() {
  return `${frontmatter('HTML-атрибуты', 'Актуальный справочник глобальных, специальных и событийных HTML-атрибутов.')}\n# HTML-атрибуты\n\nКаталог основан на индексе WHATWG: **32 глобальные темы**, **113 специальных атрибутов** и **89 атрибутов-обработчиков событий**. Одно имя с разной семантикой описывается на одной странице с таблицей вариантов.\n\n${checkedNotice('index', 'attributes')}\n\n## Разделы\n\n- [Глобальные атрибуты](./global/) — применимы ко всем HTML-элементам, хотя эффект зависит от контекста.\n- [Специальные атрибуты](./element-specific/) — определены для конкретных элементов.\n- [Атрибуты событий](./events/) — встроенные обработчики; в приложениях обычно предпочтительнее addEventListener.\n- [Индекс атрибутов по элементам](./by-element) — обратная связь от элемента к допустимым атрибутам.\n- [Устаревшие элементы и атрибуты](../obsolete) — одно общее приложение.\n`
}

function renderAttributeGroupIndex(title, description, attributes, folder) {
  return `${frontmatter(title, description)}\n# ${title}\n\n${description}\n\n${pageList(attributes, (name) => `./${attributeSlug(name)}`, (name) => attributeSummaries[name] ?? `Обработчик события ${inlineCode(name.slice(2))}.`)}\n`
}

function renderAttributesByElement() {
  const sections = elementGroups.flatMap((group) => group.names.map((name) => {
    const element = elementByName.get(name)
    const links = element.attributes.map((attribute) => entityLink(attribute, attributeHref(attribute) ?? element.attributeLinks[attribute])).join(', ') || 'нет специальных атрибутов'
    return `## ${entityLink(`<${name}>`, elementHref(name))}\n\n${links}`
  })).join('\n\n')
  return `${frontmatter('Атрибуты по элементам', 'Обратный индекс специальных HTML-атрибутов по элементам.')}\n# Атрибуты по элементам\n\nГлобальные атрибуты применимы ко всем элементам и здесь не повторяются. Условность и точный смысл проверяйте на странице атрибута.\n\n${sections}\n`
}

function renderObsoleteAppendix() {
  return `${frontmatter('Устаревшие элементы и атрибуты HTML', 'Общее приложение по устаревшим и несоответствующим HTML-возможностям.')}\n# Устаревшие элементы и атрибуты HTML\n\nЭта страница вынесена из основного справочника: перечисленные элементы нельзя использовать в новом коде. Браузеры могут продолжать их разбирать ради совместимости, но это не делает разметку соответствующей стандарту.\n\n${checkedNotice('appendix', 'obsolete')}\n\n## Устаревшие элементы\n\n${obsoleteElements.map((name) => inlineCode(`<${name}>`)).join(', ')}\n\nДля визуального оформления используйте CSS; для семантики выбирайте актуальные элементы из [основного каталога](./elements/). Не заменяйте каждый старый тег механически: сначала определите смысл содержимого.\n\n## Устаревшие атрибуты\n\nВ старой разметке часто встречаются презентационные атрибуты вроде ${inlineCode('align')}, ${inlineCode('bgcolor')}, ${inlineCode('border')}, ${inlineCode('cellpadding')}, ${inlineCode('cellspacing')}, ${inlineCode('frameborder')} и ${inlineCode('valign')}. Их замена обычно выполняется CSS, но полный нормативный список зависит от элемента.\n\n::: warning Не исчерпывающий список атрибутов\nДля миграции конкретного документа используйте полный раздел WHATWG ниже: там отдельно перечислены полностью устаревшие атрибуты, элементы с частично устаревшими атрибутами и требования к реализации ради совместимости.\n:::\n\n## Спецификация\n\n- [Obsolete features — WHATWG HTML](https://html.spec.whatwg.org/multipage/obsolete.html)\n`
}

function renderHtmlRootIndex() {
  return `${frontmatter('HTML', 'Справочник по структуре документа, элементам и атрибутам HTML.')}\n# HTML\n\nРаздел построен вокруг актуального WHATWG HTML Living Standard и практических связей между сущностями.\n\n1. [Структура документа](./document/)\n2. [113 актуальных элементов](./elements/)\n3. [234 темы атрибутов](./attributes/)\n4. [Устаревшие элементы и атрибуты](./obsolete)\n\nПоследняя сверка основного каталога: **${SPEC_CHECKED_AT}**.\n`
}

function jsString(value) {
  return JSON.stringify(value)
}

function sidebarItem(text, link, items) {
  const nested = items?.length ? `, collapsed: true, items: [${items.join(',')}]` : ''
  return `{ text: ${jsString(text)}, link: ${jsString(link)}${nested} }`
}

function renderSidebarModule() {
  const elementItems = elementGroups.map((group) => sidebarItem(group.title, `/base/frontend/html/elements/${group.slug}/`, group.names.map((name) => sidebarItem(`<${name}>`, elementHref(name)))))
  const theoryItem = sidebarItem('Теория', '/base/frontend/html/elements/theory/', [
    sidebarItem('Блочные и строчные элементы', '/base/frontend/html/elements/theory/block-and-inline')
  ])
  const globalItems = globalAttributes.map(({ name }) => sidebarItem(name, attributeHref(name)))
  const specificItems = specificAttributes.map(({ name }) => sidebarItem(name, attributeHref(name)))
  const eventItems = eventAttributes.map(({ name }) => sidebarItem(name, attributeHref(name)))
  return `${GENERATED_JS_MARKER}\nexport const htmlReferenceSidebar = [\n  ${sidebarItem('Элементы', '/base/frontend/html/elements/', [theoryItem, sidebarItem('По категориям', '/base/frontend/html/elements/by-category'), sidebarItem('Учебные сценарии', '/base/frontend/html/elements/learning-path'), ...elementItems])},\n  ${sidebarItem('Атрибуты', '/base/frontend/html/attributes/', [sidebarItem('По элементам', '/base/frontend/html/attributes/by-element'), sidebarItem('Глобальные', '/base/frontend/html/attributes/global/', globalItems), sidebarItem('Специальные', '/base/frontend/html/attributes/element-specific/', specificItems), sidebarItem('События', '/base/frontend/html/attributes/events/', eventItems)])},\n  ${sidebarItem('Устаревшие возможности', '/base/frontend/html/obsolete')}\n]\n`
}

export function buildHtmlDocFiles() {
  const files = new Map()
  files.set(`${HTML_ROOT}/index.md`, renderHtmlRootIndex())
  files.set(`${HTML_ROOT}/obsolete.md`, renderObsoleteAppendix())
  files.set(`${HTML_ROOT}/elements/index.md`, renderElementIndex())
  files.set(`${HTML_ROOT}/elements/by-category.md`, renderCategoryIndex())
  files.set(`${HTML_ROOT}/elements/learning-path.md`, renderLearningIndex())
  for (const group of elementGroups) {
    files.set(`${HTML_ROOT}/elements/${group.slug}/index.md`, renderElementGroupIndex(group))
    for (const name of group.names) files.set(`${HTML_ROOT}/elements/${group.slug}/${name}.md`, renderElementPage(elementByName.get(name)))
  }
  files.set(`${HTML_ROOT}/attributes/index.md`, renderAttributesIndex())
  files.set(`${HTML_ROOT}/attributes/by-element.md`, renderAttributesByElement())
  files.set(`${HTML_ROOT}/attributes/global/index.md`, renderAttributeGroupIndex('Глобальные атрибуты', 'Применимы ко всем HTML-элементам, но эффект некоторых атрибутов зависит от элемента и контекста.', globalAttributes, 'global'))
  files.set(`${HTML_ROOT}/attributes/element-specific/index.md`, renderAttributeGroupIndex('Специальные атрибуты', 'Определены только для перечисленных элементов; одинаковое имя может иметь несколько вариантов семантики.', specificAttributes, 'element-specific'))
  files.set(`${HTML_ROOT}/attributes/events/index.md`, renderAttributeGroupIndex('Атрибуты событий', 'Встроенные обработчики событий HTML. Для основного JavaScript-кода обычно предпочтительнее addEventListener.', eventAttributes, 'events'))
  for (const attribute of globalAttributes) files.set(`${HTML_ROOT}/attributes/global/${attributeSlug(attribute.name)}.md`, renderAttributePage(attribute, 'global'))
  for (const attribute of specificAttributes) files.set(`${HTML_ROOT}/attributes/element-specific/${attributeSlug(attribute.name)}.md`, renderAttributePage(attribute, 'element-specific'))
  for (const attribute of eventAttributes) files.set(`${HTML_ROOT}/attributes/events/${attributeSlug(attribute.name)}.md`, renderAttributePage(attribute, 'events'))
  files.set('src/.vitepress/data/html-sidebar.mjs', renderSidebarModule())
  return files
}

async function writeFiles(files) {
  for (const [relativePath, content] of files) {
    const target = join(ROOT, relativePath)
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, content, 'utf8')
  }
}

async function checkFiles(files) {
  const mismatches = []
  for (const [relativePath, expected] of files) {
    try {
      const actual = await readFile(join(ROOT, relativePath), 'utf8')
      if (actual !== expected) mismatches.push(`${relativePath}: содержимое устарело`)
    } catch (error) {
      if (error.code === 'ENOENT') mismatches.push(`${relativePath}: файл отсутствует`)
      else throw error
    }
  }
  if (mismatches.length) throw new Error(`Справочник не синхронизирован:\n${mismatches.join('\n')}`)
}

async function main() {
  const files = buildHtmlDocFiles()
  if (process.argv.includes('--check')) await checkFiles(files)
  else await writeFiles(files)
  console.log(`HTML-справочник: ${files.size} файлов ${process.argv.includes('--check') ? 'проверено' : 'сгенерировано'}`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main()
