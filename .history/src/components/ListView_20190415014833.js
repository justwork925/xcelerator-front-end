import React, { Component } from "react";

class ListView extends Component {
   render() {
      const arr = Array(5).fill(1);
      const posts = arr.map((post, index) => {
         return (
            <div key={index} className={index % 2 == 0 ? 'item item--medium' : ' item item--large'}>
               <div className={`postImage image${index}`}></div>
               <div className="item__details">
                  <div className="postTitle">
                     sunt aut facere repellat provident occaecati excepturi optio reprehenderit
                  </div>
                  <div>
                     quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto
                  </div>
               </div>
            </div>
         );
      });
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