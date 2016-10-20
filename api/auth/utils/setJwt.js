import jwt from 'jsonwebtoken';

export default function setJwt(req, res) {
  const expiresIn = process.env.JWT_LENGTH || 60 * 60 * 24 * 180 * 1000; // default to 180 days
  const token = jwt.sign({ _id: req.user._id.toString() }, process.env.JWT_SECRET, { expiresIn });
  res.cookie('auth_token', token, {
    maxAge: expiresIn,
    httpOnly: true
  });
}
