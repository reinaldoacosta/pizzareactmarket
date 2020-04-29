<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
class Orders extends Model {
    //
    public $timestamps = true;
    public $table = 'orders';
    protected $fillable = ['first_name', 'last_name', 'user_id', 'address', 'apt_number', 'city', 'items', 'amount'];

    function user() {
        return $this->belongsTo(User::class);
    }

}
