# Green Api

Тестовое задание разработать пользовательский интерфейс для
отправки и получений сообщений WhatsApp. Параметры доступа к аккаунта сохраняются в localStorage, история переписки сохраняется только во время текущего сеанса.

Ожидаемый результат:
- Пользователь переходит на сайт чата и вводит свои учетные данные из
системы GREEN-API (idInstance, apiTokenInstance)
- Пользователь вводит номер телефона получателя и создает новый чат
- Пользователь пишет текстовое сообщение и отправляет его получателю в
WhatsApp
- Получатель отвечает на сообщение в мессенджере WhatsApp
- Пользователь видит ответ получателя в чате

[vercel deploy](https://green-n0dg9o4zl-egorovartem34.vercel.app/)


## Использованные технологии
- React
- TypeScript
- Redux-toolkit
- scss
- React-router-dom
- react-toastify
- classnames
- formik, yup
- Vite


## Установка
1. Склонируйте репозиторий `git clone https://github.com/EgorovArtem34/green-api`
2. Перейдите в директорию проекта `cd green-api`
3. Установите зависимости `make install`
5. Запустите локальную версию `make start`
6. Нажмите на кнопку `h` для показа настроек
  ```press r to restart the server
  press u to show server url
  press o to open in browser
  press c to clear console
  press q to quit
  ```
7. Для выполнения запросов HTTP API WhatsApp требуется использовать параметры доступа к Аккаунту. Параметры доступа публикуются в Личном кабинете `https://green-api.com/docs/before-start/#cabinet`

## Скриншоты

![](https://raw.githubusercontent.com/EgorovArtem34/screenshots/master/green-api/1.JPG)
![](https://raw.githubusercontent.com/EgorovArtem34/screenshots/master/green-api/2.JPG)
![](https://raw.githubusercontent.com/EgorovArtem34/screenshots/master/green-api/3.JPG)


