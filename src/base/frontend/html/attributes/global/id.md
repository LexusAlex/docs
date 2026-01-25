# id

`id` Устанавливает элементу уникальный идентификатор, имя которого должно быть уникальным на всей странице.

Атрибут `id` должен содержать хотя бы один символ и в нем не должно быть пробелов, браузер поймет это как часть идентификатора.

Значения атрибута `id` регистрозависимы, то есть `Main` и `main` разные идентификаторы.

Старайтесь придерживаться единого стиля именования идентификаторов на странице.

````html
<div id="error-container"></div>
````

Атрибут `id` не стоит использовать для передачи какой-либо информации, он необходим для поиска элемента через `css` или доступа через `javascript`.

## Как использовать

- Можно получить доступ к элементу из `javascript`.

````javascript
document.getElementById("error-container");
const button = document.getElementById('button');
button.addEventListener('click', function () {
    alert('Click!');
});
````

- Стилизовать элемент из `css`.

````css
#error-container {
    background-color: #1b1b1f;
}
````

- Позволяет создать якорь ведущий к определенному разделу на странице и производить навигацию к ней

````html
<a href="#section2">Перейти к разделу 2</a> 
<div id="section2">...</div>
````

- Позволяет создать связь с тегом `label` через атрибут `for` 

````html
<label for="email">Email:</label> 
<input type="email" id="email">
````

## Javascript

Можно обращаться к элементам с атрибутом `id` как к свойствам объекта `window`.

Например:

````html
<div id="test">test123</div>
<script>
    console.log(window.test.textContent); // test123
</script>
````

::: danger
Данное использование не рекомендовано, лучше использовать `document.getElementById('')` или `document.querySelector()`.
:::

::: danger
Метод `getElementById` есть только у объекта `document`, он ищет `id` по всему документу.
:::

Получим атрибут элемента

````javascript
document.body.id;
````

Присвоить новое значение

````javascript
document.body.id = 'new value'
````

Удалим атрибут `id`.

````javascript
document.body.removeAttribute('id');
````

Но более правильно для получения и изменения атрибута использовать встроенные методы элемента

````javascript
// Задать атрибут
document.body.setAttribute('id','set');
// Получить атрибут
document.body.getAttribute('id')
````

Получим элемент двумя разными методами и сравним их

````javascript
let e = document.getElementById('test');
let e2 = document.querySelector('#test');
console.log(e === e2); // true
````

::: tip
`document.querySelector('')` считается современной и гибкой альтернативой.
:::

Проверка, что найденный элемент существует, это желательно делать всегда, так как элемента может не быть.

````html
<div id="test1">test123</div>
<script>
    let e = document.getElementById('test');
    // Если элемент не найден null
    if (e) {
        console.log(true);
    }
</script>
````

## Примеры названий атрибутов

- `main_section`
- `block`
- `contenteditable`
- `main-content`
- `login-form`
- `modal-window`
- `background-audio`
- `comments-block`
- `related-posts`
- `error-container`
- `collapsed-menu`
- `product-card`
- `menu__item--active`
- `card__title`

## Ссылки

[Спецификация](https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute)