import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ConfessHub
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <span className="text-sm hover:text-purple-600 cursor-pointer">Dashboard</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              Your privacy is our priority. Learn how we protect your data.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔒</span>
                  Introduction
                </CardTitle>
                <CardDescription>
                  Welcome to ConfessHub&apos;s Privacy Policy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  At ConfessHub, we are committed to protecting your privacy and ensuring you have a positive experience on our platform. This policy outlines how we collect, use, and safeguard your information when you use our anonymous confession sharing service.
                </p>
                <p>
                  By using ConfessHub, you agree to the collection and use of information in accordance with this policy.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Personal Information</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Email address (for account creation and authentication)</li>
                    <li>Encrypted password (we use industry-standard hashing)</li>
                    <li>Account creation date and last login time</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Anonymous Content</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Confession text content (posted anonymously)</li>
                    <li>Categories and tags you select</li>
                    <li>Generated anonymous usernames (not linked to your real identity)</li>
                    <li>Reactions and interactions with posts</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Technical Information</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>IP address (for security and spam prevention)</li>
                    <li>Browser type and device information</li>
                    <li>Usage analytics (anonymized)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">⚙️</span>
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <div>
                      <strong>Account Management:</strong> To create and maintain your account, authenticate your identity, and provide customer support.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <div>
                      <strong>Service Delivery:</strong> To enable you to post anonymously, interact with content, and use platform features.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <div>
                      <strong>Platform Security:</strong> To prevent spam, abuse, and ensure community safety through content moderation.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <div>
                      <strong>Communication:</strong> To send important account notifications, security alerts, and policy updates.
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Anonymity & Privacy Protection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎭</span>
                  Anonymity & Privacy Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-400 mb-2">
                    Our Anonymity Guarantee
                  </h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Your confessions and posts are never directly linked to your email address or personal information. We use generated anonymous identities to ensure your privacy is maintained.
                  </p>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Anonymous usernames are randomly generated and not traceable to your account</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Post content is stored separately from account information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>We don&apos;t track or store identifying information in posts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Your reactions and interactions remain anonymous</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Sharing & Third Parties */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🚫</span>
                  Data Sharing & Third Parties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                  <h4 className="font-semibold text-red-800 dark:text-red-400 mb-2">
                    We DO NOT sell your data
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    ConfessHub never sells, rents, or trades your personal information to third parties for marketing or commercial purposes.
                  </p>
                </div>
                <p>We may share limited information only in these specific circumstances:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">⚠️</span>
                    <span><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">⚠️</span>
                    <span><strong>Safety Concerns:</strong> To prevent harm or protect the safety of users or the public</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">⚠️</span>
                    <span><strong>Service Providers:</strong> With trusted partners who help us operate the platform (under strict confidentiality agreements)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Your Rights & Choices */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">⚖️</span>
                  Your Rights & Choices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Your Rights Include:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Access your personal data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Correct inaccurate information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Delete your account</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Export your data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Opt-out of communications</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Important Notes:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">⚠️</span>
                        <span>Anonymous posts cannot be deleted as they&apos;re not linked to your account</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">ℹ️</span>
                        <span>Account deletion removes personal data but preserves anonymous content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>You can contact us anytime for data requests</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Measures */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔐</span>
                  Security Measures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Technical Security:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Encrypted data transmission (HTTPS/SSL)</li>
                      <li>• Secure password hashing (bcrypt)</li>
                      <li>• Regular security audits and updates</li>
                      <li>• Protected database access</li>
                      <li>• Input validation and sanitization</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Operational Security:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Limited access to personal data</li>
                      <li>• Staff privacy training</li>
                      <li>• Incident response procedures</li>
                      <li>• Regular backup and recovery testing</li>
                      <li>• Monitoring and logging systems</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact & Changes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📞</span>
                  Contact & Policy Changes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Contact Us</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you have questions about this Privacy Policy or your data, please contact us:
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm"><strong>Email:</strong> privacy@confesshub.com</p>
                    <p className="text-sm"><strong>Response time:</strong> Within 48 hours</p>
                    <p className="text-sm"><strong>Subject:</strong> Privacy Policy Inquiry</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Policy Updates</h4>
                  <p className="text-sm text-muted-foreground">
                    We may update this Privacy Policy periodically. When we make significant changes, we&apos;ll notify you via email and update the &quot;Last updated&quot; date above. Your continued use of ConfessHub after changes take effect constitutes acceptance of the updated policy.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/terms" className="text-purple-600 hover:text-purple-500">
                Terms of Service
              </Link>
              <Link href="/safety" className="text-purple-600 hover:text-purple-500">
                Safety Guidelines  
              </Link>
              <Link href="/contact" className="text-purple-600 hover:text-purple-500">
                Contact Us
              </Link>
              <Link href="/" className="text-purple-600 hover:text-purple-500">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}