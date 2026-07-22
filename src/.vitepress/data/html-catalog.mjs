import { readFileSync } from 'node:fs'

export const SPEC_INDEX_URL = 'https://html.spec.whatwg.org/multipage/indices.html'
export const SPEC_CHECKED_AT = '2026-07-22'

export const specIndex = JSON.parse(
  readFileSync(new URL('./html-spec-index.json', import.meta.url), 'utf8')
)

function dictionary(source) {
  return Object.fromEntries(
    source.trim().split('\n').map((line) => {
      const separator = line.indexOf('|')
      return [line.slice(0, separator), line.slice(separator + 1)]
    })
  )
}

export const elementGroups = [
  { slug: 'document-element', title: 'Корневой элемент', description: 'Корень HTML-документа.', names: 'html' },
  { slug: 'document-metadata', title: 'Метаданные документа', description: 'Название, базовый URL, стили и машиночитаемые сведения.', names: 'head title base link meta style' },
  { slug: 'sections', title: 'Секции и структура', description: 'Семантическая структура, области страницы и заголовки.', names: 'body article section nav aside h1 h2 h3 h4 h5 h6 hgroup header footer address' },
  { slug: 'grouping-content', title: 'Группировка содержимого', description: 'Абзацы, списки, цитаты и универсальные контейнеры.', names: 'p hr pre blockquote ol ul menu li dl dt dd figure figcaption main search div' },
  { slug: 'text-level-semantics', title: 'Текстовая семантика', description: 'Ссылки, выделение, цитирование и встроенная разметка.', names: 'a em strong small s cite q dfn abbr ruby rt rp data time code var samp kbd sub sup i b u mark bdi bdo span br wbr' },
  { slug: 'edits', title: 'Правки', description: 'Добавления и удаления в документе.', names: 'ins del' },
  { slug: 'embedded-content', title: 'Встраиваемое содержимое', description: 'Изображения, медиа, дочерние документы и внешние ресурсы.', names: 'picture source img iframe embed object video audio track map area' },
  { slug: 'tables', title: 'Таблицы', description: 'Табличные данные, группы строк и ячейки.', names: 'table caption colgroup col tbody thead tfoot tr td th' },
  { slug: 'forms', title: 'Формы', description: 'Ввод, выбор, отправка и отображение результатов.', names: 'form label input button select datalist optgroup option textarea output progress meter fieldset legend selectedcontent' },
  { slug: 'interactive-elements', title: 'Интерактивные элементы', description: 'Раскрывающиеся блоки и диалоговые окна.', names: 'details summary dialog' },
  { slug: 'scripting', title: 'Сценарии и компоненты', description: 'Скрипты, шаблоны, Shadow DOM и программная графика.', names: 'script noscript template slot canvas' }
].map((group) => ({ ...group, names: group.names.split(' ') }))

export const elementSummaries = dictionary(`
html|Корневой элемент HTML-документа; содержит head и body.
head|Контейнер метаданных документа, не отображаемых как основное содержимое страницы.
title|Название документа для вкладки, истории и результатов поиска.
base|Задаёт базовый URL и базовую цель для относительных ссылок документа.
link|Связывает документ с внешним ресурсом, чаще всего таблицей стилей или значком.
meta|Передаёт метаданные, которые нельзя выразить через title, base, link или style.
style|Содержит встроенные CSS-правила документа.
body|Содержит отображаемое содержимое HTML-документа.
article|Самостоятельная композиция, пригодная для независимого распространения или повторного использования.
section|Тематический раздел документа, обычно с собственным заголовком.
nav|Раздел с основными навигационными ссылками.
aside|Содержимое, косвенно связанное с окружающим материалом.
h1|Заголовок первого уровня.
h2|Заголовок второго уровня.
h3|Заголовок третьего уровня.
h4|Заголовок четвёртого уровня.
h5|Заголовок пятого уровня.
h6|Заголовок шестого уровня.
hgroup|Группирует заголовок с подзаголовком или альтернативным названием.
header|Вводное содержимое или навигационные средства ближайшего раздела.
footer|Справочная информация и завершение ближайшего раздела.
address|Контактная информация для страницы или ближайшего article.
p|Абзац текста.
hr|Тематический разрыв между абзацами или разделами.
pre|Блок предварительно форматированного текста, где пробелы и переносы значимы.
blockquote|Раздел, процитированный из другого источника.
ol|Упорядоченный список, для которого порядок элементов имеет значение.
ul|Неупорядоченный список.
menu|Список команд или элементов интерфейса, представленный как список.
li|Элемент списка ol, ul или menu.
dl|Список групп «имя — значение».
dt|Имя или термин внутри dl.
dd|Значение или описание внутри dl.
figure|Самостоятельный материал, на который можно ссылаться как на единое целое.
figcaption|Подпись для ближайшего родительского figure.
main|Доминирующее содержимое документа.
search|Контейнер средств поиска или фильтрации.
div|Универсальный контейнер потокового содержимого без собственной семантики.
a|Гиперссылка или якорь назначения.
em|Логическое ударение, меняющее смысл фразы.
strong|Высокая важность, серьёзность или срочность текста.
small|Побочный комментарий или мелкий печатный текст.
s|Текст, который больше не точен или не актуален, но не является правкой документа.
cite|Название творческой работы.
q|Короткая встроенная цитата.
dfn|Термин, определяемый в окружающем контексте.
abbr|Аббревиатура или сокращение.
ruby|Базовый текст с аннотациями произношения или пояснениями.
rt|Текст ruby-аннотации.
rp|Резервные скобки для браузеров без поддержки ruby.
data|Содержимое с машиночитаемым эквивалентом в value.
time|Дата, время или длительность с машиночитаемым представлением.
code|Фрагмент компьютерного кода.
var|Переменная или заполнитель в математическом либо программном контексте.
samp|Пример вывода программы или вычислительной системы.
kbd|Пользовательский ввод, обычно с клавиатуры.
sub|Подстрочный индекс.
sup|Надстрочный индекс.
i|Фрагмент в альтернативной тональности или другом качестве текста.
b|Фрагмент, к которому привлекают внимание без повышения важности.
u|Неявная текстовая аннотация, например пометка орфографической ошибки.
mark|Фрагмент, выделенный из-за актуальности в текущем контексте.
bdi|Изолирует направление текста от окружающего двунаправленного контекста.
bdo|Явно переопределяет направление текста.
span|Универсальный контейнер фразового содержимого без собственной семантики.
br|Принудительный перенос строки внутри текста.
wbr|Допустимая возможность переноса строки.
ins|Добавление в документе.
del|Удаление из документа.
picture|Набор альтернативных источников изображения с обязательным img.
source|Альтернативный источник для picture, audio или video.
img|Изображение с текстовой альтернативой.
iframe|Встраивает дочерний контекст навигации.
embed|Встраивает внешний ресурс или приложение.
object|Встраивает внешний ресурс с возможным резервным содержимым.
video|Видеопроигрыватель и связанный медиаресурс.
audio|Аудиопроигрыватель и связанный медиаресурс.
track|Временная текстовая дорожка для audio или video.
map|Карта изображения, связывающая img с интерактивными областями area.
area|Ссылка или неактивная область внутри карты изображения.
table|Таблица данных в двух измерениях.
caption|Заголовок или подпись таблицы.
colgroup|Группа одного или нескольких столбцов таблицы.
col|Столбец внутри colgroup.
tbody|Группа основных строк таблицы.
thead|Группа строк заголовка таблицы.
tfoot|Группа итоговых строк таблицы.
tr|Строка таблицы.
td|Ячейка данных таблицы.
th|Заголовочная ячейка таблицы.
form|Набор элементов управления для отправки данных.
label|Подпись элемента управления формы.
input|Типизированный элемент управления вводом.
button|Кнопка, отправляющая форму или выполняющая команду.
select|Элемент выбора из списка вариантов.
datalist|Набор предложенных вариантов для связанного input.
optgroup|Именованная группа option внутри select.
option|Вариант выбора в select, datalist или optgroup.
textarea|Многострочное поле ввода обычного текста.
output|Результат вычисления или пользовательского действия.
progress|Ход выполнения задачи.
meter|Скалярное значение в известном диапазоне.
fieldset|Тематическая группа элементов управления формы.
legend|Подпись родительского fieldset.
selectedcontent|Отображает копию содержимого выбранного option в настраиваемом select.
details|Раскрывающийся блок дополнительной информации.
summary|Подпись и переключатель родительского details.
dialog|Диалоговое окно или другой отдельный интерактивный компонент.
script|Сценарий или блок данных для обработки программой.
noscript|Резервное содержимое, когда выполнение скриптов отключено или недоступно.
template|Неактивный фрагмент разметки для последующего клонирования или Declarative Shadow DOM.
slot|Точка вставки содержимого в теневом дереве.
canvas|Скриптуемый растровый холст с резервным содержимым.
`)

export const globalAttributeNames = `accesskey autocapitalize autocorrect autofocus class contenteditable data-* dir draggable enterkeyhint headingoffset headingreset hidden id inert inputmode is itemid itemprop itemref itemscope itemtype lang nonce popover slot spellcheck style tabindex title translate writingsuggestions`.split(' ')

export const attributeSummaries = dictionary(`
abbr|Задаёт краткую альтернативную подпись заголовочной ячейки таблицы.
accept|Подсказывает допустимые типы файлов для загрузки.
accept-charset|Задаёт кодировку отправки формы; в актуальном HTML допустим UTF-8.
accesskey|Объявляет клавишу быстрого доступа к элементу.
action|Задаёт URL обработчика отправки формы.
allow|Определяет Permissions Policy для содержимого iframe.
allowfullscreen|Разрешает содержимому iframe переходить в полноэкранный режим.
alpha|Указывает, что компонент выбора цвета поддерживает альфа-канал.
alt|Задаёт текстовую альтернативу изображению или области карты.
as|Уточняет тип ресурса для предварительной загрузки.
async|Разрешает выполнять внешний классический скрипт независимо от разбора документа.
autocomplete|Управляет автозаполнением формы или элемента управления.
autocapitalize|Подсказывает, как автоматически менять регистр вводимого текста.
autocorrect|Подсказывает, следует ли автоматически исправлять вводимый текст.
autofocus|Просит сфокусировать элемент при загрузке или открытии диалога/popover.
autoplay|Просит начать воспроизведение медиа автоматически.
blocking|Указывает операции, которые могут блокировать отображение документа.
charset|Указывает кодировку документа или внешнего ресурса.
checked|Задаёт начальное выбранное состояние checkbox или radio.
cite|Ссылается на источник цитаты или описание правки.
class|Задаёт список классов элемента.
closedby|Ограничивает способы, которыми пользователь может закрыть dialog.
color|Задаёт цвет подсветки для link rel=mask-icon.
colorspace|Выбирает цветовое пространство элемента input type=color.
cols|Задаёт ожидаемую ширину textarea в символах.
colspan|Задаёт число столбцов, занимаемых ячейкой.
command|Задаёт команду, которую button передаёт целевому элементу.
commandfor|Указывает элемент, которым управляет кнопка.
content|Хранит значение метаданных meta.
contenteditable|Определяет, можно ли редактировать содержимое элемента.
controls|Запрашивает встроенные средства управления пользовательского агента.
coords|Задаёт координаты области карты изображения.
crossorigin|Настраивает CORS-режим загрузки ресурса.
data|Задаёт URL ресурса object.
data-*|Хранит пользовательские данные, доступные через dataset.
datetime|Задаёт машиночитаемую дату или время для time, ins и del.
decoding|Подсказывает способ декодирования изображения.
default|Делает текстовую дорожку track предпочтительной по умолчанию.
defer|Откладывает выполнение классического внешнего скрипта до завершения разбора документа.
dir|Задаёт направление текста элемента.
dirname|Добавляет направление текста поля к отправляемым данным формы.
disabled|Отключает элемент управления или связанную группу.
download|Предлагает скачать целевой ресурс и при необходимости задаёт имя файла.
draggable|Указывает, можно ли перетаскивать элемент.
enctype|Задаёт формат данных при отправке формы методом POST.
enterkeyhint|Подсказывает подпись клавиши Enter на виртуальной клавиатуре.
fetchpriority|Подсказывает относительный приоритет загрузки ресурса.
for|Связывает label или output с другими элементами по id.
form|Связывает элемент управления с form по id вне обычного вложения.
formaction|Переопределяет URL отправки формы для кнопки отправки.
formenctype|Переопределяет формат отправки формы для кнопки отправки.
formmethod|Переопределяет HTTP-метод отправки формы для кнопки отправки.
formnovalidate|Отключает проверку формы для конкретной кнопки отправки.
formtarget|Переопределяет контекст навигации результата отправки формы.
headingoffset|Смещает вычисляемые уровни вложенных заголовков.
headingreset|Сбрасывает вычисляемое смещение уровней заголовков.
headers|Связывает ячейку таблицы с заголовочными ячейками по id.
height|Задаёт высоту в CSS-пикселях для поддерживающих элементов.
hidden|Скрывает нерелевантное содержимое или включает состояние until-found.
high|Задаёт нижнюю границу высокого диапазона meter.
href|Задаёт адрес гиперссылки или внешнего ресурса.
hreflang|Подсказывает язык связанного ресурса.
http-equiv|Объявляет pragma-директиву meta.
id|Задаёт уникальный в документе идентификатор без ASCII-пробелов.
imagesizes|Задаёт размеры адаптивного изображения, предзагружаемого через link.
imagesrcset|Задаёт кандидаты адаптивного изображения для link rel=preload.
inert|Делает поддерево неинтерактивным для фокуса и пользовательского ввода.
inputmode|Подсказывает подходящую виртуальную клавиатуру.
integrity|Передаёт криптографические метаданные Subresource Integrity.
is|Указывает имя настроенного встроенного элемента.
ismap|Включает серверную карту изображения для img внутри ссылки.
itemid|Задаёт глобальный идентификатор microdata-элемента.
itemprop|Задаёт свойства microdata-элемента.
itemref|Добавляет по id внешние свойства к microdata-элементу.
itemscope|Создаёт новый microdata-элемент.
itemtype|Задаёт типы microdata-элемента как абсолютные URL.
kind|Задаёт назначение временной дорожки track.
label|Задаёт пользовательскую подпись track, option или optgroup.
lang|Задаёт язык содержимого элемента.
list|Связывает input с datalist по id.
loading|Подсказывает, загружать ресурс сразу или лениво.
loop|Повторяет audio или video после окончания.
low|Задаёт верхнюю границу низкого диапазона meter.
max|Задаёт максимальное допустимое значение.
maxlength|Ограничивает максимальную длину пользовательского ввода.
media|Задаёт условие, при котором ресурс или source применим.
method|Задаёт способ отправки формы.
min|Задаёт минимальное допустимое значение.
minlength|Ограничивает минимальную длину пользовательского ввода.
multiple|Разрешает выбрать или ввести несколько значений.
muted|Задаёт начальное беззвучное состояние медиа.
name|Задаёт имя элемента для отправки, навигации или поиска.
nonce|Передаёт криптографический nonce для Content Security Policy.
nomodule|Не выполняет скрипт в средах с поддержкой JavaScript-модулей.
novalidate|Отключает встроенную проверку при отправке формы.
open|Задаёт открытое состояние details или dialog.
optimum|Задаёт оптимальное значение meter.
pattern|Задаёт регулярное выражение для проверки значения поля.
ping|Перечисляет URL, уведомляемые при переходе по ссылке.
placeholder|Показывает краткую подсказку в пустом поле ввода.
playsinline|Подсказывает воспроизводить видео внутри страницы.
popover|Превращает элемент в popover и задаёт режим его поведения.
popovertarget|Связывает кнопку с popover по id.
popovertargetaction|Задаёт действие кнопки над целевым popover.
poster|Задаёт изображение-заставку video.
preload|Подсказывает объём предварительной загрузки медиа.
readonly|Запрещает изменение значения пользователем, сохраняя участие в форме.
referrerpolicy|Задаёт политику передачи Referer при загрузке или переходе.
rel|Задаёт тип связи текущего документа с целевым ресурсом.
required|Требует непустое допустимое значение перед отправкой формы.
reversed|Разворачивает нумерацию упорядоченного списка.
rows|Задаёт ожидаемую высоту textarea в строках.
rowspan|Задаёт число строк, занимаемых ячейкой.
sandbox|Накладывает ограничения на содержимое iframe с помощью токенов.
scope|Указывает набор ячеек, к которому относится заголовок th.
selected|Задаёт начально выбранный option.
shadowrootclonable|Разрешает клонировать декларативный Shadow Root.
shadowrootcustomelementregistry|Просит создать отдельный реестр пользовательских элементов для Shadow Root.
shadowrootdelegatesfocus|Включает делегирование фокуса в Shadow Root.
shadowrootmode|Создаёт декларативный Shadow Root в режиме open или closed.
shadowrootserializable|Разрешает сериализацию Shadow Root.
shadowrootslotassignment|Выбирает именованное или ручное распределение по slot.
shape|Задаёт форму области карты изображения.
size|Задаёт видимое число вариантов select или ширину поля ввода.
sizes|Задаёт размеры адаптивного изображения или медиазапросы для icon.
slot|Назначает элемент именованному slot в теневом дереве.
span|Задаёт число столбцов в col или colgroup.
spellcheck|Подсказывает, следует ли проверять орфографию редактируемого текста.
src|Задаёт URL встраиваемого ресурса.
srcdoc|Передаёт HTML-документ непосредственно в iframe.
srclang|Задаёт язык текстовой дорожки track.
srcset|Задаёт набор кандидатов изображения и их дескрипторы.
start|Задаёт начальное число упорядоченного списка.
step|Задаёт допустимый шаг числового или временного значения.
style|Задаёт встроенные CSS-декларации элемента.
tabindex|Управляет фокусируемостью и порядком последовательной навигации.
target|Задаёт контекст навигации для ссылки, base или формы.
title|Передаёт консультативную информацию; смысл зависит от элемента.
translate|Указывает, следует ли переводить текст и переводимые атрибуты элемента.
type|Выбирает вид элемента, ресурса, кнопки, поля или списка.
usemap|Связывает img или object с map по имени.
value|Задаёт начальное либо машиночитаемое значение; смысл зависит от элемента.
width|Задаёт ширину в CSS-пикселях для поддерживающих элементов.
wrap|Задаёт перенос строк и сериализацию значения textarea.
writingsuggestions|Разрешает или запрещает предложения текста от пользовательского агента.
`)

export const categoryTranslations = {
  flow: 'потоковое', phrasing: 'фразовое', embedded: 'встраиваемое', interactive: 'интерактивное',
  palpable: 'ощутимое', heading: 'заголовочное', sectioning: 'секционное', 'script-supporting': 'поддерживающее сценарии',
  metadata: 'метаданные', 'form-associated': 'связанное с формой'
}

export const voidElements = new Set('area base br col embed hr img input link meta source track wbr'.split(' '))
export const booleanAttributes = new Set('allowfullscreen alpha async autofocus autoplay checked controls default defer disabled formnovalidate headingreset inert ismap itemscope loop multiple muted nomodule novalidate open playsinline readonly required reversed selected shadowrootclonable shadowrootcustomelementregistry shadowrootdelegatesfocus shadowrootserializable'.split(' '))

export const supportCautionNames = new Set('selectedcontent autocorrect closedby command commandfor headingoffset headingreset shadowrootcustomelementregistry writingsuggestions'.split(' '))

export const obsoleteElements = `applet acronym bgsound dir frame frameset noframes isindex keygen listing menuitem nextid noembed param plaintext rb rtc strike xmp basefont big blink center font marquee multicol nobr spacer tt`.split(' ')

export const relationshipScenarios = [
  { id: 'document', title: 'Каркас документа', elements: 'html head title meta body header main article section h1 p footer'.split(' '), attributes: ['charset', 'lang'], note: 'У html ожидаются head и body; метаданные находятся в head, отображаемое содержимое — в body.', html: `<!doctype html>\n<html lang="ru">\n<head>\n  <meta charset="utf-8">\n  <title>Справочник</title>\n</head>\n<body>\n  <header><h1>Справочник</h1></header>\n  <main><article><p>Содержимое страницы.</p></article></main>\n  <footer>© 2026</footer>\n</body>\n</html>` },
  { id: 'lists', title: 'Списки и пункты', elements: 'nav ol ul menu li a'.split(' '), attributes: ['href', 'start', 'reversed', 'value'], note: 'Прямыми пунктами ol, ul и menu служат элементы li.', html: `<nav aria-label="Основная навигация">\n  <ul>\n    <li><a href="/docs/">Документация</a></li>\n    <li><a href="/about/">О проекте</a></li>\n  </ul>\n</nav>` },
  { id: 'description-list', title: 'Список имён и значений', elements: 'dl dt dd'.split(' '), attributes: [], note: 'В dl группы состоят из одного или нескольких dt, за которыми следуют один или несколько dd.', html: `<dl>\n  <dt>HTML</dt>\n  <dd>Язык разметки документов.</dd>\n</dl>` },
  { id: 'figure', title: 'Иллюстрация с подписью', elements: 'figure figcaption img'.split(' '), attributes: ['src', 'alt', 'width', 'height'], note: 'figcaption, если есть, является первым или последним дочерним элементом figure.', html: `<figure>\n  <img src="diagram.svg" alt="Схема потока данных" width="640" height="360">\n  <figcaption>Поток данных приложения.</figcaption>\n</figure>` },
  { id: 'ruby', title: 'Ruby-аннотация', elements: 'ruby rt rp'.split(' '), attributes: [], note: 'rt содержит аннотацию, а rp — резервные скобки для старых реализаций.', html: `<ruby>漢<rp>(</rp><rt>かん</rt><rp>)</rp></ruby>` },
  { id: 'responsive-image', title: 'Адаптивное изображение', elements: 'picture source img'.split(' '), attributes: ['media', 'type', 'srcset', 'src', 'alt'], note: 'picture содержит source перед обязательным img; img остаётся источником по умолчанию и носителем alt.', html: `<picture>\n  <source media="(min-width: 800px)" srcset="hero-wide.webp" type="image/webp">\n  <img src="hero.jpg" alt="Горная долина">\n</picture>` },
  { id: 'image-map', title: 'Карта изображения', elements: 'map area img'.split(' '), attributes: ['usemap', 'name', 'shape', 'coords', 'href', 'alt'], note: 'Фрагмент usemap у img совпадает с name элемента map; интерактивные области задаются через area.', html: `<img src="office.png" alt="План офиса" usemap="#office-map">\n<map name="office-map">\n  <area shape="rect" coords="0,0,160,120" href="/rooms/1" alt="Переговорная">\n</map>` },
  { id: 'media', title: 'Медиа и дорожки', elements: 'audio video source track'.split(' '), attributes: ['controls', 'poster', 'preload', 'src', 'type', 'kind', 'srclang', 'label'], note: 'audio и video могут содержать несколько source и track; браузер выбирает подходящий ресурс.', html: `<video controls poster="preview.jpg" preload="metadata">\n  <source src="lesson.webm" type="video/webm">\n  <source src="lesson.mp4" type="video/mp4">\n  <track kind="captions" src="captions-ru.vtt" srclang="ru" label="Русские субтитры">\n</video>` },
  { id: 'table', title: 'Доступная таблица данных', elements: 'table caption colgroup col thead tbody tfoot tr th td'.split(' '), attributes: ['scope', 'colspan', 'rowspan', 'headers'], note: 'caption подписывает таблицу, строки группируются, а th связывает заголовки с данными.', html: `<table>\n  <caption>Продажи за квартал</caption>\n  <thead><tr><th scope="col">Месяц</th><th scope="col">Сумма</th></tr></thead>\n  <tbody><tr><th scope="row">Январь</th><td>120 000 ₽</td></tr></tbody>\n  <tfoot><tr><th scope="row">Итого</th><td>120 000 ₽</td></tr></tfoot>\n</table>` },
  { id: 'form', title: 'Связи элементов формы', elements: 'form fieldset legend label input datalist select optgroup option textarea button output progress meter'.split(' '), attributes: ['action', 'method', 'for', 'id', 'name', 'type', 'list', 'required', 'value'], note: 'for у label совпадает с id поля, а list у input — с id datalist.', html: `<form action="/subscribe" method="post">\n  <fieldset>\n    <legend>Подписка</legend>\n    <label for="email">Email</label>\n    <input id="email" name="email" type="email" required>\n    <button type="submit">Подписаться</button>\n  </fieldset>\n</form>` },
  { id: 'disclosure-dialog', title: 'Раскрытие и диалог', elements: 'details summary dialog button'.split(' '), attributes: ['open', 'command', 'commandfor', 'closedby'], note: 'summary является подписью details; button может декларативно управлять dialog через commandfor.', html: `<details>\n  <summary>Условия</summary>\n  <p>Текст условий.</p>\n</details>\n<button command="show-modal" commandfor="confirm-dialog">Открыть</button>\n<dialog id="confirm-dialog" closedby="any">Подтвердите действие.</dialog>` },
  { id: 'popover', title: 'Popover и управляющая кнопка', elements: 'button div'.split(' '), attributes: ['popover', 'popovertarget', 'popovertargetaction', 'id'], note: 'popovertarget ссылается на id элемента с popover.', html: `<button popovertarget="filters">Фильтры</button>\n<div id="filters" popover>Настройки фильтрации</div>` },
  { id: 'shadow', title: 'Шаблон и слот компонента', elements: 'template slot'.split(' '), attributes: ['shadowrootmode', 'name', 'slot'], note: 'Declarative Shadow DOM создаётся через template[shadowrootmode], а slot принимает распределённое содержимое.', html: `<article-card>\n  <span slot="title">Новая статья</span>\n  <template shadowrootmode="open">\n    <h2><slot name="title"></slot></h2>\n    <slot></slot>\n  </template>\n  <p>Краткое описание.</p>\n</article-card>` },
  { id: 'edits', title: 'История правок', elements: 'ins del time'.split(' '), attributes: ['cite', 'datetime'], note: 'ins и del описывают изменения документа, а datetime фиксирует время правки.', html: `<p>Срок: <del datetime="2026-07-20">20 июля</del> <ins datetime="2026-07-22">22 июля</ins>.</p>` }
]

export const groupedAttributes = Object.values(
  [...specIndex.attributes, {
    name: 'data-*',
    kind: 'regular',
    elements: [],
    appliesToAll: true,
    appliesText: 'HTML elements',
    description: 'Custom data attributes for private application data',
    value: 'Text',
    specUrl: 'https://html.spec.whatwg.org/multipage/dom.html#attr-data-*'
  }].reduce((result, variant) => {
    const item = result[variant.name] ??= { name: variant.name, variants: [] }
    item.variants.push(variant)
    return result
  }, {})
).sort((left, right) => left.name.localeCompare(right.name, 'en'))

export const globalAttributes = groupedAttributes.filter(({ name }) => globalAttributeNames.includes(name))
export const specificAttributes = groupedAttributes.filter(({ name }) => !globalAttributeNames.includes(name))
export const eventAttributes = [...specIndex.events].sort((left, right) => left.name.localeCompare(right.name, 'en'))

export const elementByName = new Map(specIndex.elements.map((element) => [element.name, element]))
export const groupByElement = new Map(elementGroups.flatMap((group) => group.names.map((name) => [name, group])))

export function attributeSlug(name) {
  return name === 'data-*' ? 'data-star' : name
}

export function elementHref(name) {
  const group = groupByElement.get(name)
  return group ? `/base/frontend/html/elements/${group.slug}/${name}` : null
}

export function attributeGroup(name) {
  if (name.startsWith('on')) return 'events'
  return globalAttributeNames.includes(name) ? 'global' : 'element-specific'
}

export function attributeHref(name) {
  const known = groupedAttributes.some((attribute) => attribute.name === name) || eventAttributes.some((attribute) => attribute.name === name)
  return known ? `/base/frontend/html/attributes/${attributeGroup(name)}/${attributeSlug(name)}` : null
}
