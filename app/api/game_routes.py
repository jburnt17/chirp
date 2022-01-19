from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Game, db
from app.forms import CreateGameForm

game_routes = Blueprint('games', __name__)

@game_routes.route('', methods=["POST"])
@login_required
def add_game():
  form = CreateGameForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    game_number = form.data['game_number']

    new_game = Game(
      user_id = current_user.id,
      game_number = game_number,
    )
    db.session.add(new_game)
    db.session.commit()
    return new_game.to_dict()
  return {"error": form.errors}
