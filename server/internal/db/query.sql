-- name: CreateUser :exec
INSERT INTO users(
    username,email
)VALUES(
    $1,$2
);

-- name: GetUserByUsername :one
SELECT id, username, email, created_at
FROM users
WHERE username = $1;

-- name: GetUserIDByEmail :one
SELECT id
FROM users
WHERE email = $1;

-- name: GetUserByID :one
SELECT id, username, email, created_at
FROM users
WHERE id = $1;



-- name: AddWord :one
INSERT INTO words(
    word
)VALUES(
    $1
)RETURNING *;

-- name: AddAttempt :exec
INSERT INTO attempts(
    user_id,word_id,attempt_word,is_correct
)VALUES(
    $1,$2,$3,$4
);

-- name: GetRandomWord :one
SELECT word,id
FROM words
ORDER BY RANDOM()
LIMIT 1;

-- name: GetWordByID :one
SELECT id, word, created_at
FROM words
WHERE id = $1;

-- name: GetAttemptsByUserID :many
SELECT id, user_id, word_id, attempt_word, is_correct, attempted_at
FROM attempts
WHERE user_id = $1;

-- name: GetAllWords :many
SELECT id, word, created_at
FROM words;

-- name: GetResultByUserID :one
SELECT id, user_id, correct_spellings, total_attempts, success_percentage, updated_at
FROM results
WHERE user_id = $1;


-- name: UpdateUserResults :exec
UPDATE results
SET
    correct_spellings = correct_spellings + (CASE WHEN sqlc.arg(isCorrect)::boolean THEN 1 ELSE 0 END),
    total_attempts = total_attempts + 1,
    updated_at = CURRENT_TIMESTAMP
WHERE user_id = sqlc.arg(userId)::int;

-- name: GetAttempPerWord :one
SELECT attempt_word,is_correct
FROM attempts
WHERE user_id = $1 AND word_id= $2;


-- name: GetAttemptsForAllWordByUsesId :many
SELECT 
    a.id AS attempt_id,
    w.id AS word_id,
    w.word,
    a.attempt_word,
    a.is_correct,
    a.attempted_at
FROM 
    attempts a
JOIN 
    words w ON a.word_id = w.id
WHERE 
    a.user_id = $1
ORDER BY 
    a.attempted_at DESC;