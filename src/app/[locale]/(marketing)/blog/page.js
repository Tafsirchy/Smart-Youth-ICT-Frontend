import BlogCard from '@/components/courses/BlogCard';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const revalidate = 3600; // ISR: re-generate every hour

export async function generateMetadata({ params }) {
  return {
    title: 'Blog — Smart Youth ICT',
    description: 'Read the latest articles on web development, freelancing, digital marketing, and career tips from the Smart Youth ICT team.',
    openGraph: {
      title: 'Blog — Smart Youth ICT',
      description: 'IT tips, freelancing guides, and career advice from Bangladesh\'s leading IT training platform.',
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
  } catch {
    return { data: [], total: 0 };
  }
}

async function getTags() {
  try {
    const res = await fetch(`${API}/blog/tags`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export default async function BlogPage({ params, searchParams }) {
  const locale = params?.locale || 'en';
  const page   = Number(searchParams?.page) || 1;
  const tag    = searchParams?.tag || '';
  const q      = searchParams?.q  || '';

  const [{ data: posts, total }, tags] = await Promise.all([
    getPosts(page, tag, q),
    getTags(),
  ]);

  const totalPages = Math.ceil(total / 9);

  return (
    <section className="section container-lg">
      {/* Header */}
      <div className="blog-header">
        <h1 className="blog-header__title">Our Blog</h1>
        <p className="blog-header__subtitle">
          IT tips, freelancing guides &amp; career advice — straight from our instructors.
        </p>

        {/* Search bar */}
        <form method="GET" className="blog-search">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search articles…"
            className="blog-search__input"
          />
          <button type="submit" className="blog-search__btn">Search</button>
        </form>
      </div>

      {/* Tag filter pills */}
      {tags.length > 0 && (
        <div className="blog-tags">
          <Link
            href={`/${locale}/blog`}
            className={`blog-tag ${!tag ? 'blog-tag--active' : ''}`}
          >
            All
          </Link>
          {tags.map((t) => (
            <Link
              key={t}
              href={`/${locale}/blog?tag=${encodeURIComponent(t)}`}
              className={`blog-tag ${tag === t ? 'blog-tag--active' : ''}`}
            >
              {t}
            </Link>
          ))}
        </div>
      )}

      {/* Post grid */}
      {posts.length > 0 ? (
        <div className="blog-grid">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="blog-empty">
          <span className="blog-empty__icon">📝</span>
          <h2>No articles yet</h2>
          <p>Check back soon — our instructors are writing for you!</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="blog-pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/${locale}/blog?page=${p}${tag ? `&tag=${tag}` : ''}${q ? `&q=${q}` : ''}`}
              className={`blog-pagination__btn ${page === p ? 'blog-pagination__btn--active' : ''}`}
            >
              {p}
            </Link>
          ))}
        </nav>
      )}
    </section>
  );
}
