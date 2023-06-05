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

    // indexOf 메서드는 문자열에서 특정 문자열 또는 문자의 위치를 찾는 메서드
    // 검색어가 제목에 포함되어 있다면 indexOf(searchKeyword)의 값은 -1이 아닌 다른 숫자가 돰
    // 따라서 title.indexOf(searchKeyword) !== -1은 검색어가 제목에 포함되어 있는지를 확인하는 조건문
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
