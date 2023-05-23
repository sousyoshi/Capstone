from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, NumberRange


class EditReview(FlaskForm):
    review = TextAreaField('Leave a review', validators=[DataRequired()])
    stars = IntegerField('Rate the movie', validators=[DataRequired(), NumberRange(1, 10)])
