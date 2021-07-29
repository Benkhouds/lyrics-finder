import NavBar from './NavBar'
export default function Layout(props) {
    return (
        <div>
            <NavBar />
            <main className="container justify-content-center">
              {props.children}
            </main>
        </div>
    )
}
