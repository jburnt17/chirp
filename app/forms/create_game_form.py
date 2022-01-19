from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import InputRequired

class CreateGameForm(FlaskForm):
  game_number = IntegerField("game_number")
