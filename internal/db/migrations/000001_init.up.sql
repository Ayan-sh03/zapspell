CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE words (
    id SERIAL PRIMARY KEY,
    word VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attempts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    word_id INT REFERENCES words(id) ON DELETE CASCADE NOT NULL,
    attempt_word VARCHAR(50) NOT NULL,
    is_correct BOOLEAN NOT NULL,
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE results (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    correct_spellings INT DEFAULT 0,
    total_attempts INT DEFAULT 0,
    success_percentage DECIMAL(5, 2) GENERATED ALWAYS AS (
        CASE WHEN total_attempts > 0 THEN (correct_spellings::DECIMAL / total_attempts) * 100 ELSE 0 END
    ) STORED,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id)
);


CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_word ON words(word);
CREATE INDEX idx_attempt_user_id ON attempts(user_id);
CREATE INDEX idx_attempt_word_id ON attempts(word_id);


