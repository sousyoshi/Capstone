from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey


class Genre(db.Model):
    __tablename__ = 'genres'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    genre = db.Column(db.String(50), nullable=False)

    movie_genre = db.relationship('Movie', back_populates='genre_')

    def to_dict(self):
        return {
            'id': self.id,
            'genre': self.genre
        }
