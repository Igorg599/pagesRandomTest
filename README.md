Реализованное Тестовое задание.

Описание задания:
Необходимо реализовать приложение "каталог изображений". Приложение состоит из 1 страницы на которой находятся следующие элементы:

-Текстовое поле ввода тега
-Кнопка "Загрузить"
-Кнопка "Очистить"
-Кнопка "Группировать" / "Разгруппировать"
-Список изображений


Доступные действия пользователя:
1. Заполнение поля тега
2. Нажатие на кнопку "Загрузить". Если поле ввода тега пустое - отображается всплывающее уведомление "заполните поле 'тег'",
иначе происходит http запрос к api giphy (описание api ниже), на время загрузки кнопка блокируется, а текст меняется на "Загрузка...".
Затем происходит одно из следующего:
Если по тегу ничего не найдено — отображается всплывающее уведомление 'По тегу ничего не найдено'",
Если произошла http ошибка — отображается всплывающее уведомление 'Произошла http ошибки'"
При успешном получении данных изображения — добавляется изображение в список изображений
3. При нажатии на кнопку "Очистить" — поле ввода тега и список изображений очищается
4. При нажатии на кнопку "Группировать" — изображения группируются по тегу, тег пишется как заголовок над группой. Текст кнопки меняется на "Разгруппировать"
5. При нажатии на кнопку "Разгруппировать" — изображения отображаются друг за другом по очерёдности загрузки. Текст кнопки меняется на "Группировать"
6. При нажатии на изображение поле ввода тега заполняется тегом, по которому искалось изображение
7. При вводе значений через запятую (“cat, dog”) считается что мы указали составной тэг. Для составного тэга параллельно выполняются запросы к api на получение каждого элемента составного тэга. В нашем примере это 2 запроса: https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}C&tag=cat и https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}C&tag=dog. После завершения всех запросов в галерею добавляется составная картинка, состоящая из совокупности результатов каждого запроса.
8. Ввод любых символов в поле кроме букв латинского алфавита и “,” запрещен
9. При указании значения “delay” выполняются запросы с рандомным тегом (не более 10 символов), между запросами задержка в 5 секунд
Начальное состояние приложения: Поле ввода тега пустое, список изображений пуст, группировка не применена

Api giphy

Запрос на получение изображения - GET https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}C&tag=${TAG}
Пример: https://api.giphy.com/v1/gifs/random?api_key=gTJAO48YcpmrADUyo4opy4ES4g7iDBxx&tag=cat
В теле ответа возвращается JSON с полем image_url, который следует дальше использовать для отображения (из json ответа ниже удалены прочие поля).
Возможет дубликат image_url т.к. происходит запрос на случайное изображение, как-либо специально обрабатывать этот случай не надо.

{
   "data":{
      "image_url":"https://media3.giphy.com/media/gkncW2jPvchwc/giphy.gif"
   }
}
При запросе тега, по которому нет изображений в поле data вернется пустой массив т.е:
GET https://api.giphy.com/v1/gifs/random?api_key=gTJAO48YcpmrADUyo4opy4ES4g7iDBxx&tag=123cat123

{"data":[]}
Как API key в запросе можно использовать gTJAO48YcpmrADUyo4opy4ES4g7iDBxx .
Иногда запросы к API по этому ключу происходят слишком часто и сервис возвращает 429 http код (too many requests). Чтобы обойти ошибку можно сгенерить свой ключ на сайте (требуется регистрация) После регистрации:

перейти в dashboard, в нем выбрать create app
нажать create app, заполнить поля произвольными данными и выбрать галочку "I only want to use GIPHY API"
Нажать create new app
скопировать api ключ
Технические требования
Обязательно: использование Angular или React в качестве фреймворка.
Обязательно: использование Typescript.
Обязательно: при вводе npm start в корне репозитория должен запускаться dev сервер.
Желательно: использование CSS-препроцессоров.
Критерии оценки
Задание оценивается по двум критериям - законченность и качество кода. По верстке требуется минимальное оформление как в скриншотах примера реализации (в них используется bootstrap без модификаций).

Скриншоты примера реализации
https://drive.google.com/drive/folders/1odmfGF6KbSj_pRakc2ieWp5CX65z49S6?usp=sharing