'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../_utilities/classValue'
import Image from 'next/image'

export const WobbleCard = ({
  children,
  containerClassName,
  className,
  backgroundImageSrc,
}: {
  children: React.ReactNode
  containerClassName?: string
  className?: string
  backgroundImageSrc?: string
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (clientX - (rect.left + rect.width / 2)) / 20
    const y = (clientY - (rect.top + rect.height / 2)) / 20
    setMousePosition({ x, y })
  }

  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      className={cn(
        'mx-auto w-full h-full relative rounded-2xl overflow-hidden',
        containerClassName,
      )}
      style={{
        position: 'relative',
        overflow: 'hidden',
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
          : 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)',
        transition: 'transform 0.1s ease-out',
      }}
    >
      {backgroundImageSrc && (
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black contrast-75">
          <Image
            src={backgroundImageSrc}
            alt="Background"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
          />
        </div>
      )}
      <div
        className={cn('relative z-10 h-full w-full flex justify-center items-center', className)}
      >
        {children}
      </div>
    </motion.section>
  )
}
