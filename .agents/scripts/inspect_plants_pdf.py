import fitz, os, json
path='attached_assets/Plantes_Medicinal_Africaines_1784378411074.pdf'
doc=fitz.open(path)
print('pages', doc.page_count)
print('metadata', doc.metadata)
for i in range(min(doc.page_count, 8)):
    page=doc[i]
    pix=page.get_pixmap(matrix=fitz.Matrix(1.5,1.5), alpha=False)
    out=f'.agents/outputs/plants-page-{i+1}.png'
    pix.save(out)
    text=page.get_text('text')[:1800].replace('\n',' | ')
    print(f'PAGE {i+1}: {text}')
