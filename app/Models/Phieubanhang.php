<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Phieubanhang
 * 
 * @property int $id
 * @property Carbon $NgayLap
 * @property int $LoaiPhieu
 * @property float $TongTien
 * @property float $TongNo
 * @property bool $No
 * @property int $khachhangId
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Khachhang $khachhang
 * @property Collection|Chitietphieubanhang[] $chitietphieubanhangs
 *
 * @package App\Models
 */
class Phieubanhang extends Model
{
	protected $table = 'phieubanhang';

	protected $casts = [
		'LoaiPhieu' => 'int',
		'TongTien' => 'float',
		'TongNo' => 'float',
		'No' => 'bool',
		'khachhangId' => 'int'
	];

	protected $dates = [
		'NgayLap'
	];

	protected $fillable = [
		'NgayLap',
		'LoaiPhieu',
		'TongTien',
		'TongNo',
		'No',
		'khachhangId'
	];

	public function khachhang()
	{
		return $this->belongsTo(Khachhang::class, 'khachhangId');
	}

	public function chitietphieubanhangs()
	{
		return $this->hasMany(Chitietphieubanhang::class, 'phieubanhangId');
	}
}
