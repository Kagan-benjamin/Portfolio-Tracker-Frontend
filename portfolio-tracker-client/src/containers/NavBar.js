import React from 'react';
import styled from "styled-components"
import { Box, Grommet, Nav, Header } from "grommet";
import { grommet } from "grommet/themes";
import { Link } from "react-router-dom";
import PortfolioTracker from '../artwork/PortfolioTracker.png'

class NavBar extends React.Component {

  render(){

    let Button = styled.button`
  background: #33CEFF;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
`;
    return (
      <div className="nav-bar">
          <Grommet theme={grommet}>
              <Header background="dark-2" pad="medium">
                <Box direction="row" align="center" gap="small">
                <Link to="/">
                 <img src={PortfolioTracker} alt="portfolio tracker" align="left" style={{width: 50+ '%'}}></img>
                </Link>
                </Box>
                <Nav direction="row">
                <div>
                 
                    {this.props.noUser()}
                  
                    <Button><div><Link to="/myportfolios" style={{color: 'black'}}>My Portfolios</Link></div></Button>   
                    <Button color="default" ><div><Link to="/login" style={{color: 'black'}}>Sign Up / Log In</Link></div></Button>        
                </div>
                </Nav>
              </Header>
            </Grommet>
      </div>
    );
  }
}
export default NavBar;