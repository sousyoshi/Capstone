# Flickpicks

Flickpicks is movie database website inspired by [imdB](https://imdb.com) and [Netflix](https://netflix.com). Flickpicks can be used to add and review movies. Users can also like and search for movies.

**Live Site: [Flickpicks](https://flickpicks-xz8s.onrender.com)

#### Please see below links to project Wiki:
* [Feature List](https://github.com/tchristenson/SoundCloud-Clone/blob/main/feature_list.md)
* [Database Schema](https://github.com/tchristenson/SoundCloud-Clone/blob/main/DbDiagram.png)



#### How to start project locally:
1. Clone the project repo into the desired location on your machine (https://https://github.com/sousyoshi/Capstone)
2. Create a **.env** file based on the example with proper settings for your development environment.
3. cd into the react-app directory and run the command below to install all dependencies
      ```bash
      npm install
      ```
4. Inside the root directory, run the following command:
      ```bash
      pipenv install -r requirements.txt
      ```
5. Still inside the root directory, run the commands below. Once executed, the database should be seeded and running:

      ```bash
      pipenv shell
      flask db init
      flask db migrate
      flask db upgrade
      flask seed all
      flask run
      ```

6. cd into the react-app directory and run the following command:
      ```bash
      npm start
      ```

7. Browse the site and enjoy

### Splash Page
![Splash Page]()
### Movies Page
![All Movies Page]()
### Single Movie Page
![Single Movie Page]()
### User Profile Page
![User Profile Page]()

### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /api/auth | To authenticate a user |
| POST | /api/auth/login | To login an existing user account |
| GET | /api/auth/logout | To logout the current user |
| POST | /api/auth/signup | To create a new user and log them in |
| GET | /api/auth/unauthorized | To return unauthorized JSON when login authentication fails |
| GET | /api/users | Queries for all users and returns each user as an object inside an array |
| GET | /api/users/:userId | Queries for a single user and returns that user as an object |
| GET | /api/movies | Queries for all movies and returns the movies as a list of dictionaries |
| GET | /api/movies/:movieId | Query for an movie by id and returns that movie in a dictionary |
| DELETE | /api/movies/:movieId/delete | Handles deleting movie by its id if the movie is owned by current user |
| POST | /api/movies/new | Allows a user to create a new movie |
| PUT | /api/movies/:movieId/edit | Handles editing an movie's details if the movie owner is the logged in user |
| GET/DELETE | /api/movies/:movieId/like | Handles liking a movie if an authorized user is logged in |
| POST | /api/movies/:movieId/reviews | Handles adding a review to a movie if user |
| GET | /api/reviews | Queries for all reviews and returns the reviews as a list of dictionaries |
| GET | /api/reviews/:reviewId | Query for a review by id and returns that review in a dictionary |
| DELETE | /api/reviews/:reviewId/delete | Handles deleting a review by its id if the review is owned by current user |
| PUT | /api/reviews/:reviewId/edit | Allows a logged in user to edit their review by its id |
| DELETE | /api/songs/delete/:albumId | Handles deletion of a song by its id if the song is owned by current user |


### Technologies Used:
* [Python](https://docs.python.org/3/)
* [JavaScript](https://devdocs.io/javascript/)
* [PostgreSQL](https://www.postgresql.org/docs/)
* [Flask](https://flask.palletsprojects.com/en/2.3.x/)
* [React](https://react.dev/)
* [Redux](https://redux.js.org/)


## Landing Page
You can access the Login and Signup Modal here. Also, we have a demo user button for you to check the website.

**Home Page: [Flickpicks](https://flickpicks-xz8s.onrender.com)**

### Author
+ [Josh Johnson](https://github.com/sousyoshi)
