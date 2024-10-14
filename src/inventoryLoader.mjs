 export default inventoryLoader

 function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}



 async function safeFetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`${url} returned status ${response.status}`);
    }
    return await response.json();
}

// Main loader function to fetch all inventory categories and their ingredients
async function inventoryLoader() {
    const categories = ["foundations", "proteins", "extras", "dressings"];
    const combinedInventory = {};

    try {
        //simulate loading delay
        await delay(500);



        // Fetch data for each category
        await Promise.all(categories.map(async (category) => {
            const ingredients = await safeFetchJson(`http://localhost:8080/${category}`);
            const ingredientPromises = ingredients.map(async (name) => {
                const ingredient = await safeFetchJson(`http://localhost:8080/${category}/${name}`);
                combinedInventory[name] = ingredient;
            });
            
            // Wait for all ingredient fetches to complete
            await Promise.all(ingredientPromises);
        }));


        return combinedInventory; // Return the complete inventory
    } catch (error) {
        console.error('Error fetching inventory:', error);
        throw error; // Send the error for React Router to handle it
    }
}
