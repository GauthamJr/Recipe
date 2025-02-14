package com.example.Project_Recipes.repository;

import com.example.Project_Recipes.entity.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    @Query("SELECT r FROM Recipe r WHERE LOWER(r.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(r.cuisine) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Recipe> searchByNameOrCuisine(@Param("query") String query, Pageable pageable);
}
