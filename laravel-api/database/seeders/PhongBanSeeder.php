<?php

namespace Database\Seeders;

use App\Models\PhongBan;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;



class PhongBanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PhongBan::truncate(); //xoa toan bo du lieu trong bang
        //lay du lieu tu file json
        $json = file_get_contents(database_path('data/phong_bans.json'));
        $data = json_decode($json, true);
        foreach ($data as $item) {
            PhongBan::create($item);
        }
    }
}
