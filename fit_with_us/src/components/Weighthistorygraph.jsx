import { LineChart, Line, CartesianGrid, YAxis, XAxis } from 'recharts';

export default function Weighthistorygraph({weights, updateWeight}) {
  // console.log(weight)

  let data = weights.map(weight => {
    let date = weight.date.slice(5,10)
    return {name: date, uv: weight.weight}
  })
  // console.log(data)
  // const data = [{name: 'Page A', uv: 400}, {name: 'Page B', uv: 300}, {name: 'Page C', uv: 250}];
  return (
  <>
    <h1>Weight History</h1>
  <LineChart width={600} height={150} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis type="number" domain={[100, 200]}/>
  </LineChart> 
  <form onSubmit={updateWeight}>
    <input placeholder="Enter Current Weight"type="number"></input>
    <input type="submit" name="Update Weight"></input>
  </form>
  </>
  )
}