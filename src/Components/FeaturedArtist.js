import { Link } from 'react-router-dom'
import useFeaturedArtist from '../hooks/useFeaturedArtist'

export default function FeaturedArtist() {

    const artist = useFeaturedArtist()

  return (
    <>
        <h1>Featured artist of the week</h1>
        <div className='artistCardContainer'>
            <Link to={'/artist/' + artist?.featuredArtist?.artistName}><h2 id="artistTitle">{artist?.featuredArtist?.artistName}</h2>
            <img src={artist?.featuredArtist?.profilePic} alt="profile_picture"></img></Link>
        </div>
    </>
  )
}
