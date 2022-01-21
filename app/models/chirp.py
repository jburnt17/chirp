from .db import db

class Chirp(db.Model):
  __tablename__="chirps"

  id = db.Column(db.Integer, primary_key=True)

  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
  content = db.Column(db.String, nullable=False)

  user = db.relationship('User', back_populates="chirps")
  game = db.relationship('Game', back_populates="chirps", cascade="all, delete")

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "game_id": self.game_id,
      "content": self.content
    }
