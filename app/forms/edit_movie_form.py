from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired
from app.api.aws_image_routes import ALLOWED_EXTENSIONS



class EditMovie(FlaskForm):
    title = StringField('Movie Title', validators=[DataRequired()])
    description = StringField("Synopsis", validators=[DataRequired()])
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
    image = FileField('Movie Image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    trailer =  FileField('Movie Trailer', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
