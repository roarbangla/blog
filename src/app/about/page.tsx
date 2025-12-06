import { Footer, Header } from "@src/components/shared";
import Image from "next/image";

export default async function () {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6">🐯 Welcome to Roar Bangla</h1>
          <a
            href="https://github.com/roarbangla"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Image
              src="https://img.shields.io/badge/GitHub-roarbangla-181717?style=flat&logo=github"
              alt="GitHub Badge"
              width={150}
              height={20}
              className="hover:opacity-80 transition-opacity"
              unoptimized
            />
          </a>
        </section>

        {/* About Us */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            Roar Bangla is a community-driven organization focused on writing
            Bengali contents. We build open-source projects, share knowledge,
            and foster collaboration within the Bengali article writers
            community.
          </p>
        </section>

        {/* Our Mission */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">🎯 Our Mission</h2>
          <ul className="space-y-3 text-lg text-slate-700">
            <li className="flex items-start">
              <span className="font-semibold mr-2">Empower</span>
              <span>
                Bengali contents creators with tools, resources, and mentorship
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">Build</span>
              <span>innovative unique contents that serve the community</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">Connect</span>
              <span>
                content writers across Bangladesh and the Bengali diaspora
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">Share</span>
              <span>knowledge and things related to bangla.</span>
            </li>
          </ul>
        </section>

        {/* What We Do */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">🌟 What We Do</h2>
          <ul className="space-y-3 text-lg text-slate-700">
            <li>🛠️ Develop open-source tools and libraries</li>
            <li>📚 Share educational content and tutorials</li>
            <li>🤝 Organize community events and workshops</li>
            <li>💡 Collaborate on impactful projects</li>
          </ul>
        </section>

        {/* Join Us */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">🤝 Join Us</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            We welcome contributions from developers of all skill levels!
            Whether you&apos;re a beginner or an experienced developer,
            there&apos;s a place for you in our community.
          </p>

          <h3 className="text-2xl font-semibold mb-4">How to Contribute</h3>
          <ol className="space-y-3 text-lg text-slate-700 list-decimal list-inside">
            <li>
              Browse our{" "}
              <a
                href="https://github.com/orgs/roarbangla/repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                repositories
              </a>
            </li>
            <li>
              Check out open issues labeled{" "}
              <code className="bg-slate-200 px-2 py-1 rounded text-sm">
                good first issue
              </code>
            </li>
            <li>Fork, code, and submit pull requests</li>
            <li>Join discussions and share your ideas</li>
          </ol>
        </section>

        {/* Connect With Us */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">📫 Connect With Us</h2>
          <ul className="space-y-3 text-lg text-slate-700">
            <li>
              <span className="font-semibold">GitHub:</span>{" "}
              <a
                href="https://github.com/roarbangla"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                @roarbangla
              </a>
            </li>
          </ul>
        </section>

        {/* Support */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">💖 Support</h2>
          <p className="text-lg text-slate-700 mb-4">
            If you find our projects useful, consider:
          </p>
          <ul className="space-y-2 text-lg text-slate-700">
            <li>⭐ Starring our repositories</li>
            <li>🍴 Forking and contributing</li>
            <li>📢 Spreading the word</li>
          </ul>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};
