from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Game, Chirp, db
from app.forms import CreateGameForm, CreateChirpForm

game_routes = Blueprint('games', __name__)

@game_routes.route('')
@login_required
def load_games():
  games = Game.query.all()
  return {'games': [game.to_dict() for game in games]}

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

@game_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_game(id):
  game = Game.query.get(id)
  result = game.to_dict()
  game_to_delete = db.session.query(Game).filter(Game.id == id).first()

  db.session.delete(game_to_delete)
  db.session.commit()
  return result

@game_routes.route('/<int:id>/chirps', methods=["POST"])
@login_required
def add_chirp(id):
  form = CreateChirpForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    content = form.data['content']
    new_chirp = Chirp(
      content=content,
      user_id=current_user.id,
      game_id=id
    )
    db.session.add(new_chirp)
    db.session.commit()
    return new_chirp.to_dict()
  return {"error": form.errors}
