import React, {Component} from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import AOS from 'aos';

class DashBoard extends Component{


    componentDidMount()
    {
        AOS.init();
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
                <div style={{display:"flex",marginTop:"50px",flexDirection:"column",alignItems:"center"}}>
                    {this.props.images.map((image,index)=>{
                        return <img key={image} data-aos={index%2===0?"fade-right":"fade-left"} style={{width:"40vw",height:"50vh",margin:"50px"}} src={image} alt="error" />
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