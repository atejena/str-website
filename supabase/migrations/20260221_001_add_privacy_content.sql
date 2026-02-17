-- Add privacy_content to site_settings
INSERT INTO site_settings (key, value, description) VALUES
('privacy_content', to_jsonb('# Privacy Policy

Last updated: January 1, 2025

## 1. Information We Collect

At STR - Strength Through Resilience, we collect information you provide directly to us when you:

- Create an account or membership
- Sign up for classes or personal training sessions
- Subscribe to our newsletter
- Contact us through our website or in person
- Participate in surveys or promotions

This information may include your name, email address, phone number, billing address, payment information, and fitness goals or health information you choose to share.

## 2. How We Use Your Information

We use the information we collect to:

- Process memberships and payments
- Schedule and manage class bookings
- Communicate with you about your account, classes, and gym updates
- Personalize your fitness experience and training programs
- Send promotional communications (with your consent)
- Improve our services and develop new programs
- Comply with legal obligations

## 3. Information Sharing

We do not sell, trade, or rent your personal information to third parties. We may share your information with:

- Service providers who assist in our operations (payment processors, scheduling software)
- Professional advisors (lawyers, accountants) as needed
- Law enforcement when required by law

## 4. Data Security

We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.

## 5. Your Rights

You have the right to:

- Access the personal information we hold about you
- Request correction of inaccurate information
- Request deletion of your information
- Opt-out of marketing communications
- Withdraw consent where processing is based on consent

## 6. Cookies and Tracking

Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookies through your browser settings.

## 7. Third-Party Links

Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies.

## 8. Children''s Privacy

Our services are not directed to individuals under 16 years of age. We do not knowingly collect personal information from children under 16. Members aged 16-17 require parental consent.

## 9. Changes to This Policy

We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.

## 10. Contact Us

If you have questions about this privacy policy or our data practices, please contact us at:

- Email: spencer@trainwithstr.com
- Address: 8 Eastman St, Suite 3, Cranford, NJ 07016'::text), 'Privacy Policy content (markdown)')
ON CONFLICT (key) DO NOTHING;
