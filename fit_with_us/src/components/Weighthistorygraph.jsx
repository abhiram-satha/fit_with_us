import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/Weighthistorygraph.scss"
import Button from "./Button";
export default function Weighthistorygraph({ userWeight, updateWeight, weightClass, weightError }) {
  let data = userWeight.map((weight) => {
    let date = weight.date.slice(5, 10);
    return { name: date, lbs: weight.weight };
  });

  return (
    <div className="column">
      <div className="card">
        <h1 className="is-size-4 mb-4 has-text-centered	pt-4">
          {" "}
          <strong>Weight History</strong>
        </h1>
        <ResponsiveContainer height={250}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="lbs" stroke="#23b574" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[100, 200]} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
        <form onSubmit={updateWeight} className="mt-4">
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                class={weightClass}
                placeholder="Enter Current Weight"
                type="number"
              />
            </div>
            <div className="control">
              <Button type="submit" name="Submit" />
            </div>
          </div>
          <p class="help is-danger pb-2 weight-help">{weightError}</p>
        </form>
      </div>
    </div>
  );
}
