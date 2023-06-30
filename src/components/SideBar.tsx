import { Button } from '../components/Button';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { GenreResponseProps } from '../interfaces/IGenreResponseProps';
import { ISide } from '../interfaces/ISideBar';

export function SideBar({ handleClick, selectedGenreId }: ISide) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <>
      <nav className='sidebar'>
        <span>
          Watch<p>Me</p>
        </span>

        <div className='buttons-container'>
          {genres.map((genre) => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClick(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>
      </nav>
    </>
  );
}
