<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Orders;

class User extends Model {
    protected $table = 'users';
    public $timestamps = true;
    protected $fillable = ['username', 'password'];

    function orders(){
        return $this->hasMany(Orders::class);
    }
}
