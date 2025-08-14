<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display the blog home page.
     */
    public function index()
    {
        $posts = Post::with(['author', 'category'])
            ->published()
            ->latest('published_at')
            ->paginate(6);

        $categories = Category::with(['posts' => function ($query) {
            $query->published();
        }])
            ->has('posts')
            ->get();

        $featuredPost = Post::with(['author', 'category'])
            ->published()
            ->latest('published_at')
            ->first();

        return Inertia::render('welcome', [
            'posts' => $posts,
            'categories' => $categories,
            'featuredPost' => $featuredPost,
        ]);
    }

    /**
     * Display the specified post.
     */
    public function show(Post $post)
    {
        // Only show published posts to public
        if ($post->status !== 'published') {
            abort(404);
        }

        $post->load(['author', 'category', 'comments.user']);

        $relatedPosts = Post::with(['author', 'category'])
            ->published()
            ->where('id', '!=', $post->id)
            ->where('category_id', $post->category_id)
            ->take(3)
            ->get();

        return Inertia::render('blog/show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }


}