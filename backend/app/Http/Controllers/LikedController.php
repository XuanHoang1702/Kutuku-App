<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Liked;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;

class LikedController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();
        $liked = Liked::with('product')->where('user_id', $userId)->get();
        $data = $liked->map(function($likedItem) {
            return [
                'id' => $likedItem->id,
                'product_id' => $likedItem->product->id,
                'product_name' => $likedItem->product->name,
                'product_price' => $likedItem->product->price,
                'product_detail' => $likedItem->product->detail,
                'product_description' => $likedItem->product->description,
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
        $userId = Auth::id();
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|integer',
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 402);
        } else {
            $existingLiked = Liked::where('user_id', $userId)
                                    ->where('product_id', $request->product_id)
                                    ->first();
            if ($existingLiked) {
                return response()->json(['message' => 'Product already liked'], 409);
            }else{
                $liked = Liked::create([
                    'user_id' => $userId,
                    'product_id' => $request->product_id,
                ]);
            }
            return response()->json(['data' => $liked], 201);
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
