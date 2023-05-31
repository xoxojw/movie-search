// 웹사이트 랜딩 후 검색 입력란에 커서 자동위치
// 콜백함수 사용
// class가 아닌 id를 사용하는 이유: id는 고유하기 때문에 확실하게 식별할 수 있음
window.addEventListener("DOMContentLoaded", () => {
  const inputCursor = document.getElementById("search-input");
  inputCursor.focus();
});


// 다크모드
// ❓ 사용자 시스템OS 모드에 따라 첫 다크모드를 불러올 순 없을까?
const darkMode = () => {
  const body = document.body;
  body.classList.toggle("dark-mode");

  const btnDarkmode = document.querySelector(".dark-btn span"); // .dark-btn 내의 <span> 요소 선택
  if (btnDarkmode.textContent === "🌙") {
    btnDarkmode.textContent = "🌞";
    document.getElementById("search-input").focus();
  } else {
    btnDarkmode.textContent = "🌙";
    document.getElementById("search-input").focus();
  }
}

// 날씨 API 구현
// 1. 사용자 현재 위치 가져오기
const posOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
const posSuccess = async (pos) => {
  const crd = pos.coords;
  const lat = crd.latitude;
  const lon = crd.longitude;
  console.log(`Your current position is: 위도는 ${crd.latitude}, 경도는 ${crd.longitude}이며 오차는 ${crd.accuracy}미터입니다.`);
  await getCurrentWeather(lat, lon);
}
const posError = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`)
}
navigator.geolocation.getCurrentPosition(posSuccess, posError, posOptions);

// 2. fetch - 날씨 API 불러오기
const getCurrentWeather = async (lat, lon) => {
  const weatherApi = 'f2607caf98a57987d7cda1e1b4034769'
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApi}&units=metric`);
  const weatherData = await response.json();
  console.log(weatherData);
  updateWeatherWidget(weatherData);
}

// 3. 날씨 위젯에 불러온 데이터 업데이트하기
const updateWeatherWidget = (weatherData) => {
  const weatherContainer = document.querySelector(".weather-container");
  const locationElement = weatherContainer.querySelector(".location");
  const conditionElement = weatherContainer.querySelector(".conditions");
  const windSpeedElement = weatherContainer.querySelector("#wind");
  const humidityElement = weatherContainer.querySelector("#humidity")
  const temperatureElement = weatherContainer.querySelector(".temperature");
  // 날씨에 따른 아이콘 출력은 jQuery를 이용해야해서 주석처리
  // const weatherIcon = weatherContainer.querySelector(".weather-icon");

  locationElement.textContent = weatherData.name;
  conditionElement.textContent = `${weatherData.weather[0].main}`;
  windSpeedElement.textContent = `${weatherData.wind.speed}km/h`
  humidityElement.textContent = `${weatherData.main.humidity}%`
  temperatureElement.textContent = `${weatherData.main.temp}°`;
  // weatherIcon.textContent = `${weatherData.weather[0].icon}`
}

// 4. 날씨 위젯 생성
const createWeatherWidget = (weatherData) => {
  const weatherContainer = document.querySelector(".weather-container");
  weatherContainer.innerHTML =
    `<div class="top-bar">
        <i class="fa-solid fa-location-dot"></i>
        <div class="location">도시명</div>
        <div class="time"></div>
      </div>
      <div class="info">
        <div class="data">
          <div class="block">
            <i class="fas fa-wind"></i>
            <span id="wind">풍속</span>
          </div>
          <div class="block">
            <i class="fas fa-tint"></i>
            <span id="humidity">습도</span>
          </div>
        </div>
        <span class="conditions">기상상태</span>
        <div class="temperature">
          <span>8&deg;</span>
        </div>
      </div>`;
};

createWeatherWidget();

// 날씨 위젯에 hh:mm:ss 형식 현재 시각 출력
const updateTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getUTCMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const time = `${hours}:${minutes}:${seconds}`;

  const timeElement = document.querySelector('.time');
  timeElement.textContent = time;
};
updateTime();
setInterval(updateTime, 1000);



// 영화 API 구현
// 1. fetch - movieAPI에서 데이터 불러오기(JSON 형태)
const fetchMovieData = async () => {
  const fetchMovieOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjZmYTE3MGI2YTI5ZTY2NjNhMjBiZWVmMTM0ZGJlNSIsInN1YiI6IjY0NzA4ZmE3NzI2ZmIxMDE0NGU2MTU4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WjMDg4jW2jKFKA7ASX32W7RWlkt6KKmrcmF6_Bn_fic'
      }
    };
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
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
    .map((movie) =>
        `<div class="movie-card" id=${movie.id}>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="movie-poster" />
            <h3 class="movie-title">${movie.title}</h3>
            <p class="release-date">Release date : ${movie.release_date}</p>
            <p class="vote-average">Rating : ${movie.vote_average}</p>
            <p class="movie-overview">${movie.overview}</p>
        </div>`
    )
    // join 메서드를 사용하지 않고 배열을 바로 innerHTML에 할당하면
    // 배열 자체가 문자열로 변환되지 않고 객체 자체로 삽입된다.
    // 웹페이지에서 배열 객체는 텍스트로 처리되지 않으므로 화면에 나타나지 않음
    .join("");

  // 🤔 3. 클릭하면 영화 아이디 나오게 구현
  // 💡 movies는 배열이므로 {$movies.id}와 같이 속성을 직접 참조할 수 없음
  //    영화 아이디에 접근하려면 closest API를 사용한 targetCard를 선언하여 참조
  movieCardList.addEventListener("click", ({ target }) => {
    const targetCard = target.closest(".movie-card");
    if (targetCard) {
      const targetTitle = targetCard.querySelector(".movie-title").textContent;
      alert(`${targetTitle}의 아이디는 📽️${targetCard.id}📽️입니다.`);
    }
  });
};

createMovieCards();

// 영화 검색기능 구현
// forEach 사용 시 break를 사용할 수 없어,
//  검색한 영화가 없는 경우에 작동하는 alert이 무한루프 되는 현상 발생
// >> for문 사용
const handleSearch = (event) => {
  event.preventDefault();
  const searchInput = document.querySelector("#search-input");
  const searchKeyword = searchInput.value.toLowerCase();
  const movieCards = document.querySelectorAll(".movie-card");
  // searchEnds는 재할당할 수 있어야 하므로 let으로 변수 선언 및 할당!
  // const로 하면 안됨..!
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

  // 검색결과가 없는 경우 card.style.display = "block";으로
  // 모든 영화카드가 보이도록 display를 변경
  if (!searchEnds) {
    for (let i = 0; i < movieCards.length; i++) {
      const card = movieCards[i];
      card.style.display = "block";
    }
    alert(`해당 영화는 찾을 수 없어요. 😓`);
  }
};


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
    const ratingA = parseFloat(a.querySelector(".vote-average").textContent.split(":")[1].trim());
    const ratingB = parseFloat(b.querySelector(".vote-average").textContent.split(":")[1].trim());
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
    .map((movie) =>
        `<div class="movie-card" id=${movie.id}>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="movie-poster" />
            <h3 class="movie-title">${movie.title}</h3>
            <p class="release-date">Release date : ${movie.release_date}</p>
            <p class="vote-average">Rating : ${movie.vote_average}</p>
            <p class="movie-overview">${movie.overview}</p>
        </div>`
    ).join("");
};

const resetButton = document.querySelector("#btn-sort-reset");
resetButton.addEventListener("click", resetMovieCards);



// 버튼 클릭 시 맨 위로 이동
const topBtn = document.querySelector(".top-btn");

topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });  
}