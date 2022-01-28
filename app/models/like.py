from .db import db

class Like(db.Model):
    __tablename__="likes"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    chirp_id = db.Column(db.Integer, db.ForeignKey('chirps.id'), nullable=False)

    user = db.relationship('User', back_populates="like")
    chirp = db.relationship('Chirp', back_populates="like")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "chirp_id": self.chirp_id
        }
