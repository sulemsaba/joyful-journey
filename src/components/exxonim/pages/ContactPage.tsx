"use client";

import { useState, type FormEvent } from "react";
import { fallbackContactPage, fallbackCompanyInfo } from "@/lib/exxonim-data";
import type { ContactPageContent, ContactCardContent } from "@/lib/exxonim-types";
import { cn } from "@/lib/cn";
import { Container } from "@/components/exxonim/Container";
import { routes } from "@/lib/exxonim-router";
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, CheckCircle2, Send } from "lucide-react";

const cardIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Phone,
  Email: Mail,
  Office: MapPin,
  WhatsApp: MessageCircle,
};

export function ContactPage() {
  const content: ContactPageContent = fallbackContactPage.content;
  const { hero, cards } = content;
  const companyInfo = fallbackCompanyInfo;

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const trackingId = `EXN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 md:py-20">
        {/* Hero */}
        <section className="mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent mb-4">
            <span className="inline-block h-px w-5 bg-accent" />
            {hero.eyebrow}
          </span>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-text mb-4">
            {hero.title}
          </h1>
          <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
            {hero.description}
          </p>
        </section>

        {/* Contact Cards */}
        {cards && cards.length > 0 && (
          <section className="mb-12 md:mb-16">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.slice(0, 3).map((card, i) => (
                <ContactCard key={i} card={card} />
              ))}
            </div>
          </section>
        )}

        {/* Two-column: Form + Sidebar */}
        <section className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Consultation Form */}
          <div className="rounded-2xl border border-border-soft bg-surface p-6 md:p-8 shadow-card">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft mb-4">
                  <CheckCircle2 className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-text mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-text-muted max-w-md mb-4">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <p className="text-sm text-text-soft">
                  Tracking ID: <span className="font-mono font-bold text-accent">{trackingId}</span>
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-border-soft px-6 text-sm font-semibold text-text-muted hover:text-text hover:border-border-strong transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-text mb-2">
                  Book a Free Consultation
                </h2>
                <p className="text-sm text-text-muted mb-6">
                  Fill out the form below and our team will contact you to discuss your business needs.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="text-sm font-medium text-text">
                      Full Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="John Doe"
                      className="h-11 rounded-xl border border-border-soft bg-page px-4 text-sm text-text placeholder:text-text-soft focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-sm font-medium text-text">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="h-11 rounded-xl border border-border-soft bg-page px-4 text-sm text-text placeholder:text-text-soft focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-sm font-medium text-text">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+255 xxx xxx xxx"
                        className="h-11 rounded-xl border border-border-soft bg-page px-4 text-sm text-text placeholder:text-text-soft focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>
                  </div>

                  {/* Company + Service Type */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="company" className="text-sm font-medium text-text">
                        Company Name
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Your Company"
                        className="h-11 rounded-xl border border-border-soft bg-page px-4 text-sm text-text placeholder:text-text-soft focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="serviceType" className="text-sm font-medium text-text">
                        Service Type <span className="text-accent">*</span>
                      </label>
                      <select
                        id="serviceType"
                        required
                        defaultValue=""
                        className="h-11 rounded-xl border border-border-soft bg-page px-4 text-sm text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors [&>option]:bg-surface"
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        <option value="company-registration">Company Registration</option>
                        <option value="business-licensing">Business Licensing</option>
                        <option value="tax-compliance">Tax Compliance</option>
                        <option value="ongoing-advisory">Ongoing Advisory</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-sm font-medium text-text">
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Tell us about your business needs..."
                      className="rounded-xl border border-border-soft bg-page px-4 py-3 text-sm text-text placeholder:text-text-soft focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-extrabold text-accent-contrast hover:bg-accent-hover transition-all hover:-translate-y-0.5 self-start"
                  >
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Sidebar: Direct Contact */}
          <div className="flex flex-col gap-6">
            {/* Contact Info Card */}
            <div className="rounded-2xl border border-border-soft bg-surface p-6 shadow-card">
              <h3 className="text-lg font-semibold text-text mb-4">
                Direct Contact
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">Phone</p>
                    {companyInfo.phones.map((phone, i) => (
                      <a key={i} href={`tel:${phone.replace(/\s/g, "")}`} className="text-sm text-text-muted hover:text-accent transition-colors block">
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">Email</p>
                    {companyInfo.emails.map((email, i) => (
                      <a key={i} href={`mailto:${email}`} className="text-sm text-text-muted hover:text-accent transition-colors block">
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">WhatsApp</p>
                    <a href={`https://wa.me/${companyInfo.whatsapp}`} className="text-sm text-text-muted hover:text-accent transition-colors">
                      +{companyInfo.whatsapp}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">Office</p>
                    <p className="text-sm text-text-muted">{companyInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick CTA */}
            <div className="rounded-2xl bg-gradient-to-br from-accent to-accent-hover p-6 shadow-card">
              <h3 className="text-lg font-semibold text-accent-contrast mb-2">
                Need Immediate Help?
              </h3>
              <p className="text-sm text-accent-contrast/80 mb-4 leading-relaxed">
                Call us directly for urgent matters. We&apos;re available Mon–Fri, 8 AM – 5 PM EAT.
              </p>
              <a
                href={`tel:${companyInfo.phones[0]?.replace(/\s/g, "")}`}
                className="inline-flex h-11 items-center justify-center rounded-full bg-surface px-6 text-sm font-extrabold text-accent hover:bg-surface-soft transition-all hover:-translate-y-0.5"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ContactCard({ card }: { card: ContactCardContent }) {
  const Icon = cardIconMap[card.label] || Mail;

  return (
    <a
      href={card.action.href}
      className="flex flex-col gap-3 rounded-2xl border border-border-soft bg-surface p-6 shadow-card transition-all hover:border-border-strong hover:-translate-y-0.5"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-semibold text-text">{card.label}</p>
        <p className="text-base font-semibold text-accent">{card.value}</p>
        <p className="text-xs text-text-muted mt-1">{card.description}</p>
      </div>
      <span className="inline-flex items-center text-sm font-bold text-accent hover:underline mt-1">
        {card.action.label}
        <ArrowRight className="ml-1 h-3.5 w-3.5" />
      </span>
    </a>
  );
}
