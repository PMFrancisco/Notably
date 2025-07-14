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

// Function to copy directory recursively with exclusions
function copyDir(src, dest, excludeFiles = []) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    // Skip excluded files
    if (excludeFiles.includes(entry.name)) {
      console.log(`⏭️  Skipped ${entry.name} (not needed for this browser)`);
      continue;
    }
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, excludeFiles);
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
  
  // Define files to exclude based on browser
  const excludeFiles = [
    'manifest.json',          // Generic manifest (we'll copy the specific one)
    'manifest-chrome.json',   // Chrome-specific manifest
    'manifest-firefox.json'   // Firefox-specific manifest
  ];
  
  if (browser === 'chrome') {
    // Chrome doesn't need background.html
    excludeFiles.push('background.html');
  }
  
  // Copy all contents from dist, excluding unnecessary files
  copyDir('dist', distDir, excludeFiles);
  
  // Copy the correct manifest as manifest.json
  const manifestSrc = `public/manifest-${browser}.json`;
  const manifestDest = `${distDir}/manifest.json`;
  
  if (fs.existsSync(manifestSrc)) {
    copyFile(manifestSrc, manifestDest);
  } else {
    console.error(`❌ Manifest file not found: ${manifestSrc}`);
    process.exit(1);
  }
  
  // For Firefox, copy background.html if it doesn't already exist
  if (browser === 'firefox') {
    const backgroundSrc = 'public/background.html';
    const backgroundDest = `${distDir}/background.html`;
    
    if (fs.existsSync(backgroundSrc) && !fs.existsSync(backgroundDest)) {
      copyFile(backgroundSrc, backgroundDest);
    }
  }
  
  console.log(`✅ Build for ${browser} completed in ${distDir}/`);
  
  // Show summary of files in build
  const files = fs.readdirSync(distDir);
  const jsFiles = files.filter(f => f.endsWith('.js')).length;
  const totalFiles = files.length;
  console.log(`📊 ${totalFiles} files total (${jsFiles} JS files)`);
}

// Main function
function main() {
  console.log('🚀 Building optimized cross-browser extension...');
  
  // Check that the base dist directory exists
  if (!fs.existsSync('dist')) {
    console.error('❌ dist directory not found. Run npm run build first.');
    process.exit(1);
  }
  
  // Build for each browser
  buildForBrowser('chrome');
  buildForBrowser('firefox');
  
  console.log('\n🎉 Optimized cross-browser build completed!');
  console.log('📁 Chrome build: dist-chrome/ (optimized for Chrome)');
  console.log('📁 Firefox build: dist-firefox/ (optimized for Firefox)');
  console.log('\n💡 Each build now contains only the files needed for that browser.');
  console.log('🧹 Removed unnecessary manifest files from each build.');
}

main(); 