import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaYoutube, FaWhatsapp, FaLinkedin } from 'react-icons/fa';

const footerLinks = {
  'Platform': [
    { href: '/courses',         label: 'Courses' },
    { href: '/freelancing',     label: 'Freelancing' },
    { href: '/affiliate',       label: 'Affiliate' },
    { href: '/seminar',         label: 'Free Seminar' },
  ],
  'Company': [
    { href: '/about',           label: 'About Us' },
    { href: '/success-stories', label: 'Success Stories' },
    { href: '/blog',            label: 'Blog' },
    { href: '/contact',         label: 'Contact' },
  ],
  'Students': [
    { href: '/login',           label: 'Student Login' },
    { href: '/register',        label: 'Register' },
    { href: '/student',         label: 'Dashboard' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-dark)' }} className="text-gray-400 pt-16 pb-8">
      <div className="container-lg px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image src="/images/logo.png" alt="Smart Youth ICT" width={180} height={60} className="h-12 w-auto object-contain" />
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              Learn IT skills & earn from real projects. Bangladesh&apos;s most practical IT training platform.
            </p>
            <div className="flex gap-4 mt-4">
              {[
                { href: 'https://facebook.com', Icon: FaFacebook },
                { href: 'https://youtube.com',  Icon: FaYoutube  },
                { href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`, Icon: FaWhatsapp },
                { href: 'https://linkedin.com', Icon: FaLinkedin },
              ].map(({ href, Icon }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer"
                  className="text-gray-400 hover:text-white transition-colors">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-white mb-4">{heading}</h3>
              <ul className="space-y-2">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Smart Youth ICT. All rights reserved.</p>
          <p>Made with ❤️ in Bangladesh 🇧🇩</p>
        </div>
      </div>
    </footer>
  );
}
