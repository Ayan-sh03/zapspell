package models

type Attempt struct {
	ID          int32  `json:"id"`
	Username    string `json:"username" validate:"required"`
	WordID      int32  `json:"word_id" validate:"required"`
	Word        string `json:"word"`
	AttemptWord string `json:"attempt_word" validate:"required"`
	IsCorrect   bool   `json:"is_correct" `
}

type Result struct {
	ID                int32  `json:"id"`
	Username          string `json:"username" validate:"required"`
	CorrectSpellings  int32  `json:"correct_spellings"`
	TotalAttempts     int32  `json:"total_attempts"`
	SuccessPercentage string `json:"success_percentage"`
}

type Word struct {
	ID   int32  `json:"id"`
	Word string `json:"word" validate:"required"`
}
