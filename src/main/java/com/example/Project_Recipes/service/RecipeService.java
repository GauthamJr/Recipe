package com.example.Project_Recipes.service;

import com.example.Project_Recipes.entity.Recipe;
import com.example.Project_Recipes.entity.RecipeResponse;
import com.example.Project_Recipes.repository.RecipeRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {
    private static final Logger logger = LoggerFactory.getLogger(RecipeService.class);

    @Autowired
    private RecipeRepository recipeRepository;

    @Transactional
    public void fetchAndSaveRecipes() {
        RestTemplate restTemplate = new RestTemplate();
        try {
            RecipeResponse response = restTemplate.getForObject("https://dummyjson.com/recipes", RecipeResponse.class);
            if (response != null && response.getRecipes() != null) {
                List<Recipe> recipes = response.getRecipes();
                logger.info("Number of recipes fetched: {}", recipes.size());
                recipeRepository.deleteAll();
                recipes.forEach(recipe -> recipe.setId(null));
                recipeRepository.saveAll(recipes);
                logger.info("Number of recipes saved: {}", recipeRepository.count());
            } else {
                logger.warn("No recipes found in response");
            }
        } catch (Exception e) {
            logger.error("Failed to fetch and save recipes", e);
            throw new RuntimeException("Failed to fetch and save recipes", e);
        }
    }

    @Transactional
    public Recipe saveRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    @Transactional
    public Recipe updateRecipe(Long id, Recipe recipe) {
        recipe.setId(id);
        return recipeRepository.save(recipe);
    }

    @Transactional
    public void deleteRecipe(Long id) {
        recipeRepository.deleteById(id);
    }

    public Page<Recipe> searchRecipes(String query, Pageable pageable) {
        return recipeRepository.searchByNameOrCuisine(query, pageable);
    }

    public Page<Recipe> getAllRecipes(Pageable pageable) {
        return recipeRepository.findAll(pageable);
    }

    public Optional<Recipe> getRecipeById(Long id) {
        return recipeRepository.findById(id);
    }
}
