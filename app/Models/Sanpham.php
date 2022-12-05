<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Sanpham
 * 
 * @property int $id
 * @property string $TenSanPham
 * @property string $MaSanPham
 * @property Carbon $NgaySanXuat
 * @property Carbon $NgayHetHan
 * @property float $GiaNhap
 * @property bool $TrangThai
 * @property float $SoLuongTonKho
 * @property string|null $deleted_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Sanphamdonvi[] $sanphamdonvis
 *
 * @package App\Models
 */
class Sanpham extends Model
{
	use SoftDeletes;
	protected $table = 'sanpham';

	protected $casts = [
		'GiaNhap' => 'float',
		'TrangThai' => 'bool',
		'SoLuongTonKho' => 'float'
	];

	protected $dates = [
		'NgaySanXuat',
		'NgayHetHan'
	];

	protected $fillable = [
		'TenSanPham',
		'MaSanPham',
		'NgaySanXuat',
		'NgayHetHan',
		'GiaNhap',
		'TrangThai',
		'SoLuongTonKho'
	];

	public function sanphamdonvis()
	{
		return $this->hasMany(Sanphamdonvi::class, 'sanphamId');
	}
}
