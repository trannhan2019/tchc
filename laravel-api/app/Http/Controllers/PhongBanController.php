<?php

namespace App\Http\Controllers;

use App\Http\Requests\PhongBan\StoreRequest;
use App\Http\Resources\PhongBanResource;
use App\Models\PhongBan;
use Illuminate\Http\Request;

class PhongBanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $phongBans = PhongBan::where('ten_phong_ban', 'like', '%' . $search . '%')->orWhere('ma_phong_ban', 'like', '%' . $search . '%')->orderBy('thu_tu_sap_xep')->get();
        return PhongBanResource::collection($phongBans);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        PhongBan::create($request->validated());
        return response()->json([
            'message' => 'Thêm mới phòng ban thành công'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(PhongBan $phongBan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PhongBan $phongBan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PhongBan $phongBan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PhongBan $phongBan)
    {
        //
    }
}
