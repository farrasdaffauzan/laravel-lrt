import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Laporan({ auth, laporan }) {
    const { data, setData, put, processing, errors } = useForm({
        status: "",
    });

    const [changeStatus, setChangeStatus] = useState([]);

    const handleChange = (e, laporId) => {
        const { name, value } = e.target; 
        setChangeStatus((prevData) => {
            return {
                ...prevData,
                [laporId]: {
                    ...prevData[laporId], 
                    status: value,        
                },
            };
        });

        
        setData(e.target.name, e.target.value);
    };

    console.log("data:", data);

    const handleSubmit = (e, laporId) => {
        e.preventDefault();
        put(route("laporan.updateStatus", laporId), {
            data: {
                status: data.status, 
            },
            onSuccess: () => {
                alert("Status laporan berhasil diperbarui");
            },
            onError: () => {
                alert("Gagal memperbarui status laporan");
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Laporan
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {laporan.map((lapor) => (
                            <div
                                key={lapor.id}
                                className="bg-white shadow-lg rounded-lg overflow-hidden"
                            >
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {lapor.nama_program}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Jumlah Penerima: {lapor.jumlah_penerima}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Provinsi: {lapor.provinsi}
                                    </p>
                                    {auth.user.role === "admin" && (
                                        <>
                                            <p className="text-sm text-gray-600">
                                                Tanggal Penyaluran:{" "}
                                                {lapor.tanggal_penyaluran}
                                            </p>
                                            <a
                                                href={lapor.bukti_penyaluran}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Unduh Bukti Penyaluran
                                            </a>
                                        </>
                                    )}
                                    <p className="text-sm text-gray-600">
                                        Status:
                                        <span
                                            className={`font-semibold ${
                                                lapor.status === "Pending"
                                                    ? "text-yellow-500"
                                                    : lapor.status === "Disetujui"
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {lapor.status}
                                        </span>
                                    </p>
                                </div>
                                <div className="px-6 py-3 bg-gray-100 text-center">
                                    <div className="flex justify-end space-x-4">
                                        {/* Tampilkan tombol Edit dan Hapus hanya untuk pengguna selain admin */}
                                        {auth.user.role !== "admin" && lapor.status === "Pending" && (
                                            <>
                                                <Link
                                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                                    href={route(
                                                        "laporan.edit",
                                                        lapor.id
                                                    )}
                                                >
                                                    Edit
                                                </Link>
                                                <form
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        if (
                                                            confirm(
                                                                "Apakah Anda yakin ingin menghapus laporan ini?"
                                                            )
                                                        ) {
                                                            router.delete(
                                                                route(
                                                                    "laporan.destroy",
                                                                    lapor.id
                                                                ),
                                                                {
                                                                    onSuccess:
                                                                        () =>
                                                                            alert(
                                                                                "Laporan berhasil dihapus"
                                                                            ),
                                                                    onError:
                                                                        () =>
                                                                            alert(
                                                                                "Gagal menghapus laporan"
                                                                            ),
                                                                }
                                                            );
                                                        }
                                                    }}
                                                    className="inline"
                                                >
                                                    <button
                                                        type="submit"
                                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                                    >
                                                        Hapus
                                                    </button>
                                                </form>
                                            </>
                                        )}

                                        {/* Form Update Status hanya untuk Admin */}
                                        {auth.user.role === "admin" && (
                                            <form
                                                onSubmit={(e) =>
                                                    handleSubmit(e, lapor.id)
                                                }
                                            >
                                                {/* Field Status */}
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Status
                                                    </label>
                                                    <select
                                                        name="status"
                                                        value={data[lapor.id]?.status}
                                                        onChange={(e) => handleChange(e, lapor.id)}
                                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    >
                                                        <option value="pending">
                                                            Pilih Status
                                                        </option>
                                                        <option value="Disetujui">
                                                            Disetujui
                                                        </option>
                                                        <option value="Ditolak">
                                                            Ditolak
                                                        </option>
                                                    </select>
                                                    {errors.status && (
                                                        <span className="text-red-500 text-sm">
                                                            {errors.status}
                                                        </span>
                                                    )}
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 disabled:bg-gray-400"
                                                >
                                                    {processing
                                                        ? "Processing..."
                                                        : "Update Status"}
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
