"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare } from "lucide-react"
import { register } from "@/lib/auth-client";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    industry: "",
    serviceDescription: "",
    faqItems: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState(1)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const data = await register(formData);

      if (!data.message || data.message !== "User registered successfully") {
        throw new Error(data.message || "Registration failed");
      }

      // Redirect to dashboard on successful registration
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1) {
      // Validate first step
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill in all required fields")
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
      }
      setError("")
      setStep(2)
    }
  }

  const prevStep = () => {
    setStep(1)
    setError("")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center rounded-full bg-indigo-100 p-2">
            <MessageSquare className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">AI Support Automation</h2>
          <p className="mt-2 text-sm text-gray-500">Create an account to get started</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              {step === 1
                ? "Create your account credentials"
                : "Tell us about your business to customize your AI assistant"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">{error}</div>}

              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={formData.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="saas">SaaS</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceDescription">Describe Your Services/Products</Label>
                    <Textarea
                      id="serviceDescription"
                      name="serviceDescription"
                      placeholder="Provide a detailed description of your services or products. This will help us train your AI assistant."
                      className="min-h-[100px]"
                      value={formData.serviceDescription}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="faqItems">Common Questions & Answers (Optional)</Label>
                    <Textarea
                      id="faqItems"
                      name="faqItems"
                      placeholder="Add some common questions and answers that your customers ask. Format: Q: Question? A: Answer."
                      className="min-h-[100px]"
                      value={formData.faqItems}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              {step === 1 ? (
                <Button type="button" className="w-full" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <div className="flex w-full gap-4">
                  <Button type="button" variant="outline" className="w-1/2" onClick={prevStep}>
                    Back
                  </Button>
                  <Button type="submit" className="w-1/2" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
              )}
              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
