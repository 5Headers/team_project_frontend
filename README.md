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
https://github.com/user-attachments/assets/3cf47a8d-bc56-412d-b3c9-22dd4cbd66a0


### 조건 입력하여 GPT로 맞춤 견적 출력하기
https://github.com/user-attachments/assets/b453f5ad-62c0-428a-aef8-89866feac506


### 온라인 구매를 하는 경우
https://github.com/user-attachments/assets/5a560f58-088f-48f8-be47-bde2b5a3d68c


### 오프라인 구매를 하는 경우
https://github.com/user-attachments/assets/59517769-cbca-4fe8-937b-3a70236af36d


### 견적을 북마크하여 마이페이지에 저장하기
https://github.com/user-attachments/assets/b1765046-840f-4223-b2d9-452d1eb3139c


### 견적 기록보기
https://github.com/user-attachments/assets/a76debbb-0637-4d65-8a99-59eb19b7363e


### 프로필 사진 변경하기
https://github.com/user-attachments/assets/3d5654ba-7cdf-48be-bab2-529f0e36eb35


### 계정 찾기
https://github.com/user-attachments/assets/c0869e9f-f5e6-4789-8601-42b229bbcb1a


### 비밀번호 변경하기
https://github.com/user-attachments/assets/c2608b90-5da5-42d1-8ecf-a14f792a8fb5


### 회원탈퇴
https://github.com/user-attachments/assets/bcebc8d4-81ef-4ea6-89fe-47cc012c4171





