import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Registrasi elemen yang diperlukan
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Statistics = ({ auth, laporan }) => {
    const [statistics, setStatistics] = useState({
        totalReports: 0,
        reportsByProgram: [],
        reportsByRegion: [],
    });

    // Ambil data statistik dari backend
    useEffect(() => {
        fetch("/statistics/data")
            .then((response) => response.json())
            .then((data) => setStatistics(data))
            .catch((error) => console.error("Error fetching statistics:", error));
    }, []);

    // Data untuk Grafik Penyaluran Bantuan per Wilayah (Provinsi)
    const dataGrafik = {
        labels: statistics.reportsByRegion.map((item) => item.provinsi),
        datasets: [
            {
                label: "Jumlah Penerima Bantuan",
                data: statistics.reportsByRegion.map((item) => item.total_penerima),
                fill: false,
                borderColor: "rgba(75,192,192,1)",
                tension: 0.1,
            },
        ],
    };

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Statistik Penyaluran Bantuan
                    </h2>
                }
            >
                <Head title="Dashboard" />

                <div className="py-12 bg-gray-50 min-h-screen">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {/* Grid untuk Tata Letak yang Responsif */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Total Laporan */}
                            <div className="col-span-12 bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-lg font-medium text-gray-600 mb-2">
                                    Total Laporan yang Masuk
                                </h2>
                                <p className="text-4xl font-bold text-indigo-600">
                                    {statistics.totalReports}
                                </p>
                            </div>

                            {/* Grafik Penyaluran Bantuan */}
                            <div className="col-span-12 h-[300px] lg:h-full lg:col-span-8 bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-lg font-medium text-gray-600 mb-4">
                                    Grafik Penyaluran Bantuan per Wilayah
                                </h2>
                                <div className="relative h-[400px]">
                                    <Line data={dataGrafik} />
                                </div>
                            </div>

                            {/* Daftar Penerima Bantuan per Program */}
                            <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-lg font-medium text-gray-600 mb-4">
                                    Jumlah Penerima Bantuan per Program
                                </h2>
                                <ul className="space-y-2">
                                    {statistics.reportsByProgram.map((program, index) => (
                                        <li key={index} className="text-gray-700">
                                            <strong className="text-indigo-600">{program.nama_program}:</strong>{" "}
                                            {program.total_penerima} Penerima
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default Statistics;
