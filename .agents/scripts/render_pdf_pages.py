import fitz
import os

doc = fitz.open("attached_assets/Plantes_Medicinal_Africaines_1784378411074.pdf")
os.makedirs(".agents/outputs/pages", exist_ok=True)

# Render key pages with plant content (2 per batch to check structure)
# Render pages 9-13 (intro + table of contents area), then plant pages
target_pages = list(range(8, 16)) + list(range(17, 30)) + list(range(33, 55)) + list(range(57, 80)) + list(range(80, 110)) + list(range(110, 140))

for page_num in target_pages:
    if page_num < doc.page_count:
        page = doc[page_num]
        mat = fitz.Matrix(2.0, 2.0)  # 144 DPI
        pix = page.get_pixmap(matrix=mat)
        out_path = f".agents/outputs/pages/page_{page_num+1:03d}.png"
        pix.save(out_path)

print(f"Rendered {len(target_pages)} pages")
print("Done")
