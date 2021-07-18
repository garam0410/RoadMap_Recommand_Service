# 공부로드 추천 서비스
https://www.youtube.com/watch?v=3czgZVfoo84

## 개발 목적
개발자라는 꿈을가지고 학부생활을 하고 있었다. 학교에서는 여러가지를 알려주지만, 항상 학교에 맞춰서 공부를 할 수는 없다.
어떻게 공부를 진행해야하는지도 잘 모르는체, 그냥 막막한 공부방법으로 하루하루를 지내고 있는 우리는, 공부방법에 있어서 다른사람에게 도움을 받을 수 있는 소셜서비스가 있으면 어떨까 하고 생각했다. 
그래서, 사용자가 직접 로드맵을 구성하여 공부로드를 공유하고, 이것에 의견을 제시하거나 좋다는 것을 표현하여 사람들이 공부하는 방향을 잘 잡을 수 있도록 하는 서비스를 만들기로 결정하였다.

## 기술 스택

![image](https://user-images.githubusercontent.com/28921379/124345171-4fb95480-dc12-11eb-85e6-c71e188576a3.png)

🍎**FrontEnd**

- React Native
- React

🍏**BackEnd**

- Spring Boot
- Flask
- MariaDB

🔳**DevOps**

- GCP
- Docker
- Git / GitHub

</br>

## 수행 내용
### 클라우드 컴퓨팅 Linux 환경에서 Docker 컨테이너를 활용한 서비스 구성
- GCP의 1년 무료 크레딧을 활용하여 서버를 구축하고, 기능별로 분류된 서비스 4가지를 컨테이너로 구성하여 MSA 환경을 구성함
  ![image](https://user-images.githubusercontent.com/28921379/125035013-4164b000-e0cc-11eb-9945-96b3f8bda827.png)


<br>

### Spring Boot를 활용한 백엔드 개발
- 로그인, 회원가입, 회원 탈퇴 **login(), register(), checkOut()**
- 댓글 **insertComment(), deletecomment()**
- 게시글

  **getBoardList(), insertBoard(), deleteBoard(), modifyBoard(), getBoardComment, insertBoardComment(), deleteBoardComment()**
- 좋아요의 수정,삭제 **deleteLove(), saveLove()**
- 로드맵을 검색 및 좋아요 표시한 로드맵 가져오기 **getSearchRoadamp() ,getLikeRoadamp()**
- 로드맵 : 로드맵을 표현할 수 있는 형태로 데이터 정제

  ![image](https://user-images.githubusercontent.com/28921379/125034893-1f6b2d80-e0cc-11eb-92a8-d1f1ab2d3494.png)

  데이터베이스에서 추출한 특정 로드맵 데이터를 Cytoscape.js 에 적용할 수 있는 형태로 데이터를 바꿔주는 기능 구현

<br>

### React Native 및 React의 Axios 라이브러리를 활용한 서버와의 비동기 통신 구현
  
- 서버로 부터 응답 받은 JSON 데이터를 어플리케이션에 적용
  
  ![image](https://user-images.githubusercontent.com/28921379/125034816-06627c80-e0cc-11eb-8461-b0ca1f1db976.png)

<br>

### 데이터베이스 셜계

- 프로젝트를 진행하면서 사용할 데이터베이스를 구축하고 설계하였다. 

  ![image](https://user-images.githubusercontent.com/28921379/125038779-c782f580-e0d0-11eb-9791-a5c8dc96a4db.png)

<br>

## 회고
- JSP로만 백엔드를 개발해오고, 실제로 서비스를 배포해 보았지만 Spring Boot를 사용한 것으로는 첫 프로젝트인 만큼 구현한 기능을 수정하는 일이 잦았었다.
무얼 하든 설계가 제대로 된 후에 진행하는 것이 시간을 단축시키는 길인 것 같다. 

- 어떤 기능을 구현해도 보안쪽으로는 생각해 보지 않았는데, 이번 프로젝트를 진행함으로써 데이터베이스가 랜섬웨어에 걸리는 일이 있었다. 평소에 백업을 해놓아서 별다른 타격은 없었지만,
보안에 있어서 신경을 써야되겠다는 생각을 하였다. 

- Spring에는 Spring Security라는 것이 있었다. Spring 하위에 있는 보안 프레임워크인데, 다음에 진행하려는 프로젝트에는 이것을 활용해서 보안에 힘을 써야겠다고 생각했다.

- REST API라는 것을 이번 프로젝트에 처음 적용시켜봤던 것 같다. Spring Boot를 이용해서 때로는 단순 문자열, 떄로는 JSON 형태의 결과를 반환해 주었는데, 후에 자료를 검색하던중, ResponseEntity나 ResponseBody 같은 클래스들을 찾을 수 있었다. 
이것을 통해서 Http 통신상태의 결과도 보내줄 수 있고, 오픈 API에서 볼수 있는 그런 형태의 자료를 반환해줄 수 있다는 것을 확인 했다. 단순히 Map, List, String 같은 자료형을 활용할 수도 있지만, 존재하는 클래스를 활용하여 좀더 자세한 상태정보를 담을 수있는 API 를 구현해 봐야겠다고 생각했다. 

- 로드맵을 구현할 라이브러리를 찾던 중, React에서 동작하는 Cytoscape.js 라는 라이브러리를 찾을 수 있었다. 이를 React Native에서도 동작할 것같다는 생각으로 개발을 진행하였지만, 거의 막바지에 적용을 할 수 없다는 것을 확인했다. 주요기능이므로 없앨 수도 없었기에 방법을 생각하던 중, React에 해당 라이브러리를 통해서 구현하고, React Native에 웹뷰형식으로 띄워 주는 방향을 생각 했다. 다행이 로드맵은 딜레이 없이 잘 로드 되었고, 같은 베이스로 만들어진 프레임워크지만 지원하는 라이브러리도 모두 같다고 생각을 하면 안되겠다. 

## 팀원 소개

### **김가람 (팀장)**

- Backend Engineer
- 서버 관리
- 인프라 구축
- REST API 구현

### **박창은 (팀원)**

- Frontend Engineer
- 클라이언트 개발
- UX/UI 구성

### 고가영 **(팀원)**

- Frontend Engineer
- 클라이언트 개발
- UX/UI 구성

### 박종두 **(팀원)**

- ML Engineer
- 분석 서비스 개발
- 결과 서빙 API 구현

### 장예진 **(팀원)**

- ML Engineer
- 분석 서비스 개발
- 결과 서빙 API 구현
