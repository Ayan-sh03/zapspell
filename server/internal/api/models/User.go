package models
type User struct {
    ID       int32  `json:"id"`
    Username string `json:"username" validate:"required"`
    Email    string `json:"email" validate:"required,email"`
}