// import RecipeCard from "./RecipeCard";
// import Weighthistorygraph from "./Weighthistorygraph";

// export default function Homepage({ users, recipes, userWeight, updateWeight }) {

//   return (
//     // <>
//     //   {recipes[0].length === 1 ? (
//     //     "Loading"
//     //   ) : (
//     //     <RecipeCard recipes={recipes} className="card" />
//     //   )}
//     //   {userWeight.length === 0 ? (
//     //     "Loading"
//     //   ) : (
//     //     <Weighthistorygraph weights={userWeight} className="card" />
//     //   )}
//     // </>

//     <section class="section">
//     <div class="columns is-two-thirds">
//         <div class="column">
//           <div class="card">
//             <div class="card-image">
//                 <figure class="image is-square">
//                   <img src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2019%2F12%2F11%2F7436257.jpg" alt="Placeholder image"/>
//                 </figure>
//               </div>
//               <div class="card-content">
//                   <div class="media-content">
//                     <p class="title is-6">Your meal to prep:</p>
//                     <p class="title is-4">Chicken Paprikash</p>
//                   </div>
//           </div>
//         </div>
//     </div>
//         <div class="column">
//           {userWeight.length === 0 ? (
//         "Loading"
//       ) : (
//         <Weighthistorygraph weights={userWeight} className="card" updateWeight={updateWeight}/>
//       )}
//           </div>
//           </div>
// </section>
//   );
// }

//import { filterProps } from "recharts/types/util/types";
import RecipeCard from "./RecipeCard";
import Weighthistorygraph from "./Weighthistorygraph";
import BottomNav from "./BottomNav";

export default function Homepage({ users, recipes, userWeight, updateWeight }) {
  return (
      <section class="section">
        <div class="columns is-two-thirds">
          {recipes[0].length === 1 ? (
            <progress class="progress is-small is-primary" max="100">
              15%
            </progress>
          ) : (
            <RecipeCard
              key={users.id}
              users={users}
              recipes={recipes}
              className="card"
            />
          )}
          {userWeight.length === 0 ? (
            <progress class="progress is-small is-primary" max="100">
              15%
            </progress>
          ) : (
            <Weighthistorygraph
              weights={userWeight}
              className="card"
              updateWeight={updateWeight}
            />
          )}
        </div>
      </section>
  );
}
