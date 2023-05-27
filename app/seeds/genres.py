from app.models import db, Genre, environment, SCHEMA
from sqlalchemy.sql import text


def seed_genres():
    crime = Genre(genre = 'Crime')
    fanstasy = Genre(genre = 'Fantasy')
    comedy = Genre(genre = 'Comedy')
    adventure = Genre(genre = 'Adventure')
    sci_fi = Genre(genre = 'Sci-Fi')
    drama = Genre(genre = 'Drama')
    horror = Genre(genre = 'Horror')
    western = Genre(genre = 'Western')
    animation = Genre(genre = 'Animation')
    thriller = Genre(genre = 'Thriller')
    mystery = Genre(genre = 'Mystery')
    super_hero = Genre(genre = 'Super-hero')

    db.session.add_all([crime, fanstasy, comedy, adventure, sci_fi, drama, horror, western, animation, thriller, mystery, super_hero])

    db.session.commit()


def undo_genres():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.genres RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM genres"))

    db.session.commit()
