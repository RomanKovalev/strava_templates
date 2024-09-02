FROM node:20.16.0 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG BACKEND_API_URL
ENV BACKEND_API_URL=${BACKEND_API_URL}

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]