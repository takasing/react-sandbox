import { css } from '@emotion/css';
import React, { Suspense, useState } from 'react';
import useArtists from './ArtistsHook';

type ArtistsProps = {
  artistName: string
}
const ArtistsInfo: React.FC<ArtistsProps> = ({artistName}) => {
  const { artists, cache } = useArtists(artistName);
  return <div>
      {Object.keys(cache).length > 0 ? <p>cache: {Object.keys(cache).join(',')}</p> : null}
      <pre>{JSON.stringify(artists || 'Unknown', null, 2)}</pre>
    </div>
}

export const Artists: React.FC = () => {
  const [artistName, setArtistName] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setArtistName((e.currentTarget.elements.namedItem('artistName') as HTMLInputElement).value)
  }
  return <div>
    <form onSubmit={handleSubmit} className={css`display: flex; flex-direction: column;`}>
      <label htmlFor="artistNameInput">Artist Name (ie Hikaru Utada)</label>
      <input id="artistNameInput" name="artistName"/>
      <button type="submit">Submit</button>
    </form>
    {artistName ? (
      <Suspense fallback={<div>...loading</div>}>
        <ArtistsInfo artistName={artistName}/>
      </Suspense>
    ) : null}
  </div>
}

