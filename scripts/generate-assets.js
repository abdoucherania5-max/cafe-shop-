import fs from 'node:fs';
import path from 'node:path';

const images = [
  { name: 'hero.jpg', title: 'Slow Mornings at Lumière', sub: 'Artisanal Roasts & Floral Syrups', bg: ['#F5E3E6', '#FFF0F3', '#FFF7F5'], icon: 'coffee' },
  { name: 'about.jpg', title: 'Our Story & Heritage', sub: 'Female-Led Coffee Sanctuary', bg: ['#EED6DD', '#F9E2E8', '#FFF7F5'], icon: 'leaf' },
  { name: 'latte.jpg', title: 'Rose & Cardamom Latte', sub: 'Damask Rose & Velvet Oat', bg: ['#FAD8DF', '#FFF2F5', '#FFF7F5'], icon: 'cup' },
  { name: 'matcha.jpg', title: 'Ceremonial Matcha', sub: 'First Harvest Uji & Lavender', bg: ['#E3EEDC', '#F2F8EE', '#FFF7F5'], icon: 'tea' },
  { name: 'brioche.jpg', title: 'Pistachio Brioche Swirl', sub: 'Bronte Pistachio & Rose Water', bg: ['#F7DFD6', '#FFF3EE', '#FFF7F5'], icon: 'pastry' },
  { name: 'coldbrew.jpg', title: 'Vanilla Cold Brew', sub: '24hr Ethiopian & Bourbon Cream', bg: ['#E8D7DC', '#F6E6EB', '#FFF7F5'], icon: 'glass' },
  { name: 'cake.jpg', title: 'Lavender Tea Cake', sub: 'Almond Sponge & Meyer Glaze', bg: ['#EADBEC', '#F6ECF7', '#FFF7F5'], icon: 'cake' },
  { name: 'geisha.jpg', title: 'Hand-Dripped Pour-Over', sub: 'Kalita Wave Panama Geisha', bg: ['#F5E1DA', '#FFF1EC', '#FFF7F5'], icon: 'pourover' },
  { name: 'gallery-1.jpg', title: 'Morning Light in the Arches', sub: 'Corner Reading Nook', bg: ['#F7DEE5', '#FFF0F4', '#FFF7F5'], icon: 'arch' },
  { name: 'gallery-2.jpg', title: 'Fresh Heirloom Bakes', sub: 'Morning Viennoiserie Display', bg: ['#F8E0D7', '#FFF2EC', '#FFF7F5'], icon: 'pastry' },
  { name: 'gallery-3.jpg', title: 'The Marble Brew Bar', sub: 'Custom Modbar & Ceramics', bg: ['#E8D9DE', '#F8E9EE', '#FFF7F5'], icon: 'cup' },
  { name: 'gallery-4.jpg', title: 'Thursday Literary Salon', sub: 'Gathered Around Words & Tea', bg: ['#EBD9E2', '#F6EBF0', '#FFF7F5'], icon: 'book' },
  { name: 'gallery-5.jpg', title: 'Porcelain & Damask Petals', sub: 'Botanical Table Setting', bg: ['#FAD6DF', '#FFF1F5', '#FFF7F5'], icon: 'flower' },
  { name: 'gallery-6.jpg', title: 'Sunlit Window Banquette', sub: 'Linen Cushions & Quiet Music', bg: ['#F5DFE4', '#FFF3F6', '#FFF7F5'], icon: 'sun' },
  { name: 'gallery-7.jpg', title: 'Artisanal Single-Origin Beans', sub: 'Sourced from Women Farmers', bg: ['#EDD8DD', '#FAECF0', '#FFF7F5'], icon: 'leaf' },
  { name: 'gallery-8.jpg', title: 'Evening Candlelight Serenity', sub: 'Unhurried Hours & Acoustic Warmth', bg: ['#E8D0DB', '#F8E5EE', '#FFF7F5'], icon: 'sparkle' }
];

function getSvg(item) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 750" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_${item.name.replace(/[^a-z0-9]/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${item.bg[0]}" />
      <stop offset="50%" stop-color="${item.bg[1]}" />
      <stop offset="100%" stop-color="${item.bg[2]}" />
    </linearGradient>
    <radialGradient id="sun_${item.name.replace(/[^a-z0-9]/g, '')}" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85" />
      <stop offset="60%" stop-color="#FFF7F5" stop-opacity="0.3" />
      <stop offset="100%" stop-color="${item.bg[0]}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg_${item.name.replace(/[^a-z0-9]/g, '')})" />
  <circle cx="500" cy="340" r="280" fill="url(#sun_${item.name.replace(/[^a-z0-9]/g, '')})" />
  
  <!-- Subtle decorative arch -->
  <path d="M 280 620 L 280 320 A 220 220 0 0 1 720 320 L 720 620" fill="none" stroke="#F8DDE3" stroke-width="2" stroke-dasharray="6,6" opacity="0.8"/>
  <circle cx="500" cy="180" r="14" fill="none" stroke="#B08D57" stroke-width="1.5" opacity="0.7"/>

  <!-- Icon Graphics -->
  <g transform="translate(450, 240) scale(1.6)" stroke="#B08D57" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 20 C8 42, 54 42, 54 20 L54 6 L8 6 Z" fill="rgba(248, 221, 227, 0.45)" />
    <path d="M54 11 C62 11, 67 15, 67 22 C67 29, 61 33, 54 33" />
    <path d="M3 46 L59 46" stroke-width="2.2" />
    <path d="M21 0 C21 -4, 24 -7, 21 -11" stroke-width="1.4" opacity="0.7"/>
    <path d="M31 0 C31 -5, 34 -9, 31 -13" stroke-width="1.4" opacity="0.85"/>
    <path d="M41 0 C41 -4, 44 -7, 41 -11" stroke-width="1.4" opacity="0.7"/>
  </g>

  <!-- Typography -->
  <text x="500" y="470" font-family="'Cormorant Garamond', Georgia, serif" font-size="34" font-weight="600" font-style="italic" fill="#4A2C3B" text-anchor="middle" letter-spacing="1">${item.title}</text>
  <text x="500" y="508" font-family="'Jost', sans-serif" font-size="15" font-weight="300" fill="#7A5568" text-anchor="middle" letter-spacing="2">${item.sub}</text>
  <line x1="430" y1="535" x2="570" y2="535" stroke="#B08D57" stroke-width="1" opacity="0.5"/>
  <text x="500" y="565" font-family="'Jost', sans-serif" font-size="11" font-weight="400" text-transform="uppercase" fill="#B08D57" text-anchor="middle" letter-spacing="4">LUMIÈRE CAFÉ · BOUTIQUE ROASTERS</text>
</svg>`;
}

for (const dir of ['images', 'public/images']) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  for (const item of images) {
    const filePath = path.join(dir, item.name);
    fs.writeFileSync(filePath, getSvg(item));
  }
}

console.log('Successfully generated placeholder assets for Lumière Café.');
