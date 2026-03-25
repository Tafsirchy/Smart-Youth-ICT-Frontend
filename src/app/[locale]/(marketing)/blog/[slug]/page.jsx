import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IoCalendarOutline, IoEyeOutline, IoArrowBackOutline, IoShareSocialOutline } from 'react-icons/io5';
import { FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API}/blog?limit=100`);
    if (!res.ok) return [];
    const { data } = await res.json();
    return (data || []).map(post => ({ slug: post.slug }));
  } catch { return []; }
}

async function getPost(slug) {
  try {
    const res = await fetch(`${API}/blog/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch { return null; }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} — SYICT Blog`,
    description: post.excerpt || post.title,
    keywords: post.tags,
    openGraph: {
      title: post.title, description: post.excerpt || post.title,
      images: post.thumbnail ? [{ url: post.thumbnail }] : [],
      type: 'article', publishedTime: post.createdAt,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post   = await getPost(params.slug);
  if (!post) notFound();
  const locale = params.locale || 'en';

  const postUrl  = `${process.env.NEXT_PUBLIC_APP_URL || ''}/${locale}/blog/${post.slug}`;
  const fbShare  = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
  const liShare  = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
  const waShare  = `https://wa.me/?text=${encodeURIComponent(`${post.title} — ${postUrl}`)}`;

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)' }}>
        {post.thumbnail && (
          <div className="absolute inset-0 opacity-15">
            <Image src={post.thumbnail} alt="" fill className="object-cover blur-xl" />
          </div>
        )}
        <div className="relative z-10 container-lg mx-auto px-4 py-16 max-w-3xl">
          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map(t => (
                <Link key={t} href={`/${locale}/blog?tag=${encodeURIComponent(t)}`}
                  className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-indigo-200 hover:bg-white/20 transition">
                  #{t}
                </Link>
              ))}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">{post.title}</h1>
          {post.excerpt && <p className="text-indigo-200 text-lg mb-8 leading-relaxed">{post.excerpt}</p>}

          {/* Byline */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-indigo-300">
            {post.author?.avatar && (
              <Image src={post.author.avatar} alt={post.author.name} width={36} height={36} className="rounded-full ring-2 ring-white/20" />
            )}
            <span className="font-semibold text-white">{post.author?.name || 'SYICT Team'}</span>
            <span className="flex items-center gap-1.5">
              <IoCalendarOutline size={14} />
              {new Date(post.createdAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            {post.views > 0 && (
              <span className="flex items-center gap-1.5"><IoEyeOutline size={14} /> {post.views} views</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Article Body ── */}
      <div className="container-lg mx-auto px-4 py-12 max-w-3xl">

        {/* Thumbnail (larger display) */}
        {post.thumbnail && (
          <div className="relative h-72 md:h-96 w-full rounded-3xl overflow-hidden mb-10 shadow-2xl">
            <Image src={post.thumbnail} alt={post.title} fill className="object-cover" priority />
          </div>
        )}

        {/* Prose content */}
        <div
          className="prose prose-lg prose-neutral max-w-none prose-headings:font-extrabold prose-a:text-blue-600 prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* ── Share bar ── */}
        <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="flex items-center gap-2 text-sm font-semibold text-textPrimary"><IoShareSocialOutline size={18} /> Share this article:</span>
          <div className="flex gap-2">
            <a href={fbShare} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition">
              <FaFacebook size={13} /> Facebook
            </a>
            <a href={liShare} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 transition">
              <FaLinkedin size={13} /> LinkedIn
            </a>
            <a href={waShare} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition">
              <FaWhatsapp size={13} /> WhatsApp
            </a>
          </div>
          <Link href={`/${locale}/blog`}
            className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-textSecondary hover:text-textPrimary transition">
            <IoArrowBackOutline size={15} /> Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
