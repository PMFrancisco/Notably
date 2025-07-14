#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Function to copy files
function copyFile(src, dest) {
  fs.copyFileSync(src, dest);
  console.log(`✓ Copied ${src} to ${dest}`);
}

// Function to create directory if it doesn't exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Function to copy directory recursively
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
  
  // Clean destination directory
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true });
  }
  
  // Copy all contents from dist
  copyDir('dist', distDir);
  
  // Copy the specific manifest
  const manifestSrc = `public/manifest-${browser}.json`;
  const manifestDest = `${distDir}/manifest.json`;
  
  copyFile(manifestSrc, manifestDest);
  
  // For Firefox, also copy background.html
  if (browser === 'firefox') {
    copyFile('public/background.html', `${distDir}/background.html`);
  }
  
  console.log(`✅ Build for ${browser} completed in ${distDir}/`);
}

// Main function
function main() {
  console.log('🚀 Building cross-browser extension...');
  
  // Check that the base dist directory exists
  if (!fs.existsSync('dist')) {
    console.error('❌ dist directory not found. Run npm run build first.');
    process.exit(1);
  }
  
  // Build for each browser
  buildForBrowser('chrome');
  buildForBrowser('firefox');
  
  console.log('\n🎉 Cross-browser build completed!');
  console.log('📁 Chrome build: dist-chrome/');
  console.log('📁 Firefox build: dist-firefox/');
}

main(); 