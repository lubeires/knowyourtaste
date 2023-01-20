import logo from "../logo.png";
import { addTracks, createPlaylist, getUser, logout } from "../spotify";
import { useEffect } from "react";
import { useState } from "react";

import { getTopArtists, getTopTracks } from "../spotify";
import { catchErrors } from "../utils";

import { Tracks, Artists, Genres } from "./index";

const Top = () => {
  const [topParams, setTopParams] = useState({
    type: "tracks",
    timeRange: "medium_term",
  });

  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);

  const [playlistLink, setPlaylistLink] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } =
        topParams.type === "tracks"
          ? await getTopTracks(topParams.timeRange)
          : await getTopArtists(topParams.timeRange);

      if (topParams.type === "tracks") setTracks(data.items);
      if (topParams.type === "artists") setArtists(data.items);
      if (topParams.type === "genres") getGenresFromArtists(data.items);
    };

    catchErrors(fetchData());
  }, [topParams]);

  useEffect(() => {
    if (playlistLink)
      document.getElementById("playlist-message").style.display = "block";
  }, [playlistLink]);

  const getGenresFromArtists = (artists) => {
    let genres = {};
    artists.forEach((artist) => {
      artist.genres.forEach((genre) => {
        if (!(genre in genres)) genres[genre] = 0;
        genres[genre]++;
      });
    });

    setGenres(
      Object.entries(genres)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 35)
    );
  };

  const generatePlaylist = async () => {
    const userId = await getUser().then(({ data }) => data.id);

    let name;
    if (topParams.timeRange === "short_term") {
      let generatedIn = new Date();
      name = `${generatedIn.getMonth() + 1}/${generatedIn.getFullYear()}`;
    } else {
      name =
        topParams.timeRange === "medium_term" ? "last semester" : "all time";
    }
    name += " // knowyourtaste";

    const playlist = await createPlaylist(userId, name).then(({ data }) => {
      return { id: data.id, url: data.external_urls.spotify };
    });

    await addTracks(
      playlist.id,
      tracks.map((track) => track.uri)
    ).then(({ data }) => console.log(data));

    setPlaylistLink(playlist.url);
  };

  const types = ["tracks", "artists", "genres"];

  const timeRanges = {
    short_term: "4 weeks",
    medium_term: "6 months",
    long_term: "all time",
  };

  const TypeList = () => {
    return (
      <>
        <img id="nav-logo" src={logo} alt="" />
        <ul id="type-nav">
          {types.map((type) => (
            <li
              className={"type" + (topParams.type === type && " selected-type")}
              key={type}
              onClick={() => {
                if (type !== topParams.type)
                  setTopParams({ ...topParams, type: type });
              }}
            >
              {type}
            </li>
          ))}
        </ul>

        <button id="logout-button" onClick={logout}>
          Logout
        </button>
      </>
    );
  };

  const TimeRangeList = () => {
    return (
      <ul id="time-range-nav">
        {Object.keys(timeRanges).map((timeRange) => (
          <li
            className={
              "time-range" +
              (topParams.timeRange === timeRange && " selected-time-range")
            }
            key={timeRange}
            onClick={() => {
              if (timeRange !== topParams.timeRange)
                setTopParams({ ...topParams, timeRange: timeRange });
            }}
          >
            {timeRanges[timeRange]}
          </li>
        ))}
      </ul>
    );
  };

  const PlaylistMessage = ({ playlistLink }) => {
    return (
      <div id="playlist-message">
        Playlist created!{" "}
        <a href={playlistLink} rel="noreferrer" target="_blank">
          Click here
        </a>{" "}
        to listen to it on Spotify.
      </div>
    );
  };

  return (
    <>
      <nav id="top-nav">
        <TypeList></TypeList>
        <TimeRangeList></TimeRangeList>
      </nav>

      <div id="display">
        {topParams.type === "tracks" && (
          <>
            <PlaylistMessage playlistLink={playlistLink} />
            <button id="playlist-button" onClick={generatePlaylist}>
              Create playlist
            </button>
            <Tracks tracks={tracks} />
          </>
        )}
        {topParams.type === "artists" && <Artists artists={artists} />}
        {topParams.type === "genres" && <Genres genres={genres} />}
      </div>
    </>
  );
};

export default Top;
