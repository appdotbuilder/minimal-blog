import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import AppLayout from '@/layouts/app-layout';

interface DashboardStats {
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    totalComments: number;
    pendingComments: number;
    totalCategories: number;
}

interface RecentPost {
    id: number;
    title: string;
    status: string;
    created_at: string;
    comments_count: number;
}

interface Props extends SharedData {
    stats: DashboardStats;
    recentPosts: RecentPost[];
}

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { auth, stats, recentPosts } = usePage<Props>().props;
    const user = auth.user;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'draft':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
            case 'archived':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="p-6 space-y-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center space-x-4">
                        <div className="text-4xl">
                            {user.role === 'admin' ? '👑' : '✍️'}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Welcome back, {user.name}!
                            </h1>
                            <p className="text-blue-700 dark:text-blue-300 font-medium">
                                {user.role === 'admin' ? 'Administrator Dashboard' : 'Author Dashboard'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                        href={route('posts.create')}
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="text-3xl group-hover:scale-110 transition-transform">✍️</div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">New Post</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Write a story</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href={route('posts.index')}
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="text-3xl group-hover:scale-110 transition-transform">📄</div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">My Posts</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Manage content</p>
                            </div>
                        </div>
                    </Link>

                    {user.role === 'admin' && (
                        <>
                            <Link
                                href={route('categories.index')}
                                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow group"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="text-3xl group-hover:scale-110 transition-transform">🏷️</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Categories</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Organize content</p>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                href={route('comments.index')}
                                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow group"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="text-3xl group-hover:scale-110 transition-transform">💬</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Comments</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Moderate discussions</p>
                                    </div>
                                </div>
                            </Link>
                        </>
                    )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <span className="text-2xl">📝</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Posts</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.totalPosts || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <span className="text-2xl">✅</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.publishedPosts || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                                <span className="text-2xl">📝</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Drafts</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.draftPosts || 0}</p>
                            </div>
                        </div>
                    </div>

                    {user.role === 'admin' && (
                        <>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center space-x-3">
                                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                        <span className="text-2xl">💬</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Comments</p>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.totalComments || 0}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center space-x-3">
                                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                                        <span className="text-2xl">⏳</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Pending Comments</p>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.pendingComments || 0}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center space-x-3">
                                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                                        <span className="text-2xl">🏷️</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.totalCategories || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Recent Posts */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                📚 Recent Posts
                            </h2>
                            <Link
                                href={route('posts.index')}
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm"
                            >
                                View all →
                            </Link>
                        </div>
                    </div>
                    
                    <div className="p-6">
                        {recentPosts && recentPosts.length > 0 ? (
                            <div className="space-y-4">
                                {recentPosts.map((post) => (
                                    <div key={post.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                                        <div className="flex-1">
                                            <Link
                                                href={route('posts.show', post.id)}
                                                className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-1"
                                            >
                                                {post.title}
                                            </Link>
                                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                <span>{formatDate(post.created_at)}</span>
                                                <span>💬 {post.comments_count || 0} comments</span>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                                            {post.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">📝</div>
                                <p className="text-gray-500 dark:text-gray-400">No posts yet</p>
                                <Link
                                    href={route('posts.create')}
                                    className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Write Your First Post
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        🚀 Quick Links
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href={route('welcome')}
                            className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            🏠 View Blog
                        </Link>
                        {user.role === 'admin' && (
                            <>
                                <Link
                                    href={route('categories.create')}
                                    className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    🏷️ New Category
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}