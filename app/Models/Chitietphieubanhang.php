<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Chitietphieubanhang
 * 
 * @property int $id
 * @property int $phieubanhangId
 * @property string $TenSanPham
 * @property string $DonVi
 * @property string $SoLuong
 * @property string $Gia
 * @property string $ThanhTien
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Phieubanhang $phieubanhang
 *
 * @package App\Models
 */
class Chitietphieubanhang extends Model
{
	protected $table = 'chitietphieubanhang';

	protected $casts = [
		'phieubanhangId' => 'int'
	];

	protected $fillable = [
		'phieubanhangId',
		'TenSanPham',
		'DonVi',
		'SoLuong',
		'Gia',
		'ThanhTien'
	];

	public function phieubanhang()
	{
		return $this->belongsTo(Phieubanhang::class, 'phieubanhangId');
	}
}
