# build stage
FROM golang:alpine AS builder
RUN apk add --no-cache git gcc libc-dev
WORKDIR /go/src/github.com/ayan-sh03/zapspell
COPY . .
RUN go mod tidy
RUN go build -o /go/bin/app cmd/api/main.go

# final stage
FROM alpine:latest
LABEL Name=appName Version=0.0.1
RUN apk --no-cache add ca-certificates
COPY --from=builder /go/bin/app /app
WORKDIR /
ENTRYPOINT ["./app"]
EXPOSE 8080
