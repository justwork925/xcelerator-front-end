import React, { Component } from 'react';
import axios from 'axios';

class DetailedView extends Component {
   state = {
      post: [],
      loading: true
   }
   componentDidMount() {
      if (this.props.location.hasOwnProperty('state')) {
         axios.get('http://localhost:3006/api/posts/' + this.props.location.state.id)
            .then(response => {
               if (response.hasOwnProperty('data')) {
                  console.log('response', response['data']['data'][0]['liked']);
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
   }
   render() {
      let post;
      if (this.state.loading) {
         post = <div>Loading...</div>
      } else {
         post = (
            <div className="item item--full detailed">
               <div className={`postImage image${Math.floor(Math.random() * (6 - 1)) + 1}`}></div>
               <div className="item__details">
                  <div className="postTitle"> {this.state.post[0].title}</div>
                  <div> {this.state.post[0].body}</div>
               </div>
            </div>
         );
      }
      return (
         <section className="section">
            <div className="grid">
               {post}
            </div>
         </section>
      )
   }
}

export default DetailedView;