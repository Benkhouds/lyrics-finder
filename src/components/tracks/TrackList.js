
import Track from './Track'
export default function TrackList({ trackList, title}) {

        return(
                <>
                    <h1 className="text-center mb-4">{title}</h1>
                    <div className="row">
                        {trackList.map(({track})=><Track key={track.track_id} data={track}/>)}
                    </div>
                </>
            )  
    
}
