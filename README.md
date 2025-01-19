# 한달 인턴 지원 과제

### 배포링크

https://vite-react-typescript-one.vercel.app/

### 구현 기능

1. 회원가입/로그인

   - 제공된 서버가 작동하지 않아 supabase auth를 사용해 구현.
   - supabase에 trigger를 추가해 회원가입하면 자동으로 users 테이블에 사용자 정보 추가되도록 함.
   - 회원가입/로그인 후 Home으로 이동.

2. Todo 리스트 구현

   - Todo 추가, 수정, 삭제 기능 구현.
   - 사용자 id에 따라 등록한 Todo 리스트 보여줌.
   - 낙관적 업데이트 적용.
   - 로그인 정보가 없을 시 Todo 추가 불가 및 로그인 페이지로 이동.

3. 프로필 수정

   - 닉네임 수정 가능.
   - 낙관적 업데이트 적용.

4. Private Route 구현

   - 로그인 정보가 없을 시 마이페이지 접근 불가

### 블로그 과제

1. [클라이언트 인증 방식](https://joycie416.tistory.com/entry/%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%9D%B8%EC%A6%9D-%EB%B0%A9%EC%8B%9D-Cookie-Session-Token)

2. [유닛 테스트란?](https://joycie416.tistory.com/entry/%EC%9C%A0%EB%8B%9B-%ED%85%8C%EC%8A%A4%ED%8A%B8-Jest-Mocha-Jasmine-%EA%B0%84%EB%8B%A8-%EB%B9%84%EA%B5%90)

3. [프론트엔드 에러 추적하기](https://joycie416.tistory.com/manage/posts/)
