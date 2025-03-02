const recipelist = document.querySelector('.recipe-list')
const form = document.querySelector('.search-form')
const recipeDetails = document.querySelector(".recipe-details")

form.addEventListener('submit', function (event) {
    event.preventDefault()
    const inputValue = event.target[0].value

    searchRecipes(inputValue)
})

async function searchRecipes(ingredient) {
    recipelist.innerHTML = `<p>Carregando Receitas...</p>`
    try{
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,)
    const data = await response.json()

    showRecipes(data.meals)
    }catch(err) {
        recipelist.innerHTML = `<p>Nenhuma Recita Encontrada</p>`
    }
}

function showRecipes(recipes) {
    recipelist.innerHTML = recipes.map(
        (item) => `
        <div class="recipe-card" onclick="getRecipesDetails(${item.idMeal})">
           <img src="${item.strMealThumb}" alt="receita-foto">
           <h3>${item.strMeal}</h3>


        </div>  
        `

    ).join('')
}


function getRecipesDetails(id) {
    console.log(id)
}

async function getRecipesDetails(id) {
    recipeDetails.innerHTML = `<p>Carregando Informações...</p>`
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    )
    const data = await response.json()
    const recipe = data.meals[0]

let ingredients = ''


    for(let i =1; i <= 20; i++) {
        if(recipe[`strIngredient${i}`]){
           ingredients += `<li>${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}<li>`
        } else {
            break;
        }
    } 
    
recipeDetails.innerHTML = `
<h2>${recipe.strMeal}</h2>
<h3>Categoria: ${recipe.strCategory}</h3>
<br>
<h3>Origem: ${recipe.strArea}</h3>
<br>
<h3>Ingredientes:</h3>
<ul>${ingredients}</ul>
<h3>Instruções:</h3>
<p>${recipe.strInstructions}</p>
<p> Tags: ${recipe.strTags}</p>
<p>Video: <a href="${recipe.strYoutube}" target="_blank">Assista no Youtube</a></p>
`
}


 
