from flask import Blueprint, request
from app.models import Movie
from flask_login import login_required, current_user
from ..models import db
from ..forms.movie_form import NewMovie


movie_routes = Blueprint('movies', __name__)


@movie_routes.route('/')
def movies():
    """
    Query for all movies
    """
    movies = Movie.query.all()
    return {'movies': [movie.to_dict() for movie in movies]}


@movie_routes.route('/<int:id>')
def movie(id):
    """ Query for a movie by its id"""
    movie = Movie.query.get(id)
    return movie.to_dict()


@movie_routes.route('/new', methods=['POST'])
@login_required
def add_movie():
    """ Query for creating a new ovie"""
    form = NewMovie()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        movie = Movie(
            title=form.data['title'], creator_id=current_user.id,
            description = form.data['description'],
            genre = form.data['genre'],
            release_year = form.data['release_year'],
            image = form.data['image'],
            trailer = form.data['trailer']
              )
        db.session.add(movie)
        db.session.commit()
        return movie.to_dict()

    return {'errors': form.errors}


@movie_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_movie(id):
    """Query for a movie to deleted by its id"""
    movie = Movie.query.get(id)
    if movie.creator_id == current_user.id:
        db.session.delete(movie)
        db.session.commit()
        return "Movie deleted"
    else:
        return 'Unauthorized user!'
