import express from 'express';
import querystring from 'querystring';
import request from 'request';
import uuid from 'uuid/v4';

import db from '../config/db';

const router = express.Router();

var client_id = 'ef9c41ca2ea544408f06c9dff22bf382'; // Your client id
var client_secret = '67d40af6b7bd491e924a6d9d842b624b'; // Your secret
var redirect_uri = 'http://localhost:8080/api/songs/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

var stateKey = 'spotify_auth_state';


router.get('/', (req, res)=>{

})

router.get('/login', function(req, res) {

  var state = uuid();
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'streaming user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

router.get('/callback', async (req, res)=> {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('./#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, async function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, async function(error, response, body) {
        //   console.log(body);
        });
        await db.query('UPDATE TABLE users SET access_code = ? and refresh_code = ? WHERE id = ?', [access_token, refresh_token, req.user.id]);
        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:8000/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('./#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

router.get('/refresh_token', async (req, res)=> {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, async function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      await db.query('UPDATE TABLE users SET access_code = ? WHERE id = ?', [access_token, req.user.id]);

      res.send({
        'access_token': access_token
      });
    }
  });
});

export default router;