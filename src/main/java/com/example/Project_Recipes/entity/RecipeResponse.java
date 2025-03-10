package com.example.Project_Recipes.entity;

import java.util.List;

public class RecipeResponse {
    private List<Recipe> recipes;

    public RecipeResponse() {}

    public RecipeResponse(List<Recipe> recipes) {
        this.recipes = recipes;
    }

    public List<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<Recipe> recipes) {
        this.recipes = recipes;
    }
}
