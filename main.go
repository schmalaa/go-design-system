package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	// Serve static files
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	// Serve templates
	// PageData structure for template context
	type MenuItem struct {
		Label string
		Path  string
		Icon  string
	}

	type PageData struct {
		Title       string
		ShowSidebar bool
		ActivePath  string
		MenuItems   []MenuItem
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		tmplPath := filepath.Join("templates", "layout.html")
		var contentPath string

		menuItems := []MenuItem{
			{Label: "Alert", Path: "/components/alert", Icon: "warning-circle"},
			{Label: "Avatar", Path: "/components/avatar", Icon: "user-circle"},
			{Label: "Badge", Path: "/components/badge", Icon: "tag"},
			{Label: "Button", Path: "/components/button", Icon: "hand-pointing"},
			{Label: "Card", Path: "/components/card", Icon: "cards"},
			{Label: "Icon", Path: "/components/icon", Icon: "star"},
			{Label: "Input", Path: "/components/input", Icon: "textbox"},
			{Label: "Modal", Path: "/components/modal", Icon: "browsers"},
		}

		data := PageData{
			Title:       "Go Design System",
			ShowSidebar: false,
			ActivePath:  r.URL.Path,
			MenuItems:   menuItems,
		}

		if r.URL.Path == "/" {
			contentPath = filepath.Join("templates", "index.html")
		} else if r.URL.Path == "/components" {
			contentPath = filepath.Join("templates", "components.html")
			data.ShowSidebar = true
		} else if len(r.URL.Path) > len("/components/") && r.URL.Path[:len("/components/")] == "/components/" {
			compName := r.URL.Path[len("/components/"):]
			contentPath = filepath.Join("templates", "components", compName+".html")
			data.ShowSidebar = true
		} else {
			http.NotFound(w, r)
			return
		}

		// check if file exists
		if _, err := os.Stat(contentPath); os.IsNotExist(err) {
			http.NotFound(w, r)
			return
		}

		tmpl, err := template.ParseFiles(tmplPath, contentPath)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		err = tmpl.ExecuteTemplate(w, "layout", data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server starting on port %s...\n", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
