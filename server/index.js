require("dotenv").config();

const querystring = require("node:querystring");
const randomstring = require("randomstring");
const axios = require("axios");
const express = require("express");
const app = express();
const port = 8888;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const SCOPE = "user-top-read playlist-modify-public";
const STATE = randomstring.generate(16);

app.get("/login", (req, res) => {
  res.cookie("spotify_auth_state", STATE);

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: SCOPE,
        redirect_uri: REDIRECT_URI,
        state: STATE,
      })
  );
});

app.get("/callback", (req, res) => {
  const CODE = req.query.code || null;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      code: CODE,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
    },
  })
    .then((response) => {
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
          expires_in,
        });

        res.redirect(`http://localhost:3000/?${queryParams}`);
      } else {
        res.redirect(`/?${querystring.stringify({ error: "invalid_token" })}`);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => res.send(error));
});

app.listen(port, () => {
  console.log(`express app listening at http://localhost:${port}`);
});
