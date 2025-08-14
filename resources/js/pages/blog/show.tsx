import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface User {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Comment {
    id: number;
    content: string;
    created_at: string;
    user: User;
    status: string;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    published_at: string;
    author: User;
    category: Category | null;
    comments: Comment[];
}

interface Props extends SharedData {
    post: Post;
    relatedPosts: Post[];
}

export default function BlogShow() {
    const { post, relatedPosts, auth } = usePage<Props>().props;
    const [showCommentForm, setShowCommentForm] = useState(false);

    const { data, setData, post: submitComment, processing, errors, reset } = useForm({
        content: '',
        post_id: post.id,
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitComment(route('comments.store'), {
            onSuccess: () => {
                reset();
                setShowCommentForm(false);
            }
        });
    };

    const approvedComments = post.comments.filter(comment => comment.status === 'approved');

    return (
        <>
            <Head title={post.title} />
            
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

                {/* Article */}
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <div className="px-8 py-12">
                            {/* Article Header */}
                            <header className="mb-8">
                                {post.category && (
                                    <Link
                                        href={route('blog.category', post.category.slug)}
                                        className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium mb-4 hover:bg-blue-200 dark:hover:bg-blue-900/50"
                                    >
                                        🏷️ {post.category.name}
                                    </Link>
                                )}
                                
                                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                                    {post.title}
                                </h1>
                                
                                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                    {post.excerpt}
                                </p>
                                
                                <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg">👤</span>
                                        <span className="font-medium">{post.author.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg">📅</span>
                                        <time>{formatDate(post.published_at)}</time>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg">💬</span>
                                        <span>{approvedComments.length} comments</span>
                                    </div>
                                </div>
                            </header>

                            {/* Article Content */}
                            <div className="prose prose-lg max-w-none dark:prose-invert">
                                <div 
                                    className="text-gray-800 dark:text-gray-200 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
                                />
                            </div>
                        </div>
                    </div>
                </article>

                {/* Comments Section */}
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            💬 Comments ({approvedComments.length})
                        </h2>
                        
                        {/* Comment Form */}
                        {auth.user ? (
                            <div className="mb-8">
                                {!showCommentForm ? (
                                    <button
                                        onClick={() => setShowCommentForm(true)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                    >
                                        ✍️ Add a Comment
                                    </button>
                                ) : (
                                    <form onSubmit={handleCommentSubmit} className="space-y-4">
                                        <div>
                                            <textarea
                                                value={data.content}
                                                onChange={(e) => setData('content', e.target.value)}
                                                placeholder="Share your thoughts..."
                                                rows={4}
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                                                required
                                            />
                                            {errors.content && (
                                                <p className="text-red-600 text-sm mt-1">{errors.content}</p>
                                            )}
                                        </div>
                                        <div className="flex space-x-3">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                            >
                                                {processing ? 'Posting...' : 'Post Comment'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowCommentForm(false);
                                                    reset();
                                                }}
                                                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        ) : (
                            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <p className="text-blue-800 dark:text-blue-300">
                                    <Link href={route('login')} className="font-medium underline">
                                        Login
                                    </Link>{' '}
                                    or{' '}
                                    <Link href={route('register')} className="font-medium underline">
                                        register
                                    </Link>{' '}
                                    to leave a comment.
                                </p>
                            </div>
                        )}
                        
                        {/* Comments List */}
                        <div className="space-y-6">
                            {approvedComments.length === 0 ? (
                                <div className="text-center py-8">
                                    <span className="text-4xl mb-4 block">💭</span>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        No comments yet. Be the first to share your thoughts!
                                    </p>
                                </div>
                            ) : (
                                approvedComments.map((comment) => (
                                    <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                                <span className="text-lg">👤</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <h4 className="font-medium text-gray-900 dark:text-white">
                                                        {comment.user.name}
                                                    </h4>
                                                    <time className="text-sm text-gray-500 dark:text-gray-400">
                                                        {formatDate(comment.created_at)}
                                                    </time>
                                                </div>
                                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                    {comment.content}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            📚 Related Posts
                        </h2>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    href={route('blog.show', relatedPost.slug)}
                                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                                >
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                        {relatedPost.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-3">
                                        {relatedPost.excerpt}
                                    </p>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        by {relatedPost.author.name}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}