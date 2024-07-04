package handler

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/ayan-sh03/zapspell/internal/api/models"
	"github.com/ayan-sh03/zapspell/internal/api/utils"
	"github.com/ayan-sh03/zapspell/internal/config"
	"github.com/ayan-sh03/zapspell/internal/sqlc"
	"github.com/go-playground/validator/v10"
)

var validate *validator.Validate

func init() {
	validate = validator.New()
}

func CreateOrSyncUser(w http.ResponseWriter, r *http.Request) {
	var user models.User
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&user); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Invalid JSON")
		return
	}

	// Validate the user struct
	err := validate.Struct(user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		utils.RespondWithError(w,http.StatusBadRequest,err.Error())
		return
	}

	que := sqlc.New(config.DB())

	params := sqlc.CreateUserParams{
		Username: user.Username,
		Email:    user.Email,
	}

	err = que.CreateUser(context.Background(), params)

	if err != nil {
		log.Printf("Error creating User: %v", err)
		utils.RespondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, map[string]string{"message": "User created successfully"})

}
