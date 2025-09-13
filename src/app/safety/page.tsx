import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";

export default function SafetyPage() {
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
            <h1 className="text-4xl font-bold mb-4">Safety Guidelines</h1>
            <p className="text-xl text-muted-foreground">
              Creating a safe and supportive community for everyone
            </p>
          </div>

          <div className="space-y-8">
            {/* Emergency Resources */}
            <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-400">
                  <span className="text-2xl">🚨</span>
                  Crisis & Emergency Resources
                </CardTitle>
                <CardDescription className="text-red-700 dark:text-red-300">
                  If you&apos;re in immediate danger or having thoughts of self-harm
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-800 dark:text-red-400">Emergency Services</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Emergency:</strong> 911 (US) / 999 (UK) / 112 (EU)</li>
                      <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
                      <li><strong>National Suicide Prevention:</strong> 988</li>
                      <li><strong>International:</strong> befrienders.org</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-800 dark:text-red-400">Mental Health Support</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>NAMI Helpline:</strong> 1-800-950-6264</li>
                      <li><strong>Crisis Chat:</strong> suicidepreventionlifeline.org</li>
                      <li><strong>LGBTQ+ Support:</strong> thetrevorproject.org</li>
                      <li><strong>Substance Abuse:</strong> 1-800-662-4357</li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <p className="text-sm font-medium text-red-800 dark:text-red-400">
                    ⚠️ ConfessHub is not a substitute for professional help. If you&apos;re experiencing a mental health crisis, please contact a professional immediately.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🤝</span>
                  Community Guidelines
                </CardTitle>
                <CardDescription>
                  How we maintain a supportive and safe environment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-600 dark:text-green-400">✅ Encouraged Behavior</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Share your authentic experiences</li>
                      <li>• Offer genuine support and empathy</li>
                      <li>• Respect others&apos; anonymity</li>
                      <li>• Use trigger warnings when appropriate</li>
                      <li>• Report inappropriate content</li>
                      <li>• Practice active listening</li>
                      <li>• Share helpful resources</li>
                      <li>• Be patient and understanding</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-red-600 dark:text-red-400">❌ Prohibited Behavior</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Attempting to identify anonymous users</li>
                      <li>• Sharing personal contact information</li>
                      <li>• Giving medical or legal advice</li>
                      <li>• Promoting harmful activities</li>
                      <li>• Harassment or bullying</li>
                      <li>• Spam or commercial content</li>
                      <li>• Graphic or disturbing imagery</li>
                      <li>• Hate speech or discrimination</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  Content Guidelines
                </CardTitle>
                <CardDescription>
                  Guidelines for sharing confessions and stories responsibly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Sensitive Content</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      When sharing sensitive experiences, consider adding context or warnings to help others.
                    </p>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <h5 className="font-medium text-yellow-800 dark:text-yellow-400 mb-2">Trigger Warnings</h5>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Consider including warnings for content involving: mental health crises, self-harm, abuse, substance use, eating disorders, trauma, or other potentially triggering topics.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Anonymity Protection</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Don&apos;t include specific names, locations, or identifying details</li>
                      <li>• Avoid sharing information that could identify you or others</li>
                      <li>• Be mindful of unique circumstances that might identify someone</li>
                      <li>• Remember that your posts are permanent and cannot be edited</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reporting System */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🚩</span>
                  Reporting Inappropriate Content
                </CardTitle>
                <CardDescription>
                  How to report content that violates our guidelines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">When to Report</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Content that violates community guidelines</li>
                      <li>• Harassment or bullying behavior</li>
                      <li>• Spam or commercial content</li>
                      <li>• Content that could harm others</li>
                      <li>• Inappropriate or offensive material</li>
                      <li>• Attempts to identify anonymous users</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">How to Report</h4>
                    <ol className="space-y-2 text-sm">
                      <li>1. Click the ⚠️ Report button on any post</li>
                      <li>2. Confirm your report in the dialog</li>
                      <li>3. Our moderation team will review within 24 hours</li>
                      <li>4. We&apos;ll take appropriate action if needed</li>
                      <li>5. Serious violations may result in account suspension</li>
                    </ol>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h5 className="font-medium text-blue-800 dark:text-blue-400 mb-2">Anonymous Reporting</h5>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    All reports are anonymous. We won&apos;t share who reported content, and you won&apos;t be contacted unless we need additional information.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Digital Wellbeing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💚</span>
                  Digital Wellbeing Tips
                </CardTitle>
                <CardDescription>
                  Taking care of your mental health while using ConfessHub
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Healthy Boundaries</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Set time limits for platform usage</li>
                      <li>• Take breaks if content becomes overwhelming</li>
                      <li>• Remember that not all advice applies to your situation</li>
                      <li>• Don&apos;t feel obligated to respond to everything</li>
                      <li>• Prioritize your own mental health</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Getting Help</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• ConfessHub complements but doesn&apos;t replace professional help</li>
                      <li>• Consider therapy or counseling for ongoing issues</li>
                      <li>• Reach out to trusted friends or family</li>
                      <li>• Use crisis resources if you&apos;re in immediate danger</li>
                      <li>• Remember that seeking help is a sign of strength</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔐</span>
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Account Security</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground mb-4">
                    <li>• Use a strong, unique password</li>
                    <li>• Don&apos;t share your account credentials</li>
                    <li>• Log out from shared devices</li>
                    <li>• Report any suspicious account activity</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Privacy Protection</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Your posts are anonymous and not linked to your account</li>
                    <li>• We don&apos;t store unnecessary personal information</li>
                    <li>• Generated usernames are completely random</li>
                    <li>• Your email is used only for account purposes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="mt-12 text-center">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Need Help or Have Concerns?</h3>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild>
                      <Link href="/contact">Contact Support</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/privacy">Privacy Policy</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/terms">Terms of Service</Link>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Our support team typically responds within 24 hours
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Back Navigation */}
          <div className="mt-8 text-center">
            <Link href="/" className="text-purple-600 hover:text-purple-500 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}