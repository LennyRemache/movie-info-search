const search_btn = document.querySelector(".bi-search");
const search_container = document.querySelector(".search-container");
const search_bar = document.querySelector("#search-bar");

search_btn.addEventListener("click", () => {
  search_container.style.display = "initial";
});

search_bar.addEventListener("click", (e) => {
  e.stopPropagation();
  // prevent a click on the search bar from causing bubbling
  // event to occur where the child and all parent elements also get clicked
  // in this case th parent is the search-container
});

search_container.addEventListener("click", (e) => {
  search_container.style.display = "none";
});