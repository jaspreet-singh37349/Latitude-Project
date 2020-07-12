import React,{Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { logoutUser } from '../actions/authActions';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';


class Navbar extends Component {

    handleLogout = (e)=> {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push("/login")
    }

    render()
    {
        console.log(this.props.auth)

        return (
            <div style={{flexGrow:1}}>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" style={{flexGrow:1}} >
                    Welcome {this.props.auth.user.email}
                  </Typography>
                  <Button onClick={this.handleLogout} color="inherit">Logout</Button>
                </Toolbar>
              </AppBar>
            </div>
          );
    }

}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));