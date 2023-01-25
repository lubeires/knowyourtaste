# knowyourtaste

Web application that, through requests to the [Spotify web API](https://developer.spotify.com/documentation/web-api/), allows the visualization of the most listened songs, artists and genres in given periods of time (short, medium and long term).

In addition to also making it possible to create playlists containing the top tracks of each of the mentioned time ranges.

Note: as the app is in development mode, it is necessary for the user's spotify account email to be manually registered by me in order to be able to use it.

<p align="center">
<img src="https://i.imgur.com/qHVaQRa.gif" />
<img src="https://i.imgur.com/MPp9tux.gif" />
</p>

## How to run locally

### Prerequisites

Before you start, you need to have [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed on your machine.

You also need to set up your account in the [Spotify Developer website](https://developer.spotify.com/) and create an app in the [Dashboard](https://developer.spotify.com/dashboard/applications).

Edit your app settings and add `http://localhost:8888/callback` in the Redirect URIs.

### Running

```bash
# clone this repository
$ git clone <https://github.com/plhrsl/knowyourtaste>
```

Create an `.env` file in the server folder following the `.env.example`, replacing "XXX" with your app credentials.

```bash
# enter the server folder
$ cd server

# install server and client dependecies
$ npm install

# concurrently start client and server
$ npm start

# the client will start at http://localhost:3000 and the server at http://localhost:8888
```
