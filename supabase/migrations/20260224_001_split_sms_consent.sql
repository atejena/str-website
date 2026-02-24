-- Split single sms_consent into two separate consent columns (A2P/TCPA compliant)
-- Transactional = non-marketing texts (account updates, service notifications)
-- Marketing = promotional texts (offers, discounts, updates)

ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS sms_consent_transactional BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS sms_consent_marketing BOOLEAN DEFAULT false;

-- Migrate any existing sms_consent data to both new columns
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'sms_consent'
  ) THEN
    UPDATE contact_submissions
    SET sms_consent_transactional = sms_consent,
        sms_consent_marketing = sms_consent
    WHERE sms_consent = true;

    ALTER TABLE contact_submissions DROP COLUMN sms_consent;
  END IF;
END $$;
