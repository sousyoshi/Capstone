from app.models import db, Movie, environment, SCHEMA
from sqlalchemy.sql import text


def seed_movies():
    film_one = Movie(title='Brazil',
                     description="Sam Lowry (Jonathan Pryce) is a harried technocrat in a futuristic society that is needlessly convoluted and inefficient. He dreams of a life where he can fly away from technology and overpowering bureaucracy, and spend eternity with the woman of his dreams. While trying to rectify the wrongful arrest of one Harry Buttle (Brian Miller), Lowry meets the woman he is always chasing in his dreams, Jill Layton (Kim Greist). Meanwhile, the bureaucracy has fingered him responsible for a rash of terrorist bombings, and Sam and Jill's lives are put in danger.",
                     genre='Sci-Fi',
                     release_year=1985,
                     image='https://www.cinematerial.com/movies/brazil-i88846/p/ldq2k2cl',
                     trailer='https://www.youtube.com/watch?v=ZKPFC8DA9_8',
                     creator_id=1)

    db.session.add(film_one)
    db.session.commit()


def undo_movies():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.movies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM movies"))

    db.session.commit()
