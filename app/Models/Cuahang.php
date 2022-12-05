<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Cuahang
 * 
 * @property int $id
 * @property string $TenCuaHang
 * @property string $DiaChi
 * @property string $SoDienThoai
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class Cuahang extends Model
{
	protected $table = 'cuahang';

	protected $fillable = [
		'TenCuaHang',
		'DiaChi',
		'SoDienThoai'
	];
}
