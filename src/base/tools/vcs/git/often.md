# Часто используемые команды

```bash
echo '.idea/' >> ~/.gitignore
git config --global user.name ""
git config --global user.email 
git config --global init.defaultBranch main

git config --list
git init
git status
git add file
git restore test2 # Отменить изменения файла
git restore --staged test2 # Убрать из индекса, но оставить изменения, когда по ошибке был добавлен в индекс
git diff --cached # Что пойдет в коммит
git commit -m "change text for file"
git log # Смотрим историю
git log --oneline # Смотрим историю
git diff test2 # Что поменялось с версии репозитория
git reflog # История HEAD
git commit --amend -m "change text for file fix to" # Название коммита только для локальных коммитов
git show 3e33f4f # Инфо
git branch -a # Все ветки
git switch -c new_branch # Новая ветка
git checkout main # Переключение
git merge new_branch2 ## ff мерж
git branch -d new_branch2 ## Удаление ветки
# конфликт
# Правим одну и ту же строчку, мержим
# git add 
git remote -v # Подключенные репозотории
git push origin main 
git pull origin main
git merge --no-ff # Если не удалось
git reset --soft 5e4c7eb78b60fb5a442209343ef325686c59402d # Убрать коммит но оставить изменения в индексе
git reset --mixed 5e4c7eb78b60fb5a442209343ef325686c59402d # Сброс индекса
git reset --hard 5e4c7eb78b60fb5a442209343ef325686c59402d # Уничтожить изменения
git checkout db74445bb8b370e2d88859f75ed731d0bb69a2d5 # Прыгнуть на коммит
git switch main # Обратно на main
git revert b55a0300abece4db85ec152e00d7f736d39d2957 # Отменить коммит новым коммитом
```