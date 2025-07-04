# 📝 Shared Todo App

This is a full-stack Shared Todo List App built using:

- **Frontend**: Vue 3 + TypeScript + Pinia + Firebase Auth
- **Backend**: Node.js (Fastify) + PostgreSQL (Supabase)
- **Database Modeling**: DBML to SQL
- **Authentication**: Firebase
- **Containerization (optional)**: Docker(DUE TO SYSTEM CONFIGURATION THIS IS NOT WORKING)

---

## 🔧 Project Structure

```
shared-todo-app/
├── backend/                # Fastify API + PostgreSQL
│   ├── controllers/
│   ├── routes/
│   ├── schema.dbml
│   ├── schema.sql
│   └── index.ts
|   └── .env (your environment file)
├── frontend/               # Vue 3 + Firebase + Pinia
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── rpouters/
│   │   ├── services/
│   │   ├── stores/
│   │   ├── firebase.ts
│   │   └── main.ts
|    └── .env (your environment file)
├── README.md

```

---

## ⚙️ Local Setup

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/shared-todo-app.git
cd shared-todo-app
```

## 🚀 Backend Setup (Fastify + PostgreSQL)

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following:
   ```
   PORT=4001
   DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<dbname>
   
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The backend will run at: `http://localhost:4001`

---
---
# Install DBML CLI globally
npm install -g @dbml/cli

# Run the DBML file to generate SQL (PostgreSQL)
dbml2sql schema.dbml -o schema.sql --postgres
---
### 3. Setup Frontend

```bash
cd frontend
npm install
```

### 4. 🔐 Firebase Configuration

Create a `.env` file inside the `frontend/` directory:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```



### 5. Run Frontend

```bash
npm run dev
```

> The frontend runs on `http://localhost:5174`

---

## ✅ Features

- User registration and login using Firebase
- Task creation and listing
- Share tasks with other users
- See tasks assigned/shared to you
- Edit and delete tasks
- Realtime task filtering
- Clean folder structure with Pinia store integration

---

## 🧠 Database Schema Overview

- `users`: Stores synced Firebase users
- `tasks`: Task information with owner
- `shared_tasks`: Many-to-many relationship for task sharing

See `schema.dbml` or `schema.sql` for full schema details.

---


## 📦 Optional: Docker Support
THIS IS NOT WORKING CURRENTLY
If Docker works on your machine:

```bash
docker-compose up --build
```

---
## 🙋‍♂️ Author

Built by **Girish** — A Fullstack developer.

---

## 📜 License


This project is licensed under the MIT License.
