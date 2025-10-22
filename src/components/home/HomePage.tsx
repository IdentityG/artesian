import Hero from './Hero'
import Categories from './Categories'
import FeaturedProducts from './FeaturedProducts'
import HowItWorks from './HowItWorks'
import FeaturedVendors from './FeaturedVendors'
import Testimonials from './Testimonials'
import Newsletter from './Newsletter'

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <HowItWorks />
      <FeaturedVendors />
      <Testimonials />
      <Newsletter />
    </main>
  )
}

export default HomePage