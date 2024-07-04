// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0

package sqlc

import (
	"database/sql"
)

type Attempt struct {
	ID          int32
	UserID      int32
	WordID      int32
	AttemptWord string
	IsCorrect   bool
	AttemptedAt sql.NullTime
}

type Result struct {
	ID                int32
	UserID            sql.NullInt32
	CorrectSpellings  sql.NullInt32
	TotalAttempts     sql.NullInt32
	SuccessPercentage sql.NullString
	UpdatedAt         sql.NullTime
}

type User struct {
	ID        int32
	Username  string
	Email     string
	CreatedAt sql.NullTime
}

type Word struct {
	ID        int32
	Word      string
	CreatedAt sql.NullTime
}