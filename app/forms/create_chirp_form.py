from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class CreateChirpForm(FlaskForm):
  content = StringField("content", validators=[DataRequired()])
