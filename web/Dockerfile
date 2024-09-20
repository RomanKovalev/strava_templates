FROM node:20.16.0 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG VITE_BACKEND_API_URL
ENV VITE_BACKEND_API_URL=${VITE_BACKEND_API_URL}

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist/ /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]