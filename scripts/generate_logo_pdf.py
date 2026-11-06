import pymupdf

def create_logo_pdf(output_paths):
    # Create document
    doc = pymupdf.open()
    
    # Standard A4: 595 x 842 points
    page_w, page_h = 595, 842
    page = doc.new_page(width=page_w, height=page_h)
    
    # Fill background with pure obsidian #000000
    bg_rect = pymupdf.Rect(0, 0, page_w, page_h)
    page.draw_rect(bg_rect, color=None, fill=(0, 0, 0))
    
    # Outer margin border
    margin_rect = pymupdf.Rect(32, 32, page_w - 32, page_h - 32)
    page.draw_rect(margin_rect, color=(0.15, 0.15, 0.15), width=1)
    
    # Header Information
    page.insert_text(
        (56, 72),
        "VELAGAPUDI MAHENDRA",
        fontsize=16,
        fontname="helv",
        color=(1, 1, 1),
    )
    page.insert_text(
        (56, 88),
        "X-01 FOLIO · ARCHITECTURAL VECTOR LOGO SPECIFICATION",
        fontsize=9,
        fontname="cour",
        color=(0.6, 0.6, 0.6),
    )
    
    # Divider line
    page.draw_line(
        pymupdf.Point(56, 104),
        pymupdf.Point(page_w - 56, 104),
        color=(0.15, 0.15, 0.15),
        width=1,
    )
    
    # -------------------------------------------------------------
    # SECTION 1: PRIMARY DARK VARIANT (THE OFFICIAL EMBLEM)
    # -------------------------------------------------------------
    page.insert_text(
        (56, 130),
        "01 / PRIMARY EMBLEM (DARK CANVAS)",
        fontsize=10,
        fontname="cour",
        color=(0.7, 0.7, 0.7),
    )
    
    # Dark showcase container
    dark_box = pymupdf.Rect(56, 144, 56 + 230, 144 + 230)
    page.draw_rect(dark_box, color=(0.15, 0.15, 0.15), fill=(0.094, 0.094, 0.094), width=1)
    
    # Draw logo symbol inside dark showcase
    # Symbol center: (171, 245), size approx 120x120
    cx, cy = 171, 245
    s = 120
    half = s / 2
    logo_rect = pymupdf.Rect(cx - half, cy - half, cx + half, cy + half)
    page.draw_rect(logo_rect, color=(0.2, 0.2, 0.2), fill=(0.07, 0.07, 0.07), width=2)
    
    # Left pillar path: M8 23V9L13.5 17L16 13.5 mapped to coordinates
    def map_pt(x, y):
        rx = (x - 1) / 30.0
        ry = (y - 1) / 30.0
        return pymupdf.Point(logo_rect.x0 + rx * s, logo_rect.y0 + ry * s)
    
    # Draw Left Pillar
    p1 = map_pt(8, 23)
    p2 = map_pt(8, 9)
    p3 = map_pt(13.5, 17)
    p4 = map_pt(16, 13.5)
    page.draw_line(p1, p2, color=(1, 1, 1), width=5)
    page.draw_line(p2, p3, color=(1, 1, 1), width=5)
    page.draw_line(p3, p4, color=(1, 1, 1), width=5)
    
    # Draw Right Pillar
    p5 = map_pt(24, 23)
    p6 = map_pt(24, 9)
    p7 = map_pt(18.5, 17)
    page.draw_line(p5, p6, color=(1, 1, 1), width=5)
    page.draw_line(p6, p7, color=(1, 1, 1), width=5)
    page.draw_line(p7, p4, color=(1, 1, 1), width=5)
    
    # Center node
    page.draw_circle(p4, 4, color=(1, 1, 1), fill=(1, 1, 1))
    
    # Baseline bar
    p_base1 = map_pt(11, 23)
    p_base2 = map_pt(21, 23)
    page.draw_line(p_base1, p_base2, color=(0.6, 0.6, 0.6), width=3.5)
    
    # -------------------------------------------------------------
    # SECTION 2: LIGHT INVERTED VARIANT
    # -------------------------------------------------------------
    page.insert_text(
        (308, 130),
        "02 / INVERTED EMBLEM (LIGHT CANVAS)",
        fontsize=10,
        fontname="cour",
        color=(0.7, 0.7, 0.7),
    )
    
    light_box = pymupdf.Rect(308, 144, 308 + 230, 144 + 230)
    page.draw_rect(light_box, color=(0.8, 0.8, 0.8), fill=(1, 1, 1), width=1)
    
    cx2, cy2 = 423, 245
    logo_rect2 = pymupdf.Rect(cx2 - half, cy2 - half, cx2 + half, cy2 + half)
    page.draw_rect(logo_rect2, color=(0.85, 0.85, 0.85), fill=(0.95, 0.95, 0.95), width=2)
    
    def map_pt2(x, y):
        rx = (x - 1) / 30.0
        ry = (y - 1) / 30.0
        return pymupdf.Point(logo_rect2.x0 + rx * s, logo_rect2.y0 + ry * s)
        
    p1_l = map_pt2(8, 23)
    p2_l = map_pt2(8, 9)
    p3_l = map_pt2(13.5, 17)
    p4_l = map_pt2(16, 13.5)
    page.draw_line(p1_l, p2_l, color=(0, 0, 0), width=5)
    page.draw_line(p2_l, p3_l, color=(0, 0, 0), width=5)
    page.draw_line(p3_l, p4_l, color=(0, 0, 0), width=5)
    
    p5_l = map_pt2(24, 23)
    p6_l = map_pt2(24, 9)
    p7_l = map_pt2(18.5, 17)
    page.draw_line(p5_l, p6_l, color=(0, 0, 0), width=5)
    page.draw_line(p6_l, p7_l, color=(0, 0, 0), width=5)
    page.draw_line(p7_l, p4_l, color=(0, 0, 0), width=5)
    
    page.draw_circle(p4_l, 4, color=(0, 0, 0), fill=(0, 0, 0))
    
    p_base1_l = map_pt2(11, 23)
    p_base2_l = map_pt2(21, 23)
    page.draw_line(p_base1_l, p_base2_l, color=(0.4, 0.4, 0.4), width=3.5)
    
    # -------------------------------------------------------------
    # SECTION 3: WORDMARK LOCKUPS
    # -------------------------------------------------------------
    y_wm = 410
    page.insert_text(
        (56, y_wm),
        "03 / OFFICIAL WORDMARK LOCKUP",
        fontsize=10,
        fontname="cour",
        color=(0.7, 0.7, 0.7),
    )
    
    wm_box = pymupdf.Rect(56, y_wm + 14, page_w - 56, y_wm + 94)
    page.draw_rect(wm_box, color=(0.15, 0.15, 0.15), fill=(0.094, 0.094, 0.094), width=1)
    
    # Draw small logo inside wordmark
    sm_s = 40
    sm_rect = pymupdf.Rect(80, y_wm + 34, 80 + sm_s, y_wm + 34 + sm_s)
    page.draw_rect(sm_rect, color=(0.25, 0.25, 0.25), fill=(0.07, 0.07, 0.07), width=1)
    
    def map_sm(x, y):
        rx = (x - 1) / 30.0
        ry = (y - 1) / 30.0
        return pymupdf.Point(sm_rect.x0 + rx * sm_s, sm_rect.y0 + ry * sm_s)
        
    page.draw_line(map_sm(8, 23), map_sm(8, 9), color=(1, 1, 1), width=2)
    page.draw_line(map_sm(8, 9), map_sm(13.5, 17), color=(1, 1, 1), width=2)
    page.draw_line(map_sm(13.5, 17), map_sm(16, 13.5), color=(1, 1, 1), width=2)
    page.draw_line(map_sm(24, 23), map_sm(24, 9), color=(1, 1, 1), width=2)
    page.draw_line(map_sm(24, 9), map_sm(18.5, 17), color=(1, 1, 1), width=2)
    page.draw_line(map_sm(18.5, 17), map_sm(16, 13.5), color=(1, 1, 1), width=2)
    page.draw_circle(map_sm(16, 13.5), 1.5, color=(1, 1, 1), fill=(1, 1, 1))
    page.draw_line(map_sm(11, 23), map_sm(21, 23), color=(0.6, 0.6, 0.6), width=1.5)
    
    # Wordmark text
    page.insert_text(
        (136, y_wm + 52),
        "VELAGAPUDI MAHENDRA",
        fontsize=16,
        fontname="helv",
        color=(1, 1, 1),
    )
    page.insert_text(
        (136, y_wm + 68),
        "COMPUTER SCIENCE & DATA SCIENCE · MREM HYDERABAD",
        fontsize=9,
        fontname="cour",
        color=(0.6, 0.6, 0.6),
    )
    
    # -------------------------------------------------------------
    # SECTION 4: COLOR PALETTE SPECIFICATION
    # -------------------------------------------------------------
    y_col = 535
    page.insert_text(
        (56, y_col),
        "04 / CANONICAL COLOR TOKENS",
        fontsize=10,
        fontname="cour",
        color=(0.7, 0.7, 0.7),
    )
    
    swatches = [
        ("Base Obsidian", "#000000", (0, 0, 0), (1, 1, 1)),
        ("Surface 1", "#181818", (0.094, 0.094, 0.094), (1, 1, 1)),
        ("Surface 2", "#1F1F1F", (0.122, 0.122, 0.122), (1, 1, 1)),
        ("Border", "#272727", (0.153, 0.153, 0.153), (1, 1, 1)),
        ("Muted Text", "#9B9B9B", (0.608, 0.608, 0.608), (0, 0, 0)),
        ("Primary Text", "#FFFFFF", (1, 1, 1), (0, 0, 0)),
    ]
    
    sw_w = 75
    sw_h = 44
    for idx, (label, hex_code, rgb, text_rgb) in enumerate(swatches):
        sx = 56 + idx * (sw_w + 7)
        sy = y_col + 14
        s_rect = pymupdf.Rect(sx, sy, sx + sw_w, sy + sw_h)
        page.draw_rect(s_rect, color=(0.25, 0.25, 0.25), fill=rgb, width=1)
        
        page.insert_text((sx + 6, sy + 18), hex_code, fontsize=9, fontname="cour", color=text_rgb)
        page.insert_text((sx + 6, sy + 32), label, fontsize=7.5, fontname="helv", color=text_rgb)

    # -------------------------------------------------------------
    # SECTION 5: GEOMETRY & MEANING SPECIFICATION
    # -------------------------------------------------------------
    y_geo = 620
    page.insert_text(
        (56, y_geo),
        "05 / GEOMETRY, CONSTRUCTION & ICONOGRAPHY MEANING",
        fontsize=10,
        fontname="cour",
        color=(0.7, 0.7, 0.7),
    )
    
    geo_box = pymupdf.Rect(56, y_geo + 14, page_w - 56, y_geo + 140)
    page.draw_rect(geo_box, color=(0.15, 0.15, 0.15), fill=(0.094, 0.094, 0.094), width=1)
    
    notes = [
        "1. THE 'M' APEX & PILLARS: Upright strokes represent structural architectural stability in data systems.",
        "2. THE CENTRAL NODE (COORDINATE): Signifies precision AST evaluation and single-point runtime verification.",
        "3. THE BASELINE TIE: Anchors the monogram to empirical evidence and eliminates speculative hallucination.",
        "4. CLEAR SPACE: Maintain minimum margin of 0.5x width around all sides; never place text within clear space.",
        "5. TYPOGRAPHY PAIRING: Set in Geist / Geist Mono. Strict avoidance of clashing decorative or sci-fi display faces.",
    ]
    
    for i, line in enumerate(notes):
        page.insert_text(
            (72, y_geo + 36 + i * 20),
            line,
            fontsize=8.5,
            fontname="cour",
            color=(0.8, 0.8, 0.8),
        )
        
    # Footer
    page.insert_text(
        (56, 792),
        "CONFIDENTIAL & PROPRIETARY · VELAGAPUDI MAHENDRA · HTTPS://MAHENDRAA.DEV",
        fontsize=8,
        fontname="cour",
        color=(0.4, 0.4, 0.4),
    )
    
    # Save to all requested paths
    for p in output_paths:
        doc.save(p)
        print(f"Saved: {p}")
        
    doc.close()

if __name__ == "__main__":
    create_logo_pdf([
        "d:/Projects/X-01Folio/logo.pdf",
        "d:/Projects/X-01Folio/public/logo.pdf",
    ])
