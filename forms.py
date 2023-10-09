"""Forms for cupcakes"""


from wtforms import IntegerField, StringField
from flask_wtf import FlaskForm
from wtforms.validators import InputRequired, Optional, Length


class AddCupcakeForm(FlaskForm):
    """Form for adding cupcake"""

    flavor = StringField("Flavor", validators=[InputRequired(), Length(max=50)])
    size = StringField("Size", validators=[InputRequired(), Length(max=15)])
    rating = IntegerField("Rating", validators=[InputRequired()])
    image_url = StringField("Cupcake Picture", validators=[Optional(), Length(max=500)])
