import logo from "../logo.png";

const LOGIN_URI =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8888/login"
    : "https://knowyourtaste-api.onrender.com/login";

const Login = () => {
  return (
    <div id="login-container">
      <img id="login-logo" src={logo} alt="know your taste logo" />
      <p>
        Find out what were your most listened tracks, artists and genres in
        Spotify from the last four weeks, six months or all time and
        automatically generate playlists with your most played tracks.
      </p>
      <a id="login-button" href={LOGIN_URI}>
        <i className="fa-brands fa-spotify fa-xl"></i>
        Connect to spotify
      </a>
    </div>
  );
};

export default Login;
