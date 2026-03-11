export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://syict.edu.bd';

  // In a real application, you would fetch all dynamic routes (courses, blogs) 
  // from your API/database to generate this list dynamically.
  
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/courses',
    '/freelancing',
    '/gallery',
    '/blog',
    '/seminar'
  ];

  const locales = ['en', 'bn'];
  const routes = [];

  // Generate localized URLs
  locales.forEach((locale) => {
    staticRoutes.forEach((route) => {
      routes.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  return routes;
}
