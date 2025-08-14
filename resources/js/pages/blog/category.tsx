import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface User {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    published_at: string;
    author: User;
    category: Category | null;
}

interface Props extends SharedData {
    category: Category;
    posts: {
        data: Post[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
        meta: { total: number; from: number; to: number };
    };
}

export default function BlogCategory() {
    const { category, posts, auth } = usePage<Props>().props;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Head title={`${category.name} - Blog Categories`} />
            
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Link
                                href={route('welcome')}
                                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                            >
                                <span>←</span>
                                <span>Back to Blog</span>
                            </Link>
                            
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href={route('login')}
                                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Category Header */}
                <section className="bg-white dark:bg-gray-800 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-lg font-medium mb-4">
                                🏷️ {category.name}
                            </div>
                            
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Posts in {category.name}
                            </h1>
                            
                            {category.description && (
                                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
                                    {category.description}
                                </p>
                            )}
                            
                            <div className="flex items-center justify-center space-x-4 text-gray-500 dark:text-gray-400">
                                <span className="flex items-center space-x-1">
                                    <span>📄</span>
                                    <span>{posts.meta?.total || 0} posts</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Posts Grid */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {posts.data.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-6">📝</div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    No posts yet
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-8">
                                    Be the first to write a post in this category!
                                </p>
                                {auth.user && (
                                    <Link
                                        href={route('posts.create')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                                    >
                                        Write Your First Post
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                    {posts.data.map((post) => (
                                        <article
                                            key={post.id}
                                            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
                                        >
                                            <div className="p-6">
                                                <div className="flex items-start space-x-3 mb-4">
                                                    <div className="text-2xl">📄</div>
                                                    <div className="flex-1 min-w-0">
                                                        <Link
                                                            href={route('blog.show', post.slug)}
                                                            className="block"
                                                        >
                                                            <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400">
                                                                {post.title}
                                                            </h3>
                                                        </Link>
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
                                                    <time>{formatDate(post.published_at)}</time>
                                                </div>
                                            </div>
                                            
                                            <div className="px-6 pb-6">
                                                <Link
                                                    href={route('blog.show', post.slug)}
                                                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm"
                                                >
                                                    Read more →
                                                </Link>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                                
                                {/* Pagination */}
                                {posts.links && (
                                    <div className="flex justify-center">
                                        <nav className="flex items-center space-x-2">
                                            {posts.links.map((link, index) => (
                                                <div key={index}>
                                                    {link.url ? (
                                                        <Link
                                                            href={link.url}
                                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                                link.active
                                                                    ? 'bg-blue-600 text-white'
                                                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                                                            }`}
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    ) : (
                                                        <span
                                                            className="px-4 py-2 rounded-lg text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-gray-700"
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </nav>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}