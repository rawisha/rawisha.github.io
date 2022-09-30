import React from 'react';
import '../styles/Row.css';
import News from './News';
import ArtistsingleItem from './ArtistsingleItem';
import CategorysingleItem from './CategorysingleItem';
import useGetAll from '../hooks/useGetAll'
import useCategories from '../hooks/useCategories'
import { Link } from 'react-router-dom';

export default function Row() {

    const artists = useGetAll('artists')
    const categories = useCategories()

    const shuffle = (array) => {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }
    
    const showCategories = shuffle(categories).slice(0, 4)
    const showArtists = shuffle(artists).slice(0, 4)
    
    return (
        <div className='rowContainer'>
            <div className='titleWrapper'>
                <h2 className='rowTitle'>Explore what you Love..</h2>
            </div>

            <div className='contentWrapper'>
                {showCategories.map(category => (
                    <div key={category.id} className='pictureContainer'>
                        <Link to={'/category/' + category.handle} ><CategorysingleItem categoryName={category.name} imgUrl={category.imageUrl} /></Link>
                    </div>
                ))}
            </div>
            <div className='borderSolidLine'></div>
            <div className='titleWrapper'>
                <h2 className='rowTitle'>Find and support artists..</h2>
            </div>

            <div className='contentWrapper'>
                {showArtists.map(artist => (
                    <div key={artist.id} className='pictureContainer2'>
                        <ArtistsingleItem artistname={artist.artistName} imgUrl={artist.profilePic} />
                    </div>
                ))}
            </div>
            
            <div className="newsDiv">
            <News />
            </div>
        </div>
    )
}
