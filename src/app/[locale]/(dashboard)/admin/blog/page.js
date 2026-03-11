'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// ─── Create / Edit Modal ────────────────────────────────────────────────────
function PostModal({ post, onClose, onSaved }) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [form, setForm] = useState({
    title:       post?.title       || '',
    excerpt:     post?.excerpt     || '',
    content:     post?.content     || '',
    thumbnail:   post?.thumbnail   || '',
    tags:        post?.tags?.join(', ') || '',
    isPublished: post?.isPublished || false,
  });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const body = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    try {
      const url    = post ? `${API}/blog/${post._id}` : `${API}/blog`;
      const method = post ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (json.success) { onSaved(json.data, !post); onClose(); }
    } finally { setLoading(false); }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel blog-post-modal">
        <div className="crm-modal__header">
          <h2 className="crm-modal__name">{post ? 'Edit Post' : 'New Post'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="blog-post-modal__form">
          <label className="form-label">Title *</label>
          <input className="form-input" value={form.title} onChange={set('title')} required />

          <label className="form-label">Excerpt</label>
          <textarea className="form-input" rows={2} value={form.excerpt} onChange={set('excerpt')} />

          <label className="form-label">Thumbnail URL</label>
          <input className="form-input" value={form.thumbnail} onChange={set('thumbnail')} placeholder="https://…" />

          <label className="form-label">Tags (comma-separated)</label>
          <input className="form-input" value={form.tags} onChange={set('tags')} placeholder="Web Dev, Freelancing" />

          <label className="form-label">Content (HTML) *</label>
          <textarea
            className="form-input blog-post-modal__content"
            rows={10}
            value={form.content}
            onChange={set('content')}
            required
          />

          <label className="crm-modal__check-label">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) => setForm(f => ({ ...f, isPublished: e.target.checked }))}
            />
            Publish immediately
          </label>

          <button className="btn btn--primary w-full" type="submit" disabled={loading}>
            {loading ? 'Saving…' : post ? 'Save Changes' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function AdminBlogPage() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState(null); // null | 'new' | post object

  const fetchPosts = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      // Admin sees all (published + drafts) — pass Authorization header
      const res = await fetch(`${API}/blog?limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) setPosts(json.data);
    } finally { setLoading(false); }
  }, [token]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  async function togglePublish(post) {
    const res = await fetch(`${API}/blog/${post._id}/publish`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    if (json.success) {
      setPosts(ps => ps.map(p => p._id === post._id ? { ...p, isPublished: json.isPublished } : p));
    }
  }

  async function deletePost(id) {
    if (!confirm('Delete this blog post?')) return;
    await fetch(`${API}/blog/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setPosts(ps => ps.filter(p => p._id !== id));
  }

  function handleSaved(post, isNew) {
    if (isNew) setPosts(ps => [post, ...ps]);
    else setPosts(ps => ps.map(p => p._id === post._id ? post : p));
  }

  return (
    <div className="admin-blog-page">
      <div className="crm-page__header">
        <div>
          <h1 className="crm-page__title">Blog Management</h1>
          <p className="crm-page__subtitle">{posts.length} posts total</p>
        </div>
        <button className="btn btn--primary" onClick={() => setModal('new')}>
          + New Post
        </button>
      </div>

      {loading ? (
        <div className="crm-loading">Loading posts…</div>
      ) : posts.length === 0 ? (
        <div className="crm-empty">No blog posts yet. Create your first!</div>
      ) : (
        <div className="admin-blog-table-wrap">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Tags</th>
                <th>Views</th>
                <th>Date</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="crm-table__row">
                  <td className="crm-table__name">{post.title}</td>
                  <td>{post.author?.name || '—'}</td>
                  <td>
                    {post.tags?.slice(0, 2).map(t => (
                      <span key={t} className="crm-badge" style={{ '--badge-color': '#6366f1', marginRight: 4 }}>{t}</span>
                    ))}
                  </td>
                  <td>{post.views ?? 0}</td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td>
                    {/* Toggle switch */}
                    <button
                      className={`publish-toggle ${post.isPublished ? 'publish-toggle--on' : ''}`}
                      onClick={() => togglePublish(post)}
                      title={post.isPublished ? 'Unpublish' : 'Publish'}
                    >
                      {post.isPublished ? 'Live' : 'Draft'}
                    </button>
                  </td>
                  <td className="crm-table__actions">
                    <button className="crm-table__edit-btn" onClick={() => setModal(post)}>✏️</button>
                    <button className="crm-table__del-btn" onClick={() => deletePost(post._id)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <PostModal
          post={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
