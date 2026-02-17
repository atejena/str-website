-- Add terms_content to site_settings
INSERT INTO site_settings (key, value, description) VALUES
('terms_content', to_jsonb('# Terms of Service

Last updated: January 1, 2025

## 1. Acceptance of Terms

By accessing or using the services provided by STR - Strength Through Resilience ("STR," "we," "us," or "our"), including our gym facilities, classes, personal training, and website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.

## 2. Membership Agreement

### 2.1 Eligibility

To become a member, you must be at least 16 years of age. Members aged 16-17 require a parent or guardian to sign the membership agreement and liability waiver on their behalf.

### 2.2 Membership Types

We offer various membership tiers (Basic, Premium, Elite) with different benefits and pricing. Details are available on our pricing page and at our facility.

### 2.3 Payment

Monthly membership fees are due on the same date each month. Annual memberships are paid in full at sign-up. Failed payments may result in suspension of membership privileges until the account is current.

## 3. Cancellation and Refunds

### 3.1 Monthly Memberships

Monthly memberships may be cancelled with 30 days written notice. No refunds are provided for the remaining days of the current billing period.

### 3.2 Annual Memberships

Annual memberships cancelled within the first 6 months may be eligible for a prorated refund minus a cancellation fee. Cancellations after 6 months are not eligible for refunds.

### 3.3 Membership Freeze

Elite members may freeze their membership for up to 14 days per year. Additional freeze requests are handled on a case-by-case basis.

## 4. Facility Rules and Conduct

Members agree to:

- Treat all staff, coaches, and fellow members with respect
- Use equipment properly and return weights to their designated areas
- Wipe down equipment after use
- Wear appropriate athletic attire and closed-toe shoes
- Not engage in personal training of others without authorization
- Follow all posted rules and staff instructions
- Not use the facility while under the influence of alcohol or drugs

Violation of these rules may result in membership suspension or termination without refund.

## 5. Class Booking and Cancellations

- Classes should be booked at least 24 hours in advance when possible
- Cancellations must be made at least 2 hours before class start time
- Late cancellations or no-shows may result in fees
- We reserve the right to cancel classes due to low enrollment or emergencies

## 6. Assumption of Risk and Liability Waiver

**IMPORTANT:** Physical exercise involves inherent risks including, but not limited to, injury, disability, and death. By using our facilities and services, you acknowledge these risks and assume full responsibility for any injuries or damages that may occur.

You agree to release STR, its owners, employees, coaches, and agents from any and all claims, damages, or liabilities arising from your use of our facilities and services.

You confirm that you are physically able to participate in exercise activities and have consulted with a physician if you have any medical conditions.

## 7. Personal Property

STR is not responsible for lost, stolen, or damaged personal property. We recommend using our day-use lockers and not leaving valuables unattended.

## 8. Photography and Media

STR may take photographs or videos within the facility for promotional purposes. By entering our premises, you consent to being photographed or recorded. Please inform staff if you do not wish to appear in promotional materials.

## 9. Guest Policy

- Guests must be at least 16 years old
- Guests must sign a waiver before using the facility
- Members are responsible for their guests'' conduct
- Guest passes are included based on membership tier

## 10. Intellectual Property

All content on our website, including logos, images, text, and training materials, is the property of STR and may not be used without written permission.

## 11. Modifications to Terms

We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms. We will notify members of significant changes via email or posted notice.

## 12. Governing Law

These terms are governed by the laws of the State of New Jersey. Any disputes shall be resolved in the courts of Union County, New Jersey.

## 13. Contact Information

For questions about these terms, please contact us:

- Email: spencer@trainwithstr.com
- Address: 8 Eastman St, Suite 3, Cranford, NJ 07016'::text), 'Terms and Conditions content (markdown)')
ON CONFLICT (key) DO NOTHING;
