import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import '../styles/Admin.css'
import useGetAll from '../hooks/useGetAll'

export default function Admin() {

    const artists = useGetAll('artists')

    console.log(artists)

  return (
    <>
        <Navbar />

        <div className="admin-container">

            {artists?.map(artist => (
                <div key={artist?.id}>{artist?.artistName}</div>
            ))}

            <table>
                <thead>
                    <th>111</th>
                    <th>222</th>
                    <th>333</th>
                </thead>
            </table>

        </div>

        <Footer />
    </>
  )
}
