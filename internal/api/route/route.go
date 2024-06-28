package route

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func SetupRoutes() *mux.Router {

	r := mux.NewRouter()

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, World!")
	})

	return r

}
