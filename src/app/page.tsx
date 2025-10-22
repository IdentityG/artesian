import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/shared/ScrollToTop'
import Hero from '@/components/home/Hero'
import Categories from '@/components/home/Categories'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import HowItWorks from '@/components/home/HowItWorks'
import FeaturedVendors from '@/components/home/FeaturedVendors'
import Testimonials from '@/components/home/Testimonials'
import Newsletter from '@/components/home/Newsletter'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <HowItWorks />
        <FeaturedVendors />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}