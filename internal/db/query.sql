-- name: CreateUser :exec
INSERT INTO users(
    username,email
)VALUES(
    $1,$2
);

