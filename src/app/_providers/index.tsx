'use client'

import React from 'react'

import { AuthProvider } from '../_providers/Auth'
import { CartProvider } from '../_providers/Cart'
import { FavouritesProvider } from '../_providers/Favourites'
import { FilterProvider } from './Filter'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FilterProvider>
          <CartProvider>
            <FavouritesProvider>{children}</FavouritesProvider>
          </CartProvider>
        </FilterProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
