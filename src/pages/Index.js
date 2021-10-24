import {useContext } from 'react'
import {LyricsContext} from '../store/lyrics-context'
import axios from '../config/axiosConfig'
import TrackList from '../components/tracks/TrackList'
import SearchBar from '../components/tracks/SearchBar'
import Spinner from '../components/layout/Spinner'

export default function Index() {
    
    const {state , dispatch} = useContext(LyricsContext)
    console.log(state)
    function findTrack(term){
        console.log(term)
        dispatch({type:'reset'})
        axios.get(`/track.search?q_track=${term}&f_has_lyrics=1&s_artist_rating=desc&page_size=10&page=1&apikey=${process.env.REACT_APP_MM_API_KEY}`)
        .then((res)=>{
           console.log(res.data.message)
           if(!res.data.message.body.track_list.length){
               dispatch({type:'error', setError: `No result found for "${term}"`})
           }
           dispatch({type:'tracks', setTitle:`Results for '${term}'`, setTracks: res.data.message.body.track_list})

        })
        .catch(err=>{
            console.error(err)
            dispatch({type:'error', setError:'Error fetching data , please try again'})
        })
    }
  

    return (
        <div>
            <SearchBar onSearch={findTrack}/>
            
            {state.isLoading && <Spinner/> }
            {!state.isLoading && state.error && <h5 className="text-center mt-4 text-danger ">{state.error}</h5>}
             {!state.isLoading && !state.error && 
                <TrackList  trackList={state.tracks} title={state.title}/>
             }
        </div>
    )
}
