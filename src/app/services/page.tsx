'use client'

import NavSwiss from '@/components/sections/NavSwiss'
import ServicesSwiss from '@/components/sections/ServicesSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'

export default function ServicesPage() {
  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
      <NavSwiss />
      <ServicesSwiss />
      <FooterSwiss />
    </div>
  )
} 