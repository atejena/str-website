'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Send, CheckCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Card, CardContent } from '@/components/ui/Card';
import { siteSettings } from '@/data/settings';

// Form validation schema
const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0), // Anti-spam honeypot
});

type ContactFormData = z.infer<typeof contactSchema>;

const subjectOptions = [
  { value: '', label: 'Select a subject' },
  { value: 'membership', label: 'Membership Inquiry' },
  { value: 'trial', label: 'Free Trial Request' },
  { value: 'personal-training', label: 'Personal Training' },
  { value: 'classes', label: 'Class Information' },
  { value: 'careers', label: 'Careers' },
  { value: 'other', label: 'Other' },
];

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // PLACEHOLDER: Replace with actual API call to /api/contact
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Form submitted:', data);
    setIsSubmitted(true);
    setIsSubmitting(false);
    reset();
  };

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <Section background="default" className="pt-32 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
              Get In Touch
            </span>
            <h1 className="text-display-hero font-display font-bold text-foreground mb-6">
              CONTACT <span className="text-str-gold">US</span>
            </h1>
            <p className="text-body-lead text-muted max-w-2xl mx-auto">
              Ready to start your fitness journey? Have questions? We'd love to hear from you.
            </p>
          </motion.div>
        </Section>

        {/* Contact Content */}
        <Section background="surface">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-str-gold mx-auto mb-4" />
                      <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted mb-6">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)} variant="secondary">
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                        Send Us a Message
                      </h2>

                      {/* Honeypot field (hidden) */}
                      <input
                        type="text"
                        {...register('honeypot')}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                      />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                          label="First Name"
                          placeholder="John"
                          error={errors.firstName?.message}
                          {...register('firstName')}
                        />
                        <Input
                          label="Last Name"
                          placeholder="Doe"
                          error={errors.lastName?.message}
                          {...register('lastName')}
                        />
                      </div>

                      <Input
                        label="Email"
                        type="email"
                        placeholder="john@example.com"
                        error={errors.email?.message}
                        {...register('email')}
                      />

                      <Input
                        label="Phone (Optional)"
                        type="tel"
                        placeholder="(555) 123-4567"
                        error={errors.phone?.message}
                        {...register('phone')}
                      />

                      <Select
                        label="Subject"
                        options={subjectOptions}
                        error={errors.subject?.message}
                        {...register('subject')}
                      />

                      <Textarea
                        label="Message"
                        placeholder="Tell us about your fitness goals or ask us anything..."
                        rows={5}
                        error={errors.message?.message}
                        {...register('message')}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        isLoading={isSubmitting}
                      >
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Location Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-str-gold/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-str-gold" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground mb-1">Location</h3>
                      <p className="text-muted">
                        {siteSettings.address.street}<br />
                        {siteSettings.address.city}, {siteSettings.address.state} {siteSettings.address.zip}
                      </p>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          `${siteSettings.address.street}, ${siteSettings.address.city}, ${siteSettings.address.state} ${siteSettings.address.zip}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-str-gold text-sm hover:underline mt-2 inline-block"
                      >
                        Get Directions
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Details */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-str-gold/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-str-gold" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground mb-1">Phone</h3>
                      <a
                        href={`tel:${siteSettings.phone}`}
                        className="text-muted hover:text-str-gold transition-colors"
                      >
                        {siteSettings.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-str-gold/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-str-gold" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground mb-1">Email</h3>
                      <a
                        href={`mailto:${siteSettings.email}`}
                        className="text-muted hover:text-str-gold transition-colors"
                      >
                        {siteSettings.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-str-gold/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-str-gold" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-display font-bold text-foreground mb-3">Hours</h3>
                      <div className="space-y-1 text-sm">
                        {siteSettings.businessHours.map((hours) => (
                          <div key={hours.day} className="flex justify-between">
                            <span className="text-muted">{hours.day}</span>
                            <span className="text-foreground">
                              {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-display font-bold text-foreground mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    {siteSettings.socialLinks.instagram && (
                      <a
                        href={siteSettings.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-str-gold/10 flex items-center justify-center text-muted hover:text-str-gold hover:bg-str-gold/20 transition-all"
                        aria-label="Follow us on Instagram"
                      >
                        <Instagram className="w-6 h-6" />
                      </a>
                    )}
                    {siteSettings.socialLinks.facebook && (
                      <a
                        href={siteSettings.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-str-gold/10 flex items-center justify-center text-muted hover:text-str-gold hover:bg-str-gold/20 transition-all"
                        aria-label="Follow us on Facebook"
                      >
                        <Facebook className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Section>

        {/* Map Section */}
        <Section background="default" className="py-0">
          <div className="h-[400px] w-full bg-surface border border-border rounded-[2px] overflow-hidden">
            {/* PLACEHOLDER: Replace with actual Google Maps embed */}
            <div className="w-full h-full flex items-center justify-center text-muted">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-str-gold" />
                <p className="font-display font-bold text-foreground mb-2">
                  Google Maps Embed
                </p>
                <p className="text-sm">
                  Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable
                </p>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
