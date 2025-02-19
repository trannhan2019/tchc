<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PhongBanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'ten_phong_ban' => $this->ten_phong_ban,
            'ma_phong_ban' => $this->ma_phong_ban,
            'thu_tu_sap_xep' => $this->thu_tu_sap_xep,
            'trang_thai' => $this->trang_thai
        ];
    }
}
