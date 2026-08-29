-- Add stripe_email_sent flag for idempotent Stripe payment notification emails
-- Set to true only after BOTH the admin "Stripe Payment Successful" email and the
-- customer confirmation email have been sent for a paid order. Prevents duplicate
-- notification emails when Stripe redelivers webhook events.

ALTER TABLE orders ADD COLUMN IF NOT EXISTS stripe_email_sent BOOLEAN NOT NULL DEFAULT FALSE;
