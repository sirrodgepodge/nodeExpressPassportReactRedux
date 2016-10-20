// convert mongoose models to object and get rid of sensitive properties
export default function cleanUserObj(user) {
  user = user.constructor.name === 'model' ? user.toObject() : user;

  user.hasPassword = !!user.password;
  delete user.password;
  delete user.salt;
  return user;
}
