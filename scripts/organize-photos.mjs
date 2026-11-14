import fs from 'node:fs';
import path from 'node:path';

const srcFolder = 'WhatsApp Unknown 2026-11-14 at 12.01.42 PM';
const files = fs.readdirSync(srcFolder).sort();
const uploadsFolder = 'local_uploads';

const mapping = [
  // Home
  { src: path.join(srcFolder, files[8]), dest: 'organized_photos/museum/home/hero.jpeg', publicId: 'museum/home/hero', title: 'Exhibition Entrance - Broadcasting House' },

  // Zone 1
  { src: path.join(srcFolder, files[18]), dest: 'organized_photos/museum/zone-1/ashokan-edicts/ashokan-edict.jpeg', publicId: 'museum/zone-1/ashokan-edicts/ashokan-edict', title: 'Ashokan Pillar Edict (Brahmi script)' },
  { src: path.join(srcFolder, files[33]), dest: 'organized_photos/museum/zone-1/ashokan-edicts/tile.jpeg', publicId: 'museum/zone-1/ashokan-edicts/tile', title: 'Ashokan Inscriptions Tile' },

  { src: path.join(srcFolder, files[17]), dest: 'organized_photos/museum/zone-1/indus-seals/indus-seal.jpeg', publicId: 'museum/zone-1/indus-seals/indus-seal', title: 'Indus Valley Stamp Seals' },
  { src: path.join(srcFolder, files[17]), dest: 'organized_photos/museum/zone-1/indus-seals/tile.jpeg', publicId: 'museum/zone-1/indus-seals/tile', title: 'Indus Seals Tile' },

  { src: path.join(srcFolder, files[21]), dest: 'organized_photos/museum/zone-1/oral-traditions/oral-tradition.jpeg', publicId: 'museum/zone-1/oral-traditions/oral-tradition', title: 'Oral Tradition Storyteller with Scroll' },
  { src: path.join(srcFolder, files[19]), dest: 'organized_photos/museum/zone-1/oral-traditions/tile.jpeg', publicId: 'museum/zone-1/oral-traditions/tile', title: 'Oral Traditions Folk Performers Tile' },

  { src: path.join(srcFolder, files[26]), dest: 'organized_photos/museum/zone-1/postal-history/palm-leaf-manuscript.jpeg', publicId: 'museum/zone-1/postal-history/palm-leaf-manuscript', title: 'Palm-Leaf Manuscript' },
  { src: path.join(srcFolder, files[20]), dest: 'organized_photos/museum/zone-1/postal-history/dak-route-map.jpeg', publicId: 'museum/zone-1/postal-history/dak-route-map', title: '19th-Century Postal Routes and Relay Stations Map' },
  { src: path.join(srcFolder, files[22]), dest: 'organized_photos/museum/zone-1/postal-history/stamps.jpeg', publicId: 'museum/zone-1/postal-history/stamps', title: 'Historical Indian Postage Stamps' },
  { src: path.join(srcFolder, files[23]), dest: 'organized_photos/museum/zone-1/postal-history/sample-letter-and-envelope.jpeg', publicId: 'museum/zone-1/postal-history/sample-letter-and-envelope', title: 'James Wyld Post Roads and Dawk Stations Map' },
  { src: path.join(srcFolder, files[23]), dest: 'organized_photos/museum/zone-1/postal-history/tile.jpeg', publicId: 'museum/zone-1/postal-history/tile', title: 'Postal History Tile' },

  // Zone 2
  { src: path.join(srcFolder, files[25]), dest: 'organized_photos/museum/zone-2/printing/handwritten-and-printed-samples.jpeg', publicId: 'museum/zone-2/printing/handwritten-and-printed-samples', title: 'Development of the Printer and Goa Press 1556' },
  { src: path.join(srcFolder, files[6]), dest: 'organized_photos/museum/zone-2/printing/tile.jpeg', publicId: 'museum/zone-2/printing/tile', title: '19th-Century Printing Press Workshop Tile' },

  { src: path.join(srcFolder, files[24]), dest: 'organized_photos/museum/zone-2/newspapers/hickys-bengal-gazette.jpeg', publicId: 'museum/zone-2/newspapers/hickys-bengal-gazette', title: "Hicky's Bengal Gazette (1780)" },
  { src: path.join(srcFolder, files[24]), dest: 'organized_photos/museum/zone-2/newspapers/tile.jpeg', publicId: 'museum/zone-2/newspapers/tile', title: 'Newspapers Tile' },

  { src: path.join(srcFolder, files[29]), dest: 'organized_photos/museum/zone-2/telegraph/telegraph-diagram.jpeg', publicId: 'museum/zone-2/telegraph/telegraph-diagram', title: 'Vintage Morse Code Telegraph Key' },
  { src: path.join(srcFolder, files[28]), dest: 'organized_photos/museum/zone-2/telegraph/morse-code-chart.jpeg', publicId: 'museum/zone-2/telegraph/morse-code-chart', title: 'Morse Code Alphabet Chart' },
  { src: path.join(srcFolder, files[27]), dest: 'organized_photos/museum/zone-2/telegraph/tile.jpeg', publicId: 'museum/zone-2/telegraph/tile', title: 'Bombay Central Telegraph Office Tile' },

  { src: path.join(srcFolder, files[32]), dest: 'organized_photos/museum/zone-2/telephone/landline-telephone.jpeg', publicId: 'museum/zone-2/telephone/landline-telephone', title: 'Vintage Rotary Dial Landline Telephone' },
  { src: path.join(srcFolder, files[30]), dest: 'organized_photos/museum/zone-2/telephone/tile.jpeg', publicId: 'museum/zone-2/telephone/tile', title: 'Manual Telephone Exchange Operators Tile' },

  // Zone 3
  { src: path.join(srcFolder, files[9]), dest: 'organized_photos/museum/zone-3/radio/radio-model.jpeg', publicId: 'museum/zone-3/radio/radio-model', title: 'Vintage Wooden Radio Receiver (Ekco)' },
  { src: path.join(srcFolder, files[4]), dest: 'organized_photos/museum/zone-3/radio/tile.jpeg', publicId: 'museum/zone-3/radio/tile', title: 'Dr. Rajendra Prasad at AIR Studio Tile' },

  { src: path.join(srcFolder, files[15]), dest: 'organized_photos/museum/zone-3/television/television-model.jpeg', publicId: 'museum/zone-3/television/television-model', title: 'DD National Family Watching TV' },
  { src: path.join(srcFolder, files[3]), dest: 'organized_photos/museum/zone-3/television/tile.jpeg', publicId: 'museum/zone-3/television/tile', title: 'Doordarshan Community TV and Logo Tile' },

  { src: path.join(srcFolder, files[14]), dest: 'organized_photos/museum/zone-3/satellites/insat-satellite.jpeg', publicId: 'museum/zone-3/satellites/insat-satellite', title: 'INSAT-1 Satellite in Cleanroom' },
  { src: path.join(srcFolder, files[14]), dest: 'organized_photos/museum/zone-3/satellites/tile.jpeg', publicId: 'museum/zone-3/satellites/tile', title: 'INSAT Satellite Tile' },

  { src: path.join(uploadsFolder, 'network-world.jpg'), dest: 'organized_photos/museum/zone-3/digital-networks/phone-and-laptop.jpeg', publicId: 'museum/zone-3/digital-networks/phone-and-laptop', title: 'Connected Digital Globe' },
  { src: path.join(uploadsFolder, 'network-world.jpg'), dest: 'organized_photos/museum/zone-3/digital-networks/network-diagram.jpeg', publicId: 'museum/zone-3/digital-networks/network-diagram', title: 'Interconnected Digital Network Diagram' },
  { src: path.join(uploadsFolder, 'wikipedia-secrets.jpg'), dest: 'organized_photos/museum/zone-3/digital-networks/digital-information-examples.jpeg', publicId: 'museum/zone-3/digital-networks/digital-information-examples', title: 'Secret Information About Wikipedia' },
  { src: path.join(uploadsFolder, 'network-world.jpg'), dest: 'organized_photos/museum/zone-3/digital-networks/tile.jpeg', publicId: 'museum/zone-3/digital-networks/tile', title: 'Digital Networks Tile' },

  // Zone 4
  { src: path.join(srcFolder, files[17]), dest: 'organized_photos/museum/zone-4/activities/decode-the-symbol.jpeg', publicId: 'museum/zone-4/activities/decode-the-symbol', title: 'Decode the Symbol Activity' },
  { src: path.join(srcFolder, files[28]), dest: 'organized_photos/museum/zone-4/activities/crack-the-code.jpeg', publicId: 'museum/zone-4/activities/crack-the-code', title: 'Crack the Code Morse Activity' },
  { src: path.join(srcFolder, files[13]), dest: 'organized_photos/museum/zone-4/activities/which-source-would-you-trust.jpeg', publicId: 'museum/zone-4/activities/which-source-would-you-trust', title: 'Which Source Would You Trust? (Fake News TV)' },
  { src: path.join(uploadsFolder, 'network-world.jpg'), dest: 'organized_photos/museum/zone-4/activities/future-of-communication-wall.jpeg', publicId: 'museum/zone-4/activities/future-of-communication-wall', title: 'Future of Communication 2050 Wall' },
  { src: path.join(srcFolder, files[2]), dest: 'organized_photos/museum/zone-4/activities/tile.jpeg', publicId: 'museum/zone-4/activities/tile', title: 'Interactive Activities Tile (Google Lens Verification)' },

  // Zone 4 Truth Test screenshots
  { src: path.join(srcFolder, files[5]), dest: 'organized_photos/museum/zone-4/truth-test/pib-cst-demo.jpeg', publicId: 'museum/zone-4/truth-test/pib-cst-demo', title: 'PIB Fact Check Mumbai CST Platform' },
  { src: path.join(srcFolder, files[7]), dest: 'organized_photos/museum/zone-4/truth-test/boom-manipur-demo.jpeg', publicId: 'museum/zone-4/truth-test/boom-manipur-demo', title: 'BOOM Fact Check Manipur Weapon Claim' },
  { src: path.join(srcFolder, files[2]), dest: 'organized_photos/museum/zone-4/truth-test/reverse-search-demo.jpeg', publicId: 'museum/zone-4/truth-test/reverse-search-demo', title: 'Google Lens Reverse Search Demo' },
  { src: path.join(uploadsFolder, 'wikipedia-secrets.jpg'), dest: 'organized_photos/museum/zone-4/truth-test/wikipedia-demo.jpeg', publicId: 'museum/zone-4/truth-test/wikipedia-demo', title: 'Wikipedia Fact Checking and Neutrality' }
];

console.log('Organizing ' + mapping.length + ' photos into organized_photos folder...');
for (const item of mapping) {
  const dir = path.dirname(item.dest);
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(item.src, item.dest);
  console.log('Copied -> ' + item.dest);
}
fs.writeFileSync('organized_photos/mapping.json', JSON.stringify(mapping, null, 2));
console.log('Successfully organized all ' + mapping.length + ' photos!');
