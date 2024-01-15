# Etapa de construcción
FROM node:21 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa de producción
FROM nginx:stable-alpine as production-stage

COPY default.conf /etc/nginx/default.conf
COPY --from=build-stage /app/dist/test/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]