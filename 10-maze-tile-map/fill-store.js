// Shared state for prompt fill-in boxes (components/Ph.vue) and word banks (components/Bank.vue).
// activeBlank: the text box the student clicked last, so a word-bank click can drop the word into it.
import { shallowRef } from 'vue'

export const activeBlank = shallowRef(null) // { page: number, append(word: string) }
