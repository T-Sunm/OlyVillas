import React from 'react'
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
} from "recharts";
import './EarningsAreaChart.css'
import { format, parseISO } from 'date-fns'

const EarningsAreaChart = ({ data }) => {

    console.log(data)
    return (
        <ResponsiveContainer width={"100%"} height={400}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id='color' x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
                        <stop offset={"0%"} stopColor='#2451B7' stopOpacity={0.4} />
                        <stop offset={"75%"} stopColor='#2451B7' stopOpacity={0.05} />
                    </linearGradient>
                </defs>
                <Area dataKey={"price"} stroke='#2451B7' fill='url(#color)' />

                <XAxis dataKey={"startDate"} axisLine={false} tickLine={false} tickCount={12}
                    tickFormatter={(str) => {
                        const date = new Date(str);
                        return date.toLocaleString('en-US', { month: 'short' }); // sẽ trả về 'Jan', 'Feb', 'Mar',...
                    }} />

                <YAxis dataKey={"price"} axisLine={false} tickLine={false} tickCount={8} />

                <Tooltip content={<CustomTooltip />} />

                <CartesianGrid opacity={0.1} />

            </AreaChart>
        </ResponsiveContainer>
    )
}

function CustomTooltip({ active, payload, label }) {
    if (active) {
        return (
            <div className="tooltip">
                <h4>{format(parseISO(label), "MMM")}</h4> {/* chỉ hiển thị tháng */}
                <p>${payload[0].value}</p>
            </div>
        )
    }
}

export default EarningsAreaChart