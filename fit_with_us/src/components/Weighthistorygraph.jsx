import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip, ResponsiveContainer} from 'recharts';
import Input from './Input';
import Button from './Button';
export default function Weighthistorygraph({userWeight, updateWeight}) {

  let data = userWeight.map(weight => {
    let date = weight.date.slice(5,10)
    return {name: date, lbs: weight.weight}
  })

  return (
    <div class="column">
      <div class="card">
        <h1 class="is-size-4 mb-4 has-text-centered	pt-4"> <strong>Weight History</strong></h1>
          <ResponsiveContainer height={250}>
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="lbs" stroke="#23b574" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
              <XAxis dataKey="name" />
              <YAxis type="number" domain={[100, 200]}/>
              <Tooltip />
            </LineChart>
          </ResponsiveContainer> 
          <form onSubmit= {updateWeight} class="mt-4">
            <div class="field has-addons">
              <div class="control is-expanded">
                <input class="input" min="0" placeholder="Enter Current Weight" type="number"/>
              </div>
              <div class="control">
                <Button type="submit" name="Submit" />
              </div>
            </div>  
          </form>
      </div>
    </div>
  )
}