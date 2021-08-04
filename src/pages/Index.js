import {useContext} from 'react'
import {LyricsContext} from '../store/lyrics-context'
import axios from 'axios'
import TrackList from '../components/tracks/TrackList'
import SearchBar from '../components/tracks/SearchBar'


export default function Index() {
    const {state , setState} = useContext(LyricsContext)
    console.log(state)
    function findTrack(term){
        console.log(term)
        axios.get(`https://api.musixmatch.com/ws/1.1/track.search?q_track=${term}&f_has_lyrics=1&s_artist_rating=desc&page_size=10&page=1
        &apikey=${process.env.REACT_APP_MM_API_KEY}`)
        .then((res)=>{
           console.log(res.data.message)
           setState({title:`Results for '${term}'`, trackList: res.data.message.body.track_list})

        })
        .catch(err=>console.log(err))
    }
    return (
        <div>
            <SearchBar onSearch={findTrack}/>

            <TrackList error={state.trackList ? false : true} trackList={state.trackList} title={state.title}/>
        </div>
    )
}
