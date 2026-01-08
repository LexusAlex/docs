import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/docs/',
  title: "Docs",
  lang: 'ru-RU',
  description: "Modern documentation",
  titleTemplate: 'Lexusalex Docs',
  ignoreDeadLinks: true,
  vite: {
    build: {
      chunkSizeWarningLimit: 1000
    }
  },
  markdown: {
    lineNumbers: true,
    image: {
      // ленивая загрузка изображений отключена по умолчанию
      lazyLoading: true
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'База знаний', link: '/base/' }
    ],
    lastUpdated: {
      text: 'Обновлено',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: { // используйте ключ `root`, если хотите перевести локаль по умолчанию
            translations: {
              button: {
                buttonText: 'Поиск',
                buttonAriaLabel: 'Поиск'
              },
              modal: {
                displayDetails: 'Отобразить подробный список',
                resetButtonTitle: 'Сбросить поиск',
                backButtonTitle: 'Закрыть поиск',
                noResultsText: 'Нет результатов по запросу',
                footer: {
                  selectText: 'выбрать',
                  selectKeyAriaLabel: 'выбрать',
                  navigateText: 'перейти',
                  navigateUpKeyAriaLabel: 'стрелка вверх',
                  navigateDownKeyAriaLabel: 'стрелка вниз',
                  closeText: 'закрыть',
                  closeKeyAriaLabel: 'esc'
                }
              }
            }
          }
        }
      }
    },
    sidebar:
      {
        '/base/' : [
          {
            text: 'frontend (Клиент)',
            collapsed: true,
            items: [
              { text: 'HTML', link: '/base/frontend/html/' },
              { text: 'CSS', link: '/base/frontend/css/' },
              { text: 'Javascript',collapsed: true, link: '/base/frontend/javascript/',
                items:[
                  { text: 'vanilla',collapsed: true, link: '/base/frontend/javascript/vanilla/',
                    items:[
                      { text: 'events', link: '/base/frontend/javascript/vanilla/events/' },
                    ]},
                  { text: 'jquery', link: '/base/frontend/javascript/jquery/' },
                  { text: 'typescript', link: '/base/frontend/javascript/typescript/' },
                ] },
            ]
          },
          {
            text: 'backend (Сервер)',
            collapsed: true,
            items: [
              { text: 'PHP', link: '/base/backend/php/' },
            ]
          },
          {
            text: 'Базы данных',
            collapsed: true,
            items: [
              { text: 'SQL', collapsed: true,link: '/base/db/sql/',
                items: [
                  { text: 'Mysql', link: '/base/db/sql/mysql/' },
                  { text: 'Mariadb', link: '/base/db/sql/mariadb/' },
                  { text: 'Postgresql', link: '/base/db/sql/postgresql/' },
                ]
              },
            ]
          },
          {
            text: 'Протоколы',
            collapsed: true,
            items: [
              { text: 'HTTP', collapsed: true, link: '/base/protocols/http/',
                items: [
                  { text: 'Методы запроса', link: '/base/protocols/http/methods' },
                ]
              },
            ]
          },
          {
            text: 'Инфраструктура',
            collapsed: true,
            items: [
              { text: 'Linux', link: '/base/infrastructure/linux/' },
              { text: 'Docker', link: '/base/infrastructure/docker/' },
              { text: 'Ansible', link: '/base/infrastructure/ansible/' },
              { text: 'Серверы', collapsed: true, link: '/base/infrastructure/server/',
                items: [
                  { text: 'Nginx', link: '/base/infrastructure/server/nginx/' },
                  { text: 'Apache', link: '/base/infrastructure/server/apache/' },
                ]
              },
            ]
          },
        ],
        '/': [
          { text: 'База знаний', link: '/base/' },
        ]
      }
    ,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LexusAlex' }
    ]
  }
})
