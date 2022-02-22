<div align="center">
<img src="https://img.shields.io/github/commit-activity/y/jburnt17/chirp" />
<img src="https://img.shields.io/github/last-commit/jburnt17/chirp/main" />
<img src="https://img.shields.io/github/pipenv/locked/python-version/jburnt17/chirp" />
<img src="https://img.shields.io/github/pipenv/locked/dependency-version/jburnt17/chirp/flask" />
<img src="https://img.shields.io/github/languages/count/jburnt17/chirp" />
<img src="https://img.shields.io/github/languages/code-size/jburnt17/chirp" />
</div>

<br />
<div align="center">
  <h1>🏒</h1>
  <h3 align="center">Chirp Hockey</h3>

  <p align="center">
    Chirp is an application where users can create lobbies to view and keep up to date on all the games happening in the NHL. Users also have access to a numerous amount of information such as stats, standings, and all the scores of todays games. Start taking your teams support to the next level and join Chirp.
    <br />
    <a href="https://github.com/jburnt17/chirp"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://www.chirphockey.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/jburnt17/chirp/issues">Report Bug</a>
    ·
    <a href="https://github.com/jburnt17/chirp/issues">Request Feature</a>
  </p>
</div>

## About The Project

<br />
<div align="center">
   <img src="https://jmb-s3-bucket.s3.amazonaws.com/chirp.gif" />
</div>
<br />

### Chirp allows users to create lobbies to chat about all things happening in the NHL.

#### Here's some of the key features:
* Implemented Flask Socket IO’s rooms feature in order to prevent receiving chats from other game lobbies.
* Utilized the NHL API to send fetch requests and stored the response using Redux, allowing information to be easily accessed across the entire frontend application.
* Developed application utilizing React components, allowing for reusable, intuitive code and a DRY codebase.

<p align="right">(<a href="#top">back to top</a>)</p>

---


### Built With

* [React.js](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Javascript](https://www.javascript.com/)
* [Flask](https://flask.palletsprojects.com/en/2.0.x/)
* [Python](https://www.python.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [HTML]()
* [CSS]()


<p align="right">(<a href="#top">back to top</a>)</p>

---

## Getting started

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

## Deploy to Heroku

1. Before you deploy, don't forget to run the following command in order to
ensure that your production environment has all of your up-to-date
dependencies. You only have to run this command when you have installed new
Python packages since your last deployment, but if you aren't sure, it won't
hurt to run it again.

   ```bash
   pipenv lock -r > requirements.txt
   ```

2. Create a new project on Heroku
3. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
4. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
5. Run

   ```bash
   heroku login
   ```

6. Login to the heroku container registry

   ```bash
   heroku container:login
   ```

7. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
8. Push your docker container to heroku from the root directory of your project.
   (If you are using an M1 mac, follow [these steps below](#for-m1-mac-users) instead, then continue on to step 9.)
   This will build the Dockerfile and push the image to your heroku container registry.

   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```

9. Release your docker container to heroku

      ```bash
      heroku container:release web -a {NAME_OF_HEROKU_APP}
      ```

10. set up your database

      ```bash
      heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
      heroku run -a {NAME_OF_HEROKU_APP} flask seed all
      ```

11. Under Settings find "Config Vars" and add any additional/secret .env
variables.

12. profit

### For M1 Mac users

(Replaces **Step 8**)

1. Build image with linux platform for heroku servers. Replace
{NAME_OF_HEROKU_APP} with your own tag:

   ```bash=
   docker buildx build --platform linux/amd64 -t {NAME_OF_HEROKU_APP} .
   ```

2. Tag your app with the url for your apps registry. Make sure to use the name
of your Heroku app in the url and tag name:

   ```bash=2
   docker tag {NAME_OF_HEROKU_APP} registry.heroku.com/{NAME_OF_HEROKU_APP}/web
   ```

3. Use docker to push the image to the Heroku container registry:

   ```bash=3
   docker push registry.heroku.com/{NAME_OF_HEROKU_APP}/web
   ```
