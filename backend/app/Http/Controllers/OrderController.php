<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Cart;
class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $orderDetails = OrderDetail::whereHas('order', function ($query) use ($user) {
            $query->where('user_id', $user->id)->where('status', 'pending');
        })->with('product:id,name,detail')
            ->get(['id', 'order_id', 'product_id', 'quantity', 'price']);

        $data = $orderDetails->map(function ($detail) {
            return [
                'id' => $detail->id,
                'order_id' => $detail->order_id,
                'product_id' => $detail->product_id,
                'quantity' => $detail->quantity,
                'price' => $detail->price,
                'product_detail' => $detail->product->detail,
                'product_name' => $detail->product->name,
            ];
        });

        return response()->json(['order_details' => $data]);
    }

    public function history()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $orderDetails = OrderDetail::whereHas('order', function ($query) use ($user) {
            $query->where('user_id', $user->id)->where('status', 'completed');
        })->with('product:id,name,detail')
            ->get(['id', 'order_id', 'product_id', 'quantity', 'price']);

        $data = $orderDetails->map(function ($detail) {
            return [
                'id' => $detail->id,
                'order_id' => $detail->order_id,
                'product_id' => $detail->product_id,
                'quantity' => $detail->quantity,
                'price' => $detail->price,
                'product_detail' => $detail->product->detail,
                'product_name' => $detail->product->name,
            ];
        });

        return response()->json(['order_details' => $data]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $validate = Validator::make($request->all(), [
            'total_quantity' => 'required|integer|min:1',
            'total_price' => 'required|numeric|min:0',
            'status' => 'nullable|string',
        ]);

        if ($validate->fails()) {
            return response()->json(['error' => $validate->errors()], 401);
        } else {
            $order = Order::create([
                'user_id' => $user->id,
                'total_quantity' => $request->total_quantity,
                'total_price' => $request->total_price,
                'status' => $request->status ?? 'pending',
            ]);
            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order,
            ], 201);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
