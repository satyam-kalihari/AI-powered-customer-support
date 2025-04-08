import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  name: string
  email: string
  passwordHash: string
  companyName: string
  industry: string
  serviceDescription: string
  faqItems?: string
  createdAt: Date
  updatedAt: Date
}

export interface ServiceInfo {
  companyName: string
  industry: string
  serviceDescription: string
  faqItems?: string
}

