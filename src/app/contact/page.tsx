import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'
import ContactFAQ from '@/components/contact/ContactFAQ'
import ContactMap from '@/components/contact/ContactMap'

export const metadata = {
  title: 'Contact Us | Artesian',
  description: 'Get in touch with Artesian. We\'re here to help with any questions about our Ethiopian handmade crafts marketplace.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactFAQ />
      <ContactMap />
    </>
  )
}