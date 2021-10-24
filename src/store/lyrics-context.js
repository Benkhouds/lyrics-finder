import { createContext , useEffect, useReducer} from 'react'
import axios from '../config/axiosConfig'

const LyricsContext = createContext()


const url  =`/chart.tracks.get?chart_name=top&page=1&page_size=20&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_API_KEY}`;

function reducer(state, action){

    switch(action.type){
        case 'reset':{
            return {...state ,isLoading: true, error:''}
        }
        case 'error':{
            return {...state,isLoading:false,  error: action.setError}
        }
        case 'tracks':{
            return {...state, isLoading: false, tracks: action.setTracks, title:action.setTitle }
        }
        default:{
            return {...state, error:'Action not defined'}
        }
    }
}
export function LyricsContextProvider({children}){
    const [state, dispatch]= useReducer(reducer, {title:'', tracks:[] , error:'', isLoading:true})
  

   useEffect(()=>{
      axios(url)
        .then((res)=>{
            console.log(res.data);
           dispatch({type:'tracks', setTitle:'Top 10 Songs', setTracks: res.data.message.body.track_list})

        }) 
        .catch(err=>{
            console.log(err)
            dispatch({type:'error', setError:'Error Loading Data' });
        })
   },[])


   const context = {
       state,
       dispatch
   }
    
    return (
            <LyricsContext.Provider value={context}>
                {children}
            </LyricsContext.Provider>
    )
    
}

export  {LyricsContext} ;


