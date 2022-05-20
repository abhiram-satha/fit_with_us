import React from "react";
import { useState } from "react";

export default function BottomNav(props) {

  const [youClass, setYouClass] = useState(window.location.href === "http://localhost:3003/homepage" || window.location.href === "http://localhost:3003/recipe-details" ? "is-active" : "");
  const [usClass, setUsClass] = useState(window.location.href === "http://localhost:3003/posts" ? "is-active" : "");

  const handleYouClick = () => {
    setUsClass("");
    setYouClass("is-active");
  }

  const handleUsClick = () => {
    setYouClass("");
    setUsClass("is-active");
  }



  return (
        <div class="navbar tabs is-toggle is-centered is-medium is-fullwidth is-fixed-bottom mb-0">
    <ul>
      <li class={youClass} onClick={handleYouClick} id="you">
        {/* <Link to="/homepage">You</Link> */}
        <a href="/homepage">You</a>
      </li>
      <li class={usClass} onClick={handleUsClick} id="us">
        {/* <Link to="/posts">Us</Link> */}
        <a href="/posts">Us</a>
      </li>
    </ul>
  </div> 
  );

}

  // return (
  //   <div class="navbar tabs is-toggle is-centered is-medium is-fullwidth is-fixed-bottom mb-0">
  //   <ul>
  //     <li class={window.location.href === "http://localhost:3003/posts" ? "" : "is-active"} id="you">
  //       {/* <Link to="/homepage">You</Link> */}
  //       <a href="/homepage">You</a>
  //     </li>
  //     <li class={window.location.href === "http://localhost:3003/posts" ? "is-active" : ""} id="us">
  //       {/* <Link to="/posts">Us</Link> */}
  //       <a href="/posts">Us</a>
  //     </li>
  //   </ul>
  // </div> 
  // );

// export default function BottomNav({users, updateWeight, weight, recipes, posts, comments, newPost, newComment}) {


//   return (
//     <>
//       <Router>
        

//         <Routes>
//           <Route
//             path={`/homepage`}
//             element={
//               <Homepage
//                 users={users}
//                 userWeight={weight}
//                 updateWeight={updateWeight}
//                 recipes={recipes}
//               />
//             }
//           />
//           <Route
//             path="/posts"
//             element={
//               posts.length === 0 ? (
//                 ""
//               ) : (
//                 <Posts posts={posts} users={users} comments={comments} newPost={newPost} newComment={newComment}/>
//               )
//             }
//           />
//         </Routes>

//         <nav>
//           <Link to='/posts/'>Community</Link>
//           <Link to="/homepage">Your Profile</Link>
//         </nav>
//       </Router>
//     </>
//   );
// }
