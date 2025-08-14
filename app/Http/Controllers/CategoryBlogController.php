<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Inertia\Inertia;

class CategoryBlogController extends Controller
{
    /**
     * Display posts by category.
     */
    public function show(Category $category)
    {
        $posts = Post::with(['author', 'category'])
            ->published()
            ->where('category_id', $category->id)
            ->latest('published_at')
            ->paginate(9);

        return Inertia::render('blog/category', [
            'category' => $category,
            'posts' => $posts,
        ]);
    }
}