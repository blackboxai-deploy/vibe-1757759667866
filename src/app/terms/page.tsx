import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export default function TermsOfServicePage() {
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
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-muted-foreground">
              Community guidelines and terms for using ConfessHub
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            {/* Acceptance of Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📋</span>
                  Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  By accessing and using ConfessHub, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service (&quot;Terms&quot;) govern your use of the ConfessHub platform, including any content, functionality, and services offered.
                </p>
                <p>
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </CardContent>
            </Card>

            {/* Service Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Service Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  ConfessHub is an anonymous confession and story-sharing platform that allows users to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Share personal thoughts, experiences, and confessions anonymously</li>
                  <li>Interact with others&apos; content through reactions and comments</li>
                  <li>Browse and search content by categories and tags</li>
                  <li>Report inappropriate content to maintain community standards</li>
                  <li>Connect with others in a supportive, judgment-free environment</li>
                </ul>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">👤</span>
                  User Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Account Requirements</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>You must be at least 13 years old to use this service</li>
                    <li>You must provide accurate and complete registration information</li>
                    <li>You are responsible for maintaining the security of your account</li>
                    <li>You must not share your account credentials with others</li>
                    <li>You must immediately notify us of any unauthorized use of your account</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Content Guidelines</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>All content must comply with our Community Guidelines</li>
                    <li>You retain ownership of content you create and post</li>
                    <li>You grant us license to display, distribute, and moderate your content</li>
                    <li>You are solely responsible for the content you post</li>
                    <li>You must not impersonate others or provide false information</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Prohibited Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🚫</span>
                  Prohibited Content & Behavior
                </CardTitle>
                <CardDescription>
                  The following content and behaviors are strictly forbidden on ConfessHub
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Harmful Content</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Threats of violence or self-harm</li>
                        <li>• Harassment or bullying</li>
                        <li>• Hate speech or discrimination</li>
                        <li>• Content promoting illegal activities</li>
                        <li>• Graphic violence or disturbing imagery</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Inappropriate Content</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Sexually explicit material</li>
                        <li>• Content involving minors inappropriately</li>
                        <li>• Spam or repetitive content</li>
                        <li>• Commercial advertisements</li>
                        <li>• Personal information of others</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Platform Abuse</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Creating multiple accounts</li>
                        <li>• Attempting to identify anonymous users</li>
                        <li>• Circumventing platform features</li>
                        <li>• Automated posting or scraping</li>
                        <li>• Malicious code or links</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Legal Violations</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Copyright or trademark infringement</li>
                        <li>• Defamation or false accusations</li>
                        <li>• Privacy violations</li>
                        <li>• Financial fraud or scams</li>
                        <li>• Any illegal activity</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Anonymity & Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎭</span>
                  Anonymity & Privacy Commitment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-400 mb-2">
                    Our Promise to You
                  </h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    We are committed to maintaining your anonymity. Your posts and interactions are not linked to your personal account information, ensuring your privacy is protected.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What This Means:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Your anonymous posts cannot be traced back to your account</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Generated usernames are completely random and not personal</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Your reactions and comments remain anonymous</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">⚠️</span>
                      <span>Attempting to identify anonymous users violates our terms</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Content Moderation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">⚖️</span>
                  Content Moderation & Enforcement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Our Approach</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    We maintain a safe and supportive community through a combination of automated systems, community reporting, and human review.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Enforcement Actions</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 mt-1">⚠️</span>
                        <span><strong>Warning:</strong> First offense for minor violations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">🔇</span>
                        <span><strong>Content Removal:</strong> Violating posts deleted</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">⏸️</span>
                        <span><strong>Temporary Suspension:</strong> 1-30 days</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-700 mt-1">🚫</span>
                        <span><strong>Permanent Ban:</strong> Serious or repeated violations</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Appeal Process</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Submit appeals within 30 days</li>
                      <li>• Provide context and explanation</li>
                      <li>• Review by different moderator</li>
                      <li>• Response within 7 business days</li>
                      <li>• Final decisions are binding</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform Rights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🏛️</span>
                  Platform Rights & Limitations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Our Rights</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Modify or discontinue services with reasonable notice</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Remove content that violates these terms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Terminate accounts for violations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Update these terms with proper notification</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Service Availability</h4>
                  <p className="text-sm text-muted-foreground">
                    While we strive for 100% uptime, we cannot guarantee uninterrupted service. Maintenance, updates, or technical issues may temporarily affect availability. We are not liable for any damages resulting from service interruptions.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">⚠️</span>
                  Disclaimers & Limitations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
                    Important Notice
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    ConfessHub is not a substitute for professional mental health services, medical advice, or legal counsel. If you&apos;re experiencing a crisis, please contact appropriate emergency services or mental health professionals.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Service Limitations</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Platform provided &quot;as is&quot; without warranties</li>
                      <li>• No guarantee of content accuracy</li>
                      <li>• Users responsible for their own actions</li>
                      <li>• Third-party links not our responsibility</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Liability Limits</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• No liability for user-generated content</li>
                      <li>• Limited liability for service issues</li>
                      <li>• No responsibility for user interactions</li>
                      <li>• Indemnification by users for their actions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact & Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📞</span>
                  Contact & Terms Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Questions or Concerns?</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm"><strong>Email:</strong> legal@confesshub.com</p>
                    <p className="text-sm"><strong>Subject:</strong> Terms of Service Inquiry</p>
                    <p className="text-sm"><strong>Response:</strong> Within 5 business days</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Terms Updates</h4>
                  <p className="text-sm text-muted-foreground">
                    We may modify these Terms of Service from time to time. Significant changes will be communicated via email and platform notifications. Continued use of ConfessHub after changes constitutes acceptance of new terms.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-purple-600 hover:text-purple-500">
                Privacy Policy
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
            <p className="text-xs text-muted-foreground">
              By using ConfessHub, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}