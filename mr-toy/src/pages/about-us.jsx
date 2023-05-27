import { StoresLocationMap } from "../cmps/stores-locations-map";
import aboutphoto from '../assets/img/aboutmrtoy.jpg'

export function AboutUs() {
    return (
        <section className="about">
            <h2>About Mr. Toy</h2>
            <p>Looking for that perfect toy? This is the place to shop.</p>
            <div className="about-container">
            <img src={aboutphoto} alt="" />
            <p>Bringing out the joy of childhood is at the heart of everything we do.
                Through adventurous stories and imaginative play, we give childrens the chance to discover who they are and who they’re meant to be.
                No matter if they are toddlers or entering their teen years, every child can find inspiration to be the best, to grow a strong mind
                and spirit, to laugh while learning to be resilient, confident, and kind. Most of all, we hope to open cild’s eyes to a bigger world so they can create a brighter future for us all.</p>
                </div>
            <StoresLocationMap />
        </section>

    )
}