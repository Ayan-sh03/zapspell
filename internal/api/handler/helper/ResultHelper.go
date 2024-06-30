package helper

import (
	"github.com/ayan-sh03/zapspell/internal/api/models"
	"github.com/ayan-sh03/zapspell/internal/sqlc"
)

func ConvertAttempts(rows []sqlc.GetAttemptsForAllWordByUsesIdRow) ([]models.Attempt, error) {
	var attempts []models.Attempt

	for _, row := range rows {

		attempt := models.Attempt{
			WordID:      row.WordID,
			Word: row.Word,
			AttemptWord: row.AttemptWord,
			IsCorrect:   row.IsCorrect,
		}

		attempts = append(attempts, attempt)
	}

	return attempts, nil
}
