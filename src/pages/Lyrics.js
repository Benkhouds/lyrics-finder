import React, { Component } from 'react'
import axios from '../config/axiosConfig'
import {Link} from 'react-router-dom'
import Spinner from '../components/layout/Spinner'


export default class Lyrics extends Component {
    constructor(props){
        super(props);
        this.state={
            trackInfo:{},
            lyrics:{},
            lyricsError:'',
            infoError:''
        };
         
    }
    
    componentDidMount(){
        const id =this.props.match.params.id;
         console.log(id)
        axios.get(`/track.lyrics.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_API_KEY}`)
        .then((res)=>{
           console.log(res)
           if(res.data.message.header.status_code !== 200){
               this.setState({lyricsError:res.data.message.header.status_code})
               throw Error(res.statusText)
           }
           this.setState({lyrics:res.data.message.body.lyrics})
           return axios.get(`/track.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_API_KEY}`)          
        })
        .then((res)=>{
            console.log(res.data)
            if(res.data.message.header.status_code !== 200){
                this.setState({infoError:res.data.message.header.status_code})
                throw Error(res.statusText)
            }
            this.setState({trackInfo : res.data.message.body.track})
        })
        .catch(err=>console.log(err))
    }
    render() {
        const {trackInfo , lyrics, lyricsError, infoError} = this.state
        const explicit = trackInfo.explicit ?'Yes': 'No'
        const genre= (trackInfo.primary_genres && trackInfo.primary_genres.music_genre_list[0]) ?
        trackInfo.primary_genres.music_genre_list[0].music_genre.music_genre_name : 'Pop'
        return(
            <>
           
            <Link className="btn btn-dark mb-4" to="/">Go Back</Link>
            {lyricsError && <div>{lyricsError}</div>}
            {infoError && <div>{infoError}</div>}
            {!lyricsError &&( lyrics && Object.keys(lyrics).length ?
                <div className="card">
                <h3 className="card-header px-4">Lyrics</h3>
                <div className="card-body px-4">
                    <p>{lyrics.lyrics_body}</p>
                </div>
                </div> 
             :
                <Spinner/>)
             }
             {!infoError && (trackInfo && Object.keys(trackInfo).length  ?
               <div>
                   <ul className="list-group">
                       <li className="list-group-item">
                         <strong>Album ID:</strong>
                          &nbsp;{trackInfo.album_id}
                        </li>
                       <li className="list-group-item">
                           <strong>Song Genre:</strong>
                           &nbsp;{ genre}
                        </li>
                       <li className="list-group-item">
                           <strong>Explicit Words:</strong>
                           &nbsp;{explicit}
                        </li>
                       <li className="list-group-item">
                           <strong>First Release Date:</strong>
                           &nbsp;{trackInfo.updated_time.slice(0,10)}
                        </li>

                   </ul>
               </div>
               : <Spinner/>)
            }
            </>
        )
    }
}

