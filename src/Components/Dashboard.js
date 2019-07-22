// query for post click


import React from "react";
import { connect } from "react-redux";
import Axios from "axios";

import { getPosts, getSearch, getUser } from "../reducks/reducer";

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            search: "",
            user: {}
            }
    }
    
    componentDidMount() {
        this.getAllPosts();
        this.handleClick();
        this.props.getUser()
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };
    handleClick = e => {
        Axios.get(`/posts?title=${this.state.search}`).then(response => {
            this.props.getSearch(response.data)
            this.setState({posts: response.data})
        })
    }
    getAllPosts = e => {
        Axios.get("/posts").then(response => {
            this.props.getPosts(response.data);
        });
    };

    render() {
        console.log(this.props)
        console.log(this.state)
        let displayPosts = this.props.posts.map(post => {
            return (
                <main>
                    <img top width="100%" src={post.image_url} alt={post.title} />
                    <h1>{post.username}</h1>
                    <h2>{post.title}</h2>
                    <p>{post.context}</p>
                </main>
            );
        });
        return (
            <main>
                <h1>Dashboard</h1>
                <p>Welcome {this.props.user}</p> <button onClick={this.props.Logout} >Logout</button>
                <input name="search" placeholder="Search by title" onChange={this.handleChange}/>
                <button onClick={this.handleClick} name="" >Search</button>
                <div>{displayPosts}</div>
            </main>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps, {getPosts, getSearch, getUser})(Dashboard);
