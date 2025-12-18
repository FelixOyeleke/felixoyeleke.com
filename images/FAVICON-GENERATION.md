# Favicon Generation Instructions

## Required Favicon Files

The website references the following favicon files that need to be generated from `profile-picture.jpg`:

### Files to Create:
1. **favicon-16x16.png** - 16x16 pixels
2. **favicon-32x32.png** - 32x32 pixels
3. **apple-touch-icon.png** - 180x180 pixels
4. **android-chrome-192x192.png** - 192x192 pixels
5. **android-chrome-512x512.png** - 512x512 pixels
6. **favicon.ico** - Multi-size ICO file (16x16, 32x32, 48x48)

## How to Generate

### Option 1: Using Online Tool (Recommended)
1. Visit https://realfavicongenerator.net/
2. Upload `profile-picture.jpg`
3. Configure settings:
   - iOS: Use 180x180 for apple-touch-icon
   - Android: Use 192x192 and 512x512
   - Windows: Use default settings
   - Favicon: Generate all sizes
4. Download the package
5. Extract files to the `/images/` directory

### Option 2: Using ImageMagick (Command Line)
```bash
# Install ImageMagick first
# On macOS: brew install imagemagick
# On Ubuntu: sudo apt-get install imagemagick

# Navigate to images directory
cd images

# Generate PNG favicons
convert profile-picture.jpg -resize 16x16 favicon-16x16.png
convert profile-picture.jpg -resize 32x32 favicon-32x32.png
convert profile-picture.jpg -resize 180x180 apple-touch-icon.png
convert profile-picture.jpg -resize 192x192 android-chrome-192x192.png
convert profile-picture.jpg -resize 512x512 android-chrome-512x512.png

# Generate ICO file (multi-size)
convert profile-picture.jpg -resize 16x16 -resize 32x32 -resize 48x48 favicon.ico
```

### Option 3: Using Photoshop/GIMP
1. Open `profile-picture.jpg`
2. For each size:
   - Resize image to target dimensions
   - Export as PNG with transparency (if needed)
   - Save with appropriate filename
3. For favicon.ico, use a plugin or online converter

## Verification

After generating the files, verify they exist:
- [ ] /images/favicon-16x16.png
- [ ] /images/favicon-32x32.png
- [ ] /images/apple-touch-icon.png
- [ ] /images/android-chrome-192x192.png
- [ ] /images/android-chrome-512x512.png
- [ ] /favicon.ico (optional, in root directory)

## Testing

Test favicons on:
1. Desktop browsers (Chrome, Firefox, Safari, Edge)
2. Mobile browsers (iOS Safari, Android Chrome)
3. When adding to home screen on mobile
4. In browser tabs and bookmarks

## Notes

- The current `profile-picture.jpg` is used as a fallback
- PNG files should have transparent backgrounds if the source allows
- ICO file is optional but recommended for older browsers
- All files should be optimized for web (compressed)

