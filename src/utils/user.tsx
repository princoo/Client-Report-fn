import decodeToken from './token';
import roles from './roles';

export function isMentor(token: string | null) {
  const user = decodeToken(token);
  if (user.role === roles.CATS_MENTOR) {
    return true;
  }
  return false;
}
export function isOwner(id: string, token: string | null) {
  const user = decodeToken(token);
  if (user.id === id) {
    return true;
  }
  return false;
}
