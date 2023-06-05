// 영화카드 정렬 기능
// 1. 영화 제목 순
const sortByTitle = (event) => {
  event.preventDefault();
  const movieCardList = document.querySelector(".card-list");
  const movieCards = Array.from(movieCardList.querySelectorAll(".movie-card"));

  movieCards.sort((a, b) => {
    const titleA = a.querySelector(".movie-title").textContent.toLowerCase();
    const titleB = b.querySelector(".movie-title").textContent.toLowerCase();
    return titleA.localeCompare(titleB);
  });

  movieCardList.innerHTML = "";
  movieCards.forEach((card) => {
    movieCardList.appendChild(card);
  });
};

const btnsortByTitle = document.querySelector("#btn_sort-by-title");
btnsortByTitle.addEventListener("click", sortByTitle);

// 2. 영화 개봉일 순
const sortByReleaseDate = (event) => {
  event.preventDefault();
  const movieCardList = document.querySelector(".card-list");
  const movieCards = Array.from(movieCardList.querySelectorAll(".movie-card"));

  movieCards.sort((a, b) => {
    const dateA = a.querySelector(".release-date").textContent;
    const dateB = b.querySelector(".release-date").textContent;
    return new Date(dateA) - new Date(dateB);
  });

  movieCardList.innerHTML = "";
  movieCards.forEach((card) => {
    movieCardList.appendChild(card);
  });
};

const btnsortByReleaseDate = document.querySelector("#btn_sort-by-date");
btnsortByReleaseDate.addEventListener("click", sortByReleaseDate);

// 3. 영화 평점 순
// 🤔 평점순이 계속 정렬되지 않아서 별 짓 다했다..
// 💡 split으로 앞의 "Date :" 텍스트를 없애준 뒤 숫자형을 정렬해주니 해결!
const sortByRating = (event) => {
  event.preventDefault();
  const movieCardList = document.querySelector(".card-list");
  const movieCards = Array.from(movieCardList.querySelectorAll(".movie-card"));

  movieCards.sort((a, b) => {
    const ratingA = parseFloat(
      a.querySelector(".vote-average").textContent.split(":")[1].trim()
    );
    const ratingB = parseFloat(
      b.querySelector(".vote-average").textContent.split(":")[1].trim()
    );
    return ratingB - ratingA;
  });

  movieCardList.innerHTML = "";
  movieCards.forEach((card) => {
    movieCardList.appendChild(card);
  });
};

const btnSortByRating = document.querySelector("#btn_sort-by-rating");
btnSortByRating.addEventListener("click", sortByRating);

// 4. 정렬 초기화
// API를 다시 불러오는 방법으로 정렬을 초기화했는데..
// ❓ 처음 불러온 API의 배열 값을 저장해둬서 그 순서를 반환하게 할 순 없을까?
const resetMovieCards = async () => {
  const movies = await fetchMovieData();
  const movieCardList = document.querySelector(".card-list");
  movieCardList.innerHTML = movies
    .map(
      (movie) =>
        `<div class="movie-card" id=${movie.id}>
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="movie-poster" />
              <h3 class="movie-title">${movie.title}</h3>
              <p class="release-date">Release date : ${movie.release_date}</p>
              <p class="vote-average">Rating : ${movie.vote_average}</p>
              <p class="movie-overview">${movie.overview}</p>
          </div>`
    )
    .join("");
};

const resetButton = document.querySelector("#btn-sort-reset");
resetButton.addEventListener("click", resetMovieCards);
