-- Mock SQL file for documentation
-- In production, these would create actual database tables

-- Posts table
-- CREATE TABLE IF NOT EXISTS posts (
--   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--   title VARCHAR(255) NOT NULL,
--   content TEXT NOT NULL,
--   excerpt TEXT,
--   featured_image VARCHAR(500),
--   category VARCHAR(100),
--   tags JSONB DEFAULT '[]',
--   status VARCHAR(20) DEFAULT 'draft',
--   author VARCHAR(100) DEFAULT 'Admin',
--   views INTEGER DEFAULT 0,
--   likes INTEGER DEFAULT 0,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- Media table  
-- CREATE TABLE IF NOT EXISTS media (
--   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--   filename VARCHAR(255) NOT NULL,
--   original_name VARCHAR(255) NOT NULL,
--   file_type VARCHAR(50) NOT NULL,
--   file_size INTEGER NOT NULL,
--   url VARCHAR(500) NOT NULL,
--   alt_text VARCHAR(255),
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- Settings table
-- CREATE TABLE IF NOT EXISTS settings (
--   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--   key VARCHAR(100) UNIQUE NOT NULL,
--   value TEXT,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );
