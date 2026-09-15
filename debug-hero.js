const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

    // Wait a second for animations
    await new Promise(r => setTimeout(r, 1000));

    const imageData = await page.evaluate(() => {
      const img = document.querySelector('img[alt*="berliner"]');
      if (!img) return { found: false };
      
      const rect = img.getBoundingClientRect();
      const compStyles = window.getComputedStyle(img);
      
      // Let's also check the parents
      let parents = [];
      let current = img.parentElement;
      while (current && current.tagName !== 'BODY') {
        const style = window.getComputedStyle(current);
        const prect = current.getBoundingClientRect();
        parents.push({
          tag: current.tagName,
          className: current.className,
          rect: { width: prect.width, height: prect.height, x: prect.x, y: prect.y },
          clipPath: style.clipPath,
          opacity: style.opacity,
          position: style.position,
          transform: style.transform,
          display: style.display,
          visibility: style.visibility
        });
        current = current.parentElement;
      }
      
      return {
        found: true,
        src: img.src,
        rect: { width: rect.width, height: rect.height, x: rect.x, y: rect.y },
        opacity: compStyles.opacity,
        display: compStyles.display,
        visibility: compStyles.visibility,
        position: compStyles.position,
        clipPath: compStyles.clipPath,
        transform: compStyles.transform,
        parents
      };
    });
    
    console.log(JSON.stringify(imageData, null, 2));
    await browser.close();
  } catch(e) {
    console.error(e);
  }
})();
