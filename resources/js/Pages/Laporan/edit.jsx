import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Edit = ({ auth, laporan }) => {
    const { data, setData, put, processing, errors } = useForm({
        nama_program: laporan.nama_program || "",
        jumlah_penerima: laporan.jumlah_penerima || "",
        provinsi: laporan.provinsi || "",
        kabupaten: laporan.kabupaten || "",
        kecamatan: laporan.kecamatan || "",
        tanggal_penyaluran: laporan.tanggal_penyaluran || "",
        bukti_penyaluran: null,
        catatan: laporan.catatan || "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleFileChange = (e) => {
        setData("bukti_penyaluran", e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("laporan.update", laporan.id)); 
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Laporan
                </h2>
            }
        >
            <Head title="Edit Laporan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h1 className="text-2xl font-semibold mb-6">Edit Laporan</h1>
                            <form onSubmit={handleSubmit}>
                                {/* Field Nama Program */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nama Program
                                    </label>
                                    <input
                                        type="text"
                                        name="nama_program"
                                        value={data.nama_program}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.nama_program && (
                                        <span className="text-red-500 text-sm">{errors.nama_program}</span>
                                    )}
                                </div>

                                {/* Field Jumlah Penerima */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Jumlah Penerima
                                    </label>
                                    <input
                                        type="number"
                                        name="jumlah_penerima"
                                        value={data.jumlah_penerima}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.jumlah_penerima && (
                                        <span className="text-red-500 text-sm">{errors.jumlah_penerima}</span>
                                    )}
                                </div>

                                {/* Field Provinsi */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Provinsi</label>
                                    <input
                                        type="text"
                                        name="provinsi"
                                        value={data.provinsi}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.provinsi && (
                                        <span className="text-red-500 text-sm">{errors.provinsi}</span>
                                    )}
                                </div>

                                {/* Field Kabupaten */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Kabupaten</label>
                                    <input
                                        type="text"
                                        name="kabupaten"
                                        value={data.kabupaten}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.kabupaten && (
                                        <span className="text-red-500 text-sm">{errors.kabupaten}</span>
                                    )}
                                </div>

                                {/* Field Kecamatan */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Kecamatan</label>
                                    <input
                                        type="text"
                                        name="kecamatan"
                                        value={data.kecamatan}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.kecamatan && (
                                        <span className="text-red-500 text-sm">{errors.kecamatan}</span>
                                    )}
                                </div>

                                {/* Field Tanggal Penyaluran */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Tanggal Penyaluran</label>
                                    <input
                                        type="date"
                                        name="tanggal_penyaluran"
                                        value={data.tanggal_penyaluran}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.tanggal_penyaluran && (
                                        <span className="text-red-500 text-sm">{errors.tanggal_penyaluran}</span>
                                    )}
                                </div>

                                {/* Field Bukti Penyaluran */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Bukti Penyaluran</label>
                                    <input
                                        type="file"
                                        name="bukti_penyaluran"
                                        onChange={handleFileChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.bukti_penyaluran && (
                                        <span className="text-red-500 text-sm">{errors.bukti_penyaluran}</span>
                                    )}
                                </div>

                                {/* Field Catatan */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Catatan</label>
                                    <textarea
                                        name="catatan"
                                        value={data.catatan}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 disabled:bg-gray-400"
                                >
                                    {processing ? "Processing..." : "Update"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
