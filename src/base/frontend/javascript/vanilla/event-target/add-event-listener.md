# addEventListener()

`addEventListener()` устанавливает функцию, которая будет вызываться каждый раз, когда событие достигает цели.

## Синтаксис

```javascript
element.addEventListener(type, listener)
element.addEventListener(type, listener, options)
element.addEventListener(type, listener, useCapture)
```

### Параметры

| Параметр | Описание |
|----------|----------|
| `type` | Тип события (`click`, `input`, `keydown` и т.д.) |
| `listener` | Функция-обработчик, которая будет вызвана при наступлении события |
| `options` | Объект с настройками (опционально) |
| `useCapture` | `boolean` — перехватывать событие в фазе захвата (опционально) |

### Объект options

```javascript
element.addEventListener('click', handler, {
  capture: false,   // true — перехват в фазе захвата
  once: false,      // true — обработчик сработает один раз
  passive: false,   // true — обработчик не вызовет preventDefault()
  signal: null       // AbortSignal для удаления обработчика
})
```

## Примеры

### Базовое использование

```javascript
const button = document.querySelector('button')

button.addEventListener('click', (event) => {
  console.log('Кнопка нажата', event.target)
})
```

### Удаление обработчика

Для удаления нужна ссылка на ту же функцию:

```javascript
function handleClick() {
  console.log('clicked')
}

element.addEventListener('click', handleClick)
element.removeEventListener('click', handleClick)
```

### Однократное выполнение

```javascript
element.addEventListener('click', handler, { once: true })
```

### Отмена через AbortController

```javascript
const controller = new AbortController()

element.addEventListener('click', handler, {
  signal: controller.signal
})

// Удалить все обработчики с этим сигналом
controller.abort()
```

## Делегирование событий

Вместо навешивания обработчика на каждый элемент — один обработчик на родителе:

```javascript
document.querySelector('ul').addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    console.log('Клик по элементу:', event.target.textContent)
  }
})
```

::: info
Делегирование полезно для динамически добавляемых элементов — обработчик не нужно переподключать.
:::

## Порядок выполнения

Обработчики вызываются в порядке их добавления. Это гарантировано начиная с DOM Level 3 Events.

::: tip
Используйте `passive: true` для обработчиков `touchstart` и `scroll` — это улучшает производительность прокрутки на мобильных устройствах.
:::
