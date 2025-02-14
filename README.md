Recipe Finder 

In this Recipe Finder Application the is a web-based app that allows users to search for recipes using an autocomplete feature. Users can enter at least three characters to fetch matching recipes, view a dropdown list, and navigate to a detailed recipe page.

* The Technologies used here are  

Frontend: React.js (for UI rendering and interactivity), CSS (for styling) React Router (for navigation) 
 
Backend: Spring Boot (for REST API), H2 Database (for storing recipe data), Java (for backend logic) 

* This is the Project structure of the Backend part 

PROJECT\SRC\MAIN\JAVA\COM\EXAMPLE\PROJECT_RECIPES 

|   
|   
| 
AppConfig.java 
ProjectRecipesApplication.java 
+---config 
|       
| 
WebConfig.java 
+---controller 
|       
| 
RecipeController.java 
+---entity 
|       
|       
| 
Recipe.java 
RecipeResponse.java 
+---exception 
|       
| 
GlobalExceptionHandler.java 
+---repository 
|       
| 
RecipeRepository.java 
\---service------RecipeService.java 

Entity Layer → Represents a table in the database and uses JPA for ORM (Object-Relational Mapping) to map 
Java objects to database records. 

Repository Layer → Handles database operations (CRUD: Create, Read, Update, Delete) and extends 
JpaRepository, interacting with the database using Spring Data JPA. 

Service Layer → Contains business logic, calls the Repository Layer to store/retrieve data, and acts as a bridge 
between Controller and Repository. 

Controller Layer → Exposes APIs like (@GetMapping, @PostMapping, @PutMapping, @DeleteMapping) and calls 
the Service Layer to process requests. 

Exception Handling → Handles errors gracefully and prevents exposing raw exceptions to the client. 
Configuration Layer → Stores custom application settings and is used for defining Beans, CORS policies, and 
Security settings. 

* This is the Project structure of the Frontend part 

Project\src\main\resources\static\Recipe-Frontend\src 
+---src 
| -  App.jsx 
| 
| -  Index.css 
| 
| -  Main.jsx 
| 
| -  RecipeController.java 
| 
| -  RecipeDetails.jsx 
| 
| -  SearchBar.jsx 

App.jsx → Main Application Component Acts as the root component of the React app and renders the SearchBar 
component and a grid of recipe images and uses react-router-dom for navigation.  

main.jsx → Application Entry Point Initializes and renders the React application configures react-router-dom for 
handling navigation and mounts the App.jsx component to the HTML root element.
  
RecipeDetails.jsx → Recipe Details Page Fetches recipe details from the backend using useEffect() and displays 
recipe information like name, image, cuisine, ingredients, and instructions uses useParams() from react-router
dom to extract the recipe ID from the URL.  

SearchBar.jsx → Autocomplete Search Component Contains an input field for searching recipes Implements a 
autocomplete feature calls the backend API when at least 3 characters are entered displays matching recipes in 
a dropdown list on selection, navigate to the RecipeDetails.jsx page.  

index.css → Styling Contains styles for UI components, including Layout and positioning, Search bar and 
dropdown menu and Recipe details page styles. 
 
* In the Backend

All the data has been stored in the H2 Database 

Endpoints are tested using the Postman 
 
The complete data stored in the H2 Database http://localhost:8080/h2-console

once you enter this link you can Run this query to load all the data that is present in the H2-Database -> Select * from RECIPE 

Method: POST 
Now when you load up the loadRecipes Endpoint: http://localhost:8080/api/recipes/load 
Expected Response: You should receive a response with a 200 OK status and a message saying "Recipes loaded 
successfully!". 
 
 
Method: GET 
Test the getRecipeById Endpoint: http://localhost:8080/api/recipes/{id} 
Expected Response: You should receive a response with a 200 OK status and the recipe details. 
 
Method: POST 
Test the createRecipe Endpoint: http://localhost:8080/api/recipes 
Headers: 
Key: Content-Type 
Value: application/json 
Body: 
Json 
{ 
    "name": "Masala Dosa", 
    "ingredients": ["Rice Batter", "Sambar"], 
    "instructions": ["Make the pan hot and grease some oil on the pan", "Pour some amount of batter in circular 
form"], 
    "prepTimeMinutes": 15, 
    "cookTimeMinutes": 25, 
    "servings": 3, 
    "difficulty": "Medium", 
    "cuisine": "Indian", 
    "caloriesPerServing": 300, 
    "rating": 5.0, 
    "reviewCount": 15, 
"image": "https://cdn.dummyjson.com/recipe-images/1.webp", 
"tags": ["tag1", "tag2"], 
"mealType": ["BreakFast", "Dinner"] 
} 

Expected Response: You should receive a response with a 201 Created status and the details of the newly 
created recipe. 

Method: DELETE 
Test the deleteRecipe Endpoint: http://localhost:8080/api/{id}
 
* How to Run the Application 
 
Navigate to the frontend project folder and Install dependencies 

npm install  

Start the React application: npm run dev 

Backend Setup Clone the repository. Navigate to the backend project folder and run the backend application 
using:
  
mvn clean install
mvn spring-boot:run
 
The Application will start at http://localhost:8080 and you will be able to see the Frontend UI. 
