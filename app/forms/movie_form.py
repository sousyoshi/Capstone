from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired



class NewMovie(FlaskForm):
    title = StringField('Movie Title', validators=[DataRequired()])
    description = TextAreaField("Synopsis", validators=[DataRequired()])
    genre = StringField('Genre')
    release_year = IntegerField('Release Year')
    image = StringField('Movie Image', validators=[DataRequired()])
    trailer = StringField("Movie Trailer")
