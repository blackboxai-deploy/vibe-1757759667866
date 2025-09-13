"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    { value: "support", label: "Technical Support" },
    { value: "safety", label: "Safety & Moderation" },
    { value: "privacy", label: "Privacy Concerns" },
    { value: "feedback", label: "Feedback & Suggestions" },
    { value: "bug", label: "Bug Report" },
    { value: "account", label: "Account Issues" },
    { value: "other", label: "Other" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch {
      setErrors({ general: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
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
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✅</span>
                </div>
                <CardTitle className="text-2xl">Message Sent Successfully!</CardTitle>
                <CardDescription>
                  Thank you for contacting us. We&apos;ve received your message and will respond within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">What happens next?</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Our team will review your message</li>
                    <li>• You&apos;ll receive an email acknowledgment shortly</li>
                    <li>• We&apos;ll respond with a solution or update within 24 hours</li>
                    <li>• For urgent issues, we may contact you sooner</li>
                  </ul>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard">Return to Dashboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              We&apos;re here to help. Reach out with questions, feedback, or concerns.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-xl">📞</span>
                    Get in Touch
                  </CardTitle>
                  <CardDescription>
                    Multiple ways to reach our support team
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span>📧</span> Email Support
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      For general inquiries and support
                    </p>
                    <p className="text-sm font-mono">support@confesshub.com</p>
                    <p className="text-xs text-muted-foreground">Response time: 24 hours</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span>🛡️</span> Safety & Moderation
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Report safety issues or inappropriate content
                    </p>
                    <p className="text-sm font-mono">safety@confesshub.com</p>
                    <p className="text-xs text-muted-foreground">Response time: 4 hours</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span>🔒</span> Privacy Concerns
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Data protection and privacy matters
                    </p>
                    <p className="text-sm font-mono">privacy@confesshub.com</p>
                    <p className="text-xs text-muted-foreground">Response time: 48 hours</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span>⏱️</span> Business Hours
                    </h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM (EST)</p>
                      <p>Saturday: 10:00 AM - 4:00 PM (EST)</p>
                      <p>Sunday: Emergency support only</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
                      🚨 Emergency Support
                    </h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      For mental health crises, please contact professional crisis services immediately. See our <Link href="/safety" className="underline font-medium">Safety Guidelines</Link> for resources.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we&apos;ll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {errors.general && (
                    <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                      <AlertDescription className="text-red-800 dark:text-red-400">
                        {errors.general}
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name (Optional)</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          disabled={isSubmitting}
                          required
                        />
                        {errors.email && (
                          <p className="text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleInputChange("category", value)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category..." />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-red-600 dark:text-red-400">{errors.category}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="Brief description of your inquiry"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        disabled={isSubmitting}
                        maxLength={100}
                        required
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formData.subject.length}/100 characters</span>
                        {errors.subject && (
                          <span className="text-red-600 dark:text-red-400">{errors.subject}</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Please provide as much detail as possible to help us assist you better..."
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        disabled={isSubmitting}
                        rows={6}
                        maxLength={2000}
                        required
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formData.message.length}/2000 characters</span>
                        {errors.message && (
                          <span className="text-red-600 dark:text-red-400">{errors.message}</span>
                        )}
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">📋 Before You Send</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Check our <Link href="/safety" className="text-purple-600 hover:underline">Safety Guidelines</Link> for common questions</li>
                        <li>• Review our <Link href="/privacy" className="text-purple-600 hover:underline">Privacy Policy</Link> for data-related inquiries</li>
                        <li>• For immediate help, visit our <Link href="/safety" className="text-purple-600 hover:underline">Emergency Resources</Link></li>
                        <li>• Include relevant details to help us provide better support</li>
                      </ul>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending Message..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-xl">❓</span>
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Quick answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">How do I delete my account?</h4>
                      <p className="text-sm text-muted-foreground">
                        Contact us with your account deletion request. Note that anonymous posts cannot be removed as they&apos;re not linked to your account.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Can I edit or delete my posts?</h4>
                      <p className="text-sm text-muted-foreground">
                        Posts cannot be edited or deleted after submission as they&apos;re completely anonymous. Please review your content before posting.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">How is my privacy protected?</h4>
                      <p className="text-sm text-muted-foreground">
                        Your posts are completely anonymous and not linked to your account. See our Privacy Policy for full details.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">How do I report inappropriate content?</h4>
                      <p className="text-sm text-muted-foreground">
                        Click the ⚠️ Report button on any post. Our moderation team reviews all reports within 24 hours.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">What if I&apos;m having a mental health crisis?</h4>
                      <p className="text-sm text-muted-foreground">
                        Please contact professional crisis services immediately. See our Safety Guidelines for emergency resources.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Is there a mobile app?</h4>
                      <p className="text-sm text-muted-foreground">
                        Currently, ConfessHub is available as a web application that works great on mobile browsers. A dedicated app is in development.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Back to Home */}
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