import {Link} from 'react-router-dom'
export default function Track({data}) {
    return (
        <div key={data.track_id} className="col-md-6">
            <div className="card mb-4 shadow-sm">
               <div className="card-body p-4">
                <h5 className="card-title">{data.artist_name}</h5> 
                <p className="card-text">
                    <strong><i className="fas fa-play"></i> &nbsp;Track:&nbsp;</strong>
                    {data.track_name}<br/>
                    <strong><i className="fas fa-compact-disc"></i>&nbsp;Album:&nbsp;</strong>
                    {data.album_name}
                </p>
                <Link to={`lyrics/${data.track_id}`} className="btn btn-dark d-block py-2" >
                    <i className="fas fa-chevron-right"></i>&nbsp;
                    View Lyrics
                </Link>
               </div>
            </div>
            
        </div>
    )
}
