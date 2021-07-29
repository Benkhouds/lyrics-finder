import {useRef} from 'react'

export default function SearchBar({onSearch}) {
    const input  = useRef()
    const form = useRef()
    function handleSubmit(e){
        e.preventDefault()
        onSearch(input.current.value);
        form.current.reset()
    }
    return (
        <div className="card card-body mx-auto border p-4 mb-5 w-50">
            <h1 className="display-4 text-center">
                <i className="fas fa-music"></i>&nbsp;
                Search For Songs
            </h1>
            <p className="lead text-center">Get the lyrics of any song</p>
            <form className="d-grid gap-2 mt-3"  onSubmit={handleSubmit} ref={form} >
           <input type="text" className="form-control mb-2" placeholder="search for a song" ref={input} required/>
          <button type="submit" className="btn btn-dark ">Search</button>
        </form>
        </div>
        
    )
}
