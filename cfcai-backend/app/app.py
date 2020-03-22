from flask import Flask
from flask_restful import reqparse
from flask_cors import CORS, cross_origin


parser = reqparse.RequestParser()
parser.add_argument("text", type=str, help="Text to validate")


app = Flask(__name__)
CORS(app)


@app.route("/", methods=["POST"])
@cross_origin()
def validate():

    args = parser.parse_args()

    return {
        "original_text": args["text"],
        "is_related": True,
        "reliability": 0.7,
        "sources": ["url1", "url2", "url3"],
        "validated_text": "Super validated text",
    }


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
