import { createContext , useState, useEffect} from 'react'
import axios from 'axios'

const LyricsContext = createContext()
const baseURL= 'https://api.musixmatch.com/ws/1.1/';

export function LyricsContextProvider({children}){
    const [state, setState]= useState({title:'', trackList:[]})
  

   useEffect(()=>{
      axios.get(`${baseURL}/chart.tracks.get?chart_name=top&page=1&page_size=20&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_API_KEY}`)
        .then((res)=>{
           console.log(res.data.message)
           setState({title:'Top 10 Songs', trackList: res.data.message.body.track_list})

        })
        .catch(err=>console.log(err))
   },[])


   const context = {
       state,
       setState
   }
    
    return (
            <LyricsContext.Provider value={context}>
                {children}
            </LyricsContext.Provider>
    )
    
}

export  {LyricsContext} ;


