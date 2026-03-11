import Link from 'next/link';
import Image from 'next/image';
import { IoSearchOutline, IoCalendarOutline, IoArrowForwardOutline, IoBookOutline } from 'react-icons/io5';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
export const revalidate = 3600;

export async function generateMetadata({ params }) {
  return {
    title: 'Blog — Smart Youth ICT',
    description: 'IT tips, freelancing guides and career advice from Bangladesh\'s leading IT training platform.',
    openGraph: {
      title: 'Blog — Smart Youth ICT',
      url: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/blog`,
    },
  };
}

async function getPosts(page = 1, tag = '', q = '') {
  try {
    const qs = new URLSearchParams({ page, limit: 9, ...(tag && { tag }), ...(q && { q }) });
    const res = await fetch(`${API}/blog?${qs}`, { next: { revalidate: 3600 } });
    if (!res.ok) return { data: [], total: 0 };
    return res.json();
  } catch { return { data: [], total: 0 }; }
}

async function getTags() {
  try {
    const res = await fetch(`${API}/blog/tags`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch { return []; }
}

const CATEGORY_COLORS = {
  Career:     'bg-blue-100 text-blue-700',
  Trends:     'bg-purple-100 text-purple-700',
  Tips:       'bg-emerald-100 text-emerald-700',
  Freelancing:'bg-amber-100 text-amber-700',
};

function BlogCard({ post, locale }) {
  const title   = post.title?.en || post.title;
  const excerpt = post.excerpt || '';
  const tag     = post.tags?.[0] || post.category || 'Blog';
  const color   = CATEGORY_COLORS[tag] || 'bg-neutral-100 text-neutral-600';
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group block">
      <div className="card h-full flex flex-col overflow-hidden rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
          {post.thumbnail
            ? <Image src={post.thumbnail} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            : <div className="w-full h-full flex items-center justify-center"><IoBookOutline size={48} className="text-blue-200" /></div>
          }
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${color}`}>{tag}</span>
            <span className="flex items-center gap-1 text-xs text-textSecondary ml-auto">
              <IoCalendarOutline size={12} />
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
            </span>
          </div>
          <h2 className="font-bold text-textPrimary line-clamp-2 text-base leading-snug mb-2 flex-1 group-hover:text-blue-600 transition-colors">{title}</h2>
          <p className="text-xs text-textSecondary leading-relaxed line-clamp-2 mb-4">{excerpt}</p>
          <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
            Read More <IoArrowForwardOutline size={13} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function BlogPage({ params, searchParams }) {
  const locale     = params?.locale || 'en';
  const page       = Number(searchParams?.page) || 1;
  const tag        = searchParams?.tag || '';
  const q          = searchParams?.q  || '';

  const [{ data: posts, total }, tags] = await Promise.all([getPosts(page, tag, q), getTags()]);
  const totalPages = Math.ceil(total / 9);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden py-20 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)' }}>
        <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'var(--color-brand-pink)' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-200 bg-white/10 border border-white/10">
            📝 Free Guides & Tips
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Blog & Resources
          </h1>
          <p className="text-indigo-200 text-lg mb-8">
            IT career tips, freelancing guides & industry insights — straight from our instructors.
          </p>
          {/* Search */}
          <form method="GET" className="relative max-w-md mx-auto">
            <IoSearchOutline size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300" />
            <input type="search" name="q" defaultValue={q} placeholder="Search articles…"
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-indigo-300/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm" />
          </form>
        </div>
      </div>

      {/* ── Sticky Tag Pills ── */}
      {tags.length > 0 && (
        <div className="sticky top-0 z-20 bg-[var(--color-surface)] border-b border-neutral-200 shadow-sm">
          <div className="container-lg mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
            <Link href={`/${locale}/blog`}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${!tag ? 'bg-blue-600 text-white shadow-md' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}>
              All Posts
            </Link>
            {tags.map(t => (
              <Link key={t} href={`/${locale}/blog?tag=${encodeURIComponent(t)}`}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${tag === t ? 'bg-blue-600 text-white shadow-md' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}>
                {t}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Post Grid ── */}
      <div className="container-lg mx-auto px-4 py-12">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map(post => <BlogCard key={post._id} post={post} locale={locale} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center mb-5">
              <IoBookOutline size={40} className="text-blue-300" />
            </div>
            <h3 className="text-xl font-bold text-textPrimary mb-2">No articles yet</h3>
            <p className="text-textSecondary text-sm">Check back soon — our instructors are writing for you!</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <Link key={p}
                href={`/${locale}/blog?page=${p}${tag ? `&tag=${tag}` : ''}${q ? `&q=${q}` : ''}`}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold transition-all ${
                  page === p ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-neutral-600 ring-1 ring-neutral-200 hover:bg-neutral-50'
                }`}
              >{p}</Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}
