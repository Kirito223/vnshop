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
 * Class Donvitinh
 * 
 * @property int $id
 * @property string $TenDonVi
 * @property string|null $deleted_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Sanphamdonvi[] $sanphamdonvis
 *
 * @package App\Models
 */
class Donvitinh extends Model
{
	use SoftDeletes;
	protected $table = 'donvitinh';

	protected $fillable = [
		'TenDonVi'
	];

	public function sanphamdonvis()
	{
		return $this->hasMany(Sanphamdonvi::class, 'donvitinhId');
	}
}
