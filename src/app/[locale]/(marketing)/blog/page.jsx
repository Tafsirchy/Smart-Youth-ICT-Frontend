import Link from "next/link";
import Image from "next/image";
import {
  IoSearchOutline,
  IoCalendarOutline,
  IoArrowForwardOutline,
  IoBookOutline,
} from "react-icons/io5";
import { getApiBaseUrl } from "@/lib/api-base";

const API = getApiBaseUrl({ absolute: true });
export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: "Blog — Smart Youth ICT",
    description:
      "IT tips, freelancing guides and career advice from Bangladesh's leading IT training platform.",
    openGraph: {
      title: "Blog — Smart Youth ICT",
      url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/blog`,
    },
  };
}

async function getPosts(page = 1, tag = "", q = "") {
  try {
    const qs = new URLSearchParams({
      page,
      limit: 9,
      ...(tag && { tag }),
      ...(q && { q }),
    });
    const res = await fetch(`${API}/blog?${qs}`, {
      next: { revalidate: 3600 },
    });
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

function BlogCard({ post, locale, priority = false }) {
  const title = post.title?.en || post.title;
  const excerpt = post.excerpt || "";
  const tag = post.tags?.[0] || post.category || "Blog";

  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group block">
      <div className="card h-full flex flex-col overflow-hidden border border-slate-200/90 bg-white hover:shadow-md hover:border-brand-pink/40 transition-all duration-300 rounded-2xl">
        {/* Thumbnail */}
        <div className="relative h-44 sm:h-48 bg-slate-100 overflow-hidden">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
              priority={priority}
              loading={priority ? undefined : "lazy"}
              decoding={priority ? undefined : "async"}
              className="object-cover group-hover:scale-105 transition-transform duration-500 bg-slate-100"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <IoBookOutline size={36} className="text-slate-300" />
            </div>
          )}
        </div>
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[9px] font-black uppercase tracking-[0.18em] px-2 py-0.5 bg-brand-pink/10 text-brand-pink rounded-md leading-[1.3]">
              {tag}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400 ml-auto font-medium leading-[1.4]">
              <IoCalendarOutline size={12} />
              {post.createdAt
                ? new Date(post.createdAt).toLocaleDateString("en-BD", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : ""}
            </span>
          </div>
          <h2 className="font-black text-slate-900 line-clamp-2 text-base leading-[1.3] mb-1.5 flex-1 group-hover:text-brand-pink transition-colors tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-600 leading-[1.6] font-normal line-clamp-2 mb-3">
            {excerpt}
          </p>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 flex items-center gap-1 group-hover:text-brand-pink transition-colors leading-[1.4] mt-auto pt-2 border-t border-slate-100">
            Read More{" "}
            <IoArrowForwardOutline
              size={12}
              className="group-hover:translate-x-1 transition-transform"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function BlogPage({ params, searchParams }) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([params, searchParams]);
  const locale = resolvedParams?.locale || "en";
  const page = Number(resolvedSearchParams?.page) || 1;
  const tag = resolvedSearchParams?.tag || "";
  const q = resolvedSearchParams?.q || "";

  const [{ data: posts, total }, tags] = await Promise.all([
    getPosts(page, tag, q),
    getTags(),
  ]);
  const totalPages = Math.ceil(total / 9);

  return (
    <div className="min-h-screen pb-12 md:pb-16 flex flex-col bg-slate-50 font-sans">
      {/* ── Compact Header Aligned with Navbar ── */}
      <section className="pt-12 sm:pt-18 pb-6 bg-white border-b border-slate-100">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-[2px] bg-brand-pink" />
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 leading-[1.4]">
                  Free Guides & Tips
                </p>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2] mb-2 tracking-tight">
                Blog & <span className="text-brand-pink">Resources</span>
              </h1>

              <p className="text-slate-600 text-sm md:text-base leading-[1.6] border-l-2 border-brand-pink pl-4 font-normal">
                IT career tips, freelancing guides & industry insights —
                <br className="hidden sm:inline" />
                straight from our instructors to help you grow.
              </p>
            </div>

            {/* Search Form - Aligned on right side of container */}
            <form method="GET" className="relative w-full md:w-80 lg:w-96 group shrink-0">
              <IoSearchOutline
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-pink transition-colors"
              />
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Search articles…"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/90 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink focus:bg-white transition-all text-xs sm:text-sm font-normal shadow-xs rounded-xl leading-[1.4]"
              />
            </form>
          </div>
        </div>
      </section>

      {/* ── Sticky Tag Pills ── */}
      {tags.length > 0 && (
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs">
          <div className="container-custom py-2 flex gap-2 overflow-x-auto scrollbar-hide">
            <Link
              href={`/${locale}/blog`}
              className={`shrink-0 px-3.5 py-1 text-xs min-h-[32px] flex items-center font-bold transition-all active:scale-95 leading-[1.4] rounded-lg ${!tag ? "bg-slate-900 text-white shadow-xs" : "bg-white text-slate-600 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50"}`}
            >
              All Posts
            </Link>
            {tags.map((t) => (
              <Link
                key={t}
                href={`/${locale}/blog?tag=${encodeURIComponent(t)}`}
                className={`shrink-0 px-3.5 py-1 text-xs min-h-[32px] flex items-center font-bold transition-all active:scale-95 leading-[1.4] rounded-lg ${tag === t ? "bg-slate-900 text-white shadow-xs" : "bg-white text-slate-600 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50"}`}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Post Grid Aligned with Navbar ── */}
      <div className="container-custom py-6 md:py-8">
        {posts.length > 0 ? (
          <div className="space-y-6 md:space-y-8">
            {/* Featured Post (Only on page 1 with no search/tag) */}
            {page === 1 && !tag && !q && posts.length >= 1 ? (
              <Link
                href={`/${locale}/blog/${posts[0].slug}`}
                className="group block"
              >
                <div className="flex flex-col md:flex-row bg-white overflow-hidden shadow-xs border border-slate-200/90 hover:shadow-md hover:border-brand-pink/40 transition-all duration-300 rounded-2xl">
                  <div className="md:w-3/5 h-56 md:h-[340px] relative overflow-hidden bg-slate-100">
                    {posts[0].thumbnail ? (
                      <Image
                        src={posts[0].thumbnail}
                        alt={posts[0].title}
                        fill
                        sizes="(max-width: 768px) 100vw, 800px"
                        priority={true}
                        fetchPriority="high"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <IoBookOutline size={48} className="text-slate-300" />
                      </div>
                    )}
                  </div>
                  <div className="md:w-2/5 p-5 md:p-7 flex flex-col justify-center">
                    <span className="inline-block px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.18em] text-brand-pink bg-brand-pink/10 self-start mb-3 border border-brand-pink/20 rounded-md leading-[1.3]">
                      Featured Article
                    </span>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-[1.25] mb-2.5 group-hover:text-brand-pink transition-colors tracking-tight">
                      {posts[0].title?.en || posts[0].title}
                    </h2>
                    <p className="text-slate-600 font-normal text-xs sm:text-sm leading-[1.6] mb-4 line-clamp-3">
                      {posts[0].excerpt}
                    </p>
                    <div className="flex items-center gap-3 mt-auto border-t border-slate-100 pt-3">
                      {posts[0].author?.avatar ? (
                        <Image
                          src={posts[0].author.avatar}
                          alt="Author"
                          width={36}
                          height={36}
                          loading="lazy"
                          decoding="async"
                          className="w-9 h-9 object-cover border border-slate-200 rounded-xl"
                        />
                      ) : (
                        <div className="w-9 h-9 bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs rounded-xl">
                          SY
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-xs text-slate-900 leading-[1.3]">
                          {posts[0].author?.name || "SYICT Team"}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5 leading-[1.3]">
                          <IoCalendarOutline size={11} />{" "}
                          {new Date(posts[0].createdAt).toLocaleDateString("en-BD", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ) : null}

            {/* Standard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {posts.slice(page === 1 && !tag && !q ? 1 : 0).map((post, index) => (
                <BlogCard key={post._id} post={post} locale={locale} priority={index <= 2} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 md:py-16 text-center max-w-md mx-auto">
            <div className="w-14 h-14 bg-slate-100 flex items-center justify-center mb-3 border border-slate-200 shadow-xs rounded-2xl">
              <IoBookOutline size={28} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-1 tracking-tight leading-[1.3]">
              No articles found
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm font-normal leading-[1.6]">
              Check back soon — our instructors are writing for you, or try searching for something else.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="flex justify-center gap-2 mt-8 md:mt-10">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/${locale}/blog?page=${p}${tag ? `&tag=${tag}` : ""}${q ? `&q=${q}` : ""}`}
                className={`w-8 h-8 min-w-[32px] min-h-[32px] flex items-center justify-center text-xs font-bold transition-all active:scale-95 rounded-lg leading-[1.4] ${page === p
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {p}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full p-3 bg-white/90 backdrop-blur-md border-t border-slate-100 z-50 md:hidden flex items-center justify-between shadow-[0_-8px_24px_rgba(0,0,0,0.06)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5 leading-[1.3]">Next Step</p>
          <p className="text-slate-900 font-black text-xs leading-[1.3]">Join the Program</p>
        </div>
        <Link href="/courses" className="px-5 py-2 min-h-[36px] bg-slate-900 text-white font-extrabold text-[10px] uppercase tracking-wider transition-transform active:scale-95 rounded-lg leading-none flex items-center justify-center">
          Apply Now
        </Link>
      </div>
    </div>
  );
}
