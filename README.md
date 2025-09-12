s

# STEM Explorers Club

A modern, responsive web application for the STEM Explorers Club, built with React, Vite, Tailwind CSS, shadcn/ui, and lucide-react. This app provides information about STEM programs, gallery, contact info, and an admin dashboard.

## Features

- Responsive design for mobile, tablet, and desktop
- Modern UI using Tailwind CSS and shadcn/ui components
- Iconography with lucide-react
- Routing with React Router
- State management with Redux Toolkit
- Toast notifications with react-toastify
- Admin and client layouts

## Tech Stack & Libraries

- [React](https://react.dev/)
- [Yarn](https://yarnpkg.com/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [lucide-react](https://lucide.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Redux](https://react-redux.js.org/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [Axios](https://axios-http.com/)

## Getting Started

Follow these steps to run the app locally after cloning from GitHub:

### 1. Clone the repository

```bash
git clone https://github.com/Mahesh0426/Group-Project-KOI.git

```

```bash
cd <your-repo-name>
```

### 2. Install dependencies

Using Yarn (recommended):

```bash
yarn install
```

install all the dependencies above in technology stack using

```bash
yarn add <command>
```

### 3. Set up environment variables (if needed)

- If your app requires environment variables, create a `.env` file in the root directory and add the required variables. (Check `.env.example` if available.)

### 4. Start the development server

```bash
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 5. Build for production

```bash
yarn build
```

### 6. Preview the production build

```bash
yarn preview
```

## Project Structure

```
Directory structure:
└── mahesh0426-group-project-koi/
    ├── README.md
    ├── components.json
    ├── eslint.config.js
    ├── index.html
    ├── jsconfig.json
    ├── package.json
    ├── vite.config.js
    ├── .env.sample
    ├── .gitignore
    └── src/
        ├── App.css
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── axios/
        │   └── authaxios.js
        ├── components/
        │   ├── Admin-view/
        │   │   └── AdminLayout.jsx
        │   ├── Client-view/
        │   │   └── ClientLayout.jsx
        │   ├── custom-input/
        │   │   └── CustomInput.jsx
        │   ├── Header-Footer/
        │   │   ├── Footer.jsx
        │   │   └── Header.jsx
        │   ├── helper/
        │   │   ├── LoadingSpinner.jsx
        │   │   └── SidebarItem.jsx
        │   ├── Protected-Route/
        │   │   └── ProtectedRoute.jsx
        │   └── ui/
        │       ├── avatar.jsx
        │       ├── badge.jsx
        │       ├── button.jsx
        │       ├── card.jsx
        │       ├── input.jsx
        │       ├── label.jsx
        │       ├── select.jsx
        │       ├── separator.jsx
        │       ├── table.jsx
        │       └── textarea.jsx
        ├── hooks/
        │   ├── useForm.js
        │   └── useLoading.js
        ├── lib/
        │   └── utils.js
        ├── pages/
        │   ├── AboutUsPage.jsx
        │   ├── ContactUsPage.jsx
        │   ├── GallaryPage.jsx
        │   ├── ProgramsPage.jsx
        │   ├── admin/
        │   │   ├── AdminProgramsPage.jsx
        │   │   ├── CreateProgramFormPage.jsx
        │   │   ├── CreateUsersFormPage.jsx
        │   │   ├── DashboardPage.jsx
        │   │   ├── SettingPage.jsx
        │   │   └── UsersPage.jsx
        │   ├── auth/
        │   │   ├── LoginPage.jsx
        │   │   └── SignupPage.jsx
        │   └── home/
        │       └── HomePage.jsx
        └── redux/
            ├── store.js
            └── auth/
                ├── userAction.js
                └── userSlice.js

```

## Scripts

- `yarn dev` — Start development server
- `yarn build` — Build for production
- `yarn preview` — Preview production build
- `yarn lint` — Lint the codebase

## License

MIT (or specify your license)

---

Feel free to open issues or submit pull requests for improvements!
