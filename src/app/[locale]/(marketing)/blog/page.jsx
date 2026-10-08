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
 return {
 title: "Blog — Smart Youth ICT",
 description:
 "IT tips, freelancing guides and career advice from Bangladesh's leading IT training platform.",
 openGraph: {
 title: "Blog — Smart Youth ICT",
 url: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/blog`,
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
 <div className="card h-full flex flex-col overflow-hidden -[2rem] border border-slate-100 bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-slate-200 transition-all duration-500 hover:-translate-y-1">
 {/* Thumbnail */}
 <div className="relative h-56 bg-slate-50 overflow-hidden">
 {post.thumbnail ? (
 <Image
 src={post.thumbnail}
 alt={title}
 fill
 sizes="350px"
 priority={priority}
 loading={priority ? undefined : "lazy"}
 decoding={priority ? undefined : "async"}
 className="object-cover group-hover:scale-105 transition-transform duration-700 bg-[#f0f0f0]"
 />
 ) : (
 <div className="w-full h-full flex items-center justify-center">
 <IoBookOutline size={48} className="text-slate-300" />
 </div>
 )}
 </div>
 <div className="p-6 md:p-8 flex flex-col flex-1">
 <div className="flex items-center gap-2 mb-4">
 <span className="text-[10px] font-medium uppercase tracking-widest px-3 py-1 bg-slate-100 text-slate-600">
 {tag}
 </span>
 <span className="flex items-center gap-1.5 text-xs text-slate-400 ml-auto font-light">
 <IoCalendarOutline size={14} />
 {post.createdAt
 ? new Date(post.createdAt).toLocaleDateString("en-BD", {
 day: "numeric",
 month: "short",
 year: "numeric",
 })
 : ""}
 </span>
 </div>
 <h2 className="font-medium text-slate-900 line-clamp-2 text-xl leading-snug mb-3 flex-1 group-hover:text-slate-600 transition-colors tracking-tight">
 {title}
 </h2>
 <p className="text-sm text-slate-500 leading-relaxed font-light line-clamp-2 mb-6">
 {excerpt}
 </p>
 <span className="text-[11px] font-medium uppercase tracking-widest text-slate-900 flex items-center gap-1 group-hover:text-slate-600 transition-colors">
 Read More{" "}
 <IoArrowForwardOutline
 size={14}
 className="group-hover:translate-x-1 transition-transform"
 />
 </span>
 </div>
 </div>
 </Link>
 );
}

export default async function BlogPage({ params, searchParams }) {
 const locale = params?.locale || "en";
 const page = Number(searchParams?.page) || 1;
 const tag = searchParams?.tag || "";
 const q = searchParams?.q || "";

 const [{ data: posts, total }, tags] = await Promise.all([
 getPosts(page, tag, q),
 getTags(),
 ]);
 const totalPages = Math.ceil(total / 9);

 return (
 <div className="min-h-screen pb-24 md:pb-32 flex flex-col bg-slate-50 font-sans">
 {/* ── Hero ── */}
 <div className="relative pt-32 pb-20 px-4 text-center bg-white border-b border-slate-100">
 <div className="relative z-10 max-w-3xl mx-auto">
 <div className="flex items-center justify-center gap-4 mb-8">
 <div className="w-8 h-[1px] bg-slate-300"></div>
 <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
 Free Guides & Tips
 </span>
 <div className="w-8 h-[1px] bg-slate-300"></div>
 </div>
 <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 leading-[1.05] tracking-tight mb-8">
 Blog & <br />
 <span className="font-semibold">Resources.</span>
 </h1>
 <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light mb-12">
 IT career tips, freelancing guides & industry insights — straight
 from our instructors to help you grow.
 </p>
 
 {/* Search */}
 <form method="GET" className="relative max-w-md mx-auto group">
 <IoSearchOutline
 size={20}
 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors"
 />
 <input
 type="search"
 name="q"
 defaultValue={q}
 placeholder="Search articles…"
 className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all text-base font-light shadow-sm"
 />
 </form>
 </div>
 </div>

 {/* ── Sticky Tag Pills ── */}
 {tags.length > 0 && (
 <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
 <div className="container-lg mx-auto px-4 py-4 flex gap-3 overflow-x-auto scrollbar-hide">
 <Link
 href={`/${locale}/blog`}
 className={`shrink-0 px-6 py-2.5 text-sm min-h-[44px] flex items-center font-medium transition-all active:scale-95 ${!tag ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}
 >
 All Posts
 </Link>
 {tags.map((t) => (
 <Link
 key={t}
 href={`/${locale}/blog?tag=${encodeURIComponent(t)}`}
 className={`shrink-0 px-6 py-2.5 text-sm min-h-[44px] flex items-center font-medium transition-all active:scale-95 ${tag === t ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}
 >
 {t}
 </Link>
 ))}
 </div>
 </div>
 )}

 {/* ── Post Grid ── */}
 <div className="container-lg mx-auto px-4 py-16 md:py-20">
 {posts.length > 0 ? (
 <div className="space-y-16">
 {/* Featured Post (Only on page 1 with no search/tag) */}
 {page === 1 && !tag && !q && posts.length >= 1 ? (
 <Link
 href={`/${locale}/blog/${posts[0].slug}`}
 className="group block"
 >
 <div className="flex flex-col md:flex-row bg-white -[2rem] md:-[3rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-[0_20px_60px_rgb(0,0,0,0.05)] hover:border-slate-200 transition-all duration-500">
 <div className="md:w-3/5 h-72 md:h-[500px] relative overflow-hidden bg-slate-50">
 {posts[0].thumbnail ? (
 <Image
 src={posts[0].thumbnail}
 alt={posts[0].title}
 fill
 sizes="800px"
 priority={true}
 fetchPriority="high"
 className="object-cover group-hover:scale-105 transition-transform duration-700"
 decoding="async"
 />
 ) : (
 <div className="w-full h-full flex items-center justify-center">
 <IoBookOutline size={64} className="text-slate-300" />
 </div>
 )}
 </div>
 <div className="md:w-2/5 p-8 md:p-14 flex flex-col justify-center">
 <span className="inline-block px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-slate-600 bg-slate-100 self-start mb-6 border border-slate-200">
 Featured Article
 </span>
 <h2 className="text-3xl md:text-4xl font-medium text-slate-900 leading-tight mb-6 group-hover:text-slate-600 transition-colors tracking-tight">
 {posts[0].title?.en || posts[0].title}
 </h2>
 <p className="text-slate-500 font-light text-base md:text-lg leading-relaxed mb-10 line-clamp-3">
 {posts[0].excerpt}
 </p>
 <div className="flex items-center gap-4 mt-auto border-t border-slate-100 pt-6">
 {posts[0].author?.avatar ? (
 <Image
 src={posts[0].author.avatar}
 alt="Author"
 width={48}
 height={48}
 loading="lazy"
 decoding="async"
 className="w-12 h-12 object-cover border border-slate-200"
 />
 ) : (
 <div className="w-12 h-12 bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-medium text-sm">
 SY
 </div>
 )}
 <div>
 <p className="font-medium text-slate-900">
 {posts[0].author?.name || "SYICT Team"}
 </p>
 <p className="text-xs text-slate-400 font-light flex items-center gap-1.5 mt-0.5">
 <IoCalendarOutline size={14} />{" "}
 {new Date(posts[0].createdAt).toLocaleDateString("en-BD", {
 day: "numeric",
 month: "long",
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
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {posts.slice(page === 1 && !tag && !q ? 1 : 0).map((post, index) => (
 <BlogCard key={post._id} post={post} locale={locale} priority={index <= 2} />
 ))}
 </div>
 </div>
 ) : (
 <div className="flex flex-col items-center justify-center py-32 text-center max-w-lg mx-auto">
 <div className="w-24 h-24 bg-slate-100 flex items-center justify-center mb-8 border border-slate-200 shadow-sm">
 <IoBookOutline size={40} className="text-slate-400" />
 </div>
 <h3 className="text-2xl font-medium text-slate-900 mb-3 tracking-tight">
 No articles yet
 </h3>
 <p className="text-slate-500 font-light leading-relaxed">
 Check back soon — our instructors are writing for you, or try searching for something else.
 </p>
 </div>
 )}

 {/* Pagination */}
 {totalPages > 1 && (
 <nav className="flex justify-center gap-3 mt-16">
 {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
 <Link
 key={p}
 href={`/${locale}/blog?page=${p}${tag ? `&tag=${tag}` : ""}${q ? `&q=${q}` : ""}`}
 className={`w-12 h-12 min-w-[48px] min-h-[48px] flex items-center justify-center text-sm font-medium transition-all active:scale-95 ${page === p
 ? "bg-slate-900 text-white shadow-md"
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
 <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-slate-100 z-50 md:hidden flex items-center justify-between pb-[max(1rem,env(safe-area-inset-bottom))]">
 <div>
 <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-0.5">Next Step</p>
 <p className="text-slate-900 font-medium text-sm">Join the Program</p>
 </div>
 <button className="px-6 py-3 min-h-[44px] bg-slate-900 text-white font-medium text-[11px] uppercase tracking-wider transition-transform active:scale-95">
 Apply Now
 </button>
 </div>
 </div>
 );
}
