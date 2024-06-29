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
SELECT word
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
