const jwt = require('jsonwebtoken');

function extractClaim(token, claim) {
  try {
    let token = localStorage.getItem(key);
    if(!token) {
      console.error('No token found in local storage');
      return null;
    }
    const decodedToken = jwt.decode(token);
    return decodedToken && decodedToken[claim];
  } catch (err) {
    console.error('Failed to decode token', err);
    return null;
  }
}
let claim = 'sub';

console.log(extractClaim(token, claim));