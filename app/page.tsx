import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare, BarChart3, Ticket } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">AI-Powered Customer Support</h1>
            <p className="text-xl md:text-2xl mb-8">
              Automate your customer support with advanced NLP and machine learning
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                <Link href="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/demo">Try Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-indigo-600" />}
              title="AI Chatbot"
              description="Intelligent chatbot that understands customer queries and provides accurate responses in real-time."
            />
            <FeatureCard
              icon={<Ticket className="h-10 w-10 text-indigo-600" />}
              title="Ticket Routing"
              description="Automatically categorize and route support tickets to the right department or agent."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-indigo-600" />}
              title="Sentiment Analysis"
              description="Analyze customer sentiment to identify satisfaction levels and improve service quality."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your customer support?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that have improved customer satisfaction while reducing support costs.
          </p>
          <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/signup">Start Free Trial</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="hover:text-indigo-300">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-indigo-300">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="hover:text-indigo-300">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:text-indigo-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-indigo-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-indigo-300">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/documentation" className="hover:text-indigo-300">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:text-indigo-300">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-indigo-300">
                    API Reference
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="hover:text-indigo-300">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-indigo-300">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-indigo-300">
                    System Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} AI Support Automation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

