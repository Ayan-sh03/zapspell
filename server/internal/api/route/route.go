package route

import (
	"fmt"
	"net/http"

	"github.com/ayan-sh03/zapspell/internal/api/handler"
	"github.com/gorilla/mux"
)

func SetupRoutes() *mux.Router {

	r := mux.NewRouter()

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, World!")
	})

	userRoutes:= r.PathPrefix("/api/v1/user").Subrouter()
	wordRoutes:=r.PathPrefix("/api/v1/word").Subrouter()
	resultRoutes:=r.PathPrefix("/api/v1/result").Subrouter()
	userRoutes.HandleFunc("/",handler.CreateOrSyncUser).Methods("POST")

	wordRoutes.HandleFunc("/",handler.AddWordToDB).Methods("POST")
	wordRoutes.HandleFunc("/",handler.GetRandomWord).Methods("GET")
	wordRoutes.HandleFunc("/attempt",handler.AddUserAttempt).Methods("POST")
	wordRoutes.HandleFunc("/attempt",handler.GetAllAttempts).Methods("GET")


	resultRoutes.HandleFunc("/",handler.GetResult).Methods("GET")
	
	return r

}