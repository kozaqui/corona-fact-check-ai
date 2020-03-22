from flask import Flask
from flask_restful import reqparse
from .validate import validate_text


parser = reqparse.RequestParser()
parser.add_argument("text", type=str, help="Text to validate")


app = Flask(__name__)


@app.route("/", methods=["POST"])
def validate():

    args = parser.parse_args()
    result = validate_text(args['text'])
    return result


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
