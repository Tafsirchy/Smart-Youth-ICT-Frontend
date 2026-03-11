import Image from 'next/image';
import Link  from 'next/link';
import { notFound } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const revalidate = 3600;

// Pre-generate paths for known published posts at build time
export async function generateStaticParams() {
  try {
    const res = await fetch(`${API}/blog?limit=100`);
    if (!res.ok) return [];
    const { data } = await res.json();
    return (data || []).map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

async function getPost(slug) {
  try {
    const res = await fetch(`${API}/blog/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt || post.title,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      images: post.thumbnail ? [{ url: post.thumbnail }] : [],
      type: 'article',
      publishedTime: post.createdAt,
    },
  };
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const locale = params.locale || 'en';

  return (
    <article className="blog-article">
      {/* Hero */}
      <div className="blog-article__hero">
        {post.thumbnail && (
          <div className="blog-article__hero-img-wrap">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="blog-article__hero-img"
              priority
            />
            <div className="blog-article__hero-overlay" />
          </div>
        )}
        <div className="blog-article__hero-content container-md">
          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="blog-article__tags">
              {post.tags.map((t) => (
                <Link
                  key={t}
                  href={`/${locale}/blog?tag=${encodeURIComponent(t)}`}
                  className="blog-article__tag"
                >
                  {t}
                </Link>
              ))}
            </div>
          )}
          <h1 className="blog-article__title">{post.title}</h1>
          {post.excerpt && <p className="blog-article__excerpt">{post.excerpt}</p>}
          {/* Author + date */}
          <div className="blog-article__byline">
            {post.author?.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={36}
                height={36}
                className="blog-article__author-avatar"
              />
            )}
            <span className="blog-article__author-name">
              {post.author?.name || 'SYICT Team'}
            </span>
            <span className="blog-article__sep">·</span>
            <time>{formatDate(post.createdAt)}</time>
            {post.views > 0 && (
              <>
                <span className="blog-article__sep">·</span>
                <span>{post.views} views</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container-md blog-article__body">
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back link */}
        <div className="blog-article__back">
          <Link href={`/${locale}/blog`} className="btn btn--outline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </article>
  );
}
