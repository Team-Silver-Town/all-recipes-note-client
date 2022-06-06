## 프로젝트명 : 모두의 레시피(가칭)

## 프로젝트팀 : Team Silver Town

### 세팅 정보

- React Version 17로 다운그레이드 진행(220604 토요일)
- 폴더 구조 수정(220605 일요일)

### 폴더 구조

- components
  - 재사용하는 컴포넌트 모음
- config
  - 각종 설정 파일들
    - .env 설정 파일
    - firebase 설정파일
- context
  - session 정보
- hooks
  - hook 모음
- pages
  - 라우트 되었을때 렌더링 되는 페이지 모음
- routes
  - 인증되었을때와 인증안되었을때 렌더링 되는 페이지 정리
- services
  - 비즈니스 로직들 함수로 추출
- utils
  - async 처리 도와주는 함수
  - 문자열 처리나 정리 도와주는 함수 등등
