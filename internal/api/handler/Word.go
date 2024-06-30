package handler

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"log"
	"net/http"

	"github.com/ayan-sh03/zapspell/internal/api/handler/helper"
	"github.com/ayan-sh03/zapspell/internal/api/models"
	"github.com/ayan-sh03/zapspell/internal/api/utils"
	"github.com/ayan-sh03/zapspell/internal/config"
	"github.com/ayan-sh03/zapspell/internal/sqlc"
	"github.com/go-playground/validator/v10"
)

func init() {
	validate = validator.New()
}

type userRequest struct {
	Username string `json: "username" `
}

func AddWordToDB(w http.ResponseWriter, r *http.Request) {
	var word models.Word

	decoder := json.NewDecoder(r.Body)

	err := decoder.Decode(&word)
	if err != nil {
		log.Fatal("Error: Invalid Json", err.Error())
		utils.RespondWithError(w, http.StatusBadRequest, "Error: "+err.Error())
		return
	}
	err = validate.Struct(word)
	if err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	que := sqlc.New(config.DB())

	_, err = que.AddWord(context.Background(), word.Word)

	if err != nil {
		log.Fatal("Error Adding word to DB", err.Error())
		utils.RespondWithError(w, http.StatusInternalServerError, "Internal Server Error")
	}

	utils.RespondWithJSON(w, http.StatusOK, map[string]string{"message": "Word Added succussfully"})
}

// The `AddUserAttempt` function handles adding a user's attempt to a database after validating the
// input data.
func AddUserAttempt(w http.ResponseWriter, r *http.Request) {
	// Get user Id
	var attempt models.Attempt

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&attempt)
	if err != nil {
		log.Println("Invalid JSON: ", err)
		utils.RespondWithError(w, http.StatusBadRequest, "Invalid JSON")
		return
	}

	if err = validate.Struct(attempt); err != nil {
		log.Println("Validation error: ", err)
		utils.RespondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	username := attempt.Username

	// Get user_id from username
	que := sqlc.New(config.DB())

	user, err := que.GetUserByUsername(context.Background(), username)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			log.Println("User not found: ", username)
			utils.RespondWithError(w, http.StatusNotFound, "User not found")
		} else {
			log.Println("Error fetching user: ", err)
			utils.RespondWithError(w, http.StatusInternalServerError, "Internal Server Error")
		}
		return
	}

	params := sqlc.AddAttemptParams{
		UserID:      user.ID,
		WordID:      attempt.WordID,
		AttemptWord: attempt.AttemptWord,
		IsCorrect:   attempt.IsCorrect,
	}

	err = que.AddAttempt(context.Background(), params)
	if err != nil {
		log.Println("Error while inserting Attempt: ", err)
		utils.RespondWithError(w, http.StatusInternalServerError, "Internal Server Error")
		return
	}
	utils.RespondWithJSON(w, http.StatusOK, map[string]interface{}{"message": "OK"})
}

func GetResult(w http.ResponseWriter, r *http.Request) {
	var userRequest userRequest
	// get user id

	decoder := json.NewDecoder(r.Body)

	if err := decoder.Decode(&userRequest); err != nil {
		log.Println("Invalid JSON: ", err)
		utils.RespondWithError(w, http.StatusBadRequest, "Invalid JSON")
		return
	}

	que := sqlc.New(config.DB())

	user, err := que.GetUserByUsername(context.Background(), userRequest.Username)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			log.Println("User not found: ", userRequest)
			utils.RespondWithError(w, http.StatusNotFound, "User not found")
		} else {
			log.Println("Error fetching user: ", err)
			utils.RespondWithError(w, http.StatusInternalServerError, "Internal Server Error")
		}
		return
	}

	// get results

	res, err := que.GetResultByUserID(context.Background(), sql.NullInt32{
		Int32: user.ID,
		Valid: true,
	})

	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Internal Server Error")
		return
	}

	output := models.Result{
		Username:          userRequest.Username,
		CorrectSpellings:  res.CorrectSpellings.Int32,
		TotalAttempts:     res.TotalAttempts.Int32,
		SuccessPercentage: res.SuccessPercentage.String,
	}

	utils.RespondWithJSON(w, http.StatusOK, map[string]interface{}{"data": output})

}

func GetAllAttempts(w http.ResponseWriter, r *http.Request) {
	var userRequest userRequest

	decoder := json.NewDecoder(r.Body)

	if err := decoder.Decode(&userRequest); err != nil {
		log.Println("Invalid JSON: ", err)
		utils.RespondWithError(w, http.StatusBadRequest, "Invalid JSON")
		return
	}

	que := sqlc.New(config.DB())

	user, err := que.GetUserByUsername(context.Background(), userRequest.Username)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			log.Println("User not found: ", user.Username)
			utils.RespondWithError(w, http.StatusNotFound, "User not found")
		} else {
			log.Println("Error fetching user: ", err)
			utils.RespondWithError(w, http.StatusInternalServerError, "Internal Server Error")
		}
		return
	}

	res, err := que.GetAttemptsForAllWordByUsesId(context.Background(), user.ID)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Internal Server Error")
		return
	}

	output, err := helper.ConvertAttempts(res)

	if err != nil {
		log.Fatal("Error Converting DB:Attempts to Output attempts")
		utils.RespondWithError(w, http.StatusInternalServerError, "Internal Server Error")
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, map[string]interface{}{"message": "OK", "data": output})

}
