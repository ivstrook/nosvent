const message = "ログインメッセージ"; // 署名するメッセージ

async window.nostr.getPublicKey(): string // returns a public key as hex
async window.nostr.signEvent(event: { created_at: number, kind: number, tags: string[][], content: string }): Event // takes an event object, adds `id`, `pubkey` and `sig` and returns it
// returns a basic map of relay urls to relay policies
async window.nostr.getRelays(): { [url: string]: {read: boolean, write: boolean} }
// returns ciphertext and iv as specified in nip-04
async window.nostr.nip04.encrypt(pubkey, plaintext): string
// takes ciphertext and iv as specified in nip-04
async window.nostr.nip04.decrypt(pubkey, ciphertext): string
// returns ciphertext as specified in nip-44
async window.nostr.nip44.encrypt(pubkey, plaintext): string
// takes ciphertext as specified in nip-44
async window.nostr.nip44.decrypt(pubkey, ciphertext): string