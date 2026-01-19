import DefaultTheme from 'vitepress/theme'
import 'glightbox/dist/css/glightbox.min.css' // Подключаем стили
import { onMounted } from 'vue'

import GLightbox from 'glightbox'

export default {
    ...DefaultTheme,
    setup() {
        onMounted(() => {
            // Инициализируем GLightbox
            GLightbox({
                selector: '.glightbox', // Класс, который будет триггерить lightbox
                touchNavigation: true,
                loop: false,
                zoomable: true,
                draggable: true,
            })
        })
    }
}