import { create } from 'zustand'
import type { PropertyFull } from '../lib/types'

interface propertyStoreProp {
    property: PropertyFull | null,
    setProperty: (property: PropertyFull) => void
}

export const propertyStore = create<propertyStoreProp>((set) => ({
    property: null,
    setProperty: (property: PropertyFull) => set(() => ({ property })),
}))