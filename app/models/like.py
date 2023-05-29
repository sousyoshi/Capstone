from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    movie_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('movies.id')))


    def to_dict(self):
        return {
            'id': self.id,
            'owner': self.owner,
            'movieId': self.movie_id
        }
