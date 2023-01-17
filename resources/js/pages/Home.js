import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import productApi from '../apis/productApi'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Home(props) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Doanh số bán hàng',
            },
        },
    };
    const [report, setDataReport] = useState([]);
    const [labels, setLabels] = useState([]);
    const data = {
        labels,
        datasets: [
            {
                label: 'Doanh số bán hàng',
                data: report,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: '#6C7BFA',
            },
        ],
    };

    useEffect(() => {
        productApi.report().then(res => {
            const { data, days } = res
            setLabels(days)
            setDataReport(data)
        })
    }, [])
    return (
        <Layout>
            <Bar options={options} data={data} />
        </Layout>
    );
}

export default Home;