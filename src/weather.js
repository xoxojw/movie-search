// 날씨 API 구현
// 1. 사용자 현재 위치 가져오기
// Geolocation.getCurrentPosition() 메서드를 사용
const posOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
const posSuccess = async (pos) => {
  const crd = pos.coords;
  const lat = crd.latitude;
  const lon = crd.longitude;
  console.log(
    `Your current position is: 위도는 ${crd.latitude}, 경도는 ${crd.longitude}이며 오차는 ${crd.accuracy}미터입니다.`
  );
  await getCurrentWeather(lat, lon);
};
const posError = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};
navigator.geolocation.getCurrentPosition(posSuccess, posError, posOptions);

// 2. fetch - 날씨 API 불러오기
const getCurrentWeather = async (lat, lon) => {
  const weatherApi = "f2607caf98a57987d7cda1e1b4034769";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApi}&units=metric`
  );
  const weatherData = await response.json();
  updateWeatherWidget(weatherData);
  console.log(weatherData);
};

// 3. 날씨 위젯에 불러온 데이터 업데이트하기
const updateWeatherWidget = (weatherData) => {
  const weatherContainer = document.querySelector(".weather-container");
  const locationElement = weatherContainer.querySelector(".location");
  const conditionElement = weatherContainer.querySelector(".conditions");
  const windSpeedElement = weatherContainer.querySelector("#wind");
  const humidityElement = weatherContainer.querySelector("#humidity");
  const temperatureElement = weatherContainer.querySelector(".temperature");
  // 날씨에 따른 아이콘 출력은 jQuery를 이용해야해서 주석처리
  // const weatherIcon = weatherContainer.querySelector(".weather-icon");

  locationElement.textContent = weatherData.name;
  conditionElement.textContent = `${weatherData.weather[0].main}`;
  windSpeedElement.textContent = `${weatherData.wind.speed}km/h`;
  humidityElement.textContent = `${weatherData.main.humidity}%`;
  // .toFixed() 메서드 - 지정돈 소수점 자리수까지 반올림
  temperatureElement.textContent = `${weatherData.main.temp.toFixed(1)}°C`;
  // weatherIcon.textContent = `${weatherData.weather[0].icon}`
};

// 4. 날씨 위젯 생성
const createWeatherWidget = (weatherData) => {
  const weatherContainer = document.querySelector(".weather-container");
  weatherContainer.innerHTML = `<div class="top-bar">
          <i class="fa-solid fa-location-dot"></i>
          <div class="location"></div>
          <div class="time"></div>
        </div>
        <div class="info">
          <div class="data">
            <div class="block">
              <i class="fas fa-wind"></i>
              <span id="wind"></span>
            </div>
            <div class="block">
              <i class="fas fa-tint"></i>
              <span id="humidity"></span>
            </div>
          </div>
          <span class="conditions"></span>
          <div class="temperature">
            <span></span>
          </div>
        </div>`;
};

createWeatherWidget();

// 날씨 위젯에 hh:mm:ss 형식 현재 시각 출력
const updateTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getUTCMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const time = `${hours}:${minutes}:${seconds}`;

  const timeElement = document.querySelector(".time");
  timeElement.textContent = time;
};
updateTime();
setInterval(updateTime, 1000);
