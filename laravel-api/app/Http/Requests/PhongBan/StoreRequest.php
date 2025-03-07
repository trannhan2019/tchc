<?php

namespace App\Http\Requests\PhongBan;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'ten_phong_ban' => 'required|string|max:255',
            'ma_phong_ban' => 'required|string|max:255',
            'thu_tu_sap_xep' => 'required|integer',
            'trang_thai' => 'required|boolean',
        ];
    }
}
