Объяснение каждого теста
1. getExistingEnvVariable (строка 28)
   Что тестирует: Базовый случай — получение переменной окружения, которая существует.
2. getEnvVariableWithDefault (строка 39)
   Что тестирует: Получение несуществующей переменной с переданным значением по умолчанию.
3. getNonExistentEnvVariableThrowsException (строка 47)
   Что тестирует: Выбрасывание исключения RuntimeException при запросе несуществующей переменной без дефолта.
4. getEnvVariableWithEmptyStringDefault (строка 56)
   Что тестирует: Пустая строка '' как дефолтное значение работает корректно.
5. getEnvVariableWithNullDefaultThrowsException (строка 64)
   Что тестирует: Передача null в качестве дефолта приводит к исключению (особенность реализации — null не используется как fallback).
6. getEnvVariableSetWithoutValue (строка 73)
   Что тестирует: Переменная установлена без значения (VAR=). Важно: в PHP putenv('VAR') возвращает false, а putenv('VAR=') возвращает пустую строку.
7. getEnvVariableWithSpecialCharacters (строка 84)
   Что тестирует: Экранирование специальных символов shell: ", $,  ` , !, #, %.
8. getEnvVariableWithUnicode (строка 95)
   Что тестирует: Корректная работа с русскими буквами и эмодзи.
9. getEnvVariableWithNumericValue (строка 106)
   Что тестирует: Числовые значения (они возвращаются как строки).
10. getEnvVariableWithLeadingTrailingSpaces (строка 117)
    Что тестирует: Пробелы в начале/конце не обрезаются автоматически.
11. getEnvVariableWithEqualsSign (строка 128)
    Что тестирует: Значение может содержать знак = (важно для API ключей типа key=value).
12. getEnvVariableWithNewline (строка 139)
    Что тестирует: Многострочные значения сохраняются корректно.
13. getCaseSensitiveEnvVariable (строка 150)
    Что тестирует: Переменные окружения регистрозависимы (VAR ≠ var).
14. getEnvVariableAfterMultiplePuts (строка 165)
    Что тестирует: Повторный вызов putenv с новым значением корректно обновляет значение.
15. getEmptyEnvVariable (строка 179)
    Что тестирует: Пустое значение переменной (VAR=) возвращает пустую строку.