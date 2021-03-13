const artistsQuery = `
query ($name: String) {
  queryArtists(byName: $name) {
    name
    id
    #image
    albums {
      name
    #  id
    #  image
    #  tracks {
    #    id
    #    name
    #    preview_url
    #    artists {
    #      name
    #    }
    #  }
    }
  }
}
`
const cache: {[key: string]: any} = {};
const fetchArtists = async (name: string) => {
  return await fetch('https://spotify-graphql-server.herokuapp.com/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      query: artistsQuery,
      variables: {name}
    })
  })
  .then(r => r.json())
  .then(response => response.data.queryArtists);
}
const useArtists = (name: string) => {
  const artists = cache[name];
  if (!artists) {
    const p = fetchArtists(name).then(
     p => (cache[name] = p)
    )
    throw p;
  }
  return { artists, cache }
}

export default useArtists;
