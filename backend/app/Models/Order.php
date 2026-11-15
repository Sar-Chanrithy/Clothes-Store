<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Order extends Model
{
    protected $fillable = ['user_id', 'status', 'shipping_address', 'subtotal', 'tax', 'shipping', 'total'];
    protected function casts(): array { return ['shipping_address' => 'array', 'subtotal' => 'decimal:2', 'tax' => 'decimal:2', 'shipping' => 'decimal:2', 'total' => 'decimal:2']; }
    public function items() { return $this->hasMany(OrderItem::class); }
}
