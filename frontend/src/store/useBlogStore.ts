import { create } from 'zustand'
import type { Blog } from '../lib/utils'

interface blogStorePrope {
    blog: Blog | null,
    setBlog: (blog: Blog) => void
}

export const useBlogStore = create<blogStorePrope>((set) => ({
    blog: null,
    setBlog: (blog: Blog) => set(() => ({ blog })),
}))