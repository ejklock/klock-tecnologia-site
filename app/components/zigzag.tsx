import Image from 'next/image'

import FeatImage01 from '@/public/images/features-03-image-01.png'
import FeatImage02 from '@/public/images/features-03-image-02.png'
import FeatImage03 from '@/public/images/features-03-image-03.png'

export default function Zigzag() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
          
            <h1 className="h2 mb-4">Outsourcing</h1>
            <p className="text-xl text-gray-400">Também locamos nossos especialistas para atender a sua necessidade</p>
          </div>

       
        </div>
      </div>
    </section>
  )
}
