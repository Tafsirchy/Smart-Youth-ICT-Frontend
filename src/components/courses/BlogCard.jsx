import Image from 'next/image';
import Link   from 'next/link';

/** Format date as "Mar 11, 2026" */
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

export default function BlogCard({ post, locale = 'en' }) {
  const { title, slug, excerpt, thumbnail, tags = [], author, createdAt, views } = post;

  return (
    <article className="blog-card">
      {/* Thumbnail */}
      <Link href={`/${locale}/blog/${slug}`} className="blog-card__thumb-link">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            width={400}
            height={220}
            className="blog-card__thumb"
          />
        ) : (
          <div className="blog-card__thumb-placeholder">
            <span>📝</span>
          </div>
        )}
      </Link>

      <div className="blog-card__body">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="blog-card__tags">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="blog-card__tag">{tag}</span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="blog-card__title">
          <Link href={`/${locale}/blog/${slug}`}>{title}</Link>
        </h2>

        {/* Excerpt */}
        {excerpt && <p className="blog-card__excerpt">{excerpt}</p>}

        {/* Footer */}
        <div className="blog-card__footer">
          <div className="blog-card__author">
            {author?.avatar && (
              <Image
                src={author.avatar}
                alt={author.name}
                width={24}
                height={24}
                className="blog-card__avatar"
              />
            )}
            <span>{author?.name || 'SYICT Team'}</span>
          </div>
          <div className="blog-card__meta">
            <time>{formatDate(createdAt)}</time>
            {views > 0 && <span>· {views} views</span>}
          </div>
        </div>
      </div>
    </article>
  );
}
