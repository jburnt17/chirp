from .db import db

class Game(db.Model):
  __tablename__="games"

  id = db.Column(db.Integer, primary_key=True)

  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  game_number = db.Column(db.Integer, nullable=False)
  date = db.Column(db.DateTime, nullable=False)

  user = db.relationship('User', back_populates="games")
  chirps = db.relationship('Chirp', back_populates="game", cascade="all,delete")

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "game_number": self.game_number,
      "date": self.date
    }
