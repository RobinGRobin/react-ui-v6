import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChart(props) {
    var totales = props.numEmotions;
    var emotions = [
        "CALMA",
        "SORPRESA",
        "MIEDO",
        "TRISTEZA",
        "CONFUSIÓN",
        "ENOJO",
        "DISGUSTO",
        "FELICIDAD",
        "DISTRACCIÓN",
    ];

    var misoptions = {
        responsive: true,
        animation: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                min: 0,
                ticks: { color: "#AE67FA" },
            },
            x: {
                ticks: { color: "#AE67FA" },
            },
        },
        indexAxis: "y",
    };

    var midata = {
        labels: emotions,
        datasets: [
            {
                label: "Totales",
                data: totales,
                backgroundColor: "#AE67FA",
                borderColor: "#AE67FA",
            },
        ],
    };

    return <Bar options={misoptions} data={midata} />;
}

export default BarChart;
