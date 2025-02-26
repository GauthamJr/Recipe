# Building the Frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app

# Installing the dependencies
COPY src/main/resources/static/Recipe-Frontend/package.json src/main/resources/static/Recipe-Frontend/package-lock.json ./
RUN npm install

COPY src/main/resources/static/Recipe-Frontend ./

# Build the frontend part
RUN npm run build

# Building the Backend
FROM maven:3.8.8-eclipse-temurin-17-alpine AS backend-build

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

# Run Both Frontend and the Backend
FROM openjdk:17-alpine

WORKDIR /app

COPY --from=backend-build /app/target/*.jar app.jar

COPY --from=frontend-build /app/dist /frontend

# Expose the ports for backend i.e 8080 and frontend i.e 3000
EXPOSE 8080 3000

RUN apk add --no-cache nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Starting both frontend and the backend
CMD ["sh", "-c", "nginx && java -jar app.jar"]
