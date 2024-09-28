const API_URL = "http://localhost:5004/api/items";

const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");

fetch(`${API_URL}/${itemId}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Item not found");
    }
    return response.json();
  })
  .then((item) => {
    document.getElementById("item-title").textContent = item.title;
    document.getElementById("item-image").src = item.image;
    document.getElementById("item-text").textContent = item.text;
    document.getElementById("item-category").textContent = item.category;
    document.getElementById("item-submittedBy").textContent = item.submittedBy;
  })
  .catch((error) => {
    console.error("Error:", error);
    window.location.href = "/404.html";
  });
