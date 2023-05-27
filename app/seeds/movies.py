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

    film_five = Movie(
        title='Ratatouille',
        description="A rat who can cook makes an unusual alliance with a young kitchen worker at a famous Paris restaurant.",
        genre=9,
        release_year=2007,
        image='https://posters.movieposterdb.com/07_11/2007/382932/l_382932_bcae738b.jpg',
        trailer='https://www.youtube.com/watch?v=NgsQ8mVkN8w&pp=ygUTcmF0YXRvdWlsbGUgdHJhaWxlcg%3D%3D',
        creator_id=3
    )
    film_six = Movie(
        title='Blade Runner 2049',
        description="Thirty years after the events of Blade Runner (1982), a new Blade Runner, L.A.P.D. Officer K (Ryan Gosling), unearths a long-buried secret that has the potential to plunge what's left of society into chaos. K's discovery leads him on a quest to find Rick Deckard (Harrison Ford), a former L.A.P.D. Blade Runner, who has been missing for thirty years.",
        genre=5,
        release_year=2017,
        image='https://posters.movieposterdb.com/22_06/2017/1856101/l_1856101_d2a12c15.jpg',
        trailer='https://www.youtube.com/watch?v=gCcx85zbxz4&pp=ygUZYmxhZGUgcnVubmVyIDIwNDkgdHJhaWxlcg%3D%3D',
        creator_id=2
    )


    film_seven = Movie(
        title='Spider-Man: Into the Spider-Verse',
        description="Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
        genre=12,
        release_year=2018,
        image='https://posters.movieposterdb.com/22_10/2018/4633694/l_spider-man-into-the-spider-verse-movie-poster_f2427c61.jpg',
        trailer='https://www.youtube.com/watch?v=shW9i6k8cB0',
        creator_id=2
    )

    film_eight = Movie(
        title='Psycho',
        description="A Phoenix secretary embezzles $40,000 from her employer's client, goes on the run and checks into a remote motel run by a young man under the domination of his mother.",
        genre=10,
        release_year=1960,
        image='https://posters.movieposterdb.com/07_11/1998/155975/l_155975_9fa08bde.jpg',
        trailer='https://www.youtube.com/watch?v=NG3-GlvKPcg&pp=ygUOcHN5Y2hvIHRyYWlsZXI%3D',
        creator_id=1
    )


    film_nine = Movie(
        title='Vertigo',
        description="A rat who can cook makes an unusual alliance with a young kitchen worker at a famous Paris restaurant.",
        genre=10,
        release_year=1958,
        image='https://posters.movieposterdb.com/12_11/1958/52357/l_52357_739d6822.jpg',
        trailer='https://www.youtube.com/watch?v=Z5jvQwwHQNY&pp=ygUPdmVydGlnbyB0cmFpbGVy',
        creator_id=3
    )


    film_ten = Movie(
        title='North by Northwest',
        description="A New York City advertising executive goes on the run after being mistaken for a government agent by a group of foreign spies, and falls for a woman whose loyalties he begins to doubt.",
        genre=11,
        release_year=1959,
        image='https://posters.movieposterdb.com/22_09/1959/53125/l_53125_41eb506f.jpg',
        trailer='https://www.youtube.com/watch?v=ek7T9Gyl_J4&pp=ygUZbm9ydGggYnkgbm9ydGh3ZXN0dHJhaWxlcg%3D%3D',
        creator_id=2
    )

    film_eleven = Movie(
        title='Videodrome',
        description="A programmer at a TV station that specializes in adult entertainment searches for the producers of a dangerous and bizarre broadcast.",
        genre=5,
        release_year=1983,
        image='https://posters.movieposterdb.com/21_01/1983/86541/l_86541_7672ac9b.jpg',
        trailer='https://www.youtube.com/watch?v=UFHey3utk0I&pp=ygUSdmlkZW9kcm9tZSB0cmFpbGVy',
        creator_id=3
    )

    film_twelve = Movie(
        title='Scanners',
        description="A scientist trains a man with an advanced telepathic ability called 'scanning' to stop a dangerous Scanner with extraordinary psychic powers from waging war against non scanners.",
        genre=5,
        release_year=1981,
        image='https://posters.movieposterdb.com/14_04/1981/81455/l_81455_4729b8bb.jpg',
        trailer='https://www.youtube.com/watch?v=UveLSA7Hoj8',
        creator_id=2
    )

    film_thirteen = Movie(
        title='The Incredibles',
        description="While trying to lead a quiet suburban life, a family of undercover superheroes are forced into action to save the world.",
        genre=9,
        release_year=2004,
        image='https://posters.movieposterdb.com/14_03/2004/317705/l_317705_5424e490.jpg',
        trailer='https://www.youtube.com/watch?v=-UaGUdNJdRQ',
        creator_id=3
    )



    film_thirtyfive = Movie(
        title='The Fly',
        description="An eccentric scientist changes the world with his teleportation technology: when his experiment seems to be going well, Dr. Seth Brundle tests his machine on himself and he gets fused with the worst kind of pest on Planet Earth; The Fly. What is the price of a man playing God? Only Seth knows.",
        genre=5,
        release_year=1986,
        image='https://posters.movieposterdb.com/10_04/1986/91064/l_91064_6dcd7923.jpg',
        trailer='https://www.youtube.com/watch?v=fj1SHpBsY7w',
        creator_id=2
    )

    film_thirtysix = Movie(
        title='The Thing',
        description="A US research station, Antarctica, early-winter 1982. The base is suddenly buzzed by a helicopter from the nearby Norwegian research station. They are trying to kill a dog that has escaped from their base. After the destruction of the Norwegian chopper the members of the US team fly to the Norwegian base, only to discover them all dead or missing. They do find the remains of a strange creature the Norwegians burned. The Americans take it to their base and deduce that it is an alien life form. After a while it is apparent that the alien can take over and assimilate into other life forms, including humans, and can spread like a virus. This means that anyone at the base could be inhabited by The Thing, and tensions escalate.",
        genre=5,
        release_year=1982,
        image='https://posters.movieposterdb.com/21_04/1982/84787/s_84787_89644b53.jpg',
        trailer='https://www.youtube.com/watch?v=Txjm94GnrPA',
        creator_id=1
    )

    film_thirtyseven = Movie(
        title='Hell or High Water',
        description="Toby is a divorced father who's trying to make a better life. His brother is an ex-con with a short temper and a loose trigger finger. Together, they plan a series of heists against the bank that's about to foreclose on their family ranch.",
        genre=8,
        release_year=2016,
        image='https://posters.movieposterdb.com/21_05/2016/2582782/s_2582782_d7fd6d41.jpg',
        trailer='https://www.youtube.com/watch?v=JQoqsKoJVDw&pp=ygUSaGVsbCBvciBoaWdoIHdhdGVy',
        creator_id=2
    )

    film_thirtyeight = Movie(
        title='The Proposition',
        description="A lawman apprehends a notorious outlaw and gives him nine days to kill his older brother, or else they'll execute his younger brother.",
        genre=8,
        release_year=2005,
        image='https://posters.movieposterdb.com/10_05/2005/421238/l_421238_e7c15446.jpg',
        trailer='https://www.youtube.com/watch?v=G7V-CW_SUos&pp=ygUWdGhlIHByb3Bvc2l0b24gdHJhaWxlcg%3D%3D',
        creator_id=3
    )

    film_thirtynine = Movie(
        title='The Revenant',
        description="A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.",
        genre=8,
        release_year=2015,
        image='https://posters.movieposterdb.com/15_11/2015/1663202/l_1663202_52f470c6.jpg',
        trailer='https://www.youtube.com/watch?v=LoebZZ8K5N0&pp=ygUUdGhlIHJldmVuYW50IHRyYWlsZXI%3D',
        creator_id=2
    )

    film_forty = Movie(
        title='Bone Tomahawk',
        description="In the dying days of the old west, an elderly sheriff and his posse set out to rescue their town's doctor from cannibalistic cave dwellers..",
        genre=8,
        release_year=2015,
        image='https://posters.movieposterdb.com/15_09/2015/2494362/l_2494362_233bbfa3.jpg',
        trailer='https://www.youtube.com/watch?v=0ZbwtHi-KSE&pp=ygUVYm9uZSB0b21haGF3ayB0cmFpbGVy',
        creator_id=3
    )



    db.session.add_all([film_one, film_two, film_three, film_four, film_five, film_six, film_seven, film_eight, film_nine, film_ten, film_eleven, film_twelve, film_thirteen,  film_thirtyfive, film_thirtysix, film_thirtyseven, film_thirtyeight, film_thirtynine, film_forty])
    db.session.commit()


def undo_movies():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.movies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM movies"))

    db.session.commit()
