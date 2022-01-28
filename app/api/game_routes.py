from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Game, Chirp, db
from app.forms import CreateGameForm, CreateChirpForm, EditChirpForm
from datetime import datetime

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
  current_date = datetime.now()

  if form.validate_on_submit():
    game_number = form.data['game_number']

    new_game = Game(
      user_id = current_user.id,
      game_number = game_number,
      date = current_date
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
  print('this is the date', str(test))

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

@game_routes.route('/<int:id>/chirps')
@login_required
def get_chirps(id):
  chirps = Chirp.query.filter_by(game_id=id)
  return {'chirps': [chirp.to_dict() for chirp in chirps]}

@game_routes.route('/<int:game_id>/chirps/<int:chirp_id>', methods=["PUT"])
@login_required
def edit_chirp(game_id, chirp_id):
  chirp = Chirp.query.get(chirp_id)
  form = EditChirpForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  chirp.content = form.data['content']
  db.session.commit()
  return chirp.to_dict()

@game_routes.route('/<int:game_id>/chirps/<int:chirp_id>', methods=["DELETE"])
@login_required
def delete_chirp(game_id, chirp_id):
  chirp = Chirp.query.get(chirp_id)
  result = chirp.to_dict()
  chirp = db.session.query(Chirp).filter(Chirp.id == chirp_id).first()
  db.session.delete(chirp)
  db.session.commit()
  return result
