package internal

import (
	"log"
	"net/http"
	"os"

	"github.com/ayan-sh03/zapspell/internal/api/route"
	"github.com/ayan-sh03/zapspell/internal/config"
	"github.com/gorilla/handlers"
	"github.com/joho/godotenv"
	"github.com/rs/cors"

)

type App struct {
}

func (app *App) Run() {
	// load env

	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error Loading Environment Variable", err)
	}
	dsn := os.Getenv("POSTGRESQL_DSN")
	if dsn == "" {
		log.Fatal("POSTGRESQL_DSN environment variable not set")
	}

	config.Connect(dsn)

	r := route.SetupRoutes()
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // Adjust this to your needs
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	// Apply middleware
	loggedRouter := handlers.LoggingHandler(os.Stdout, c.Handler(r))

	// Start the server
	err = http.ListenAndServe(":8080", loggedRouter)
	if err != nil {
		log.Fatal("Error starting the server: ", err)
	}
}
