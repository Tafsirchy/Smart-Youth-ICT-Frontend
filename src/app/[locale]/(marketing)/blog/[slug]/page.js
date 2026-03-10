export async function generateMetadata({ params }) {
  return { title: `Blog: ${params.slug}` };
}

export default function BlogPostPage({ params }) {
  return (
    <article className="section container-md">
      <h1 className="text-3xl font-bold text-textPrimary mb-6">Blog Post</h1>
      <p className="text-textSecondary">Slug: {params.slug}</p>
    </article>
  );
}
