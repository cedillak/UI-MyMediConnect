from app_init import create_initialized_flask_app

app = create_initialized_flask_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)