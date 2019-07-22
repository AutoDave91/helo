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
        Axios.get('/api/posts')
            .then(res =>{
                this.setState({posts: res.data})
            })
        this.handleClick();
        this.props.getUser()
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };
    handleClick = e => {
        Axios.get(`/api/post?title=${this.state.search}`).then(response => {
            this.setState({posts: response.data})
        })
    }

    render() {
        console.log(this.props)
        console.log(this.state)
        return (
            <main>
                <h1>Dashboard</h1>
                <p>Welcome {this.props.user}</p> <button onClick={this.props.Logout} >Logout</button>
                <input name="search" placeholder="Search by title" onChange={this.handleChange}/>
                <button onClick={this.handleClick} name="" >Search</button>
                <section>
                    {this.state.posts.map(post => {
                        return (
                            <section>
                                <img top width="100%" src={post.image_url} alt={post.title} />
                                <h1>{post.username}</h1>
                                <h2>{post.title}</h2>
                                <p>{post.context}</p>
                            </section>
                        );
                    })}
                </section>
            </main>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps, {getPosts, getSearch, getUser})(Dashboard);
