const axios = window.axios;

const categoryFilter = document.getElementById("category");
const productsList = document.getElementById("products-list");
const searchBar = document.getElementById("search-bar");
const pagination = document.getElementById("pagination");


// Function try catch API
const searchFunction = async () => {

    try {

        const categoriesResponse = await axios.get("https://dummyjson.com/products/categories");
        const categories = categoriesResponse.data;
        const productsResponse = await axios.get("https://dummyjson.com/products");
        const products = productsResponse.data.products;

        displayCategories(categories); // Call function to display categories
        displayProducts(products); // Call function to display products
        
    } catch (error) {
        
        alert(error);
        console.log(error);
    };

};
searchFunction();


// Function to display categories
const displayCategories= (categories) => {

    for (const category of categories) {

        categoryFilter.innerHTML += `

        <option>${category}</option>
        `;
    }; // Display categories with HTML
};


// Function to display products
const displayProducts = (products) => {

    productsList.innerHTML = "";

    for (const product of products) {
        
        productsList.innerHTML += `
        
        <article class="p-3 shadow-md rounded-md">
            <figure>
                <img class="h-48 w-full object-cover rounded-sm mb-3" src="${product.images[0]}">
            </figure>
            <div>
                <a class="text-sm text-slate-400" href="">${product.category}</a>
                <h2 class="text-lg font-bold my-2">${product.title.substring(0, 10)}</h2>
                <p class="text-sm text-slate-400 mb-3 line-clamp-1">${product.description}</p>
                <div class="flex justify-between">
                    <span class="font-medium text-slate-400 text-sm">${product.brand} </span>
                    <span class="font-medium">${product.price} $</span>
                </div>
            </div>
        </article>

        `;
    }; // Display products with HTML
};


// Search bar
searchBar.onblur = async () => { 

    try {

        const searchByKeyWord = await axios.get(`https://dummyjson.com/products/search?q=${searchBar.value}`);
        const searchByKeyWordResponse = searchByKeyWord.data.products;

        displayProducts(searchByKeyWordResponse);
        
    } catch (error) {
        alert(error);
        console.log(error);
    }

};

// Search by categories
categoryFilter.onchange = async () => {

    try {

        const searchByCategory = await axios.get(`https://dummyjson.com/products/category/${categoryFilter.value}`);
        const searchByCategoryResponse = searchByCategory.data.products;

        displayProducts(searchByCategoryResponse);
        
    } catch (error) {
        alert(error);
        console.log(error);
    };

};


// Pagination
for (let index = 1; index <= 10; index++) {

    pagination.innerHTML += `
    <button class="page">${index}</button>
    `;
};


const pages = document.getElementsByClassName("page");

    let skip = 0;

    for (const page of pages) {
        
        page.onclick = async () => {
            skip += 10;
            let pageNumber = page.innerText;

            try {

                const productsPage = await axios.get(`https://dummyjson.com/products?skip=${skip}&limit=10`);
                const productsPageResponse = productsPage.data.products;

                displayProducts(productsPageResponse);

                console.log(productsPageResponse, page)

            } catch (error) {
                alert(error);
                console.log(error)
            };

        };
};