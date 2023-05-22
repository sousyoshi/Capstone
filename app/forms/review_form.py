from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, NumberRange, ValidationError
from app.models import Review

def review_exists(form, field):
    review_data = field.data
    review = Review.query.filter(Review.id == review_data).first()
    if review:
        raise ValidationError("This review already exists.")



class NewReview(FlaskForm):
    review = TextAreaField('Leave a review', validators=[DataRequired()])
    stars = IntegerField('Rate the movie', validators=[DataRequired(), NumberRange(1, 10)])
