"""Flask app for Cupcakes"""

import os

from flask import Flask, request, redirect, render_template, flash, jsonify

from models import db, connect_db, Cupcake, DEFAULT_IMAGE_URL

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", 'postgresql:///cupcakes')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "nibblers"

connect_db(app)
#TODO: update docstrings to give example of returned JSON
@app.get("/api/cupcakes")
def get_all_cupcakes():
    ''' Return JSON with info on all cupcakes '''

    cupcakes = Cupcake.query.all()
    serialized = [c.serialize() for c in cupcakes]

    return jsonify(cupcakes=serialized)


@app.get("/api/cupcakes/<int:cupcake_id>")
def get_cupcake_info(cupcake_id):
    ''' Return JSON with info on a specific cupcake'''

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = cupcake.serialize()

    return jsonify(cupcake=serialized)

@app.post("/api/cupcakes")
def create_cupcake():
    ''' Creates a new cupcake from request data '''

    cupcake = Cupcake(
        flavor = request.json["flavor"],
        size = request.json["size"],
        rating = request.json["rating"],
        image_url = request.json["image_url"] or DEFAULT_IMAGE_URL
    )

    db.session.add(cupcake)
    db.session.commit()

    serialized = cupcake.serialize()

    return (jsonify(cupcake=serialized), 201)

@app.patch("/api/cupcakes/<int:cupcake_id>")
def update_cupcake(cupcake_id):
    ''' Update cupcake using information and returns updated cupcake'''

    cupcake = Cupcake.query.get_or_404(cupcake_id)


    cupcake.flavor = request.json["flavor"],
    cupcake.size = request.json["size"],
    cupcake.rating = request.json["rating"],
    cupcake.image_url = request.json["image_url"]

    db.session.commit()

    serialized = cupcake.serialize()

    return jsonify(cupcake=serialized)

@app.delete("/api/cupcakes/<int:cupcake_id>")
def delete_cupcake(cupcake_id):
    '''Deletes cupcake and returns deleted: cupcake-id'''

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    db.session.delete(cupcake)

    db.session.commit()

    return jsonify(deleted=cupcake_id)


