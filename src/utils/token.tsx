import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  email: string;
  role: string;
  firstName: string;
}
function decodeToken(token: string | null) {
  const decodedToken: DecodedToken = jwtDecode(token!);
  return decodedToken;
}

export default decodeToken;
