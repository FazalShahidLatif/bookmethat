import Link from 'next/link';
import { Metadata } from 'next';
import OptimizedImage from '@/components/OptimizedImage';
import { getDestinationImage } from '@/lib/images';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Careers at bookmethat - Join Our Travel Tech Team | Remote Jobs 2025',
  description: 'Join bookmethat and help millions of travelers discover the world. We\'re hiring passionate individuals for remote and on-site positions. Work on cutting-edge travel technology.',
  keywords: ['bookmethat careers', 'travel tech jobs', 'remote travel jobs', 'startup careers', 'travel industry jobs', 'work at bookmethat'],
  openGraph: {
    title: 'Careers at bookmethat - Join Our Team',
    description: 'Join our mission to revolutionize travel booking. Remote-first, competitive benefits, amazing team culture.',
    url: 'https://bookmethat.com/careers',
  },
};

export default function CareersPage() {
  const openPositions = [
    {
      id: 1,
      title: 'Senior Full-Stack Engineer',
      department: 'Engineering',
      location: 'Remote (Global)',
      type: 'Full-time',
      description: 'Build scalable microservices and beautiful user interfaces for millions of travelers worldwide.',
      skills: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS']
    },
    {
      id: 2,
      title: 'Product Manager - Booking Experience',
      department: 'Product',
      location: 'Remote (US/EU)',
      type: 'Full-time',
      description: 'Own the end-to-end booking experience and drive conversion optimization across all channels.',
      skills: ['Product Strategy', 'User Research', 'Analytics', 'A/B Testing']
    },
    {
      id: 3,
      title: 'Travel Partnerships Manager',
      department: 'Business Development',
      location: 'Hybrid (Dubai/London)',
      type: 'Full-time',
      description: 'Build relationships with hotels, airlines, and activity providers to expand our global inventory.',
      skills: ['Negotiation', 'Partnership Management', 'Travel Industry', 'CRM']
    },
    {
      id: 4,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote (Global)',
      type: 'Full-time',
      description: 'Create delightful user experiences that make travel booking simple, intuitive, and inspiring.',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Mobile Design']
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'Remote (Global)',
      type: 'Full-time',
      description: 'Scale our infrastructure to handle millions of searches and bookings with 99.99% uptime.',
      skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Monitoring']
    },
    {
      id: 6,
      title: 'Customer Success Specialist',
      department: 'Support',
      location: 'Remote (Global)',
      type: 'Full-time',
      description: 'Help travelers with their bookings and ensure every customer has an amazing experience.',
      skills: ['Customer Service', 'Empathy', 'Problem Solving', 'Multilingual']
    },
    {
      id: 7,
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Remote (US/EU)',
      type: 'Full-time',
      description: 'Drive growth through performance marketing, content, and strategic partnerships.',
      skills: ['SEO', 'Paid Ads', 'Content Marketing', 'Analytics', 'Growth Hacking']
    },
    {
      id: 8,
      title: 'Data Analyst',
      department: 'Analytics',
      location: 'Remote (Global)',
      type: 'Full-time',
      description: 'Turn data into insights that drive product decisions and business growth.',
      skills: ['SQL', 'Python', 'Tableau', 'Statistics', 'A/B Testing']
    }
  ];

  const benefits = [
    {
      icon: '🌍',
      title: 'Work From Anywhere',
      description: 'Remote-first culture. Work from home, a beach, or anywhere with WiFi.'
    },
    {
      icon: '✈️',
      title: 'Travel Allowance',
      description: '$2,000/year travel budget to explore the world and test our platform.'
    },
    {
      icon: '💰',
      title: 'Competitive Salary',
      description: 'Market-leading compensation plus equity in a fast-growing startup.'
    },
    {
      icon: '🏥',
      title: 'Health & Wellness',
      description: 'Premium health insurance, mental health support, and fitness stipend.'
    },
    {
      icon: '📚',
      title: 'Learning Budget',
      description: '$1,500/year for courses, conferences, and professional development.'
    },
    {
      icon: '🏖️',
      title: 'Unlimited PTO',
      description: 'Take time off when you need it. Minimum 20 days encouraged annually.'
    },
    {
      icon: '👶',
      title: 'Parental Leave',
      description: '16 weeks paid leave for primary caregivers, 8 weeks for secondary.'
    },
    {
      icon: '💻',
      title: 'Latest Equipment',
      description: 'MacBook Pro, 4K monitor, ergonomic chair, and any tools you need.'
    }
  ];

  const values = [
    {
      title: 'Customer Obsession',
      description: 'Every decision starts with the traveler. We build products people love.',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Move Fast',
      description: 'Ship early, learn quickly, iterate constantly. Speed is our advantage.',
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Think Global',
      description: 'We serve travelers from 190+ countries. Diversity is our strength.',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Radical Transparency',
      description: 'Open communication, honest feedback, and no corporate politics.',
      color: 'bg-orange-50 border-orange-200'
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[500px] bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <OptimizedImage
            src={getDestinationImage('technology')}
            alt="Team working together at bookmethat"
            fill
            objectFit="cover"
            priority
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 h-full flex flex-col justify-center text-center">
          <h1 className="text-5xl font-bold mb-6">Join the Team Revolutionizing Travel</h1>
          <p className="text-xl mb-8 text-blue-100">
            Help millions of people discover the world. Build cutting-edge technology. Work with amazing people.
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="#open-positions" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              View Open Positions
            </a>
            <a 
              href="#culture" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Our Culture
            </a>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Why Join bookmethat?</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            We're not just building a travel booking platform—we're creating the future of how people explore the world.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">Fast Growth</h3>
              <p className="text-gray-600">
                Join us at the ground floor. We're scaling rapidly and you'll grow with us—in responsibility, impact, and career.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-bold mb-3">Latest Tech Stack</h3>
              <p className="text-gray-600">
                Work with Next.js 14, TypeScript, AWS serverless, PostgreSQL, Redis, Stripe, and more cutting-edge technologies.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold mb-3">Real Impact</h3>
              <p className="text-gray-600">
                Your work affects millions of travelers. See your features launch, get user feedback, and iterate quickly.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-600">Team Members</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
              <p className="text-gray-600">Countries</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2M+</div>
              <p className="text-gray-600">Users Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">$15M</div>
              <p className="text-gray-600">Series A Funding</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Benefits & Perks</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            We believe in taking care of our team. Here's what you get when you join bookmethat.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition">
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section id="culture" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Our Values</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            These principles guide everything we do—from product decisions to how we treat each other.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className={`${value.color} border-2 p-8 rounded-xl`}>
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-700 text-lg">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Open Positions</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            We're hiring across all departments. Find your perfect role below.
          </p>

          <div className="space-y-4">
            {openPositions.map((position) => (
              <div key={position.id} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{position.title}</h3>
                    <p className="text-gray-600 mb-3">{position.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {position.skills.map((skill, idx) => (
                        <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        📁 {position.department}
                      </span>
                      <span className="flex items-center gap-1">
                        📍 {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        ⏰ {position.type}
                      </span>
                    </div>
                  </div>
                  <a 
                    href={`mailto:careers@bookmethat.com?subject=Application for ${position.title}`}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center whitespace-nowrap"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Don't See Your Role */}
          <div className="mt-12 bg-blue-50 border-2 border-blue-200 p-8 rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-3">Don't See Your Perfect Role?</h3>
            <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
              We're always looking for talented people. Send us your resume and tell us how you can contribute to bookmethat.
            </p>
            <a 
              href="mailto:careers@bookmethat.com?subject=General Application"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send General Application
            </a>
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Our Hiring Process</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Transparent, respectful, and designed to help both of us make the right decision.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-bold mb-2">Apply Online</h3>
              <p className="text-gray-600 text-sm">
                Submit your resume and cover letter. We review all applications personally.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-bold mb-2">Initial Screen</h3>
              <p className="text-gray-600 text-sm">
                30-minute video call to discuss your experience and learn about your goals.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-bold mb-2">Technical/Skills Round</h3>
              <p className="text-gray-600 text-sm">
                Role-specific assessment. Engineering: coding. Design: portfolio review. PM: case study.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-bold mb-2">Team & Offer</h3>
              <p className="text-gray-600 text-sm">
                Meet the team, discuss culture fit, and if mutual interest, receive your offer within 24 hours.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 max-w-2xl mx-auto">
              <strong>Average time from application to offer:</strong> 2-3 weeks<br />
              <strong>We value your time:</strong> We'll keep you updated at every stage and provide feedback regardless of outcome.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join a team that's building the future of travel. Apply today and let's change the world together.
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="#open-positions"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              View Open Positions
            </a>
            <a 
              href="mailto:careers@bookmethat.com"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Contact Recruiting Team
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 bookmethat. All rights reserved.</p>
          <div className="mt-4 flex gap-6 justify-center text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
    <Footer />
    </>
  );
}
