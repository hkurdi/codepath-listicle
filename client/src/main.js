const API_URL = "http://localhost:5004/api/items";

let allItems = [];

fetch(API_URL)
  .then((response) => response.json())
  .then((items) => {
    allItems = items;
    displayItems(items);
    populateCategories(items);
  })
  .catch((error) => {
    console.error("Error fetching items:", error);
    document.getElementById("item-list").innerHTML =
      "<p>Error loading items. Please try again later.</p>";
  });

function displayItems(items) {
  const itemList = document.getElementById("item-list");
  itemList.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("article");
    card.classList.add("card");

    card.innerHTML = `
      <h2>${item.title}</h2>
      <img src="${item.image}" alt="${item.title}" />
      <p>${item.text.substring(0, 100)}...</p>
      <a href="/item.html?id=${item.id}" class="button">Read More</a>
    `;

    itemList.appendChild(card);
  });
}

function populateCategories(items) {
  const categorySelect = document.getElementById("category-select");
  const categories = Array.from(new Set(items.map((item) => item.category)));

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;
    if (selectedCategory === "all") {
      displayItems(allItems);
    } else {
      const filteredItems = allItems.filter(
        (item) => item.category === selectedCategory
      );
      displayItems(filteredItems);
    }
  });
}
