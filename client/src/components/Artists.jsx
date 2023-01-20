const Artist = ({ imageUrl, position, name }) => {
  return (
    <div className="artist">
      <img src={imageUrl} alt="artist" />
      <div className="info">
        <h2>{position}</h2>
        <h3>{name}</h3>
      </div>
    </div>
  );
};

const Artists = ({ artists }) => {
  return (
    <div id="container">
      {artists.map((artist, i) => (
        <Artist
          key={i}
          imageUrl={artist.images[1].url}
          position={`#${i + 1}`}
          name={artist.name}
        />
      ))}
    </div>
  );
};

export default Artists;
