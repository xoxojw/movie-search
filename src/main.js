// 웹사이트 랜딩 후 검색 입력란에 커서 자동위치
// 콜백함수 사용
// class가 아닌 id를 사용하는 이유: id는 고유하기 때문에 확실하게 식별할 수 있음
// ❓ 다크모드 전환 후에도 검색창에 포커스 유지하려면 어떻게 할까..?
window.addEventListener("DOMContentLoaded", () => {
  const inputCursor = document.getElementById("search-input");
  inputCursor.focus();
});


// 다크모드
// ❓ 다크모드 전환 후에도 검색창에 포커스 유지하는 방법이 이게 최선일까?
//      >> 너무 반복되는 코드를 쓴 느낌
// ❓ 사용자 시스템OS 모드에 따라 첫 다크모드를 불러올 순 없을까?
const darkMode = () => {
  const body = document.body;
  body.classList.toggle("dark-mode");

  const btnDarkmode = document.querySelector(".dark-btn span"); // .dark-btn 내의 <span> 요소 선택
  if (btnDarkmode.textContent === "🌙") {
    btnDarkmode.textContent = "🌅";
    const inputCursor = document.getElementById("search-input");
    inputCursor.focus();
  } else {
    btnDarkmode.textContent = "🌙";
    const inputCursor = document.getElementById("search-input");
    inputCursor.focus();
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

// 불러온 movieAPI로 카드 생성
// 1. 비동기함수 async, wait
// 2. map으로 새 배열 생성
// 3. join 메서드로 새롭게 생성된 배열을 하나의 큰 문자열로 연결
const createMovieCards = async () => {
  const movies = await fetchMovieData();
  const cardList = document.querySelector(".card-list");
  cardList.innerHTML = movies
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

  // 🤔 클릭하면 영화 아이디 나오게 구현
  // 💡 movies는 배열이므로 {$movies.id}와 같이 속성을 직접 참조할 수 없음
  //   영화 아이디에 접근하려면 `target.id`를 사용해야 함
  cardList.addEventListener("click", ({ target }) => {
    const targetCard = target.closest(".movie-card");
    if (targetCard) {
      const targetTitle = targetCard.querySelector(".movie-title").textContent;
      alert(`${targetTitle}의 아이디는 📽️${targetCard.id}📽️입니다.`);
    }
  });
};

createMovieCards();

// 검색기능 구현
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


// 카드 정렬 기능
// 1. 영화 제목 순
const sortByTitle = (event) => {
  event.preventDefault();
  const cardList = document.querySelector(".card-list");
  const movieCards = Array.from(cardList.querySelectorAll(".movie-card"));

  movieCards.sort((a, b) => {
    const titleA = a.querySelector(".movie-title").textContent.toLowerCase();
    const titleB = b.querySelector(".movie-title").textContent.toLowerCase();
    return titleA.localeCompare(titleB);
  });

  cardList.innerHTML = "";
  movieCards.forEach((card) => {
    cardList.appendChild(card);
  });
};

const btnsortByTitle = document.querySelector("#btn_sort-by-title");
btnsortByTitle.addEventListener("click", sortByTitle);


// 2. 영화 개봉일 순
const sortByReleaseDate = (event) => {
  event.preventDefault();
  const cardList = document.querySelector(".card-list");
  const movieCards = Array.from(cardList.querySelectorAll(".movie-card"));

  movieCards.sort((a, b) => {
    const dateA = a.querySelector(".release-date").textContent;
    const dateB = b.querySelector(".release-date").textContent;
    return new Date(dateA) - new Date(dateB);
  });

  cardList.innerHTML = "";
  movieCards.forEach((card) => {
    cardList.appendChild(card);
  });
};

const btnsortByReleaseDate = document.querySelector("#btn_sort-by-date");
btnsortByReleaseDate.addEventListener("click", sortByReleaseDate);

// 3. 영화 평점 순
// 🤔 평점순이 계속 정렬되지 않아서 별 짓 다했다..
// split으로 앞의 "Date :" 텍스트를 없애줘야 됨
const sortByRating = (event) => {
  event.preventDefault();
  const cardList = document.querySelector(".card-list");
  const movieCards = Array.from(cardList.querySelectorAll(".movie-card"));

  movieCards.sort((a, b) => {
    const ratingA = parseFloat(a.querySelector(".vote-average").textContent.split(":")[1].trim());
    const ratingB = parseFloat(b.querySelector(".vote-average").textContent.split(":")[1].trim());
    return ratingB - ratingA;
  });

  cardList.innerHTML = "";
  movieCards.forEach((card) => {
    cardList.appendChild(card);
  });
};

const btnSortByRating = document.querySelector("#btn_sort-by-rating");
btnSortByRating.addEventListener("click", sortByRating);


// 4. 정렬 초기화
// API를 다시 불러오는 방법으로 정렬을 초기화했는데..
// ❓ 처음 불러온 API의 배열 값을 저장해둬서 그 순서를 반환하게 할 순 없을까?
const resetMovieCards = async () => {
  const movies = await fetchMovieData();
  const cardList = document.querySelector(".card-list");
  cardList.innerHTML = movies
    .map(
      (movie) =>
        `<div class="movie-card" id=${movie.id}>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="movie-poster" />
            <h3 class="movie-title">${movie.title}</h3>
            <p class="release-date">Release date: ${movie.release_date}</p>
            <p class="vote-average">Rating: ${movie.vote_average}</p>
            <p class="movie-overview">${movie.overview}</p>
        </div>`
    )
    .join("");
};

const resetButton = document.querySelector("#btn-sort-reset");
resetButton.addEventListener("click", resetMovieCards);



// 버튼 클릭 시 맨 위로 이동
const topBtn = document.querySelector(".top-btn");

topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });  
}