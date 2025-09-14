"""Extract links and render first-page thumbnails for PDFs.
Produces: ../src/assets/selfhelp/{pdfname}.png and a json mapping at ../src/assets/selfhelp/resources_from_pdfs.json
Requires: pip install pymupdf
"""
import sys
from pathlib import Path
import fitz
import json
import re

ROOT = Path(__file__).resolve().parent.parent
PDF_DIR = ROOT
OUT_DIR = ROOT / 'src' / 'assets' / 'selfhelp'
OUT_DIR.mkdir(parents=True, exist_ok=True)

PDFS = [
    PDF_DIR / 'nivi_resouces_vidio.pdf',
    PDF_DIR / 'nivi_audio.pdf',
    PDF_DIR / 'nivi_artical.pdf'
]

link_re = re.compile(r"https?://[^\s)\]\>\"']+")

results = {}

for pdf in PDFS:
    try:
        if not pdf.exists():
            print(f"Missing: {pdf}")
            continue
        name = pdf.stem
        print(f"Processing {pdf.name}")
        doc = fitz.open(str(pdf))
        if doc.page_count == 0:
            print(f"Empty PDF: {pdf}")
            continue
        # render first page
        page = doc.load_page(0)
        pix = page.get_pixmap(dpi=150)
        out_png = OUT_DIR / f"{name}.png"
        pix.save(str(out_png))
        # extract text links from entire doc
        text = "".join([doc.load_page(i).get_text() for i in range(doc.page_count)])
        links = link_re.findall(text)
        # also try to extract uri links from annotations
        ann_links = []
        for pno in range(len(doc)):
            page = doc.load_page(pno)
            for annot in page.annots() or []:
                try:
                    uri = annot.get_uri()
                    if uri:
                        ann_links.append(uri)
                except Exception:
                    pass
        all_links = list(dict.fromkeys(links + ann_links))
        results[name] = {
            'pdf': str(pdf),
            'thumbnail': str(out_png),
            'links': all_links
        }
        print(f"Wrote thumbnail: {out_png} and found {len(all_links)} links")
    except Exception as e:
        print(f"Error processing {pdf}: {e}")

out_json = OUT_DIR / 'resources_from_pdfs.json'
with out_json.open('w', encoding='utf-8') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print('Done. Wrote', out_json)
