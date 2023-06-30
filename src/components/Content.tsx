import { useEffect, useState } from 'react';
import { MovieCard } from '../components/MovieCard';
import { api } from '../services/api';
import { MovieProps } from '../interfaces/IMovieProps';
import { ContentIn } from '../interfaces/IContent';

export function Content({ selectedGenreId, selectedGenre }: ContentIn) {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });
  }, [selectedGenreId]);
  return (
    <>
      <div className='container'>
        <header>
          <span className='category'>
            Categoria:<span> {selectedGenre.title}</span>
          </span>
        </header>

        <main>
          <div className='movies-list'>
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                title={movie.Title}
                poster={movie.Poster}
                runtime={movie.Runtime}
                rating={movie.Ratings[0].Value}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
