const Genre = ({ genre, title, position }) => {
  return (
    <div className="genre" title={title}>
      <div className="info">
        <h2>{position}</h2>
        <h3>{genre}</h3>
      </div>
    </div>
  );
};

const Genres = ({ genres }) => {
  return (
    <div id="container">
      {genres.map((genre, i) => (
        <Genre
          key={i}
          genre={genre[0]}
          title={`${genre[1]} artists`}
          position={`#${i + 1}`}
        />
      ))}
    </div>
  );
};

export default Genres;
