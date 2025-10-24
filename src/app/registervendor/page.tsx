import React from 'react'
import VendorRegisterPage from '../(auth)/vendor-register/page'

export const metadata = {
  title: 'Become Vendor | Artesian',
  description: 'Register and become vendor. We\'re here to help with any questions about our Ethiopian handmade crafts marketplace.',
}

const page = () => {
  return (
    <div>
        <VendorRegisterPage />
    </div>
  )
}

export default page