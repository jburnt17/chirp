from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CreateGameForm(FlaskForm):
  game_number = IntegerField("game_number", validators=[DataRequired()])
