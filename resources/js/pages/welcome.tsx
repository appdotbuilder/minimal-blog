import React from 'react';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    published_at: string;
    author: {
        id: number;
        name: string;
    };
    category: {
        id: number;
        name: string;
        slug: string;
    } | null;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    posts_count?: number;
}

interface Props extends SharedData {
    posts: {
        data: Post[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
        meta: { total: number; from: number; to: number };
    };
    categories: Category[];
    featuredPost: Post | null;
}

export default function Welcome() {
    const { auth, posts, categories, featuredPost } = usePage<Props>().props;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Head title="📝 Personal Blog - Share Your Stories" />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">📝</span>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Personal Blog
                                </h1>
                            </div>
                            
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            Welcome, {auth.user.name}!
                                        </span>
                                        <Link
                                            href={route('dashboard')}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                            Dashboard
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative py-20 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                                📝 Share Your <span className="text-blue-600">Stories</span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                                A modern, minimalist blog platform where writers can share their thoughts, 
                                engage with readers, and build a community around great content.
                            </p>
                            
                            <div className="flex flex-wrap justify-center gap-4 mb-12">
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-2xl">✍️</span>
                                        <span className="font-medium text-gray-900 dark:text-white">Write & Publish</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Create beautiful posts</p>
                                </div>
                                
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-2xl">🏷️</span>
                                        <span className="font-medium text-gray-900 dark:text-white">Organize</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage categories</p>
                                </div>
                                
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-2xl">💬</span>
                                        <span className="font-medium text-gray-900 dark:text-white">Engage</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Comment system</p>
                                </div>
                                
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-2xl">🌙</span>
                                        <span className="font-medium text-gray-900 dark:text-white">Dark Mode</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Eye-friendly design</p>
                                </div>
                            </div>

                            {!auth.user && (
                                <div className="space-x-4">
                                    <Link
                                        href={route('register')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors inline-flex items-center space-x-2"
                                    >
                                        <span>🚀</span>
                                        <span>Start Writing Today</span>
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-8 py-3 rounded-lg font-medium text-lg transition-colors"
                                    >
                                        Login
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Featured Post */}
                {featuredPost && (
                    <section className="py-16 bg-white dark:bg-gray-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    ⭐ Featured Post
                                </h2>
                            </div>
                            
                            <div className="max-w-4xl mx-auto">
                                <Link
                                    href={route('blog.show', featuredPost.slug)}
                                    className="block bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="text-4xl">📖</div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                                {featuredPost.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                                {featuredPost.excerpt}
                                            </p>
                                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="flex items-center space-x-1">
                                                    <span>👤</span>
                                                    <span>{featuredPost.author.name}</span>
                                                </span>
                                                {featuredPost.category && (
                                                    <span className="flex items-center space-x-1">
                                                        <span>🏷️</span>
                                                        <span>{featuredPost.category.name}</span>
                                                    </span>
                                                )}
                                                <span className="flex items-center space-x-1">
                                                    <span>📅</span>
                                                    <span>{formatDate(featuredPost.published_at)}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* Recent Posts */}
                {posts.data.length > 0 && (
                    <section className="py-16 bg-gray-50 dark:bg-gray-800">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    📚 Recent Posts
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Discover the latest stories from our community
                                </p>
                            </div>
                            
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.data.slice(0, 6).map((post) => (
                                    <Link
                                        key={post.id}
                                        href={route('blog.show', post.slug)}
                                        className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
                                    >
                                        <div className="flex items-start space-x-3 mb-4">
                                            <div className="text-2xl">📄</div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                                    {post.title}
                                                </h3>
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        
                                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center space-x-2">
                                                <span>👤</span>
                                                <span>{post.author.name}</span>
                                            </div>
                                            {post.category && (
                                                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                                                    {post.category.name}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Categories */}
                {categories.length > 0 && (
                    <section className="py-16 bg-white dark:bg-gray-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    🏷️ Explore Categories
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Find content that interests you
                                </p>
                            </div>
                            
                            <div className="flex flex-wrap justify-center gap-4">
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={route('blog.category', category.slug)}
                                        className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800 dark:hover:to-blue-700 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
                                    >
                                        {category.name} ({category.posts_count || 0})
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-2 mb-4">
                                <span className="text-2xl">📝</span>
                                <span className="text-xl font-bold">Personal Blog</span>
                            </div>
                            <p className="text-gray-400 mb-6">
                                Where stories come to life and communities are built around great content.
                            </p>
                            <div className="flex justify-center space-x-8 mb-8">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-400">{posts.meta?.total || 0}</div>
                                    <div className="text-gray-400 text-sm">Posts Published</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-400">{categories.length}</div>
                                    <div className="text-gray-400 text-sm">Categories</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-400">∞</div>
                                    <div className="text-gray-400 text-sm">Stories to Tell</div>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm">
                                Built with ❤️ using Laravel & React • Supporting writers and readers everywhere
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}