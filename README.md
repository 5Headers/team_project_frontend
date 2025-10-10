# 💻 5Headers Frontend — GPT 기반 맞춤형 컴퓨터 견적 서비스

This project was built with [Vite + React](https://vitejs.dev/).  
It serves as the **frontend** of the “GPT 기반 맞춤형 컴퓨터 견적 웹서비스” by Team **5Headers**.

---

## 🚀 Getting Started

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode with **Vite’s Hot Module Replacement (HMR)**.  
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload automatically when you make changes,  
and lint errors will be shown in the terminal or console.

---

### `npm run build`

Builds the app for production into the `dist` folder.  
It optimizes React for the best performance and minifies files for faster load times.  
Your app is ready to be deployed!

---

### `npm run preview`

Previews the production build locally.  
Useful for verifying deployment before pushing to a live environment.

---

### `npm run lint`

Runs ESLint to detect and fix code style or quality issues.

---

## 🧱 Folder Structure

team_project_frontend/
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page-level React components (Home, Profile, etc.)
│ ├── styles/ # Emotion / Styled-components CSS
│ ├── api/ # Axios API calls and GPT request logic
│ ├── hooks/ # Custom React hooks
│ ├── assets/ # Images, icons
│ └── main.jsx # Entry point
└── package.json



## 🧩 Main Libraries

- **React 18** — UI Framework  
- **Vite** — Lightning-fast bundler & dev server  
- **@emotion/react** / **styled-components** — Component-level styling  
- **react-router-dom** — Routing  
- **react-icons** — Icons  
- **Axios** — API communication with backend (Spring Boot + GPT Server)

---

## 🧠 Key Features

- 🔍 **GPT 기반 견적 생성** — 사용자의 요구사항을 분석해 맞춤형 컴퓨터 견적을 자동 생성  
- ❤️ **즐겨찾기(북마크)** — 선호 견적을 저장 및 관리  
- 💬 **대화형 인터페이스** — GPT와의 대화로 컴퓨터 부품 추천 및 수정 가능  
- 👤 **회원별 프로필 페이지** — 로그인 후 나만의 견적 관리  
- 🔄 **온/오프라인 구매 페이지** — API 응답을 통한 온/오프라인 구매 페이지 이동

---

## 🧑‍💻 Development Environment

| Tool | Version |
|------|----------|
| Node.js | 18+ |
| npm | 9+ |
| React | 18+ |
| Vite | 5+ |
| ESLint | Configured with React plugin |

---

## 🧭 Run Instructions (Step-by-Step)

```bash
# 1. Clone repository
git clone https://github.com/5Headers/team_project_frontend.git
cd team_project_frontend

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. (Optional) Build for production
npm run build
```


---

## 기능 세부 설명 (동영상 첨부)

### 사용자 인증 화면에서 회원가입하여 계정을 연동하기
Spring Security와 JWT를 활용해 회원가입 및 로그인 기능을 구현했습니다.
사용자의 계정 정보는 MySQL DB에 안전하게 저장되며, 비밀번호는 BCrypt로 암호화됩니다.
로그인 상태를 기반으로 개인화된 기능 접근을 제어합니다.

https://github.com/user-attachments/assets/3cf47a8d-bc56-412d-b3c9-22dd4cbd66a0


### 조건 입력하여 GPT로 맞춤 견적 출력하기
사용자가 입력한 용도와 예산 정보를 서버가 수신하면, GPT API를 호출해 최적의 부품 조합을 추천합니다.
서버는 추천 결과를 JSON 형태로 받아 프론트엔드에 전달하고, 필요 시 가격 계산 로직과 연동합니다.
이를 통해 실시간 맞춤형 부품 견적을 출력할 수 있습니다.

https://github.com/user-attachments/assets/b453f5ad-62c0-428a-aef8-89866feac506


### 온라인 구매를 하는 경우
추천 부품 정보를 바탕으로 네이버 쇼핑 API와 연동해 온라인 가격과 구매 링크를 조회합니다.
API 호출 결과는 서버에서 가공 후 프론트엔드에 전달되어 사용자에게 표시됩니다.
사용자는 바로 온라인 구매 가능한 부품과 가격 정보를 확인할 수 있습니다.

https://github.com/user-attachments/assets/1c2ad3ea-c04c-4b7d-a9c3-633e3331970f




### 오프라인 구매를 하는 경우
GPS와 지도 API를 활용하여 주변 오프라인 매장 정보를 조회합니다.
매장별 가격, 재고 상태, 위치 데이터를 서버에서 가공 후 프론트엔드에 전달합니다.
사용자는 근처 매장 기준으로 최적의 구매 경로와 가격을 확인할 수 있습니다.

https://github.com/user-attachments/assets/926573ea-0998-46cb-9382-8e89e0389f6a




### 견적을 북마크하여 마이페이지에 저장하기
사용자가 북마크한 견적은 DB 테이블과 연동해 저장되며, 사용자별로 관리됩니다.
서버는 저장 요청 시 견적 ID, 사용자 ID, 상세 부품 정보를 함께 기록합니다.
저장된 견적은 마이페이지에서 조회 가능하며, 세부 정보와 가격까지 확인할 수 있습니다.

https://github.com/user-attachments/assets/b1765046-840f-4223-b2d9-452d1eb3139c


### 견적 기록보기
마이페이지 요청 시 서버는 사용자 ID 기준으로 저장된 견적 내역을 조회합니다.
각 기록은 날짜, 요약 정보, 세부 부품 및 가격 데이터를 포함하여 JSON 형태로 반환됩니다.
프론트엔드에서 이 데이터를 활용해 견적 기록을 정렬, 비교, 확인할 수 있습니다.

https://github.com/user-attachments/assets/a76debbb-0637-4d65-8a99-59eb19b7363e


### 프로필 사진 변경하기
사용자는 프로필 사진을 업로드하여 계정에 연결할 수 있습니다.
사진은 Firebase Storage에 저장되며, URL은 사용자 DB 테이블에 연동됩니다.
업로드 후 즉시 프론트엔드에 반영되어 사용자 화면에 표시됩니다.

https://github.com/user-attachments/assets/3d5654ba-7cdf-48be-bab2-529f0e36eb35


### 계정 찾기
사용자가 이메일을 통해 계정을 찾으면, 서버는 DB에서 해당 계정을 조회합니다.
계정 정보 확인 후 이메일 인증 링크 또는 코드 발송으로 사용자에게 전달됩니다.
이를 통해 안전하게 계정 식별 및 복구가 가능합니다.

https://github.com/user-attachments/assets/c0869e9f-f5e6-4789-8601-42b229bbcb1a


### 비밀번호 변경하기
사용자는 기존 비밀번호 검증 후 새로운 비밀번호로 갱신할 수 있습니다.
비밀번호는 BCrypt로 암호화되어 DB에 저장되며, 변경 시 유효성 검증 로직이 적용됩니다.
변경 완료 후 기존 JWT 토큰은 무효화되어 보안이 유지됩니다.

https://github.com/user-attachments/assets/c2608b90-5da5-42d1-8ecf-a14f792a8fb5


### 회원탈퇴
사용자가 회원탈퇴를 요청하면 계정과 관련 데이터가 DB에서 즉시 삭제됩니다.
JWT 인증 토큰이 함께 무효화되어 재로그인이 불가능합니다.
별도의 보류 기간 없이 실시간으로 데이터가 제거되도록 처리되었습니다.

https://github.com/user-attachments/assets/bcebc8d4-81ef-4ea6-89fe-47cc012c4171





