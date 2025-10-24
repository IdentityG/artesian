'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { LucideLinkedin, LucideTwitter, LucideMail } from 'lucide-react'

const AboutTeam = () => {
  const team = [
    {
      name: 'Dawit Mengistu',
      role: 'Founder & CEO',
      image: 'https://i.pravatar.cc/400?img=12',
      bio: 'Passionate about connecting Ethiopian artisans with global markets.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'dawit@artesian.et',
      },
    },
    {
      name: 'Tigist Assefa',
      role: 'Head of Artisan Relations',
      image: 'https://i.pravatar.cc/400?img=5',
      bio: 'Dedicated to empowering artisans and preserving cultural heritage.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'tigist@artesian.et',
      },
    },
    {
      name: 'Samuel Tadesse',
      role: 'Chief Technology Officer',
      image: 'https://i.pravatar.cc/400?img=14',
      bio: 'Building innovative solutions to showcase Ethiopian craftsmanship.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'samuel@artesian.et',
      },
    },
    {
      name: 'Marta Bekele',
      role: 'Head of Operations',
      image: 'https://i.pravatar.cc/400?img=9',
      bio: 'Ensuring seamless experiences for artisans and customers alike.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'marta@artesian.et',
      },
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dedicated professionals working to preserve Ethiopian heritage and 
            empower artisans across the country.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Social Links */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={member.social.linkedin}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
                    >
                      <LucideLinkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
                    >
                      <LucideTwitter className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
                    >
                      <LucideMail className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutTeam