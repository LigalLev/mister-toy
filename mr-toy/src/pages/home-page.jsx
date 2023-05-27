
import homePhoto from '../assets/img/welcomecut.jpg'
import { Link } from "react-router-dom"


export function HomePage() {

    return (
        <section className="home-page">
    
          <Link to="/toy">  <img src={homePhoto} alt="" /></Link>

        </section >
    )
}