let showNb = 9;

let searchBar = document.getElementById("search-bar");
searchBar.innerHTML = `<input type="search" name="Search" id="search">
  <i class="fa fa-search" id="search-icon"></i>`

const Home = (argument = "") => {
  console.log(showNb)
  pageContent.innerHTML = ""
  if (argument === "") {
    fetch("https://api.rawg.io/api/games?page=1")
    .then((response) => response.json())
    .then ((response) => {
      response.results.slice(0,showNb).forEach(e => {
          pageContent.innerHTML += card(e)
      })
    })
  } else {
    fetch("https://api.rawg.io/api/games?search=" + argument)
    .then((response) => response.json())
    .then ((response) => {
      response.results.slice(0,showNb).forEach(e => {
        pageContent.innerHTML += card(e)
      })
    })
  }
};

// Search Bar
const search = document.getElementById("search")
let searchValue = document.getElementById("search").value
search.addEventListener('input', e => {
  showNb = 9;
  searchValue = document.getElementById("search").value
  Home(searchValue);
});

// Card
const card = e => {
  return `
  <div class="card">
    <img src="${e.background_image}">
    <a href="#pagedetail/${e.slug}" id="game-name">${e.name}</a> 
  </div>
  `
}

// Show More
let showMore = document.getElementById("show-more");
showMore.addEventListener("click", e => {
  e.preventDefault;
  showNb += 9;
  Home(searchValue);
})

export default Home;