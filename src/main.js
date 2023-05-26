window.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("#search-input");
    searchInput.focus();
  });
  
  const handleSearch = (event) => {
    event.preventDefault();
    const searchInput = document.querySelector("#search-input");
  
    const searchKeyword = searchInput.value.toLowerCase();
    const movieCards = document.querySelectorAll(".movie-card");
  
    movieCards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase();
  
      if (title.indexOf(searchKeyword) !== -1) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  };
  
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
        (movie) => `
          <div class="movie-card" id=${movie.id}>
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
              <h3>${movie.title}</h3>
              <p>${movie.overview}</p>
              <p>Rating: ${movie.vote_average}</p>
          </div>`
      )
      .join("");
  
    cardList.addEventListener("click", ({ target }) => {
      if (target !== cardList) {
        if (target.className === "movie-card") {
          alert(`영화 ID: ${target.id}`);
        } else {
          alert(`영화 ID: ${target.parentNode.id}`);
        }
      }
    });
  };
  
  createMovieCards();



// 타이핑 효과

const $text = document.querySelector(".header__title .header__title--typing");

const letters = [
    "The Super Mario Bros. Movie",
    "Fast X",
    "Sisu",
];

// 글자 입력 속도
const speed = 100;
let i = 0;

// 타이핑 효과
const typing = async () => {  
    const letter = letters[i].split("");
    
    while (letter.length) {
    await wait(speed);
    $text.innerHTML += letter.shift(); 
    }
    
    // 잠시 대기
    await wait(800);
    
    // 지우는 효과
    remove();
}

// 글자 지우는 효과
const remove = async () => {
    const letter = letters[i].split("");
    
    while (letter.length) {
    await wait(speed);
    
    letter.pop();
    $text.innerHTML = letter.join(""); 
    }
    
    // 다음 순서의 글자로 지정, 타이핑 함수 다시 실행
    i = !letters[i+1] ? 0 : i + 1;
    typing();
}

// 딜레이 기능 ( 마이크로초 )
function wait(ms) {
    return new Promise(res => setTimeout(res, ms))
}

// 초기 실행
setTimeout(typing, 1500);