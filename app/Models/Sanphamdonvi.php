<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Sanphamdonvi
 * 
 * @property int $id
 * @property int $sanphamId
 * @property int $donvitinhId
 * @property float $GiaLe
 * @property float $GiaSi
 * @property bool $Primary
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Donvitinh $donvitinh
 * @property Sanpham $sanpham
 *
 * @package App\Models
 */
class Sanphamdonvi extends Model
{
	protected $table = 'sanphamdonvi';

	protected $casts = [
		'sanphamId' => 'int',
		'donvitinhId' => 'int',
		'GiaLe' => 'float',
		'GiaSi' => 'float',
		'Primary' => 'bool'
	];

	protected $fillable = [
		'sanphamId',
		'donvitinhId',
		'GiaLe',
		'GiaSi',
		'Primary'
	];

	public function donvitinh()
	{
		return $this->belongsTo(Donvitinh::class, 'donvitinhId');
	}

	public function sanpham()
	{
		return $this->belongsTo(Sanpham::class, 'sanphamId');
	}
}
