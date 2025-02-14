package com.example.Project_Recipes;

import com.example.Project_Recipes.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Autowired
    private RecipeService recipeService;

    @Bean
    public ApplicationRunner applicationRunner(){
        return args -> {
            recipeService.fetchAndSaveRecipes();
        };
    }
}
