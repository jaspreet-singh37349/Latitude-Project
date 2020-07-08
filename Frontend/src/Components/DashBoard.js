import React, {Component} from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

class DashBoard extends Component{


    componentDidMount()
    {
        axios.get("http://127.0.0.1:5000").then(res=>{
            console.log(res)
        })
    }

    render()
    {
        console.log(this.props)

        if(!this.props.auth)
            return <Redirect to="/login" />


        return (
            <div>
                <Navbar />
                <div style={{display:"flex",marginTop:"50px",flexWrap:"wrap"}}>
                    {this.props.images.map(image=>{
                        return <img className="fade-in" style={{width:"300px",height:"300px",margin:"50px"}} src={image} alt="error" />
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    images: state.images
});

export default connect(mapStateToProps)(DashBoard);