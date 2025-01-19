#한달 인턴 지원 과제

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

1. accessToken&refreshToken

2. 유닛 테스트란?

3. 에러 로
