# StudyBloom – AI Study Planner

A starter full-stack project: React + Vite frontend, Express + TypeScript API, Supabase PostgreSQL, custom student authentication, and CRUD for subjects, study plans, and study tasks.

## Setup
1. Install Node.js LTS.
2. Run `npm install` in this folder.
3. In Supabase SQL Editor, run `database/migration.sql`. This assumes your five existing tables (`students`, `subjects`, `exams`, `study_plans`, `study_tasks`) already exist using the schema you shared.
4. Copy `.env.example` to `.env`; add your Supabase PostgreSQL connection string and a random JWT secret of at least 32 characters. Keep `.env` private.
5. Run `npm run dev`; open the local URL printed by Vercel CLI.

## Routes
- POST `/api/auth/register` – body: `{full_name,email,password,available_hours_per_day}`
- POST `/api/auth/login` – body: `{email,password}`
- POST `/api/auth/logout`
- GET `/api/auth/me`
- GET/POST `/api/subjects`; PATCH/DELETE `/api/subjects/:id`
- GET/POST `/api/plans`; GET/DELETE `/api/plans/:id`
- GET/POST `/api/tasks`; PATCH/DELETE `/api/tasks/:id`

For a task, create a subject and plan first. Task body: `{study_plan_id,subject_id,topic,task_date,duration_hours,status}`.
The frontend uses the API routes and keeps the login cookie through `credentials: include`.

## Notes
- Passwords are hashed using Argon2id; hashes are never returned.
- The backend derives the student ID from the signed JWT, not from browser-supplied IDs.
- Registration links a matching existing student row if it is unlinked, to avoid duplicate student email errors.
- This is the functional CRUD/auth foundation, not yet the AI-generated study schedule. Add the AI provider call server-side later; never expose its API key in frontend code.
- Before public deployment, add authentication rate limiting and CSRF/origin protections for cookie-based authentication.
