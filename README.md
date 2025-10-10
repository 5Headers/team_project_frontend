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



