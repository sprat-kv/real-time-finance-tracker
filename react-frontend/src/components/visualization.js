import React from 'react';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const ExpenseTrendChart = ({ data }) => {
    return (
        <LineChart
            width={400}
            height={200}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="expense" stroke="#8884d8" />
        </LineChart>
    );
};

export const CategoryDistributionChart = ({ data }) => {
    const totalByCategory = data.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.expense;
        return acc;
    }, {});
    const pieData = Object.keys(totalByCategory).map((key) => ({
        name: key,
        value: totalByCategory[key],
    }));

    return (
        <PieChart width={400} height={300}>
            <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
            >
                {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
};

export const CategoryComparisonChart = ({ data }) => {
    const totalByCategory = data.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.expense;
        return acc;
    }, {});
    const barData = Object.keys(totalByCategory).map((key) => ({
        category: key,
        expense: totalByCategory[key],
    }));

    return (
        <BarChart
            width={400}
            height={200}
            data={barData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="expense" fill="#8884d8" />
        </BarChart>
    );
};