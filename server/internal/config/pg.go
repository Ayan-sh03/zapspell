package config

import (
	"database/sql"
	"log"
	_"github.com/lib/pq"
)

var db *sql.DB

func Connect(dsn string) {
	conn, err := sql.Open("postgres", dsn)

	if err != nil {
		log.Fatal("Error While connecting to Database")
		return
	}
	log.Println("Connected to DB 🚀!")
	db = conn

}


func DB()*sql.DB{
	return db
}
func Close() error {
    if db != nil {
        return db.Close()
    }
    return nil
}