# Todo List

- [배포 링크](https://rigood.github.io/react-todolist)
- 카테고리별로 할일을 관리할 수 있는 Todo List입니다.

<br>

## 💻 프로젝트

- 2022년 10월 22일~24일 (개인 프로젝트)

<br>

## 📌 주요 기능

- 카테고리 추가, 수정, 삭제
- 할일 추가, 수정, 삭제, 완료 여부 표시
- 할일 정렬 기능 (최신순, 오래된순, 가나다순, 가나다 역순)
- 할일 필터링 기능 (진행중, 완료, 전체)
- 다크모드, 라이트모드 적용

<br>

## 🔨 구현 방법

- React 컴포넌트 기반으로 UI 구현
- 상태관리 라이브러리인 Recoil을 이용하여 할일, 카테고리 CRUD 기능 구현
- Recoil-persist를 이용하여 Local Storage에 상태값 저장
- React-router-dom으로 카테고리별 페이지 이동
- Styled-component로 다크모드 테마 설정
- 재사용 가능한 모달창 구현(수정, 삭제 메뉴 팝업)

<br>

## 🔍 자세한 구현 방법

- 카테고리, 할일 추가 파트는 input값에 대한 state를 만들지 않고, useRef를 이용하여 값을 받아옴

  - form의 submit 이벤트를 처리할 때 event.target.value가 아닌 useRef를 통해 받아온 input값을 사용해야함

<br>

- Recoil의 selector를 이용하여 정렬 기능 구현
  - 정렬 조건(최신순, 오래된순, 가나다순)을 atom에 저장
  - selector를 통해 할일 목록 정렬 후 반환
    - 할일 목록 atom, 정렬 조건 atom을 get으로 받아옴
    - sort, localeCompare 메서드를 사용하여 정렬 조건에 따라 목록 정렬
  - 사용자가 정렬 방법을 선택하면 selector는 그에 따라 할일 목록 정렬 후 반환
  - 할일 목록, 정렬 조건이 변경될 때마다 selector가 다시 실행됨

<br>

- Recoil의 selector를 이용하여 필터링 기능 구현
  - 필터링 조건(진행중, 완료, 전체)을 atom에 저장
  - selector를 통해 할일 목록 필터링 후 반환
    - selector를 통해 정렬된 할일 목록 atom과 필터링 조건 atom을 get으로 받아옴
    - filter 메서드를 사용하여 필터링 조건에 따라 목록 필터링
  - 사용자가 필터링 방식을 선택하면 selector는 그에 따라 할일 목록 필터링 후 반환
  - 할일 목록, 정렬 조건, 필터링 조건이 변경될 때마다 selector가 다시 실행됨

<br>

- 모달창은 레이어의 최상단에 위치해야함

  - position을 fixed 또는 absolute로 설정하고, z-index값을 높게 줘야함

<br>

- 모달창이 열리는 위치

  - 화면 정중앙이 아닌 모달창 팝업 버튼 아래쪽에 모달창을 열리게 하고자 함
    - position: absolute로 설정하고, 버튼 기준으로 위치를 조절했으나
    - 모달창 부모 요소에 스크롤 영역이 있는 경우, 스크롤 영역의 overflow 속성으로 인해 모달창이 짤리는 문제가 발생함
    - absolute는 relative한 부모 영역에 묶여 있기 때문에 overflow로 인해 짤릴 수 밖에 없음
    - 부모 요소에 관계없이 레이어를 배치하는 position: fixed를 사용하기로 하고, 모달창 팝업 버튼의 좌표를 받아 열리는 위치를 지정함

<br>

- 이벤트 전파 중지

  - 카테고리를 클릭하면 해당 페이지로 이동하고(부모 이벤트), 카테고리 내 버튼을 클릭하면 모달창이 열린다(자식 이벤트).
  - 카테고리 버튼을 클릭할 때 모달창만 열리고 페이지 이동은 하지 않으려면(부모 요소로 이벤트 전파 중지) event.stopPropagation()을 사용하면 됨

<br>

- 리액트에서 Fontawesome 사용하는 법
  - Fontawesome 패캐지를 설치하면 Fontawesome 아이콘을 컴포넌트 형태로 사용할 수 있다.
  - 총 3가지 패키지를 설치해야 한다.
    - npm i @fortawesome/fontawesome-svg-core
    - npm i @fortawesome/react-fontawesome
    - npm i @fortawesome/free-solid-svg-icons (아이콘 종류에 맞는 패키지 설치 : solid, regular, brands는 무료)
  - FontawesomeIcon 컴포넌트와 사용할 아이콘을 import한다.
  - FontawesomeIcon 컴포넌트에 사용할 아이콘을 icon prop으로 넘겨준다.
