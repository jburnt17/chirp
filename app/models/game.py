from .db import db

class Game(db.Model):
  __tablename__="games"

  id = db.Column(db.Integer, primary_key=True)

  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  team_one = db.Column(db.Integer, nullable=False)
  team_two = db.Column(db.Integer, nullable=False)

  user = db.relationship('User', back_populates="games")

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "team_one": self.team_one,
      "team_two": self.team_two,
    }
