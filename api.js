const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
 
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching your Recipes......!</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

    const response = await data.json();

    recipeContainer.innerHTML = "";

    response.meals.forEach((meal)=>{
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");

        recipeDiv.innerHTML = `
            <img src = "${meal.strMealThumb}">
            <h2>${meal.strMeal}</h2>
            <p>This Dish found in <span>${meal.strArea}</span></p>
            <p>Category: <span>${meal.strCategory}</span></p>
        `
        const button = document.createElement("button");
        button.textContent = "View Recipe"
        recipeDiv.appendChild(button)

        button.addEventListener('click',()=>{
            openRecipePopup(meal)
        }) 
  
        recipeContainer.appendChild(recipeDiv);
    })
}

const fetchIngredients = (meal) =>{
    let ingredientList = ""; 
    for(let i=1; i<=20; i++){
        const Ingredient = meal[`strIngredient${i}`]

        if(Ingredient){
            let measure = meal[`strMeasure${i}`]

            ingredientList+= `<li>${Ingredient} -- ${measure}`
        }
        else{
            break;
        }
    }

    return ingredientList;
}


const openRecipePopup = (meal) =>{
    recipeDetailsContent.innerHTML = `
            <h2 class="recipeName">${meal.strMeal}</h2>
            <h2>Ingredients:</h2>
            <ul class="ingredientList">${fetchIngredients(meal)}</ul>
            <div>
                <h3>Instructions:</h3>
                <p class="instructions">${meal.strInstructions}</p>
            </div>
    `
recipeDetailsContent.parentElement.style.display = "block"

}


recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display = "none"
})

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();

    const searchInput = searchBox.value.trim()
    fetchRecipes(searchInput)
})

