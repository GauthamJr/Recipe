# Here we are building the React frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app

# Here we are installing all the frontend dependencies i.e Tailwind CSS, Vite, Axios....
COPY src/main/resources/static/Recipe-Frontend/package.json src/main/resources/static/Recipe-Frontend/package-lock.json ./
RUN npm install

COPY src/main/resources/static/Recipe-Frontend ./

# Here we are building the React application
FROM maven:3.8.8-eclipse-temurin-17-alpine AS backend-build

WORKDIR /app

COPY . .

# Here we are building the Spring Boot application
RUN mvn clean package -DskipTests


# Running both Frontend and the Backend
FROM openjdk:17-alpine

WORKDIR /app

COPY --from=backend-build /app/target/*.jar app.jar

COPY --from=frontend-build /app /app/src/main/resources/static

# Here we are exposing the port 8080 for the Spring Boot app
EXPOSE 8080

# Here we are running the application
CMD ["java", "-jar", "app.jar"]
