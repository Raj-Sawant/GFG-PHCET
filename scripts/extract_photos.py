import pymupdf
import os

os.makedirs('public/assets/members', exist_ok=True)
doc = pymupdf.open('ilovepdf_merged.pdf')

page_to_slug = {
    0: 'raj-sawant',
    1: 'vaishvani-sutar',
    2: 'sanvi-mhatre',
    3: 'isha-kondilkar',
    4: 'shlok-pandit',
    5: 'sanskar-panchal',
    6: 'tejas-patil',
    7: 'aarya-bhoir',
    8: 'anushka-gharat',
    9: 'aarya-mahesh-patil',
    10: 'vedant-patil',
    11: 'shruti-pawar',
    12: 'pramod-gholve',
    13: 'ramola-lade',
    14: 'atharv-chavan',
    15: 'saloni-agalawe',
    16: 'siliviya-vellappan',
    17: 'aditya-mahajan',
    18: 'sharwari-shinde'
}

for page_num, slug in page_to_slug.items():
    page = doc[page_num]
    imgs = page.get_images(full=True)
    portrait_candidates = []
    for img_info in imgs:
        xref = img_info[0]
        base_img = doc.extract_image(xref)
        w, h = base_img['width'], base_img['height']
        if (w, h) not in [(134, 299), (522, 1054), (1072, 1073)]:
            portrait_candidates.append((xref, base_img))
    
    if portrait_candidates:
        # Sort by size descending if multiple
        portrait_candidates.sort(key=lambda x: len(x[1]['image']), reverse=True)
        best_xref, best_img = portrait_candidates[0]
        ext = best_img['ext']
        filename = f"{slug}.{ext}"
        filepath = os.path.join('public/assets/members', filename)
        with open(filepath, 'wb') as f:
            f.write(best_img['image'])
        print(f"Extracted {slug}: {filename} ({best_img['width']}x{best_img['height']}, {len(best_img['image'])} bytes)")
    else:
        print(f"WARNING: No candidate for {slug}")

print("Extraction completed!")
