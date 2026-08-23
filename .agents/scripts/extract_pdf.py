import fitz
import json

doc = fitz.open("attached_assets/Plantes_Medicinal_Africaines_1784378411074.pdf")
print(f"Pages: {doc.page_count}")
print(f"Metadata: {doc.metadata}")

all_text = []
for i, page in enumerate(doc):
    text = page.get_text("text")
    all_text.append(f"\n=== PAGE {i+1} ===\n{text}")

full = "\n".join(all_text)
with open(".agents/outputs/pdf_text.txt", "w") as f:
    f.write(full)

print(full[:8000])
