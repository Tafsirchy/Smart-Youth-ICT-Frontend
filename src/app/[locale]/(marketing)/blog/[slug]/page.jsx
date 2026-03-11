import { Metadata } from 'next';
import Image from 'next/image';

// This function generates dynamic metadata for SEO based on the blog post data
export async function generateMetadata({ params }) {
  const { slug, locale } = params;
  
  try {
    // In a real scenario, fetch the blog post from your API here
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${slug}`);
    // const post = await response.json();
    
    // Using mock data for demonstartion since we don't have the API running a true DB seed 
    const post = {
      title: `Understanding MERN Stack Development in 2026 | SYICT`,
      description: `A comprehensive guide to building scalable web applications using MongoDB, Express, React, and Node.js. Find out why it's the most demanded skill in ${locale === 'bn' ? 'Bangladesh' : 'the world'}.`,
      images: ['/images/blog/mern-stack-cover.jpg'],
    };

    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        publishedTime: new Date().toISOString(),
        authors: ['SYICT Instructor'],
        images: post.images.map(image => ({
          url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://syict.edu.bd'}${image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        })),
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: post.images,
      },
    };
  } catch (error) {
    return {
      title: 'Blog Post | Smart Youth ICT',
      description: 'Read the latest trends and updates in IT, freelancing, and skill development.',
    };
  }
}

export default function BlogPostPage({ params }) {
  const { slug } = params;

  return (
    <article className="max-w-4xl mx-auto py-16 px-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-4 capitalize">
          {slug.replace(/-/g, ' ')}
        </h1>
        <div className="flex items-center justify-center gap-4 text-neutral-500 text-sm">
          <span>By SYICT Instructor</span>
          <span>•</span>
          <span>March 12, 2026</span>
          <span>•</span>
          <span>5 min read</span>
        </div>
      </header>

      {/* Placeholder Image */}
      <div className="relative w-full h-[400px] bg-neutral-100 rounded-2xl mb-12 overflow-hidden border border-neutral-200">
         <Image 
           src="/images/blog-placeholder.jpg" 
           alt="Blog Cover" 
           fill 
           className="object-cover"
           onError={(e) => { e.target.style.display = 'none'; }}
         />
      </div>

      <div className="prose prose-lg max-w-none text-neutral-700">
        <p className="lead text-xl text-neutral-600 mb-8">
          This is a placeholder for the blog post content. The slug for this post is <strong>{slug}</strong>.
          In the actual application, this content will be fetched from the MongoDB database via the backend API.
        </p>
        
        <h2>Why learn this?</h2>
        <p>
          Learning modern IT skills is essential for securing a high-paying freelance career or securing a job in the corporate sector. 
          Our project-based curriculum ensures that you are ready for the market from day one.
        </p>

        <h3>Key Takeaways</h3>
        <ul>
           <li>Understand the fundamental concepts of the technology.</li>
           <li>Build a real-world project to add to your portfolio.</li>
           <li>Start taking client requests on platforms like Upwork and Fiverr.</li>
        </ul>
      </div>
    </article>
  );
}
