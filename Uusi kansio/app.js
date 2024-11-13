document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const resultsContainer = document.getElementById('results-container');

    // Event Listener for Search Button
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            fetchMeals(query);
        } else {
            alert('Please enter a meal name!');
        }
    });

    // Fetch Meals from TheMealDB API
    async function fetchMeals(query) {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayMeals(data.meals);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Display Meals on the Page
    function displayMeals(meals) {
        resultsContainer.innerHTML = ''; // Clear previous results
        if (meals) {
            meals.forEach(meal => {
                const mealDiv = document.createElement('div');
                mealDiv.classList.add('meal');
                mealDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <p>${meal.strInstructions.substring(0, 100)}...</p>
          `;
                resultsContainer.appendChild(mealDiv);
            });
        } else {
            resultsContainer.innerHTML = '<p>No meals found!</p>';
        }
    }
});
