from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Chirp, Like

like_routes = Blueprint('likes', __name__)

@like_routes.route('')
@login_required
def get_likes():
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}

@like_routes.route('/<int:chirp_id>', methods=["POST"])
@login_required
def make_like(chirp_id):
    new_like = Like(user_id=current_user.id, chirp_id=chirp_id)
    db.session.add(new_like)
    db.session.commit()
    return new_like.to_dict()

@like_routes.route('/<int:chirp_id>', methods=["DELETE"])
@login_required
def remove_like(chirp_id):
    chirp = Chirp.query.get(chirp_id)
    likes = Like.query.all()
    user_likes = [like for like in likes if like.user_id == current_user.id]
    for like in user_likes:
        if like.chirp_id == chirp_id:
            like_to_delete = like
    Like.query.filter_by(id = like_to_delete.id).delete()
    db.session.commit()
    return like_to_delete.to_dict()
