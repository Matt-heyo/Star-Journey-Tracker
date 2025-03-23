import { Navbar, Container } from "react-bootstrap"

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 rounded">
      <Container>
        <div className="text-center w-100 py-3">
          <h1 className="text-light mb-0">Star Journey Tracker</h1>
          <p className="text-light opacity-75 mb-0">Track your growth one step at a time</p>
        </div>
      </Container>
    </Navbar>
  )
}

export default Header

