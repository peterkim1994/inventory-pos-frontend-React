import React, { useEffect, useRef, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetProductAttributes, GetInventory } from '../services/Inventory';
import { GetCurrentPromotions } from '../services/Promotions';
import { checkToken } from '../services/RequestServer';


const Header = () => {

    const user = useSelector(state => state.userReducer.user);
    const [signedIn, SetSignedIn] = useState(user === null ? false : true);
    const dispatch = useDispatch();
    const userRef = useRef(user);

    useEffect(() => {
        let func = function () {
            SetSignedIn(user === null ? false : true);
            GetProductAttributes(dispatch);
            GetInventory(dispatch);
            GetCurrentPromotions(dispatch);
        }
        if (userRef.current !== user) {
            func();
        } else { // else will run when component initially mounts
            checkToken(); // asigns JWT token to axios singleton obj 
        }
    }, [user]);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Inventory & Point Of Sales Management</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/inventory">Inventory</Nav.Link>
                    <Nav.Link as={Link} to="/pos">POS</Nav.Link>
                    <Nav.Link as={Link} to="/login">{signedIn === false ? "Sign In" : "Sign Out"}</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Nothing</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another Nothing action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Still nothing</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link to nothing</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;