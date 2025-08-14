<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryBlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public blog routes
Route::get('/', [BlogController::class, 'index'])->name('welcome');
Route::get('/blog/{post:slug}', [BlogController::class, 'show'])->name('blog.show');
Route::get('/category/{category:slug}', [CategoryBlogController::class, 'show'])->name('blog.category');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        
        // Get stats based on user role
        $stats = [
            'totalPosts' => $user->isAdmin() ? 
                \App\Models\Post::count() : 
                \App\Models\Post::where('author_id', $user->id)->count(),
            'publishedPosts' => $user->isAdmin() ? 
                \App\Models\Post::where('status', 'published')->count() : 
                \App\Models\Post::where('author_id', $user->id)->where('status', 'published')->count(),
            'draftPosts' => $user->isAdmin() ? 
                \App\Models\Post::where('status', 'draft')->count() : 
                \App\Models\Post::where('author_id', $user->id)->where('status', 'draft')->count(),
            'totalComments' => $user->isAdmin() ? \App\Models\Comment::count() : 0,
            'pendingComments' => $user->isAdmin() ? \App\Models\Comment::where('status', 'pending')->count() : 0,
            'totalCategories' => $user->isAdmin() ? \App\Models\Category::count() : 0,
        ];
        
        // Get recent posts
        $recentPosts = $user->isAdmin() ? 
            \App\Models\Post::with('author')->withCount('comments')->latest()->take(5)->get() :
            \App\Models\Post::where('author_id', $user->id)->withCount('comments')->latest()->take(5)->get();
        
        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentPosts' => $recentPosts,
        ]);
    })->name('dashboard');
    
    // Post management routes
    Route::resource('posts', PostController::class);
    
    // Category management routes (admin only)
    Route::resource('categories', CategoryController::class);
    
    // Comment management routes
    Route::resource('comments', CommentController::class)->only(['index', 'store', 'update', 'destroy']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
