import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Label, Tooltip } from 'recharts';
import { connect } from 'react-redux';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dic"];

const getDate = (lastObject) => {
    if (!lastObject) {
        return;
    }
    const d = new Date(lastObject.time);
    return `${months[d.getMonth()]} ${d.getDay()}`;
}

const numberFormatter = (number) => Math.round(number);

const timeFormatter = (time) => {
    const d = new Date(time);
    const minutes = d.getMinutes();
    const hours = d.getHours();
    if (minutes % 5) {
        return '';
    }
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}

const toolTipFormatter = (value, name, props) => `${value.toFixed(4)}`;
const emptyFormat = () => '';

const Chart = props => (
    <ResponsiveContainer width="50%" height={300}>
        <LineChart data={props.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="linear" dataKey="TF" stroke="#8884d8" dot={false} />
            <XAxis dataKey="time" tickFormatter={timeFormatter} >
                <Label position="insideBottomLeft" >
                    {getDate(props.data[props.data.length - 1])}
                </Label>
            </XAxis>
            <YAxis dataKey="TF" type="number" domain={['dataMin', 'dataMax']} tickFormatter={numberFormatter} />
            <Tooltip formatter={toolTipFormatter} labelFormatter={emptyFormat} />
        </LineChart>
    </ResponsiveContainer>
)
export default connect()(Chart);