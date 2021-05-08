#유튜브 클론 코딩
![로고](https://user-images.githubusercontent.com/65115422/117542957-b298d000-b055-11eb-8383-557ebc683938.png)
##### _Bolier plate 를 활용해서 YOUTUBE 서비스 구현해보기_
***
### 주요 기능 살펴보기
#### 1. 비디오 업로드 & 저장
<img src = "https://user-images.githubusercontent.com/65115422/117542902-7ebdaa80-b055-11eb-91e8-ec3691d47732.JPG" width = "500">

- drop-zone을 이용해서 드래그를 통해 비디오 업로드
- multer로 비디오 파일을 서버에 저장
- ffmpeg : 비디오 쎔네일 생성


#### 2. 비디오 디테일 페이지
<img src = "https://user-images.githubusercontent.com/65115422/117542904-7feed780-b055-11eb-9f9e-51ae020a39f9.JPG" width = "500">

- side : MongoDB에서 비디오 데이터 가져와서 출력하기
- 메인 : 비디오 출력
- 하단 : comment란 (#4 에서 자세히)


#### 3. 구독 페이지
<img src = "https://user-images.githubusercontent.com/65115422/117542905-80876e00-b055-11eb-985d-aff64bb5903b.JPG" width = "500">

- 구독한 사람들의 비디오만 화면에 출력
- 구독 기능/ 구독 취소 기능


#### 4. 댓글 시스템
<img src = "https://user-images.githubusercontent.com/65115422/117542906-80876e00-b055-11eb-8df3-7b2ddbe11a64.JPG" width = "500">

- 댓글 쓴 유저 사진, 유저 이름, 코멘트 내용, 코멘트 likes/dislikes, reply 코멘트 기능
- 좋아요/싫어요 기능 ( 좋아요, 싫어요 수 증감 )
