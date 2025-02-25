import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import RecipeCalculator from './RecipeCalculator';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [wantCook, setWantCook] = useState([]);

  useEffect(() => {
    const recipeData = async () => {
      const data = await fetchData('recipe.json');

      setRecipes(data);
    };
    recipeData();
  }, []);

  const fetchData = async api => {
    const res = await fetch(api);
    const data = await res.json();

    return data;
  };

  const addWantCook = cookRecipe => {
    let isAlreadyAdded = false;

    wantCook.map(wC => {
      wC.recipe_id === cookRecipe.recipe_id && (isAlreadyAdded = true);
    });

    isAlreadyAdded
      ? alert('This item is already added!')
      : setWantCook([...wantCook, cookRecipe]);
  };

  const removeCook = cookId => {
    const newWantCook = wantCook.filter(wC => wC.recipe_id !== cookId);
    setWantCook(newWantCook);
  };

  return (
    <section className="py-[100px]">
      <h1 className="text-[#150B2B] text-[40px] leading-[50px] text-center">
        Our Recipes
      </h1>
      <p className="text-center pt-6 pb-12 w-[80%] max-w-[823px] mx-auto">
        Experience the finest flavors with fresh ingredients, expertly crafted
        dishes, and a cozy ambiance. Savor every bite at your favorite dining
        destination.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[6fr,_4fr] gap-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recipes.map(rc => (
            <Recipe key={rc.recipe_id} recipe={rc} addWantCook={addWantCook} />
          ))}
        </div>

        <RecipeCalculator wantCook={wantCook} removeCook={removeCook} />
      </div>
    </section>
  );
};

export default Recipes;
