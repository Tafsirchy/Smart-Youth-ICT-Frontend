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
      <div className="card h-full flex flex-col overflow-hidden border border-slate-100 bg-white hover:shadow-[0_8px_24px_rgb(0,0,0,0.04)] hover:border-slate-200 transition-all duration-300 hover:-translate-y-0.5 rounded-lg">
        {/* Thumbnail */}
        <div className="relative h-44 sm:h-48 bg-slate-50 overflow-hidden">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 350px"
              priority={priority}
              loading={priority ? undefined : "lazy"}
              decoding={priority ? undefined : "async"}
              className="object-cover group-hover:scale-105 transition-transform duration-500 bg-[#f0f0f0]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <IoBookOutline size={36} className="text-slate-300" />
            </div>
          )}
        </div>
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
              {tag}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400 ml-auto font-light leading-[1.4]">
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
          <h2 className="font-semibold text-slate-900 line-clamp-2 text-base leading-snug mb-1.5 flex-1 group-hover:text-slate-600 transition-colors tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-500 leading-[1.6] font-light line-clamp-2 mb-3">
            {excerpt}
          </p>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-900 flex items-center gap-1 group-hover:text-slate-600 transition-colors mt-auto leading-[1.4]">
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
    <div className="min-h-screen pb-20 md:pb-12 flex flex-col bg-slate-50 font-sans pt-20 sm:pt-24">
      {/* ── Compact Header & Search (No Dedicated Hero Banner) ── */}
      <div className="container-lg mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 leading-[1.4]">
              Free Guides &amp; Tips
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
              Blog &amp; Resources
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm font-light mt-1 max-w-xl leading-[1.5]">
              IT career tips, freelancing guides &amp; industry insights straight from our instructors.
            </p>
          </div>

          {/* Search */}
          <form method="GET" className="relative w-full md:w-64 shrink-0 group">
            <IoSearchOutline
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors"
            />
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search articles…"
              className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all text-xs font-normal shadow-xs rounded-md"
            />
          </form>
        </div>
      </div>

      {/* ── Sticky Tag Pills ── */}
      {tags.length > 0 && (
        <div className="sticky top-16 z-20 bg-slate-50/95 backdrop-blur-md border-b border-slate-200">
          <div className="container-lg mx-auto px-4 py-2 flex gap-1.5 overflow-x-auto scrollbar-hide">
            <Link
              href={`/${locale}/blog`}
              className={`shrink-0 px-3 py-1 text-xs min-h-[30px] flex items-center font-medium transition-all active:scale-95 rounded-md leading-[1.4] ${!tag ? "bg-slate-900 text-white shadow-xs" : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}
            >
              All Posts
            </Link>
            {tags.map((t) => (
              <Link
                key={t}
                href={`/${locale}/blog?tag=${encodeURIComponent(t)}`}
                className={`shrink-0 px-3 py-1 text-xs min-h-[30px] flex items-center font-medium transition-all active:scale-95 rounded-md leading-[1.4] ${tag === t ? "bg-slate-900 text-white shadow-xs" : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Post Grid ── */}
      <div className="container-lg mx-auto px-4 py-5 md:py-6 flex-1">
        {posts.length > 0 ? (
          <div className="space-y-6">
            {/* Featured Post (Only on page 1 with no search/tag) */}
            {page === 1 && !tag && !q && posts.length >= 1 ? (
              <Link
                href={`/${locale}/blog/${posts[0].slug}`}
                className="group block"
              >
                <div className="flex flex-col md:flex-row bg-white overflow-hidden shadow-xs border border-slate-100 hover:shadow-[0_12px_32px_rgb(0,0,0,0.05)] hover:border-slate-200 transition-all duration-300 rounded-lg">
                  <div className="md:w-1/2 h-48 sm:h-64 md:h-auto min-h-[220px] md:min-h-[280px] relative overflow-hidden bg-slate-50">
                    {posts[0].thumbnail ? (
                      <Image
                        src={posts[0].thumbnail}
                        alt={posts[0].title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
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
                  <div className="md:w-1/2 p-4 sm:p-6 md:p-7 flex flex-col justify-center">
                    <span className="inline-block px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-600 bg-slate-100 self-start mb-2.5 border border-slate-200 rounded">
                      Featured Article
                    </span>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 leading-snug mb-2 group-hover:text-slate-600 transition-colors tracking-tight">
                      {posts[0].title?.en || posts[0].title}
                    </h2>
                    <p className="text-slate-500 font-light text-xs sm:text-sm leading-[1.6] mb-4 line-clamp-3">
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
                          className="w-9 h-9 object-cover border border-slate-200 rounded-full"
                        />
                      ) : (
                        <div className="w-9 h-9 bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-medium text-xs rounded-full">
                          SY
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-slate-900 text-xs sm:text-sm leading-[1.4]">
                          {posts[0].author?.name || "SYICT Team"}
                        </p>
                        <p className="text-[11px] text-slate-400 font-light flex items-center gap-1 mt-0.5 leading-[1.4]">
                          <IoCalendarOutline size={12} />{" "}
                          {new Date(posts[0].createdAt).toLocaleDateString("en-BD", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ) : null}

            {/* Standard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {posts.slice(page === 1 && !tag && !q ? 1 : 0).map((post, index) => (
                <BlogCard key={post._id} post={post} locale={locale} priority={index <= 2} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center max-w-sm mx-auto">
            <div className="w-16 h-16 bg-slate-100 flex items-center justify-center mb-4 border border-slate-200 shadow-xs rounded-lg">
              <IoBookOutline size={30} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1 tracking-tight">
              No articles yet
            </h3>
            <p className="text-slate-500 font-light text-xs leading-[1.6]">
              Check back soon — our instructors are writing for you, or try searching for something else.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/${locale}/blog?page=${p}${tag ? `&tag=${tag}` : ""}${q ? `&q=${q}` : ""}`}
                className={`w-9 h-9 min-w-[36px] min-h-[36px] flex items-center justify-center text-xs font-medium transition-all active:scale-95 rounded-md leading-[1.4] ${page === p
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
      <div className="fixed bottom-0 left-0 w-full p-3 bg-white/90 backdrop-blur-md border-t border-slate-100 z-50 md:hidden flex items-center justify-between shadow-sm pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div>
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-0.5 leading-[1.4]">Next Step</p>
          <p className="text-slate-900 font-medium text-xs leading-[1.4]">Join the Program</p>
        </div>
        <button className="px-4 py-2 min-h-[36px] bg-slate-900 text-white font-medium text-[10px] uppercase tracking-wider transition-transform active:scale-95 rounded-md">
          Apply Now
        </button>
      </div>
    </div>
  );
}
