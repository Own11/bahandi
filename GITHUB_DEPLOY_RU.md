# Bahandisation: что загрузить в GitHub

Есть два варианта.

## Вариант 1. Полная версия с Roboflow

Используй архив `BAHANDISATION_FULL_NODE_GITHUB_*.zip`.

Это правильный вариант, если тебе нужен настоящий AI-анализ фото через Roboflow.

Загрузи в GitHub содержимое архива:

- `public/`
- `services/`
- `server.js`
- `package.json`
- `README.md`
- `.env.example`
- `.gitignore`
- `GITHUB_DEPLOY_RU.md`

Не загружай:

- `.env`
- `data/`
- `node_modules/`
- API key

После GitHub деплой проект на Render или Railway.

Настройки Render/Railway:

```text
Build command: npm install
Start command: npm start
Environment variable: ROBOFLOW_API_KEY=твой_ключ_в_панели_хостинга
```

Важно: GitHub сам по себе не запускает Node backend. GitHub хранит код, а Render/Railway запускает сайт.

## Вариант 2. GitHub Pages demo

Используй архив `BAHANDISATION_GITHUB_PAGES_DEMO_*.zip`.

Этот вариант откроется прямо на GitHub Pages, но без настоящего Roboflow, потому что GitHub Pages не умеет запускать backend и безопасно хранить API key.

Загружай файлы из архива прямо в корень репозитория:

```text
index.html
app.js
styles.css
mock-api.js
404.html
.nojekyll
README_GITHUB_PAGES_RU.md
```

В GitHub:

1. Открой `Settings`.
2. Открой `Pages`.
3. Source: `Deploy from a branch`.
4. Branch: `main`.
5. Folder: `/root`.
6. Нажми `Save`.

Если снова 404, значит `index.html` лежит не в корне репозитория.

## Что выбрать

Для защиты и демонстрации интерфейса: GitHub Pages demo.

Для настоящей работы с AI и загрузкой фото в Roboflow: полная Node-версия через Render/Railway.
