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
      },
      miniSearch: {
        /**
         * Кастомный токенизатор.
         * 1. Приводит текст к нижнему регистру.
         * 2. Удаляет все символы, КРОМЕ кириллицы, латиницы, цифр, пробелов и дефисов.
         * 3. Разбивает строку на слова по пробелам.
         */
        tokenize: (text) =>
            text
                .toLowerCase()
                // Регулярное выражение, которое оставляет только нужные символы
                .replace(/[^а-яёa-z0-9\s-]/g, '')
                .trim()
                .split(/\s+/)
                .filter(word => word.length > 0),

        // Указываем, по каким полям искать. 'title' - H1, 'titles' - H2/H3, 'content' - остальной текст.
        fields: ['title', 'titles', 'content'],

        // Какие поля возвращать в результатах поиска.
        storeFields: ['title', 'titles']
      }
    },
    sidebar:
      {
        '/base/' : [
          {
            text: 'Принципы и практики',
            link: '/base/principles/',
            collapsed: true,
            items: []
          },
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
              { text: 'Платформы',collapsed: true, link: '/base/tools/platform/',
                items: [
                  { text: 'gitlab',link: '/base/tools/platform/gitlab',}
                ]
              },
              { text: 'Браузеры',collapsed: true, link: '/base/tools/browsers/',
                items: [
                  {text: 'Теория и Архитектура',collapsed: true, link: '/base/tools/browsers/theory/',
                    items: [
                      {text: 'Как работает браузер',collapsed: true,link: '/base/tools/browsers/theory/how-the-browser-works/',
                        items: [
                          {text: 'Сетевые операции', link: '/base/tools/browsers/theory/how-the-browser-works/network-operations',}
                        ]},
                      {text: 'Режимы рендеринга',link: '/base/tools/browsers/theory/rendering-modes'}
                    ]
                  },
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
                  },
                  { text: 'Атрибуты',collapsed: true,link: '/base/frontend/html/attributes/',
                    items: [
                      { text: 'Глобальные',collapsed: true,link: '/base/frontend/html/attributes/global/',
                        items: [
                          { text: 'id',link: '/base/frontend/html/attributes/global/id',}
                        ]
                      }
                    ]
                  }
                ]
              },
              { text: 'CSS',collapsed: true, link: '/base/frontend/css/',
                items: [
                  { text: 'Селекторы',collapsed: true,link: '/base/frontend/css/selectors/',
                    items: [
                      { text: 'Базовые',collapsed: true,link: '/base/frontend/css/selectors/basics/'},
                      { text: 'Комбинаторы',collapsed: true,link: '/base/frontend/css/selectors/combined/'},
                      { text: 'Псевдоклассы',collapsed: true,link: '/base/frontend/css/selectors/pseudo-classes/'},
                      { text: 'Псевдоэлементы',collapsed: true,link: '/base/frontend/css/selectors/pseudo-elements/'}
                    ]
                  },
                  { text: 'Методологии',collapsed: true,link: '/base/frontend/css/methodologies/',
                    items: [
                      { text: 'БЭМ',link: '/base/frontend/css/methodologies/bem'}
                    ]
                  }
                ]
              },
              { text: 'Javascript',collapsed: true, link: '/base/frontend/javascript/',
                items:[
                  { text: 'vanilla',collapsed: true, link: '/base/frontend/javascript/vanilla/',
                    items:[
                      { text: 'events', link: '/base/frontend/javascript/vanilla/events/' },
                    ]},
                  { text: 'typescript', link: '/base/frontend/javascript/typescript/' },
                  { text: 'Фреймворки',collapsed: true, link: '/base/frontend/javascript/frameworks/',
                    items: [
                      { text: 'Vue.js', link: '/base/frontend/javascript/frameworks/vue-js' },
                    ]
                  },
                  { text: 'Библиотеки',collapsed: true, link: '/base/frontend/javascript/libraries/',
                    items: [
                      { text: 'jquery', link: '/base/frontend/javascript/libraries/jquery/' },
                    ]
                  },
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
                  { text: 'Mysql',collapsed: true, link: '/base/db/sql/mysql/' },
                  { text: 'Mariadb',collapsed: true, link: '/base/db/sql/mariadb/',
                    items: [
                      { text: 'Установка',collapsed: true, link: '/base/db/sql/mariadb/install/',
                        items: [
                          { text: 'Ubuntu 24.04 LTS', link: '/base/db/sql/mariadb/install/ubuntu-24-04-lts',}
                        ]
                      },
                      { text: 'Пользователи', link: '/base/db/sql/mariadb/users'},
                      { text: 'Удаление',collapsed: true, link: '/base/db/sql/mariadb/remove/',
                        items: [
                          { text: 'Ubuntu 24.04 LTS', link: '/base/db/sql/mariadb/remove/ubuntu-24-04-lts',}
                        ]
                      },
                    ]
                  },
                  { text: 'Percona',collapsed: true, link: '/base/db/sql/percona/'},
                  { text: 'Postgresql',collapsed: true, link: '/base/db/sql/postgresql/' },
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
              { text: 'Linux',collapsed: true, link: '/base/infrastructure/linux/',
                items: [
                  { text: 'Команды',collapsed: true, link: '/base/infrastructure/linux/commands/',
                    items: [
                      { text: 'Файлы и каталоги',collapsed: true, link: '/base/infrastructure/linux/commands/files-and-directories/' },
                      { text: 'Просмотр и обработка текста',collapsed: true, link: '/base/infrastructure/linux/commands/viewing-and-processing-text/',
                        items: [
                          { text: 'grep', link: '/base/infrastructure/linux/commands/viewing-and-processing-text/grep'}
                        ]
                      },
                      { text: 'Получение информации о системе и мониторинг',collapsed: true, link: '/base/infrastructure/linux/commands/monitoring/' },
                      { text: 'Управление пользователями и правами доступа',collapsed: true, link: '/base/infrastructure/linux/commands/user-and-access/' },
                      { text: 'Управление процессами',collapsed: true, link: '/base/infrastructure/linux/commands/processes/' },
                      { text: 'Сеть',collapsed: true, link: '/base/infrastructure/linux/commands/network/' },
                      { text: 'Архивы и сжатие',collapsed: true, link: '/base/infrastructure/linux/commands/archives-and-compression/' },
                      { text: 'Управление пакетами',collapsed: true, link: '/base/infrastructure/linux/commands/package-management/',
                        items: [
                          { text: 'Debian/Ubuntu',collapsed: true, link: '/base/infrastructure/linux/commands/package-management/debian-ubuntu/'}
                        ]
                      },
                      { text: 'Поиск файлов и команд',collapsed: true, link: '/base/infrastructure/linux/commands/search-files-and-commands/'},
                      { text: 'Справка и документация',collapsed: true, link: '/base/infrastructure/linux/commands/reference/'}
                    ]
                  },
                ]
              },
              { text: 'Docker',collapsed: true, link: '/base/infrastructure/docker/',
                items: [
                  { text: 'docker compose',collapsed: true, link: '/base/infrastructure/docker/docker-compose',}
                ]
              },
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
          {
            text: 'Мои решения',
            link: '/base/my-solutions/',
            collapsed: true,
            items: [
              { text: 'Скрипты',collapsed: true, link: '/base/my-solutions/scripts/',
                items: [
                  { text: 'Bash',collapsed: true, link: '/base/my-solutions/scripts/bash/',
                    items: [
                      { text: 'Первая настройка чистой серверной системы',collapsed: true, link: '/base/my-solutions/scripts/bash/first-start-fresh-installation/',
                        items: [
                          { text: 'Ubuntu 24.04 LTS', link: '/base/my-solutions/scripts/bash/first-start-fresh-installation/ubuntu-24-04-lts',}
                        ]
                      },
                      { text: 'gitlab бэкап', link: '/base/my-solutions/scripts/bash/gitlab-backup'}
                    ]
                  }
                ]
              },
            ]
          }
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
