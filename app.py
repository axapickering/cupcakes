"""Flask app for Cupcakes"""

import os

from flask import Flask, request, redirect, render_template, flash, jsonify

from models import db, connect_db, Cupcake, DEFAULT_IMAGE_URL

from forms import AddCupcakeForm

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL", "postgresql:///cupcakes"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "nibblers"

connect_db(app)


@app.get("/")
def display_homepage():
    ''' Displays the homepage '''

    # form = AddCupcakeForm()

    return render_template("index.html")



@app.get("/api/cupcakes")
def get_all_cupcakes():
    """
    Return JSON with info on all cupcakes
    Returns JSON {cupcakes: [{id, flavor, size, rating, image_url}, ...]}

    """

    cupcakes = Cupcake.query.all()
    serialized = [c.serialize() for c in cupcakes]

    return jsonify(cupcakes=serialized)


@app.get("/api/cupcakes/<int:cupcake_id>")
def get_cupcake_info(cupcake_id):
    """
    Return JSON with info on a specific cupcake
    Returns JSON like {cupcake: {id, flavor, size, rating, image_url}}

    """

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = cupcake.serialize()

    return jsonify(cupcake=serialized)


@app.post("/api/cupcakes")
def create_cupcake():
    """
    Creates a new cupcake from request data
    Returns JSON like {cupcake: {id, flavor, size, rating, image_url}

    """

    # form = AddCupcakeForm()

    cupcake = Cupcake(
        flavor=request.json["flavor"],
        size=request.json["size"],
        rating=request.json["rating"],
        image_url=request.json["image_url"] or DEFAULT_IMAGE_URL,
    )

    db.session.add(cupcake)
    db.session.commit()

    serialized = cupcake.serialize()

    return (jsonify(cupcake=serialized), 201)


@app.patch("/api/cupcakes/<int:cupcake_id>")
def update_cupcake(cupcake_id):
    """
    Update cupcake using information and returns updated cupcake
    Takes JSON like {flavor, size, rating, image_url}
        where all are optional
    Returns JSON like {cupcake: {id, flavor, size, rating, image_url}

    """

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    cupcake.flavor = request.json.get("flavor", cupcake.flavor)
    cupcake.size = request.json.get("size", cupcake.size)
    cupcake.rating = request.json.get("rating", cupcake.rating)
    cupcake.image_url = (
        request.json.get("image_url", cupcake.image_url) or DEFAULT_IMAGE_URL
    )

    db.session.commit()

    serialized = cupcake.serialize()

    return jsonify(cupcake=serialized)


@app.delete("/api/cupcakes/<int:cupcake_id>")
def delete_cupcake(cupcake_id):
    """
    Deletes cupcake and returns JSON {deleted: cupcake-id}

    """
    cupcake = Cupcake.query.get_or_404(cupcake_id)

    db.session.delete(cupcake)

    db.session.commit()

    return jsonify(deleted=cupcake_id)
