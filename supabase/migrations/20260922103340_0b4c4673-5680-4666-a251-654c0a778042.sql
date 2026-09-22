CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  service TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_contact_messages_created_at ON public.contact_messages (created_at DESC);
CREATE INDEX idx_contact_messages_email ON public.contact_messages (email);
CREATE INDEX idx_contact_messages_status ON public.contact_messages (status);

GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_contact_messages_updated_at
BEFORE UPDATE ON public.contact_messages
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.rate_limit_hits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bucket TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_rate_limit_hits_bucket_created ON public.rate_limit_hits (bucket, created_at DESC);

GRANT ALL ON public.rate_limit_hits TO service_role;
ALTER TABLE public.rate_limit_hits ENABLE ROW LEVEL SECURITY;