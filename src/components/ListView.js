import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class ListView extends Component {

   state = {
      posts: [],
      liked: false,
      disliked: false,
      bookmarked: false,
      loading: true
   }
   baseUrl = "https://xcelerator-backend.herokuapp.com"

   componentDidMount() {
      console.log(this.baseUrl);
      axios.get(`${this.baseUrl}/api/posts`)
         .then(response => {
            console.log('response', response)
            if (response.hasOwnProperty('data')) {
               this.setState(state => {
                  return {
                     posts: response['data']['data'],
                     loading: false
                  }
               })
            }
         })
         .catch(error => {
            console.log('error', error);
         })
   }


   handleActions = (actionType, id) => {
      axios.patch(`${this.baseUrl}/api/posts/${id}`, { type: actionType })
         .then(response => {
            // console.log('response from server', response);
            let posts = [...this.state.posts];
            posts = posts.map(post => {
               switch (actionType) {
                  case "liked":
                     if (post.id === id) {
                        post.liked = !post.liked;
                        post.disliked = false;
                     }
                     return post;
                  case "disliked":
                     if (post.id === id) {
                        post.disliked = !post.disliked;
                        post.liked = false;
                     }
                     return post;
                  case "bookmarked":
                     if (post.id === id) {
                        post.bookmarked = !post.bookmarked;
                     }
                     return post;
                  default:
                     return post;
               }
            })
            this.setState((previousState) => {
               return { ...previousState, posts };
            })
         })
         .catch(error => {
            console.log('error occuring while liking', error);
         })
   }

   render() {
      let posts;
      if (this.state.loading) {
         posts = (
            <div className="grid">
               <div className="item item--medium placeholderItem">
                  <div className="skeleton"></div>
               </div>
               <div className="item item--large">
                  <div className="skeleton"></div>
               </div>
               <div className="item item--medium">
                  <div className="skeleton"></div>
               </div>
               <div className="item item--large">
                  <div className="skeleton"></div>
               </div>
               <div className="item item--medium">
                  <div className="skeleton"></div>
               </div>
            </div>
         );
      } else {
         posts = this.state.posts.map((post, index) => {
            return (
               <div key={post.id} className={index % 2 === 0 ? 'item item--medium' : ' item item--large'}>
                  <div style={{ backgroundImage: `url(${JSON.stringify(post.imageUrl)})` }} className={`postImage`}></div>
                  <Link to={{
                     pathname: `/posts/${post.id}`,
                     state: {
                        id: post.id
                     }
                  }}>
                     <div className="item__details">
                        <div className="postTitle">{post.title}</div>
                        <div>{post.body} </div>
                     </div>
                  </Link>
                  <div className="actions">
                     <i
                        className={post.liked ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'}
                        onClick={() => this.handleActions('liked', post.id)} ></i>
                     <i
                        className={post.disliked ? 'fas fa-thumbs-down' : 'far fa-thumbs-down'}
                        onClick={() => this.handleActions('disliked', post.id)} ></i>
                     <i
                        className={post.bookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'}
                        onClick={() => this.handleActions('bookmarked', post.id)}></i>
                  </div>
               </div>
            );
         });
      }
      console.log('posts', posts);
      return (
         <section className="section">
            <div className="grid">
               {posts}
            </div>
         </section>
      )
   }
}

export default ListView;