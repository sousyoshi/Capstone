from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired



class NewMovie(FlaskForm):
    title = StringField('Movie Title', validators=[DataRequired()])
    description = StringField("Synopsis", validators=[DataRequired()])
    genre = StringField('Genre')
    release_year = IntegerField('Release Year')
    image = StringField('Movie Image')
    trailer = StringField("Movie Trailer")
