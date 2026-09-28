from flask import Flask, request

app = Flask(__name__)

# CORS:======================================================================================================================
@app.after_request
def add_cors_response_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        return "", 204                                                          # No Content
        
#============================================================================================================================

@app.route("/breeds", methods=["POST"])
def create_message():
    data = request.get_json()
    message = data["message"]

    with open("dog-breeds.txt", "a", encoding="utf-8") as file:
        file.write(message + '\n')
    return "", 201                                                              # 201: created

@app.route("/breeds", methods=["GET"])
def get_message():
    try:
        with open("dog-breeds.txt", encoding="utf-8") as file:
            message = file.read().splitlines()
        return message, 200
    except FileNotFoundError:
        message = []
    return message, 200                                                         # 200: OK

@app.errorhandler(404)
def page_not_found(error):
    return "The path Not Found. ", 404, {"Content-Type": "text/plain"}