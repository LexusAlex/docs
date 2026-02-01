# Права и привилегии

## SHOW GRANTS

На момент установки чистого сервера у нас есть пользовать `root`, посмотрим на его права

`SHOW GRANTS` возвращает привилегии конкретного пользователя

Команды, вернут права текущего подключенного к серверу пользователя

````sql
SHOW GRANTS;
SHOW GRANTS FOR CURRENT_USER;
SHOW GRANTS FOR CURRENT_USER();
SHOW GRANTS FOR 'root'@'localhost';     
````

````sql
SHOW GRANTS FOR 'root'@'localhost';
+----------------------------------------------------------------------------------------------------------------------------------------+
| Grants for root@localhost                                                                                                              |
+----------------------------------------------------------------------------------------------------------------------------------------+
| GRANT ALL PRIVILEGES ON *.* TO `root`@`localhost` IDENTIFIED BY PASSWORD '*5065BFDD3E41929B5445690E0916B14B5D2E920B' WITH GRANT OPTION |
| GRANT PROXY ON ''@'%' TO 'root'@'localhost' WITH GRANT OPTION                                                                          |
+----------------------------------------------------------------------------------------------------------------------------------------+
````

Разберем вывод по частям: 

- `GRANT ALL PRIVILEGES` - означает, что пользователю предоставлены все права
- `ON *.*` - указывает область на которые предоставляются права 
  - `*` - все базы данных
  - `.*` - все таблицы внутри всех баз данных
- `TO root@localhost` - кому предоставляются права
- `IDENTIFIED BY PASSWORD '*5065BFDD3E41929B5445690E0916B14B5D2E920B'` - пользователю установлен пароль
- `WITH GRANT OPTION` - пользователь может раздавать права другом пользователям
- `GRANT PROXY ON ''@'%' TO 'root'@'localhost' WITH GRANT OPTION` - эта команда позволяет выдавать себя за другого пользователя

## Уровни привилегий

Привилегии могут быть установлены:

- Глобально для всей базы данных
- Для таблицы
- Для отдельного столбца таблицы

К тому же определенные привилегии могут быть установлены только на определенных уровнях

### Глобальные

Предоставляются с помощью `*.*`. Применяются ко всем базам данных глобально

Контекст `Server`

- `BINLOG ADMIN`
- `BINLOG MONITOR`
- `BINLOG REPLAY`
- `CONNECTION ADMIN`
- `CREATE USER` - Создание пользователя
- `FEDERATED ADMIN`
- `FILE`
- `GRANT OPTION`
- `PROCESS`
- `READ_ONLY ADMIN`
- `RELOAD`
- `REPLICATION CLIENT`
- `REPLICATION MASTER ADMIN`
- `REPLICA MONITOR`
- `REPLICATION REPLICA`
- `REPLICATION SLAVE`
- `REPLICATION SLAVE ADMIN`
- `SET USER`
- `SHOW DATABASES`
- `SHUTDOWN`
- `SUPER`

### База данных

Предоставляются с помощью `db_name.*`. Они предоставляются на уровне базы данных

- `CREATE`
- `CREATE ROUTINE`
- `CREATE TEMPORARY TABLES`
- `DROP`
- `EVENT`
- `GRANT OPTION`
- `LOCK TABLES`
- `SHOW CREATE ROUTINE`

### Таблица

Предоставляются с помощью `db_name.tbl_name`

- `ALTER`
- `CREATE`
- `CREATE VIEW`
- `DELETE`
- `DELETE HISTORY`
- `DROP`
- `GRANT OPTION`
- `INDEX`
- `INSERT`
- `REFERENCES`
- `SELECT`
- `SHOW VIEW`
- `TRIGGER`
- `UPDATE`

### Столбец

Точечная настройка управление столбцами таблицы.

Пример 

````sql
GRANT SELECT (name, position) ON Employee TO 'jeffrey'@'localhost';
````

Какие права есть:

- `INSERT (column_list)`
- `REFERENCES (column_list)`
- `SELECT (column_list)`
- `UPDATE (column_list)`

### Функции и процедуры


Посмотрим какие привилегиии есть и на каких уровнях они срабатывают с помощью команды `SHOW PRIVILEGES`

````text
+------------------------+-------------------------------------+------------------------------------------------------------------+
|Privilege               |Context                              |Comment                                                           |
+------------------------+-------------------------------------+------------------------------------------------------------------+
|Alter                   |Tables                               |To alter the table                                                |
|Alter routine           |Functions,Procedures                 |To alter or drop stored functions/procedures                      |
|Create                  |Databases,Tables,Indexes             |To create new databases and tables                                |
|Create routine          |Databases                            |To use CREATE FUNCTION/PROCEDURE                                  |
|Create temporary tables |Databases                            |To use CREATE TEMPORARY TABLE                                     |
|Create view             |Tables                               |To create new views                                               |
|Create user             |Server Admin                         |To create new users                                               |
|Delete                  |Tables                               |To delete existing rows                                           |
|Delete history          |Tables                               |To delete versioning table historical rows                        |
|Drop                    |Databases,Tables                     |To drop databases, tables, and views                              |
|Event                   |Server Admin                         |To create, alter, drop and execute events                         |
|Execute                 |Functions,Procedures                 |To execute stored routines                                        |
|File                    |File access on server                |To read and write files on the server                             |
|Grant option            |Databases,Tables,Functions,Procedures|To give to other users those privileges you possess               |
|Index                   |Tables                               |To create or drop indexes                                         |
|Insert                  |Tables                               |To insert data into tables                                        |
|Lock tables             |Databases                            |To use LOCK TABLES (together with SELECT privilege)               |
|Process                 |Server Admin                         |To view the plain text of currently executing queries             |
|Proxy                   |Server Admin                         |To make proxy user possible                                       |
|References              |Databases,Tables                     |To have references on tables                                      |
|Reload                  |Server Admin                         |To reload or refresh tables, logs and privileges                  |
|Binlog admin            |Server                               |To purge binary logs                                              |
|Binlog monitor          |Server                               |To use SHOW BINLOG STATUS and SHOW BINARY LOG                     |
|Binlog replay           |Server                               |To use BINLOG (generated by mariadb-binlog)                       |
|Replication master admin|Server                               |To monitor connected slaves                                       |
|Replication slave admin |Server                               |To start/stop slave and apply binlog events                       |
|Slave monitor           |Server                               |To use SHOW SLAVE STATUS and SHOW RELAYLOG EVENTS                 |
|Replication slave       |Server Admin                         |To read binary log events from the master                         |
|Select                  |Tables                               |To retrieve rows from table                                       |
|Show databases          |Server Admin                         |To see all databases with SHOW DATABASES                          |
|Show view               |Tables                               |To see views with SHOW CREATE VIEW                                |
|Shutdown                |Server Admin                         |To shut down the server                                           |
|Super                   |Server Admin                         |To set few server variables                                       |
|Trigger                 |Tables                               |To use triggers                                                   |
|Create tablespace       |Server Admin                         |To create/alter/drop tablespaces                                  |
|Update                  |Tables                               |To update existing rows                                           |
|Set user                |Server                               |To create views and stored routines with a different definer      |
|Federated admin         |Server                               |To execute the CREATE SERVER, ALTER SERVER, DROP SERVER statements|
|Connection admin        |Server                               |To bypass connection limits and kill other users' connections     |
|Read_only admin         |Server                               |To perform write operations even if @@read_only=ON                |
|Usage                   |Server Admin                         |No privileges - allow connect only                                |
|Show Create Routine     |Databases,Functions,Procedures       |To allow SHOW CREATE PROCEDURE/FUNCTION/PACKAGE                   |
+------------------------+-------------------------------------+------------------------------------------------------------------+
````

Создадим пользователя без прав и проверим его права

````sql
CREATE USER 'test48'@'192.168.88.252' IDENTIFIED BY 'test48';
SHOW GRANTS FOR 'test48'@'192.168.88.252';
-- GRANT USAGE ON *.* TO `test48`@`192.168.88.252` IDENTIFIED BY PASSWORD '*D9FCD02340258670108950AA78E15E7240AF8E43'    
````

`USAGE` это не привилегия, а возможность подключаться к серверу, ее нельзя отозвать или удалить

`ALL PRIVILEGES` - предоставляет все привилегии на заданном уровне

`WITH GRANT OPTION` - дает возможность давать привилегии другим пользователям, но они могут предоставлять только те привилегии которые у них самих есть. `GRANT OPTION` не может быть установлена для отдельных столбцов, только для всей таблицы

## GRANT

### Особенности

- Чтобы использовать `GRANT`, у пользователя должны быть привилегии `GRANT OPTION` и те привилегии которые он предоставляет.
- Конструкция `GRANT` так же позволяет неявно создавать учетный записи, если такого пользователя нет, если команда `SHOW VARIABLES LIKE '%sql_mode%' ;` выдает `NO_AUTO_CREATE_USER`, значит что пользователь не будет создан автоматически 

Попробуем добавить права на пользователя которого нет

````sql
GRANT ALL PRIVILEGES ON *.* TO 'reks'@'192.168.88.252';
ERROR 1133 (28000): Can't find any matching row in the user table
````




SHOW GRANTS FOR 'root'@'192.168.88.252';
+---------------------------------------------------------------------------------------------------------------------------+
| Grants for root@192.168.88.252                                                                                            |
+---------------------------------------------------------------------------------------------------------------------------+
| GRANT ALL PRIVILEGES ON *.* TO `root`@`192.168.88.252` IDENTIFIED BY PASSWORD '*72EA7A3B37C7CF2067FD7ACD7FF596E05B9A9242' |
+---------------------------------------------------------------------------------------------------------------------------+