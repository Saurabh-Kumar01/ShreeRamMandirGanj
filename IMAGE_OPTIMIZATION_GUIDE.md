# Image Optimization Guide for Shree Ram Mandir Website

## Current Status
The website currently uses high-resolution images directly from a phone camera (IMG_20250421_*.jpg files). These images are likely 2-5 MB each, which can slow down page loading times.

## Recommended Actions

### 1. Image Compression
Use online tools or software to compress images without significant quality loss:

**Online Tools (Free):**
- **TinyPNG** (https://tinypng.com/) - Excellent for PNG and JPG compression
- **Squoosh** (https://squoosh.app/) - Google's image compression tool
- **Compressor.io** (https://compressor.io/) - Supports multiple formats

**Desktop Software:**
- **ImageOptim** (Mac) - Free, drag-and-drop compression
- **FileOptimizer** (Windows) - Free, batch processing
- **GIMP** (All platforms) - Free, manual optimization

### 2. Target File Sizes
- **Hero/Slider Images**: 200-400 KB (1920x1080 or smaller)
- **Gallery Thumbnails**: 50-100 KB (800x600 or smaller)
- **Header Icons**: 10-30 KB (already optimized: sankh.png, chakra.png)
- **Deity Images**: 100-200 KB (1200x1200 or smaller)

### 3. Recommended Image Formats
- **JPG/JPEG**: Best for photographs (temple photos, deity images)
- **PNG**: Best for graphics with transparency (icons, logos)
- **WebP**: Modern format with better compression (consider for future)

### 4. Responsive Images
Consider creating multiple sizes for different devices:
```html
<img 
  src="image-large.jpg" 
  srcset="image-small.jpg 480w, image-medium.jpg 800w, image-large.jpg 1200w"
  sizes="(max-width: 600px) 480px, (max-width: 1000px) 800px, 1200px"
  alt="Description"
/>
```

### 5. Lazy Loading
Already implemented via JavaScript, but can be enhanced with native lazy loading:
```html
<img src="image.jpg" loading="lazy" alt="Description" />
```

### 6. Batch Processing Steps

**For Windows (using FileOptimizer):**
1. Download FileOptimizer from https://sourceforge.net/projects/nikkhokkho/
2. Select all images in the `images/` folder
3. Drag and drop into FileOptimizer
4. Wait for optimization to complete
5. Backup originals before replacing

**For Mac (using ImageOptim):**
1. Download ImageOptim from https://imageoptim.com/
2. Drag the entire `images/` folder into ImageOptim
3. It will automatically optimize all images
4. Original files are replaced (make backups first!)

**For Online (using TinyPNG):**
1. Visit https://tinypng.com/
2. Upload up to 20 images at once (max 5MB each)
3. Download the compressed versions
4. Replace original files

### 7. Priority Order
1. **High Priority**: Slider images (most visible, loaded first)
   - `images/image.jpg`
   - `images/slider/temple-interior.jpg`
   - `images/slider/temple-festival.jpg`
   - `images/IMG_20250421_095043088_AE.jpg`
   - `images/IMG_20250421_095447765_AE.jpg`
   - `images/IMG_20250421_095644965_HDR_AE.jpg`

2. **Medium Priority**: Gallery images (loaded on gallery page)
   - All `images/IMG_20250421_*.jpg` files

3. **Low Priority**: Already optimized
   - `images/sankh.png` (likely already small)
   - `images/chakra.png` (likely already small)
   - `images/ShreeRamChandraJee.jpg` (check size)

### 8. Performance Testing
After optimization, test page load speed:
- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpagetest.org/

### 9. Expected Results
- **Before**: 10-20 MB total page size, 5-10 second load time
- **After**: 2-4 MB total page size, 1-3 second load time
- **Improvement**: 60-80% reduction in page size

### 10. Backup Reminder
⚠️ **IMPORTANT**: Always keep backup copies of original images before optimization!

Create a backup folder:
```
images_backup/
  ├── All original high-resolution images
```

## Implementation Checklist
- [ ] Backup all original images to `images_backup/` folder
- [ ] Compress slider images (6 images)
- [ ] Compress gallery images (17 images)
- [ ] Test website loading speed
- [ ] Verify image quality is acceptable
- [ ] Add native lazy loading to all images
- [ ] Consider WebP format for future updates

## Notes
- The current images are from April 2025 (IMG_20250421_*.jpg)
- Total images to optimize: ~23 files
- Estimated time: 30-60 minutes for manual optimization
- Estimated time: 5-10 minutes with batch tools

