import { Button } from '@mui/material';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Person2Icon from '@mui/icons-material/Person2';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" key={"sm"} expand={"sm"}>
            <Container>
                <Navbar.Brand href="/">Book's Shop</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar>
                        <Link to={'/signin'}>
                            <Button startIcon={<Person2Icon />} variant="outlined">Sing In</Button>
                        </Link>
                    </Navbar>
                    {/* <Navbar>
                        <Link to={'/signin'}>
                            <Button startIcon={<Person2Icon />} variant="outlined">Sing Out</Button>
                        </Link>
                    </Navbar> */}
                    {/* <Navbar.Text>
                        Signed in as: <a href="#login">Mark Otto</a>
                    </Navbar.Text> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;