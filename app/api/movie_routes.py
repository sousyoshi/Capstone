from flask import Blueprint
from app.models import Movie


movie_routes = Blueprint('movies', __name__)


@movie_routes.route('/')
def movies():
    """
    Query for all movies
    """
    movies = Movie.query.all()
    return {'movies': [movie.to_dict() for movie in movies]}


@movie_routes.route('<int:id>')
def movie(id):
    """ Query for a movie by its id"""
    movie = Movie.query.get(id)
    return movie.to_dict()
