

import Spinner from '../layout/Spinner'
import Track from './Track'
export default function TrackList({error, trackList, title}) {
  
        if((trackList === undefined|| trackList.length === 0) && !error){
            return <Spinner/> 
        }
        else if(error){
          return <h1>Error fetching data , please reload the page</h1>
        }
        else{
        return(
                <>
                    <h1 className="text-center mb-4">{title}</h1>
                    <div className="row">
                        {trackList.map(({track})=><Track key={track.track_id} data={track}/>)}
                    </div>
                </>
            )
        }    
    
}
