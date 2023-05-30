
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired








class NewMovie(FlaskForm):
    title = StringField('Movie Title', validators=[DataRequired()])
    description = TextAreaField("Synopsis", validators=[DataRequired()])
    genre = SelectField('Genre', choices=[
        (1, 'Crime'),
        (2, 'Fantasy'),
        (3, 'Comedy'),
        (4, 'Adventure'),
        (5, 'Sci-Fi'),
        (6, 'Drama'),
        (7, 'Horror'),
        (8, 'Western'),
        (9, 'Animation'),
        (10, 'Thriller'),
        (11, 'Mystery' ),
        (12, 'Super-hero')
    ], validators=[DataRequired()])
    release_year = IntegerField('Release Year')
    image = StringField('Movie Image', validators=[DataRequired()])
    trailer = StringField("Movie Trailer")
