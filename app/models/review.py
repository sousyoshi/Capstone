from email.policy import default
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey
from sqlalchemy.sql import func


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('movies.id')))
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    review = db.Column(db.TEXT, nullable=False)
    stars = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=func.now())



    user = db.relationship('User', back_populates='reviews')
    movie = db.relationship('Movie', back_populates='review')


    def to_dict(self):
        return {
            'id': self.id,
            'movieId': self.movie_id,
            'userId': self.user_id,
            'review': self.review,
            'stars': self.stars,
            'user' : self.user.username,
            'movie' : self.movie.title,
            'createdAt': self.created_at

        }
