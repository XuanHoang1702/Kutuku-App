<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;
use App\Models\Category;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::all();
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
        $validate = Validator::make($request->all(),[
            'category_id'=>'exists:categories,id',
            'name'=>'required|string|unique:products,name',
            'slug'=>'required|string|unique:products,slug',
            'price'=>'required|numeric',
            'image'=>'required|image|mimes:jpg,jpeg,png,gif,svg|max:2048',
            'detail'=>'nullable|string',
            'description'=>'nullable|string',
        ]);

        if($validate->fails()){
            return response()->json(['error'=>$validate->errors()],401);
        }else{
            $imageName = null;
            if ($request->hasFile('image')) {
                $imageName = $request->file('image')->getClientOriginalName();
                $request->file('image')->storeAs('images', $imageName, 'public');
            }
            $product = Product::create([
                'category_id'=>$request->category_id,
                'name'=>$request->name,
                'slug'=>$request->slug,
                'price'=>$request->price,
                'image'=>$imageName,
                'detail'=>$request->detail,
                'description'=>$request->description,
            ]);

            return response()->json([
                'data'=>$product,
            ],201);
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
            $validator = Validator::make($request->all(), [
                'name' => 'nullable|string|max:255',
                'detail' => 'nullable|string',
                'price' => 'nullable|numeric',
                'category_id' => 'nullable|integer',
                'slug' => 'nullable|string|max:255|unique:products,slug,' . $id,
                'description' => 'nullable|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            try {
                $product = Product::findOrFail($id);

                $product->name = $request->input('name', $product->name);
                $product->detail = $request->input('detail', $product->detail);
                $product->price = $request->input('price', $product->price);
                $product->category_id = $request->input('category_id', $product->category_id);
                $product->slug = $request->input('slug', $product->slug);
                $product->description = $request->input('description', $product->description);

                if ($request->hasFile('image')) {
                    $imageName = $request->file('image')->getClientOriginalExtension();
                    $request->file('image')->storeAs('images', $imageName, 'public');
                    $product->image = $imageName;
                }

                $product->save();

                return response()->json(['message' => 'Product updated successfully', 'product' => $product], 200);

            } catch (\Exception $e) {
                return response()->json(['message' => 'Failed to update product', 'error' => $e->getMessage()], 500);
            }
        }





    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();
            return response()->json(['message' => 'Product deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete product'], 500);
        }
    }

    public function getImageProduct($id)
    {
        $product = Product::find($id);
        $image = $product->image;
        $imagePath = Storage::disk('public')->path("images/{$image}");
        return response()->file($imagePath);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $products = Product::where('name', 'LIKE', "%{$query}%")->get();
        return response()->json($products);
    }

    public function getProductByCategory($id){
        $products = Product::where('category_id', $id)->with('category')->get();
        $category = Category::find($id);
        $categoryName = $category->name;
        if ($products->isEmpty()) {
            return response()->json(['error' => 'No products found in this category'], 422);
        }
        return response()
        ->json([
            'category' => $categoryName,
            'data' => $products
            ]
        , 200);
    }
}
