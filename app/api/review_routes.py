from flask import Blueprint, request
from app.models import Review
from flask_login import login_required, current_user
from ..models import db
from ..forms.edit_review_form import EditReview



review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')
def reviews():
    """ Query for all reviews"""
    reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in reviews]}

@review_routes.route('/<int:id>')
def review(id):
    review = Review.query.get(id)
    return review.to_dict()

@review_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)

    if review and review.user_id == current_user.id:
        db.session.delete(review)
        db.session.commit()
        return 'Review deleted'
    else:
        return 'Unauthorized user!'


@review_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_review(id):
    review = Review.query.get(id)
    form = EditReview()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review.review = form.data['review']
        review.stars = form.data['stars']

        db.session.commit()
        return review.to_dict()


    return {'errors': form.errors}
