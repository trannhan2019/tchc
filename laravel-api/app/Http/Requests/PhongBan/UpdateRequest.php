<?php

namespace App\Http\Requests\PhongBan;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRequest extends FormRequest
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
            'ten_phong_ban' => [
                'required',
                'string',
                'max:255',
                Rule::unique('phong_bans')->ignore($this->ten_phong_ban, 'ten_phong_ban'),
            ],
            'ma_phong_ban' => [
                'required',
                'string',
                'max:255',
                Rule::unique('phong_bans')->ignore($this->ma_phong_ban, 'ma_phong_ban'),
            ],
            'thu_tu_sap_xep' => 'required|integer',
            'trang_thai' => 'required|boolean',
        ];
        // return [
        //     'ten_phong_ban' => 'required|string|max:255|unique:phong_bans,ten_phong_ban,' . $this->id,
        //     'ma_phong_ban' => 'required|string|max:255|unique:phong_bans,ma_phong_ban,' . $this->id,
        //     'thu_tu_sap_xep' => 'required|integer',
        //     'trang_thai' => 'required|boolean',
        // ];
    }
}
