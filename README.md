
# 📝 Shared Todo App

This is a full-stack **Shared Todo List App** built using:

- **Frontend**: Vue 3 + TypeScript + Pinia + Firebase Auth  
- **Backend**: Node.js (Fastify) + PostgreSQL (Supabase)  
- **Database Modeling**: DBML → SQL  
- **Authentication**: Firebase  
- **Containerization**: Docker 

---

## 🔧 Project Structure

```
shared-todo-app/
├── backend/                # Fastify API + PostgreSQL
│   ├── controllers/
│   ├── routes/
│   ├── schema.dbml
│   ├── schema.sql
│   ├── index.ts
│   └── .env                # Environment file
├── frontend/               # Vue 3 + Firebase + Pinia
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── stores/
│   │   ├── firebase.ts
│   │   └── main.ts
│   └── .env                # Environment file
├── README.md
├──Dockerfile


```

---

## 📦 Docker Setup (Optional)


### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/shared-todo-app.git
cd shared-todo-app
```

### 2. Run with Docker

```bash
docker-compose up --build
```

- Frontend: http://localhost:5173  
- Backend: http://localhost:4001  

Add Environment variable in Docker file

---

## ⚙️ Local Setup (Without Docker)

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/shared-todo-app.git
cd shared-todo-app
```

---

## 🚀 Backend Setup (Fastify + PostgreSQL)

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following content:

```env
PORT=4001
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<dbname>
```

4. Start the development server:

```bash
npm run dev
```

> The backend will run at `http://localhost:4001`

---

### 📐 DBML to SQL (optional)

If you want to convert your schema from DBML to SQL:

```bash
# Install DBML CLI globally
npm install -g @dbml/cli

# Generate SQL from DBML
dbml2sql schema.dbml -o schema.sql --postgres
```

---

## 🎨 Frontend Setup (Vue + Firebase)

1. Navigate to the frontend folder:

```bash
cd ../frontend
npm install
```

2. Create a `.env` file in the `frontend/` directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

3. Run the frontend:

```bash
npm run dev
```

> The frontend runs at `http://localhost:5173`

---

## ✅ Features

- 🔐 User registration and login using Firebase
- ✅ Task creation, editing, and deletion
- 📤 Share tasks with other users
- 📥 View tasks assigned/shared to you
- 🔍 Task filtering by all/self/shared
- 🧼 Clean folder structure with Pinia store integration

---

## 🧠 Database Schema Overview

- `users`: Stores synced Firebase users
- `tasks`: Task information with ownership
- `shared_tasks`: Many-to-many table for shared task access

Refer to `schema.dbml` or `schema.sql` for the full schema.

---

## 🙋‍♂️ Author

Built by **Girish** — A Fullstack developer.

---

## 📜 License


This project is licensed under the MIT License.
