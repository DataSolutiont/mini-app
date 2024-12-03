# Используем официальный образ Node.js для сборки приложения
FROM node:16 AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Собираем приложение
RUN npm run build --prod

# Используем легкий сервер для обслуживания статических файлов
FROM nginx:alpine

# Копируем собранное приложение в директорию nginx
COPY --from=builder /app/dist/Angular13JwtAuth /usr/share/nginx/html

# Указываем порт, который будет слушать nginx
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
