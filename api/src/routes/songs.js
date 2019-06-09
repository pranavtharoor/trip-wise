import express from 'express';
import querystring from 'querystring';
import request from 'request';
import uuid from 'uuid/v4';

import db from '../config/db';

const router = express.Router();

var client_id = 'ef9c41ca2ea544408f06c9dff22bf382'; // Your client id
var client_secret = '67d40af6b7bd491e924a6d9d842b624b'; // Your secret
var redirect_uri = 'http://localhost:8080/api/songs/callback'; // Your redirect uri

var stateKey = 'spotify_auth_state';

const checkToken = userid => {
  return new Promise(async (resolve, reject) => {
    try {
      const now = new Date().getTime() + 10000;
      const details = await db.query('SELECT * FROM users WHERE id=?', [
        userid
      ]);
      const user = details[0];
      console.log(now,user.timeleft);
      if (!user.access_token || !user.refresh_token)
        return reject('User not authorized on spotify');
      if (now > parseInt(user.timeleft)) {
        var refresh_token = user.refresh_token;
        var authOptions = {
          url: 'https://accounts.spotify.com/api/token',
          headers: {
            Authorization:
              'Basic ' +
              new Buffer(client_id + ':' + client_secret).toString('base64')
          },
          form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
          },
          json: true
        };

        request.post(authOptions, async function(error, response, body) {
          if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            await db.query(
              'UPDATE users SET access_token = ?, timeleft = ? WHERE id = ?',
              [access_token, now + body.expires_in * 1000, userid]
            );
            return resolve(access_token);
          } else {
            throw error;
          }
        });
      } else {
        return resolve(user.access_token);
      }
    } catch (err) {
      reject(err);
    }
  });
};

router.get('/', async (req, res) => {
  try {
    let token = await checkToken(req.user.id);
    res.sendSuccess(token);
  } catch (err) {
    res.sendError(err, 'User not logged into sporitfy');
  }
});

router.get('/login', function(req, res) {
  var state = uuid();
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope =
    'user-read-recently-played user-top-read user-library-modify user-library-read playlist-read-private playlist-modify-public playlist-modify-private playlist-read-collaborative user-read-email user-read-birthdate user-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming user-follow-read user-follow-modify';
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
});

router.get('/callback', async (req, res) => {
  console.log('getting called back');
  // your application requests refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/trips');
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
        Authorization:
          'Basic ' +
          new Buffer(client_id + ':' + client_secret).toString('base64')
      },
      json: true
    };

    request.post(authOptions, async function(error, response, body) {
      console.log(error, response.statusCode);
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;
          const now = new Date().getTime() + 10000;

        // console.log(access_token);
        await db.query(
          'UPDATE users SET access_token = ?, refresh_token = ?, timeleft = ? WHERE id = ?',
          [access_token, refresh_token,now+ body.expires_in*1000, req.user.id]
        );
        // we can also pass the token to the browser to make requests from there
        // let token = await checkToken(req.user.id);
        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: {
            Authorization: 'Bearer ' + token
          },
          json: true
        };
        console.log('spot');
        // use the access token to access the Spotify Web API
        request.get(options, async function(error, response, body) {
          if (!error && response.statusCode === 200) {
            await db.query('UPDATE users SET spot_id = ? WHERE id = ?', [
              body.id,
              req.user.id
            ]);
            console.log(response.body);
            return res.sendSuccess(body);
          } else {
            return res.send({
              success: false
            });
          }
        });
        res.redirect('/trips');
      } else {
        res.redirect('/trips');
      }
    });
  }
});

// router.get('/refresh_token', async (req, res) => {
//   // requesting access token from refresh token
//   var refresh_token = req.query.refresh_token;
//   var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: {
//       Authorization:
//         'Basic ' +
//         new Buffer(client_id + ':' + client_secret).toString('base64')
//     },
//     form: {
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     },
//     json: true
//   };

//   request.post(authOptions, async function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var access_token = body.access_token;
//       await db.query('UPDATE users SET access_token = ? WHERE id = ?', [
//         access_token,
//         req.user.id
//       ]);

//       res.send({
//         access_token: access_token
//       });
//     } else {
//       res.send({
//         success: false
//       });
//     }
//   });
// });

router.get('/search', async (req, res) => {
  try {
    let token = await checkToken(req.user.id);
    var options = {
      url:
        'https://api.spotify.com/v1/search?' +
        querystring.stringify({
          q: req.query.q,
          type: 'track',
          market: 'US',
          limit: 10,
          offset: 0
        }),
      headers: {
        Authorization: 'Bearer ' + token
      },
      json: true
    };
    request.get(options, async function(error, response, body) {
      console.log(response.body);
      if (!error && response.statusCode === 200)
        res.send({
          success: true,
          data: body
        });
      else
        res.send({
          success: false
        });
    });
  } catch (err) {
    res.sendError(err);
  }
});

router.post('/create_playlist', async (req, res) => {
  console.log('here');
  try {
    let token = await checkToken(req.user.id);
    var details = await db.query('SELECT spot_id FROM users where id = ?', [
      req.user.id
    ]);
    var user = details[0];
    console.log('userid',user.spot_id);
    console.log(token)
    var options = {
      url: `https://api.spotify.com/v1/users/${user.spot_id}/playlists`,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept':'application/json'
      },
      body: {
        name: req.body.name,
        description: req.body.description,
        public: false,
        collaborative: true
      },
      json: true
    };
    request.post(options, async function(error, response, body) {
      console.log(error, response.statusCode);
      if (!error && response.statusCode === 200) {
        db.query('INSERT INTO trip_playlist(tid, name) VALUES(?, ?)', [
          body.id,
          body.name
        ]);
        // res.send(response.body);
        res.send({
          success: true
        });
      } else {
        res.send({
          success: false
        });
      }
    });
  } catch (err) {
    res.sendError(err);
  }
});

router.get('/playlists', async (req, res) => {
  var playlists = await db.query('SELECT * FROM trip_playlist WHERE tid = ?', [
    req.query.tid
  ]);
  res.send({
    data: playlists
  });
});

router.post('/add_song', async (req, res)=>{
  try{
    let token = await checkToken(req.user.id);
    let play_id = req.body.play_id;
    var options = {
      url: `https://api.spotify.com/v1/playlists/${play_id}/tracks`,
      headers: { 'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'},
      body : {
          uris: []
      },
      json: true
    };
  }
  catch(err){
    res.sendError(err);
  }
});

export default router;
