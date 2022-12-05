<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Khachhang
 * 
 * @property int $id
 * @property string $HoTen
 * @property string $DiaChi
 * @property string|null $SoDienThoai
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Phieubanhang[] $phieubanhangs
 *
 * @package App\Models
 */
class Khachhang extends Model
{
	protected $table = 'khachhang';

	protected $fillable = [
		'HoTen',
		'DiaChi',
		'SoDienThoai'
	];

	public function phieubanhangs()
	{
		return $this->hasMany(Phieubanhang::class, 'khachhangId');
	}
}
