import { create } from 'zustand';

interface MarkdownState {
  markdown: string;
  setMarkdown: (markdown: string) => void;
  formattedText: string;
  setFormattedText: (text: string) => void;
}

export const useMarkdownStore = create<MarkdownState>((set) => ({
  markdown: '',
  setMarkdown: (markdown) => set({ markdown }),
  formattedText: '',
  setFormattedText: (text) => set({ formattedText: text }),
}));
