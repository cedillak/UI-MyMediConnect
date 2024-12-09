from flask import render_template

def register_routes(app):
    @app.route("/")
    def home_route():
        return render_template("home.html")