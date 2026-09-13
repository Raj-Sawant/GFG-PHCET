import pymupdf
import os

doc = pymupdf.open('ilovepdf_merged.pdf')
print("Total pages:", len(doc))

os.makedirs('extracted_members', exist_ok=True)

for i, page in enumerate(doc):
    imgs = page.get_images(full=True)
    text = page.get_text().replace('\n', ' ').strip()
    print(f"Page {i+1}: text preview: {text[:60]}")
    for j, img_info in enumerate(imgs):
        xref = img_info[0]
        base_img = doc.extract_image(xref)
        ext = base_img["ext"]
        w = base_img["width"]
        h = base_img["height"]
        size = len(base_img["image"])
        print(f"   img {j+1}: xref={xref}, ext={ext}, {w}x{h}, size={size}")
