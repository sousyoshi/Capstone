from app.models import db, Movie, environment, SCHEMA
from sqlalchemy.sql import text


def seed_movies():
    film_one = Movie(
        title='Brazil',
        description="Sam Lowry (Jonathan Pryce) is a harried technocrat in a futuristic society that is needlessly convoluted and inefficient. He dreams of a life where he can fly away from technology and overpowering bureaucracy, and spend eternity with the woman of his dreams. While trying to rectify the wrongful arrest of one Harry Buttle (Brian Miller), Lowry meets the woman he is always chasing in his dreams, Jill Layton (Kim Greist). Meanwhile, the bureaucracy has fingered him responsible for a rash of terrorist bombings, and Sam and Jill's lives are put in danger.",
        genre=5,
        release_year=1985,
        image='https://posters.movieposterdb.com/06_06/1985/0088846/l_119646_0088846_96868df8.jpg',
        trailer='https://www.youtube.com/watch?v=ZKPFC8DA9_8',
        creator_id=1)

    film_two = Movie(
        title='Goodfellas',
        description="The story of Henry Hill and his life in the mafia, covering his relationship with his wife Karen and his mob partners Jimmy Conway and Tommy DeVito.",
        genre=1,
        release_year=1990,
        image='https://posters.movieposterdb.com/14_06/1990/99685/l_99685_3c1fb0a3.jpg',
        trailer='https://www.youtube.com/watch?v=qo5jJpHtI1Y',
        creator_id=1)

    film_three = Movie(
        title='Amadeus',
        description="The life, success and troubles of Wolfgang Amadeus Mozart, as told by Antonio Salieri, the contemporaneous composer who was deeply jealous of Mozart's talent and claimed to have murdered him.",
        genre=6,
        release_year=1984,
        image='https://posters.movieposterdb.com/21_12/1984/86879/s_86879_2e87a3a0.jpg',
        trailer='https://www.youtube.com/watch?v=r7kWQj9FCGY&pp=ygUPYW1hZGV1cyB0cmFpbGVy',
        creator_id=1)

    film_four = Movie(
        title='House',
        description="A schoolgirl and six of her classmates travel to her aunt's country home, which turns out to be haunted.",
        genre=7,
        release_year=1977,
        image='https://posters.movieposterdb.com/08_11/1977/76162/s_76162_fca44a52.jpg',
        trailer='https://www.youtube.com/watch?v=WQ_Yo06kIIA&t=17s&pp=ygUKaG91c2UgMTk3Nw%3D%3D',
        creator_id=2
    )

    db.session.add_all([film_one, film_two, film_three, film_four])
    db.session.commit()


def undo_movies():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.movies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM movies"))

    db.session.commit()
