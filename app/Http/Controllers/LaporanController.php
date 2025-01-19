<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;


class LaporanController extends Controller
{
    public function create()
    {
        return inertia('Laporan/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_program' => 'required|string',
            'jumlah_penerima' => 'required|integer',
            'provinsi' => 'required|string',
            'kabupaten' => 'required|string',
            'kecamatan' => 'required|string',
            'tanggal_penyaluran' => 'required|date',
            'bukti_penyaluran' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048', 
            'catatan' => 'nullable|string',
        ]);

        $filePath = $request->file('bukti_penyaluran')->store('bukti_penyaluran');

        $laporan = new Laporan();
        $laporan->nama_program = $request->nama_program;
        $laporan->jumlah_penerima = $request->jumlah_penerima;
        $laporan->provinsi = $request->provinsi;
        $laporan->kabupaten = $request->kabupaten;
        $laporan->kecamatan = $request->kecamatan;
        $laporan->tanggal_penyaluran = $request->tanggal_penyaluran;
        $laporan->bukti_penyaluran = $filePath;
        $laporan->catatan = $request->catatan;
        $laporan->status = 'Pending'; 
        $laporan->save();

        return redirect()->route('dashboard')->with('message', 'Laporan berhasil dibuat');
    }

    // menampilkan daftar laporan
    public function index()
    {
        $laporans = Laporan::all();
        return inertia('Laporan/index', ['laporan' => $laporans]);
    }

    // melihat laporan berdasarkan ID
    public function show($id)
    {
        $laporan = Laporan::findOrFail($id);
        return inertia('Laporan/edit', ['laporan' => $laporan]);
    }


    // mengedit laporan
    public function update(Request $request, $id)
    {
        $laporan = Laporan::findOrFail($id);

        if ($laporan->status !== 'Pending') {
            return response()->json(['error' => 'Laporan sudah diverifikasi dan tidak bisa diedit'], 400);
        }

        $validated = $request->validate([
            'nama_program' => 'required|string',
            'jumlah_penerima' => 'required|integer',
            'provinsi' => 'required|string',
            'kabupaten' => 'required|string',
            'kecamatan' => 'required|string',
            'tanggal_penyaluran' => 'required|date',
            'bukti_penyaluran' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'catatan' => 'nullable|string',
        ]);

        $laporan->nama_program = $request->nama_program;
        $laporan->jumlah_penerima = $request->jumlah_penerima;
        $laporan->provinsi = $request->provinsi;
        $laporan->kabupaten = $request->kabupaten;
        $laporan->kecamatan = $request->kecamatan;
        $laporan->tanggal_penyaluran = $request->tanggal_penyaluran;

        if ($request->hasFile('bukti_penyaluran')) {
            Storage::delete($laporan->bukti_penyaluran);
            $filePath = $request->file('bukti_penyaluran')->store('bukti_penyaluran');
            $laporan->bukti_penyaluran = $filePath;
        }

        $laporan->catatan = $request->catatan;
        $laporan->save();

        return redirect()->route('dashboard')->with('message', 'Laporan berhasil dibuat');
    }

    // menghapus laporan
    public function destroy($id)
    {
        $laporan = Laporan::findOrFail($id);

        if ($laporan->status !== 'Pending') {
            return redirect()->back()->with('error', 'Laporan sudah diverifikasi dan tidak bisa dihapus');
        }

        if ($laporan->bukti_penyaluran) {
            Storage::delete($laporan->bukti_penyaluran);
        }

        $laporan->delete();

        return redirect()->route('dashboard')->with('success', 'Laporan berhasil dihapus');
    }


    // memverifikasi laporan (admin)
    public function updateStatus(Request $request, $id)
    {

        dd($request->all());
        $request->validate([
            'status' => 'required|in:pending,Disetujui,Ditolak', 
            'alasan_penolakan' => 'nullable|string',  
        ]);

        $laporan = Laporan::findOrFail($id);

        $laporan->status = $request->status;

        if ($request->status === 'Ditolak') {
            $laporan->alasan_penolakan = $request->notes;  
        } else {
            $laporan->alasan_penolakan = null;  
        }

        $laporan->save();

        return redirect()->route('dashboard')->with('success', 'Status laporan berhasil diperbarui');
    }


    // statistik dashboard monitoring
    public function showStatistics()
    {
        $laporans = Laporan::all();
        return inertia('Laporan/statistics', ['laporan' => $laporans]);
    }

    public function getStatistics()
    {
        $totalReports = Laporan::count();
        $reportsByProgram = Laporan::select('nama_program', DB::raw('sum(jumlah_penerima) as total_penerima'))
            ->groupBy('nama_program')
            ->get();

        $reportsByRegion = Laporan::select('provinsi', DB::raw('sum(jumlah_penerima) as total_penerima'))
            ->groupBy('provinsi')
            ->get();

        return response()->json([
            'totalReports' => $totalReports,
            'reportsByProgram' => $reportsByProgram,
            'reportsByRegion' => $reportsByRegion,
        ]);
    }
}
