import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/docs/',
  title: "Docs",
  lang: 'ru-RU',
  description: "Modern documentation",
  titleTemplate: 'Lexusalex Docs',
  metaChunk: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  vite: {
    build: {
      chunkSizeWarningLimit: 1000
    }
  },
  head: [
    [
      'meta',
      {
        name: 'robots',
        content: 'noindex, nofollow'
      }
    ]
  ],
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
            text: 'Инструменты',
            link: '/base/tools/',
            collapsed: true,
            items: [
              { text: 'VCS',collapsed: true, link: '/base/tools/vcs/',
                items: [
                  { text: 'git',link: '/base/tools/vcs/git/',}
                ]
              },
              { text: 'Браузеры',collapsed: true, link: '/base/tools/browsers/',
                items: [
                  { text: 'Firefox',collapsed: true, link: '/base/tools/browsers/firefox/',
                    items: [
                      { text: 'Расширения',link: '/base/tools/browsers/firefox/extensions'},
                    ]
                  },
                ]
              },
            ],
          },
          {
            text: 'Frontend (Клиент)',
            link: '/base/frontend/',
            collapsed: true,
            items: [
              { text: 'HTML',collapsed: true, link: '/base/frontend/html/',
                items: [
                  { text: 'Структура документа',collapsed: true, link: '/base/frontend/html/document/',
                    items: [
                      { text: 'Заголовки',link: '/base/frontend/html/document/headers',}
                    ]
                  },
                  { text: 'Элементы',collapsed: true,link: '/base/frontend/html/elements/',
                    items: [
                      { text: 'Теория',collapsed: true,link: '/base/frontend/html/elements/theory/',
                        items: [
                          { text: 'Блочные и строчные элементы',link: '/base/frontend/html/elements/theory/block-and-inline'}
                        ]
                      },
                      { text: 'Базовые',collapsed: true,link: '/base/frontend/html/elements/basics/',}
                    ]
                  }
                ]
              },
              { text: 'CSS', link: '/base/frontend/css/' },
              { text: 'Javascript',collapsed: true, link: '/base/frontend/javascript/',
                items:[
                  { text: 'vanilla',collapsed: true, link: '/base/frontend/javascript/vanilla/',
                    items:[
                      { text: 'events', link: '/base/frontend/javascript/vanilla/events/' },
                    ]},
                  { text: 'jquery', link: '/base/frontend/javascript/jquery/' },
                  { text: 'typescript', link: '/base/frontend/javascript/typescript/' },
                ]
              },
            ]
          },
          {
            text: 'Backend (Сервер)',
            link: '/base/backend/',
            collapsed: true,
            items: [
              { text: 'PHP', link: '/base/backend/php/' },
            ]
          },
          {
            text: 'Базы данных',
            link: '/base/db/',
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
            link: '/base/protocols/',
            collapsed: true,
            items: [
              { text: 'HTTP', collapsed: true, link: '/base/protocols/http/',
                items: [
                  { text: 'Методы запроса',collapsed: true, link: '/base/protocols/http/methods/',
                    items:[
                      { text: 'GET', link: '/base/protocols/http/methods/get'}
                    ]
                  },
                ]
              },
              { text: 'SSH', collapsed: true, link: '/base/protocols/ssh/'}
            ]
          },
          {
            text: 'Инфраструктура',
            link: '/base/infrastructure/',
            collapsed: true,
            items: [
              { text: 'Linux', link: '/base/infrastructure/linux/' },
              { text: 'Docker', link: '/base/infrastructure/docker/' },
              { text: 'Ansible', link: '/base/infrastructure/ansible/' },
              { text: 'Серверы', collapsed: true, link: '/base/infrastructure/server/',
                items: [
                  { text: 'Nginx', collapsed: true, link: '/base/infrastructure/server/nginx/',
                    items: [
                      { text: 'Версии', link: '/base/infrastructure/server/nginx/versions' },
                    ] },
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
