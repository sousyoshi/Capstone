from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey


class Movie(db.Model):
    __tablename__ = 'movies'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String)
    genre = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('genres.id')))
    release_year = db.Column(db.Integer)
    image = db.Column(db.String)
    trailer = db.Column(db.String)
    creator_id = db.Column(db.Integer, ForeignKey(
        add_prefix_for_prod('users.id')))

    creator = db.relationship('User', back_populates='movies')
    genre_ = db.relationship('Genre', back_populates='movie_genre')
    review = db.relationship(
        'Review', back_populates='movie', cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='liked',
                            cascade='all, delete-orphan')

    def to_dict(self):

        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            "genre": self.genre,
            'genreStr': self.genre_.genre,
            'releaseYear': self.release_year,
            'image': self.image,
            'trailer': self.trailer,
            'creatorId': self.creator_id,
            'review': [review.to_dict() for review in self.review],
            'creator': self.creator.username,
            'like': [like.to_dict() for like in self.likes]

        }
