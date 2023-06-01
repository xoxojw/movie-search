# nbc_asgmt1

<br />

## 📝 과제 개요
1. 순수 바닐라 자바스크립트만으로 영화 리스트 조회 및 검색 UI 구현
2. 학습해온 자바스크립트 문법을 최대한 활용
3. 스타일링 작업하며 css와 친해지기

<br />

## 📝 결과 화면 및 내용

<img src="https://github.com/xoxojw/nbc_asgmt1/assets/124491335/1314259e-cc14-4101-967c-385a061c28aa" width="1000"/>

<img src="https://github.com/xoxojw/nbc_asgmt1/assets/124491335/97b1f2d6-1c90-4cb4-9b1a-8359a2a18ef2" width="1000"/>

<br />
<br />

### 1. 영화 오픈 API 이용 | TMDB(https://www.themoviedb.org/?language=ko )
- `fetch()`, `async`, `await` 사용하여 '현재 상영 영화' 데이터 호출
- `document.querySelector()`, `innerHTML`, `map()`, `join()`을 사용하여 불러온 영화 데이터를 카드 리스트 형태로 구현
- `addEventListener("click")`으로 영화 카드 클릭 시 영화 데이터에 있는 영화의 ID값 `alert`로 출력
### 2. 영화 검색 UI 및 정렬 기능 구현
- `toLowerCase()`를 사용하여 사용자의 입력값이 대문자/소문자인지 관련 없이 검색 가능하도록 구현
- `sort()`,`localeCompare()`,`parseFloat` 영화 제목, 개봉일, 평점(내림차순) 순으로 버튼 클릭 시 영화 카드 정렬
### 3. 날씨 오픈 API 이용 | OpenWeatherMap(https://openweathermap.org/ )
- `Geolocation.getCurrentPosition()` 메서드를 사용하여 사용자의 현재 위치정보 가져오기
- `fetch()`, `async`, `await` 사용하여 사용자 위치에 기반한 날씨 데이터 호출
- `document.querySelector()`, `innerHTML`으로 호출한 날씨 데이터 화면에 구현
### 4. 기타 구현한 기능
-  우측 최상단 버튼 클릭 시 다크모드/라이트모드 전환
    -  `Element.classList.toggle()`
-  우측 최하단 버튼 클릭 시 페이지 최상단으로 이동
    -  `window.scrollTo()`
-  페이지 랜딩 또는 새로고침 후 검색 입력란에 커서 자동 위치
    -  `DOMContentLoaded`, `focus()`
