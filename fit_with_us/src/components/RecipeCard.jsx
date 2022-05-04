export default function RecipeCard({recipes}) {
  console.log(recipes[0]['hits'][0]['recipe'])

  const info = recipes[0]['hits'][0]['recipe']

  return (
    <>
    <h1>RecipeCard</h1>
    <img src={info.images.THUMBNAIL.url} />
    </>
  )
}