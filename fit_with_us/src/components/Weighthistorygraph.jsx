import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip, ResponsiveContainer} from 'recharts';
import Form from './Form';

export default function Weighthistorygraph({weights, updateWeight}) {
  // console.log(weight)

  let data = weights.map(weight => {
    let date = weight.date.slice(5,10)
    return {name: date, lbs: weight.weight}
  })
  // console.log(data)
  // const data = [{name: 'Page A', uv: 400}, {name: 'Page B', uv: 300}, {name: 'Page C', uv: 250}];
  return (
    <div class="column">
      <div class="card">
        <h1>Weight History</h1>
          <ResponsiveContainer height={250}>
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="lbs" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[100, 200]}/>
            <Tooltip />
          </LineChart>
          </ResponsiveContainer> 
          <Form onSubmit={updateWeight} placeholder="Enter Current Weight" type="number"/>
      </div>
    </div>
  )
}