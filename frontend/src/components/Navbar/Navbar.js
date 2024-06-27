import { Link } from 'react-router-dom'

const Navbar = () => {
    return(
        <div className="container">
            <Link to="/">
                Article Buddy
            </Link>
        </div>
    )
}

export default Navbar