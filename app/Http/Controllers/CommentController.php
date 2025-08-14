<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource (for admin management).
     */
    public function index(Request $request)
    {
        // Only admins can view all comments
        if (!$request->user()->isAdmin()) {
            abort(403);
        }

        $query = Comment::with(['post', 'user']);

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $comments = $query->latest()->paginate(15);

        return Inertia::render('comments/index', [
            'comments' => $comments,
            'filters' => $request->only(['status']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request)
    {
        $comment = Comment::create(array_merge(
            $request->validated(),
            [
                'user_id' => $request->user()->id,
                'status' => 'pending', // All comments start as pending
            ]
        ));

        return redirect()->back()
            ->with('success', 'Comment submitted successfully. It will be visible after approval.');
    }

    /**
     * Update the specified resource in storage (for status changes).
     */
    public function update(Request $request, Comment $comment)
    {
        // Only admins can update comment status
        if (!$request->user()->isAdmin()) {
            abort(403);
        }

        $request->validate([
            'status' => 'required|in:pending,approved,rejected',
        ]);

        $comment->update(['status' => $request->status]);

        return redirect()->back()
            ->with('success', 'Comment status updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        // Users can delete their own comments, admins can delete any comment
        if (!auth()->user()->isAdmin() && $comment->user_id !== auth()->id()) {
            abort(403);
        }

        $comment->delete();

        return redirect()->back()
            ->with('success', 'Comment deleted successfully.');
    }
}