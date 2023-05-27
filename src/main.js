// 🤔다크모드
function darkMode() {
  var body = document.body;
  body.classList.toggle("dark-mode");

  var button = document.getElementById("srnmode-btn")
  if (button.innerHTML == "Dark Mode") {
    button.innerHTML = "Light Mode";
  } else {
    button.innerHTML = "Dark Mode";
  }
}

// movieAPI 불러오기
const fetchMovieData = async () => {
  const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjZmYTE3MGI2YTI5ZTY2NjNhMjBiZWVmMTM0ZGJlNSIsInN1YiI6IjY0NzA4ZmE3NzI2ZmIxMDE0NGU2MTU4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WjMDg4jW2jKFKA7ASX32W7RWlkt6KKmrcmF6_Bn_fic'
      }
    };
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    options
  );
  const data = await response.json();
  return data.results;
};
  
const createMovieCards = async () => {
  const movies = await fetchMovieData();
  const cardList = document.querySelector(".card-list");
  cardList.innerHTML = movies
  .map(
    (movie) =>
      `<div class="movie-card" id=${movie.id}>
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="movie-poster" />
          <h3 class=""movie-title>${movie.title}</h3>
          <p class="release-date">Release date: ${movie.release_date}</p>
          <p class="movie-overview">${movie.overview}</p>
          <p class="vote-average">Rating: ${movie.vote_average}</p>
      </div>`
  )
  .join("");

  const textElements = cardList.querySelectorAll(".movie-poster .movie-title, .release-date, .movie-overview, .vote-average");
  textElements.forEach((element) => {
    element.style.lineHeight = "1.5";
  });


  //🤔 클릭하면 영화 아이디 나오게 구현
  var target = 
  cardList.addEventListener("click", ({ target }) => {
      alert(`📽️ 이 영화의 아이디는 ${movies.id}입니다.`);
    }
  )
};

createMovieCards();

// 검색기능
const handleSearch = (event) => {
  event.preventDefault();
  const searchInput = document.querySelector("#search-input");
  const searchKeyword = searchInput.value.toLowerCase();
  const movieCards = document.querySelectorAll(".movie-card");
  let searchEnds = false;
  for (let i = 0; i < movieCards.length; i++) {
    const card = movieCards[i];
    const title = card.querySelector("h3").textContent.toLowerCase();

    if (title.indexOf(searchKeyword) !== -1) {
      card.style.display = "block";
      searchEnds = true;
    } else {
      card.style.display = "none";
    }
  }
  if (!searchEnds) {
    for (let i = 0; i < movieCards.length; i++) {
      const card = movieCards[i];
      card.style.display = "block";
    }
    alert(`해당 영화는 찾을 수 없어요. 😓`);
  }
};