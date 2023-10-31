type Props = {
  promise: Promise<Album[]>
}

export default async function UserAlbums({ promise }: Props) {
  const albums = await promise

  const content = albums.map(album => {
      return (
          <article key={album.id}>
              <h2>{album.title}</h2>
              <br />
          </article>
      )
  })

  return content
}