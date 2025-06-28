/* tells spotify users are tyring to login through my app */
const clientID = 'f9421397d4db4d02b5c7041c0b49f247';
/* redirect back to my app after log in */
const redirectURL = 'https://jammtogether.netlify.app/';
/* what kinds of permission i am asking from spotify --> edit private and pubic playlist */
const scope = "playlist-modify-public playlist-modify-private user-read-private";

/* the base of the url */
const base = 'https://accounts.spotify.com/authorize';
/* to format redirect url since they cant contain characters */
const encodedRedirect = encodeURIComponent(redirectURL);
const encodedScope = encodeURIComponent(scope);

/* builds the full login link */
export const AUTH_ENDPOINT = `${base}?client_id=${clientID}&response_type=token&redirect_uri=${encodedRedirect}&scope=${encodedScope}`;