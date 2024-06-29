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

func init() {
	validate = validator.New()
}

func AddWordToDB(w http.ResponseWriter, r *http.Request) {
	var word models.Word

	decoder := json.NewDecoder(r.Body)

	err := decoder.Decode(&word)
	if err != nil {
		log.Fatal("Error: Invalid Json", err.Error())
		utils.RespondWithError(w, http.StatusBadRequest, "Error: "+err.Error())
	}
	err = validate.Struct(word)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		utils.RespondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	que := sqlc.New(config.DB())

	_, err = que.AddWord(context.Background(), word.Word)

	if err != nil {
		log.Fatal("Error Adding word to DB", err.Error())
		utils.RespondWithError(w, http.StatusInternalServerError, "Internal Server Error")
	}

	utils.RespondWithJSON(w, http.StatusOK, "Word Added succussfully")
}
