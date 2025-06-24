#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Función para copiar archivos
function copyFile(src, dest) {
  fs.copyFileSync(src, dest);
  console.log(`✓ Copied ${src} to ${dest}`);
}

// Función para crear directorio si no existe
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Función para copiar directorio recursivamente
function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function buildForBrowser(browser) {
  console.log(`\n🔨 Building for ${browser}...`);
  
  const distDir = `dist-${browser}`;
  
  // Limpiar directorio de destino
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true });
  }
  
  // Copiar todo el contenido de dist
  copyDir('dist', distDir);
  
  // Copiar el manifest específico
  const manifestSrc = `public/manifest-${browser}.json`;
  const manifestDest = `${distDir}/manifest.json`;
  
  copyFile(manifestSrc, manifestDest);
  
  // Para Firefox, también copiar background.html
  if (browser === 'firefox') {
    copyFile('public/background.html', `${distDir}/background.html`);
  }
  
  console.log(`✅ Build for ${browser} completed in ${distDir}/`);
}

// Función principal
function main() {
  console.log('🚀 Building cross-browser extension...');
  
  // Verificar que existe el directorio dist base
  if (!fs.existsSync('dist')) {
    console.error('❌ dist directory not found. Run npm run build first.');
    process.exit(1);
  }
  
  // Build para cada navegador
  buildForBrowser('chrome');
  buildForBrowser('firefox');
  
  console.log('\n🎉 Cross-browser build completed!');
  console.log('📁 Chrome build: dist-chrome/');
  console.log('📁 Firefox build: dist-firefox/');
}

main(); 