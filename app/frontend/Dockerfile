# Handle build in dockerfile
FROM node:18-alpine3.14 AS build
COPY . /src
WORKDIR /src
RUN npm install && npm run build


FROM httpd:2.4
COPY --from=build /src/dist/frontend/ /usr/local/apache2/htdocs/
