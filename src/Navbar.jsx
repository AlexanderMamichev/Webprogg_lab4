import { Navbar as BootstrapNavbar } from "react-bootstrap"; // Import Bootstrap Navbar
import { Link, NavLink } from "react-router-dom"; // Import Link and NavLink

const Navbar = () => { // Define the Navbar component
    return (
        <BootstrapNavbar bg="light" expand="lg">
            <div className="container-fluid">
                <BootstrapNavbar.Brand as={Link} to="/">Min egna saladsbar</BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <div className="nav-item">
                        <NavLink className="nav-link" to="/compose-salad">
                            Komponera din salad&nbsp;
                        </NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink className="nav-link" to="/view-order">
                            Din kundvagn&nbsp;
                        </NavLink>
                    </div>
                </BootstrapNavbar.Collapse>
            </div>
        </BootstrapNavbar>
    );
};

export default Navbar; // Export the component as default