from flask import Flask

def create_initialized_flask_app():
    app = Flask(__name__, static_folder='static')
    app.config['SECRET_KEY'] = 'supersecretflaskskey'

    from routes import register_routes
    register_routes(app)

    return app