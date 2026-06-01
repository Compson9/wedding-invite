export {};

declare global {
  interface Window {
    __weddingStartMusic?: () => void;
    __weddingHeroReveal?: () => void;
  }
}
