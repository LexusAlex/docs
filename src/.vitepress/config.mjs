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
            items: [
              { text: 'Принципы проектирования кода',collapsed: true, link: '/base/principles/principles-of-code-design/',
                items: [
                  { text: 'Use Cases', link: '/base/principles/principles-of-code-design/use-cases'},
                  { text: 'Low Coupling High Cohesion', link: '/base/principles/principles-of-code-design/coupling-and-cohesion'}
                ]
              },
              { text: 'Архитектура и Процессы Разработки',collapsed: true, link: '/base/principles/architecture-and-development-processes/',
                items: [
                  { text: 'Приложение 12 факторов', link: '/base/principles/architecture-and-development-processes/12-factors'}
                ]
              }
            ]
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
                      { text: 'Базовые',collapsed: true,link: '/base/frontend/css/selectors/basics/',
                        items: [
                          { text: 'Универсальный',link: '/base/frontend/css/selectors/basics/universal'}
                        ]
                      },
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
                      { text: 'EventTarget',collapsed: true, link: '/base/frontend/javascript/vanilla/event-target/',
                        items: [
                          { text: 'addEventListener()', link: '/base/frontend/javascript/vanilla/event-target/add-event-listener'},
                          { text: 'Node',collapsed: true, link: '/base/frontend/javascript/vanilla/event-target/node/'}
                        ]
                      },
                      { text: 'Event',collapsed: true, link: '/base/frontend/javascript/vanilla/event/'},
                      { text: 'Promise', link: '/base/frontend/javascript/vanilla/promise/'}
                    ]},
                  { text: 'typescript', link: '/base/frontend/javascript/typescript/' },
                  { text: 'Фреймворки',collapsed: true, link: '/base/frontend/javascript/frameworks/',
                    items: [
                      { text: 'Vue.js',collapsed: true, link: '/base/frontend/javascript/frameworks/vue-js/',
                        items: [
                          { text: 'Концепции', link: '/base/frontend/javascript/frameworks/vue-js/concepts'}
                        ]
                      },
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
              { text: 'php',collapsed: true, link: '/base/backend/php/',
                items: [
                  { text: 'Фреймворки',collapsed: true, link: '/base/backend/php/frameworks/',
                    items: [
                      { text: 'yii3',collapsed: true, link: '/base/backend/php/frameworks/yii3/',
                        items: [
                          { text: 'Пакеты',collapsed: true, link: '/base/backend/php/frameworks/yii3/packages/', items: [
                              { text: 'config', link: '/base/backend/php/frameworks/yii3/packages/config'},
                              { text: 'yii-runner-http', link: '/base/backend/php/frameworks/yii3/packages/yii-runner-http'}
                            ]
                          },
                          { text: 'Как это работает', link: '/base/backend/php/frameworks/yii3/how-to-work',}
                        ]
                      }
                    ]
                  }
                ]
              },
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
                      { text: 'Права и привилегии', link: '/base/db/sql/mariadb/rights'},
                      { text: 'Роли', link: '/base/db/sql/mariadb/roles'},
                      { text: 'Утилиты',collapsed: true, link: '/base/db/sql/mariadb/utilities/',
                        items: [
                          { text: 'mysqldump', link: '/base/db/sql/mariadb/utilities/mysqldump'}
                        ]
                      },
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
                  { text: 'Права доступа', link: '/base/infrastructure/linux/rights/'},
                  { text: 'Команды',collapsed: true, link: '/base/infrastructure/linux/commands/',
                    items: [
                      { text: 'Шпаргалка', link: '/base/infrastructure/linux/commands/cheat-sheet'},
                      { text: 'Как сделать...', link: '/base/infrastructure/linux/commands/how-to'},
                      { text: 'По задачам', link: '/base/infrastructure/linux/commands/by-use-case'},
                      { text: 'Файлы и каталоги',collapsed: true, link: '/base/infrastructure/linux/commands/files-and-directories/',
                        items: [
                          { text: 'ls', link: '/base/infrastructure/linux/commands/files-and-directories/ls'},
                          { text: 'cd', link: '/base/infrastructure/linux/commands/files-and-directories/cd'},
                          { text: 'pwd', link: '/base/infrastructure/linux/commands/files-and-directories/pwd'},
                          { text: 'tree', link: '/base/infrastructure/linux/commands/files-and-directories/tree'},
                          { text: 'touch', link: '/base/infrastructure/linux/commands/files-and-directories/touch'},
                          { text: 'mkdir', link: '/base/infrastructure/linux/commands/files-and-directories/mkdir'},
                          { text: 'cp', link: '/base/infrastructure/linux/commands/files-and-directories/cp'},
                          { text: 'mv', link: '/base/infrastructure/linux/commands/files-and-directories/mv'},
                          { text: 'rm', link: '/base/infrastructure/linux/commands/files-and-directories/rm'},
                          { text: 'rmdir', link: '/base/infrastructure/linux/commands/files-and-directories/rmdir'},
                          { text: 'ln', link: '/base/infrastructure/linux/commands/files-and-directories/ln'},
                          { text: 'install', link: '/base/infrastructure/linux/commands/files-and-directories/install'},
                          { text: 'shred', link: '/base/infrastructure/linux/commands/files-and-directories/shred'},
                          { text: 'rename', link: '/base/infrastructure/linux/commands/files-and-directories/rename'},
                          { text: 'watch', link: '/base/infrastructure/linux/commands/files-and-directories/watch'}
                        ]
                      },
                      { text: 'Просмотр и обработка текста',collapsed: true, link: '/base/infrastructure/linux/commands/viewing-and-processing-text/',
                        items: [
                          { text: 'cat', link: '/base/infrastructure/linux/commands/viewing-and-processing-text/cat'},
                          { text: 'less', link: '/base/infrastructure/linux/commands/viewing-and-processing-text/less'},
                          { text: 'more', link: '/base/infrastructure/linux/commands/viewing-and-processing-text/more'},
                          { text: 'head', link: '/base/infrastructure/linux/commands/viewing-and-processing-text/head'},
                          { text: 'tail', link: '/base/infrastructure/linux/commands/viewing-and-processing-text/tail'},
                          { text: 'wc', link: '/base/infrastructure/linux/commands/viewing-and-processing-text/wc'},
                          { text: 'cut', link: '/base/infrastructure/linux/commands/viewing-and-processing-text/cut'},
                          { text: 'sort', link: '/base/infrastructure/linux/commands/viewing-and-processing-text/sort'},
                          { text: 'uniq', link: '/base/infrastructure/linux/commands/viewing-and-processing-text/uniq'},
                          { text: 'tr', link: '/base/infrastructure/linux/commands/viewing-and-processing-text/tr'},
                          { text: 'sed', link: '/base/infrastructure/linux/commands/viewing-and-processing-text/sed'},
                          { text: 'awk', link: '/base/infrastructure/linux/commands/viewing-and-processing-text/awk'},
                          { text: 'diff', link: '/base/infrastructure/linux/commands/viewing-and-processing-text/diff'},
                          { text: 'tee', link: '/base/infrastructure/linux/commands/viewing-and-processing-text/tee'},
                          { text: 'column', link: '/base/infrastructure/linux/commands/viewing-and-processing-text/column'},
                          { text: 'jq', link: '/base/infrastructure/linux/commands/viewing-and-processing-text/jq'}
                        ]
                      },
                      { text: 'Перенаправление потоков и конвейеры',collapsed: true, link: '/base/infrastructure/linux/commands/streams-and-pipes/',
                        items: [
                          { text: 'Перенаправление', link: '/base/infrastructure/linux/commands/streams-and-pipes/redirection'},
                          { text: 'Конвейеры', link: '/base/infrastructure/linux/commands/streams-and-pipes/pipes'}
                        ]
                      },
                      { text: 'Поиск файлов и команд',collapsed: true, link: '/base/infrastructure/linux/commands/search-files-and-commands/',
                        items: [
                          { text: 'find', link: '/base/infrastructure/linux/commands/search-files-and-commands/find'},
                          { text: 'locate', link: '/base/infrastructure/linux/commands/search-files-and-commands/locate'},
                          { text: 'which', link: '/base/infrastructure/linux/commands/search-files-and-commands/which'},
                          { text: 'whereis', link: '/base/infrastructure/linux/commands/search-files-and-commands/whereis'},
                          { text: 'type', link: '/base/infrastructure/linux/commands/search-files-and-commands/type'},
                          { text: 'xargs', link: '/base/infrastructure/linux/commands/search-files-and-commands/xargs'},
                          { text: 'grep', link: '/base/infrastructure/linux/commands/search-files-and-commands/grep'}
                        ]
                      },
                      { text: 'Пользователи и группы',collapsed: true, link: '/base/infrastructure/linux/commands/user-and-access/',
                        items: [
                          { text: 'useradd', link: '/base/infrastructure/linux/commands/user-and-access/useradd'},
                          { text: 'userdel', link: '/base/infrastructure/linux/commands/user-and-access/userdel'},
                          { text: 'usermod', link: '/base/infrastructure/linux/commands/user-and-access/usermod'},
                          { text: 'passwd', link: '/base/infrastructure/linux/commands/user-and-access/passwd'},
                          { text: 'groupadd', link: '/base/infrastructure/linux/commands/user-and-access/groupadd'},
                          { text: 'groupdel', link: '/base/infrastructure/linux/commands/user-and-access/groupdel'},
                          { text: 'groupmod', link: '/base/infrastructure/linux/commands/user-and-access/groupmod'},
                          { text: 'groups', link: '/base/infrastructure/linux/commands/user-and-access/groups'},
                          { text: 'id', link: '/base/infrastructure/linux/commands/user-and-access/id'},
                          { text: 'who', link: '/base/infrastructure/linux/commands/user-and-access/who'},
                          { text: 'w', link: '/base/infrastructure/linux/commands/user-and-access/w'},
                          { text: 'last', link: '/base/infrastructure/linux/commands/user-and-access/last'},
                          { text: 'su', link: '/base/infrastructure/linux/commands/user-and-access/su'},
                          { text: 'sudo', link: '/base/infrastructure/linux/commands/user-and-access/sudo'}
                        ]
                      },
                      { text: 'Права доступа',collapsed: true, link: '/base/infrastructure/linux/commands/permissions/',
                        items: [
                          { text: 'chmod', link: '/base/infrastructure/linux/commands/permissions/chmod'},
                          { text: 'chown', link: '/base/infrastructure/linux/commands/permissions/chown'},
                          { text: 'chgrp', link: '/base/infrastructure/linux/commands/permissions/chgrp'},
                          { text: 'umask', link: '/base/infrastructure/linux/commands/permissions/umask'},
                          { text: 'getfacl', link: '/base/infrastructure/linux/commands/permissions/getfacl'},
                          { text: 'setfacl', link: '/base/infrastructure/linux/commands/permissions/setfacl'}
                        ]
                      },
                      { text: 'Управление процессами',collapsed: true, link: '/base/infrastructure/linux/commands/processes/',
                        items: [
                          { text: 'ps', link: '/base/infrastructure/linux/commands/processes/ps'},
                          { text: 'pgrep', link: '/base/infrastructure/linux/commands/processes/pgrep'},
                          { text: 'pidof', link: '/base/infrastructure/linux/commands/processes/pidof'},
                          { text: 'pstree', link: '/base/infrastructure/linux/commands/processes/pstree'},
                          { text: 'kill', link: '/base/infrastructure/linux/commands/processes/kill'},
                          { text: 'killall', link: '/base/infrastructure/linux/commands/processes/killall'},
                          { text: 'pkill', link: '/base/infrastructure/linux/commands/processes/pkill'},
                          { text: 'nice', link: '/base/infrastructure/linux/commands/processes/nice'},
                          { text: 'renice', link: '/base/infrastructure/linux/commands/processes/renice'},
                          { text: 'nohup', link: '/base/infrastructure/linux/commands/processes/nohup'},
                          { text: 'bg', link: '/base/infrastructure/linux/commands/processes/bg'},
                          { text: 'fg', link: '/base/infrastructure/linux/commands/processes/fg'},
                          { text: 'jobs', link: '/base/infrastructure/linux/commands/processes/jobs'},
                          { text: 'timeout', link: '/base/infrastructure/linux/commands/processes/timeout'}
                        ]
                      },
                      { text: 'Мониторинг системы',collapsed: true, link: '/base/infrastructure/linux/commands/monitoring/',
                        items: [
                          { text: 'top', link: '/base/infrastructure/linux/commands/monitoring/top'},
                          { text: 'htop', link: '/base/infrastructure/linux/commands/monitoring/htop'},
                          { text: 'free', link: '/base/infrastructure/linux/commands/monitoring/free'},
                          { text: 'vmstat', link: '/base/infrastructure/linux/commands/monitoring/vmstat'},
                          { text: 'iostat', link: '/base/infrastructure/linux/commands/monitoring/iostat'},
                          { text: 'df', link: '/base/infrastructure/linux/commands/monitoring/df'},
                          { text: 'du', link: '/base/infrastructure/linux/commands/monitoring/du'},
                          { text: 'uptime', link: '/base/infrastructure/linux/commands/monitoring/uptime'},
                          { text: 'uname', link: '/base/infrastructure/linux/commands/monitoring/uname'},
                          { text: 'lspci', link: '/base/infrastructure/linux/commands/monitoring/lspci'},
                          { text: 'lsusb', link: '/base/infrastructure/linux/commands/monitoring/lsusb'},
                          { text: 'lscpu', link: '/base/infrastructure/linux/commands/monitoring/lscpu'},
                          { text: 'dmesg', link: '/base/infrastructure/linux/commands/monitoring/dmesg'}
                        ]
                      },
                      { text: 'Диски и монтирование',collapsed: true, link: '/base/infrastructure/linux/commands/disks-and-mount/',
                        items: [
                          { text: 'lsblk', link: '/base/infrastructure/linux/commands/disks-and-mount/lsblk'},
                          { text: 'fdisk', link: '/base/infrastructure/linux/commands/disks-and-mount/fdisk'},
                          { text: 'parted', link: '/base/infrastructure/linux/commands/disks-and-mount/parted'},
                          { text: 'mkfs', link: '/base/infrastructure/linux/commands/disks-and-mount/mkfs'},
                          { text: 'mount', link: '/base/infrastructure/linux/commands/disks-and-mount/mount'},
                          { text: 'umount', link: '/base/infrastructure/linux/commands/disks-and-mount/umount'},
                          { text: 'fsck', link: '/base/infrastructure/linux/commands/disks-and-mount/fsck'},
                          { text: 'blkid', link: '/base/infrastructure/linux/commands/disks-and-mount/blkid'},
                          { text: 'findmnt', link: '/base/infrastructure/linux/commands/disks-and-mount/findmnt'},
                          { text: 'swapon', link: '/base/infrastructure/linux/commands/disks-and-mount/swapon'},
                          { text: 'swapoff', link: '/base/infrastructure/linux/commands/disks-and-mount/swapoff'}
                        ]
                      },
                      { text: 'Архивы и сжатие',collapsed: true, link: '/base/infrastructure/linux/commands/archives-and-compression/',
                        items: [
                          { text: 'tar', link: '/base/infrastructure/linux/commands/archives-and-compression/tar'},
                          { text: 'gzip', link: '/base/infrastructure/linux/commands/archives-and-compression/gzip'},
                          { text: 'gunzip', link: '/base/infrastructure/linux/commands/archives-and-compression/gunzip'},
                          { text: 'bzip2', link: '/base/infrastructure/linux/commands/archives-and-compression/bzip2'},
                          { text: 'xz', link: '/base/infrastructure/linux/commands/archives-and-compression/xz'},
                          { text: 'zip', link: '/base/infrastructure/linux/commands/archives-and-compression/zip'},
                          { text: 'unzip', link: '/base/infrastructure/linux/commands/archives-and-compression/unzip'},
                          { text: '7z', link: '/base/infrastructure/linux/commands/archives-and-compression/7z'}
                        ]
                      },
                      { text: 'Сеть',collapsed: true, link: '/base/infrastructure/linux/commands/network/',
                        items: [
                          { text: 'ip', link: '/base/infrastructure/linux/commands/network/ip'},
                          { text: 'ss', link: '/base/infrastructure/linux/commands/network/ss'},
                          { text: 'ping', link: '/base/infrastructure/linux/commands/network/ping'},
                          { text: 'traceroute', link: '/base/infrastructure/linux/commands/network/traceroute'},
                          { text: 'dig', link: '/base/infrastructure/linux/commands/network/dig'},
                          { text: 'nslookup', link: '/base/infrastructure/linux/commands/network/nslookup'},
                          { text: 'host', link: '/base/infrastructure/linux/commands/network/host'},
                          { text: 'curl', link: '/base/infrastructure/linux/commands/network/curl'},
                          { text: 'wget', link: '/base/infrastructure/linux/commands/network/wget'},
                          { text: 'nc', link: '/base/infrastructure/linux/commands/network/nc'},
                          { text: 'nmap', link: '/base/infrastructure/linux/commands/network/nmap'},
                          { text: 'tcpdump', link: '/base/infrastructure/linux/commands/network/tcpdump'},
                          { text: 'mtr', link: '/base/infrastructure/linux/commands/network/mtr'}
                        ]
                      },
                      { text: 'Файрвол',collapsed: true, link: '/base/infrastructure/linux/commands/firewall/',
                        items: [
                          { text: 'iptables', link: '/base/infrastructure/linux/commands/firewall/iptables'},
                          { text: 'nftables', link: '/base/infrastructure/linux/commands/firewall/nftables'},
                          { text: 'ufw', link: '/base/infrastructure/linux/commands/firewall/ufw'},
                          { text: 'firewalld', link: '/base/infrastructure/linux/commands/firewall/firewalld'}
                        ]
                      },
                      { text: 'SSH',collapsed: true, link: '/base/infrastructure/linux/commands/ssh/',
                        items: [
                          { text: 'ssh', link: '/base/infrastructure/linux/commands/ssh/ssh'},
                          { text: 'ssh-keygen', link: '/base/infrastructure/linux/commands/ssh/ssh-keygen'},
                          { text: 'ssh-copy-id', link: '/base/infrastructure/linux/commands/ssh/ssh-copy-id'},
                          { text: 'ssh-agent', link: '/base/infrastructure/linux/commands/ssh/ssh-agent'},
                          { text: 'scp', link: '/base/infrastructure/linux/commands/ssh/scp'},
                          { text: 'rsync', link: '/base/infrastructure/linux/commands/ssh/rsync'}
                        ]
                      },
                      { text: 'Управление пакетами',collapsed: true, link: '/base/infrastructure/linux/commands/package-management/',
                        items: [
                          { text: 'Debian/Ubuntu',collapsed: true, link: '/base/infrastructure/linux/commands/package-management/debian-ubuntu/',
                            items: [
                              { text: 'apt', link: '/base/infrastructure/linux/commands/package-management/debian-ubuntu/apt'},
                              { text: 'apt-get', link: '/base/infrastructure/linux/commands/package-management/debian-ubuntu/apt-get'},
                              { text: 'apt-cache', link: '/base/infrastructure/linux/commands/package-management/debian-ubuntu/apt-cache'},
                              { text: 'dpkg', link: '/base/infrastructure/linux/commands/package-management/debian-ubuntu/dpkg'},
                              { text: 'snap', link: '/base/infrastructure/linux/commands/package-management/debian-ubuntu/snap'}
                            ]
                          },
                          { text: 'RHEL/Fedora',collapsed: true, link: '/base/infrastructure/linux/commands/package-management/rhel-fedora/',
                            items: [
                              { text: 'dnf', link: '/base/infrastructure/linux/commands/package-management/rhel-fedora/dnf'},
                              { text: 'yum', link: '/base/infrastructure/linux/commands/package-management/rhel-fedora/yum'},
                              { text: 'rpm', link: '/base/infrastructure/linux/commands/package-management/rhel-fedora/rpm'}
                            ]
                          }
                        ]
                      },
                      { text: 'Текстовые редакторы',collapsed: true, link: '/base/infrastructure/linux/commands/text-editors/',
                        items: [
                          { text: 'nano', link: '/base/infrastructure/linux/commands/text-editors/nano'},
                          { text: 'vim', link: '/base/infrastructure/linux/commands/text-editors/vim'}
                        ]
                      },
                      { text: 'Переменные окружения',collapsed: true, link: '/base/infrastructure/linux/commands/environment/',
                        items: [
                          { text: 'export', link: '/base/infrastructure/linux/commands/environment/export'},
                          { text: 'env', link: '/base/infrastructure/linux/commands/environment/env'},
                          { text: 'printenv', link: '/base/infrastructure/linux/commands/environment/printenv'},
                          { text: 'PATH', link: '/base/infrastructure/linux/commands/environment/path'},
                          { text: 'bashrc', link: '/base/infrastructure/linux/commands/environment/bashrc'}
                        ]
                      },
                      { text: 'systemd и службы',collapsed: true, link: '/base/infrastructure/linux/commands/systemd/',
                        items: [
                          { text: 'systemctl', link: '/base/infrastructure/linux/commands/systemd/systemctl'},
                          { text: 'journalctl', link: '/base/infrastructure/linux/commands/systemd/journalctl'},
                          { text: 'systemd-analyze', link: '/base/infrastructure/linux/commands/systemd/systemd-analyze'},
                          { text: 'hostnamectl', link: '/base/infrastructure/linux/commands/systemd/hostnamectl'},
                          { text: 'timedatectl', link: '/base/infrastructure/linux/commands/systemd/timedatectl'},
                          { text: 'localectl', link: '/base/infrastructure/linux/commands/systemd/localectl'}
                        ]
                      },
                      { text: 'Планирование задач',collapsed: true, link: '/base/infrastructure/linux/commands/cron-and-timers/',
                        items: [
                          { text: 'crontab', link: '/base/infrastructure/linux/commands/cron-and-timers/crontab'},
                          { text: 'systemd-timers', link: '/base/infrastructure/linux/commands/cron-and-timers/systemd-timers'}
                        ]
                      },
                      { text: 'Bash-скрипты',collapsed: true, link: '/base/infrastructure/linux/commands/bash-scripts/',
                        items: [
                          { text: 'shebang', link: '/base/infrastructure/linux/commands/bash-scripts/shebang'},
                          { text: 'Переменные', link: '/base/infrastructure/linux/commands/bash-scripts/variables'},
                          { text: 'Условия', link: '/base/infrastructure/linux/commands/bash-scripts/conditions'},
                          { text: 'Циклы', link: '/base/infrastructure/linux/commands/bash-scripts/loops'},
                          { text: 'Функции', link: '/base/infrastructure/linux/commands/bash-scripts/functions'},
                          { text: 'Аргументы', link: '/base/infrastructure/linux/commands/bash-scripts/arguments'}
                        ]
                      },
                      { text: 'Терминальные мультиплексоры',collapsed: true, link: '/base/infrastructure/linux/commands/terminal-multiplexers/',
                        items: [
                          { text: 'tmux', link: '/base/infrastructure/linux/commands/terminal-multiplexers/tmux'},
                          { text: 'screen', link: '/base/infrastructure/linux/commands/terminal-multiplexers/screen'}
                        ]
                      },
                      { text: 'Планировщики задач (at/batch)',collapsed: true, link: '/base/infrastructure/linux/commands/scheduling/',
                        items: [
                          { text: 'at', link: '/base/infrastructure/linux/commands/scheduling/at'},
                          { text: 'batch', link: '/base/infrastructure/linux/commands/scheduling/batch'}
                        ]
                      },
                      { text: 'Автоматизация',collapsed: true, link: '/base/infrastructure/linux/commands/automation/',
                        items: [
                          { text: 'expect', link: '/base/infrastructure/linux/commands/automation/expect'},
                          { text: 'chroot', link: '/base/infrastructure/linux/commands/automation/chroot'}
                        ]
                      },
                      { text: 'Сборка',collapsed: true, link: '/base/infrastructure/linux/commands/build-tools/',
                        items: [
                          { text: 'make', link: '/base/infrastructure/linux/commands/build-tools/make'}
                        ]
                      },
                      { text: 'Диагностика',collapsed: true, link: '/base/infrastructure/linux/commands/diagnostics/',
                        items: [
                          { text: 'strace', link: '/base/infrastructure/linux/commands/diagnostics/strace'},
                          { text: 'ltrace', link: '/base/infrastructure/linux/commands/diagnostics/ltrace'},
                          { text: 'lsof', link: '/base/infrastructure/linux/commands/diagnostics/lsof'},
                          { text: 'sar', link: '/base/infrastructure/linux/commands/diagnostics/sar'}
                        ]
                      },
                      { text: 'Справка и документация',collapsed: true, link: '/base/infrastructure/linux/commands/reference/',
                        items: [
                          { text: 'man', link: '/base/infrastructure/linux/commands/reference/man'},
                          { text: 'info', link: '/base/infrastructure/linux/commands/reference/info'},
                          { text: 'apropos', link: '/base/infrastructure/linux/commands/reference/apropos'},
                          { text: 'whatis', link: '/base/infrastructure/linux/commands/reference/whatis'},
                          { text: 'tldr', link: '/base/infrastructure/linux/commands/reference/tldr'}
                        ]
                      }
                    ]
                  },
                ]
              },
              { text: 'Docker',collapsed: true, link: '/base/infrastructure/docker/',
                items: [
                  { text: 'docker compose',collapsed: true, link: '/base/infrastructure/docker/docker-compose/',
                    items: [
                      { text: 'compose.yaml', link: '/base/infrastructure/docker/docker-compose/compose-yaml',}
                    ]
                  }
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
