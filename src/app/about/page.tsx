import AboutHero from '@/components/about/AboutHero'
import AboutMission from '@/components/about/AboutMission'
import AboutValues from '@/components/about/AboutValues'
import AboutTeam from '@/components/about/AboutTeam'
import AboutStats from '@/components/about/AboutStats'
import AboutCTA from '@/components/about/AboutCTA'

export const metadata = {
  title: 'About Us | Artesian',
  description: 'Learn about Artesian - Ethiopia\'s premier online marketplace for authentic handmade crafts and traditional artworks.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutStats />
      <AboutValues />
      <AboutTeam />
      <AboutCTA />
    </>
  )
}