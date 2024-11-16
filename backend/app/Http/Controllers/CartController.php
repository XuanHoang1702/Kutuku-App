<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use Illuminate\Support\Facades\Validator;
use App\Models\Product;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user_id = auth()->user()->id;

        if (!$user_id) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
        $cartItems = Cart::with('product')->where('user_id', $user_id)->get();
        $data = $cartItems->map(function($cartItem) {
            return [
                'id' => $cartItem->id,
                'product_id' => $cartItem->product->id,
                'product_name' => $cartItem->product->name,
                'quantity' => $cartItem->quantity,
                'product_price' => $cartItem->product->price,
                'product_detail' => $cartItem->product->detail,
                'product_description' => $cartItem->product->description,
            ];
        });
        return response()->json(['data' => $data], 200);
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
        $user = auth()->user();

        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $validate = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'quantity' => 'nullable|integer',
        ]);

        if ($validate->fails()) {
            return response()->json(['error' => $validate->errors()], 401);
        } else {
            $cart = Cart::create([
                'user_id' => $user->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity ?? 1,
            ]);

            $product = Product::find($request->product_id);

            if (!$product) {
                return response()->json(['error' => 'Product not found'], 404);
            }

            $data = [
                'user_id' => $cart->user_id,
                'product_id' => $request->product_id,
                'product_name' => $product->name,
                'product_price' => $product->price,
                'quantity' => $cart->quantity,
            ];

            return response()->json([
                'message' => 'Product added to cart successfully',
                'data' => $data,
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
