const Track = ({ imageUrl, position, name, artists }) => {
  return (
    <div className="track">
      <img src={imageUrl} alt="track cover" />
      <div className="info">
        <h2>#{position}</h2>
        <div>
          <h4>{name}</h4>
          <small>{artists}</small>
        </div>
      </div>
    </div>
  );
};

const formattedArtists = (artists) =>
  artists.map((artist) => artist.name).join(", ");

const Tracks = ({ tracks }) => {
  return (
    <div id="container">
      {tracks.map((track, i) => (
        <Track
          key={i}
          imageUrl={track.album.images[1].url}
          position={i + 1}
          name={track.name}
          artists={formattedArtists(track.artists)}
        />
      ))}
    </div>
  );
};

export default Tracks;
