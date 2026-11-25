CREATE TABLE IF NOT EXISTS users (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 email VARCHAR(255) NOT NULL UNIQUE,
 password_hash TEXT NOT NULL,
 role VARCHAR(20) NOT NULL DEFAULT 'student' CHECK (role IN ('student','admin')),
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE students ADD COLUMN IF NOT EXISTS user_id UUID;
DO $$ BEGIN
 IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='fk_student_user' AND conrelid='students'::regclass) THEN
  ALTER TABLE students ADD CONSTRAINT fk_student_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL;
 END IF;
END $$;
CREATE UNIQUE INDEX IF NOT EXISTS idx_students_user_id_unique ON students(user_id);
