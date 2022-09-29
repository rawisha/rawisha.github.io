import React from 'react';
import '../styles/Row.css';
import bild from '../assets/bild.jpg';
import News from './News';
import ArtistsingleItem from './ArtistsingleItem';
import CategorysingleItem from './CategorysingleItem';
import useGetAll from '../hooks/useGetAll'
import useCategories from '../hooks/useCategories'

export default function Row() {

    const artists = useGetAll('artists')
    const categories = useCategories()

    return (
        <div className='rowContainer'>
            <div className='titleWrapper'>
                <h2 className='rowTitle'>Explore what you Love..</h2>
            </div>

            <div className='contentWrapper'>
                <div className='pictureContainer'>
                    <CategorysingleItem categoryName={'Claothing2'} imgUrl={bild} />
                </div>
                <div className='pictureContainer'>
                <CategorysingleItem categoryName={'Ceramic2'} imgUrl={bild} />
                </div>
                <div className='pictureContainer'>
                <CategorysingleItem categoryName={'Glass2'} imgUrl={bild} />
                </div>
                <div className='pictureContainer'>
                <CategorysingleItem categoryName={'Painting2'} imgUrl={bild} />
                </div>
            </div>
            <div className='borderSolidLine'></div>
            <div className='titleWrapper'>
                <h2 className='rowTitle'>Find and support artists..</h2>
            </div>

            <div className='contentWrapper'>
                <div className='pictureContainer2'>
                <ArtistsingleItem artistname={'Kasumasa Nagaiii'} imgUrl={bild} />
                </div>
                <div className='pictureContainer2'>
                <ArtistsingleItem artistname={'Kasumasa Nagaiii'} imgUrl={bild} />
                </div>
                
                <div className='pictureContainer22'>
                <ArtistsingleItem artistname={'awfawf'} imgUrl={bild} />
                </div>
                <div className='pictureContainer2'>
                <ArtistsingleItem artistname={'awfawf'} imgUrl={bild} />
                </div>
            </div>
            
            <div className="newsDiv">
            <News />
            </div>

            
        </div>

    )
}
