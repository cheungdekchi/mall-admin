import cookies from 'js-cookie';

export function setUserCookies(info) {
  const arr = Object.entries(info);

  for (let i = 0; i < arr.length; i += 1) {
    cookies.set(arr[i][0], arr[i][1]);
  }
  return true;
}

export function getUserCookies() {
  return {
    appkey: cookies.get('appkey'),
    email: cookies.get('email'),
    username: cookies.get('username'),
    role: cookies.get('role'),
  };
}

export function removeUserCookies() {
  cookies.remove('appkey');
  cookies.remove('email');
  cookies.remove('username');
  cookies.remove('role');
  return true;
}
