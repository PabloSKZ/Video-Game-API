const PageDetail = (argument = "") => {
// Replace Search Bar by Previous
  /* let searchBar = document.getElementById("search-bar");
  searchBar.innerHTML = `<a href=""><i class="fas fa-arrow-left fa-3x"></i></a>`; */

  // Hide Show More
  let showMore = document.getElementById("show-more");
  showMore.style.display = "none"

  pageContent.innerHTML = `<a href=""><i class="fas fa-arrow-left fa-3x"></i></a>`
  fetch("https://api.rawg.io/api/games/" + argument)
  .then((response) => response.json())
  .then ((response) => {
    let developers = []
    response.developers.forEach(e => {developers.push(e.name)})
    let genres = []
    response.genres.forEach(e => {genres.push(e.name)})
    let tags = []
    response.tags.forEach(e => {tags.push(e.name)})
    let publishers = []
    response.publishers.forEach(e => {publishers.push(e.name)})

    pageContent.innerHTML = `
    <a href=""><i class="fas fa-arrow-left fa-3x" style="top: 15px;"></i></a>
    <div id="details-container" data-aos="fade-down">
      <div id="game-title">
        <h1>${response.name}</h1>
      </div>
      <div id="platform">
        ${showPlatforms(response.platforms)}
      </div>
      <div id="rating">
        ${showStars(response.rating)}
      </div>
      <div id="main-img">
        <img src="${response.background_image}" alt="${response.name}">
      </div>
      <div id="description">
      ${response.description}
      </div>     
    </div>
    <div id="side-container" data-aos="fade-up">
      <div id="details">
          <div id="released"><span class="grey">Released:</span> ${response.released}</div>
          <div id="website"><span class="grey">Website:</span> ${response.website}</div>
          <div id="developers"><span class="grey">Developers:</span> ${developers.join(', ')}</div>
          <div id="genres"><span class="grey">Genres:</span> ${genres.join(', ')}</div>
          <div id="tags"><span class="grey">Tags:</span> ${tags.join(', ')}</div>
          <div id="publishers"><span class="grey">Publishers:</span> ${publishers.join(', ')}</div>
          
      </div>
      <div id="gallery">
      </div>
    </div>
    `
    let gallery = "";
    fetch("https://api.rawg.io/api/games/" + argument + "/screenshots")
    .then((response) => response.json())
    .then ((response) => {
      const galleryContainer = document.getElementById("gallery")
      response.results.forEach(e => {
        gallery += `<img src="${e.image}">`
      })
      console.log(gallery)
      galleryContainer.innerHTML += `
          ${gallery}
      `
    })
    
  })
};

const showPlatforms = (platforms) => {
  let show = "";
  platforms.forEach(e => {
    switch(e.platform.name) {
      case "PlayStation 4" || "PlayStation 3" || "PlayStation 2":
        show += `<img src="src/img/ps4.svg" class="platforms">`
        break;
      case "Xbox 360" || "Xbox One" || "Xbox":
      show += `<img src="src/img/xbox.svg" class="platforms">`
      break;
      case "PC":
      show += `<img src="src/img/windows.svg" class="platforms">`
      break;
      case "Nintendo Switch":
      show += `<img src="src/img/switch.svg" class="platforms">`
      break;
      case "Linux":
      show += `<img src="src/img/linux.svg" class="platforms">`
      break;
      case "Android" || "iOS":
      show += `<img src="src/img/mobile.svg" class="platforms">`
      break;
    } 
  });
  return show;
}

const showStars = (rating) => {
  const starTotal = 5;
  const starPercentage = (rating / starTotal) * 100;
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
  return `<div id="stars-outer"><div id="stars-inner" style="width:${starPercentageRounded}"></div></div>`;

}



export default PageDetail;
