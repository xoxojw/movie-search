// 웹사이트 랜딩 후 검색 입력란에 커서 자동위치
// 콜백함수 사용
// class가 아닌 id를 사용하는 이유: id는 고유하기 때문에 확실하게 식별할 수 있음
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search-input").focus();
});

// 다크모드
// ❓ 사용자 시스템OS 모드에 따라 첫 다크모드를 불러올 순 없을까?
const darkMode = () => {
  const body = document.body;
  // Element.classList.toggle
  // >> 하나의 인수만 있을 때, 클래스 값을 토글링한다.
  // >> 클래스가 존재한다면 제거하고 false를 반환하며,
  // >> 존재하지 않으면 클래스를 추가하고 true를 반환
  body.classList.toggle("dark-mode");

  const btnDarkmode = document.querySelector(".dark-btn span"); // .dark-btn 내의 <span> 요소 선택
  if (btnDarkmode.textContent === "🌙") {
    btnDarkmode.textContent = "🌞";
    document.getElementById("search-input").focus();
  } else {
    btnDarkmode.textContent = "🌙";
    document.getElementById("search-input").focus();
  }
};

// 영화 API 구현
// 1. fetch - movieAPI에서 데이터 불러오기(JSON 형태)
const fetchMovieData = async () => {
  const fetchMovieOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjZmYTE3MGI2YTI5ZTY2NjNhMjBiZWVmMTM0ZGJlNSIsInN1YiI6IjY0NzA4ZmE3NzI2ZmIxMDE0NGU2MTU4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WjMDg4jW2jKFKA7ASX32W7RWlkt6KKmrcmF6_Bn_fic",
    },
  };
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=ko-KO&page=1",
    fetchMovieOptions
  );
  const movieData = await response.json();
  return movieData.results;
};

// 2. 불러온 movieAPI로 카드 생성
// 1) 비동기함수 async, wait
// 2) innerHTML 형식으로 출력하기 위해 map으로 새 배열 생성
// 3) join 메서드로 배열 요소들을 문자열로 결합
const createMovieCards = async () => {
  const movies = await fetchMovieData();
  const movieCardList = document.querySelector(".card-list");
  console.log(movies);
  movieCardList.innerHTML = movies
    .map(
      (movie) =>
        `<div class="movie-card" id=${movie.id}>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="movie-poster" />
            <h3 class="movie-title">${movie.title}</h3>
            <p class="release-date">개봉일 : ${movie.release_date}</p>
            <p class="vote-average">평점 : ${movie.vote_average}</p>
        </div>`
    )
    // join 메서드를 사용하지 않고 배열을 바로 innerHTML에 할당하면
    // 배열 자체가 문자열로 변환되지 않고 객체 자체로 삽입된다.
    // 웹페이지에서 배열 객체는 텍스트로 처리되지 않으므로 화면에 나타나지 않음
    .join("");

  // 🤔 3. 클릭하면 새 창으로 영화 상세페이지 이동
  movieCardList.addEventListener("click", ({ target }) => {
    const targetCard = target.closest(".movie-card");
    if (targetCard) {
      const targetTitle = targetCard.querySelector(".movie-title").textContent;
      // window.open("movie.html");
    }
  });
};

createMovieCards();

// 버튼 클릭 시 맨 위로 이동
const topBtn = document.querySelector(".top-btn");

topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
