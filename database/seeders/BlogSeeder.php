<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::factory()->admin()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        // Create author users
        $authors = User::factory()->author()->count(3)->create();

        // Create categories
        $categories = Category::factory()->count(6)->create();

        // Create posts
        $posts = collect();
        
        // Admin posts
        $adminPosts = Post::factory()
            ->count(8)
            ->published()
            ->create([
                'author_id' => $admin->id,
                'category_id' => fn() => $categories->random()->id,
            ]);
        $posts = $posts->merge($adminPosts);

        // Author posts
        foreach ($authors as $author) {
            $authorPosts = Post::factory()
                ->count(random_int(3, 6))
                ->create([
                    'author_id' => $author->id,
                    'category_id' => fn() => $categories->random()->id,
                ]);
            $posts = $posts->merge($authorPosts);
        }

        // Create comments
        $allUsers = collect([$admin])->merge($authors);
        
        foreach ($posts->where('status', 'published') as $post) {
            Comment::factory()
                ->count(random_int(0, 5))
                ->create([
                    'post_id' => $post->id,
                    'user_id' => fn() => $allUsers->random()->id,
                    'status' => 'approved',
                ]);
        }
    }
}