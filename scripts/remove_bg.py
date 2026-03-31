import os
from PIL import Image, ImageDraw, ImageFilter

def process_sticker_v7(input_path, output_path):
    print(f"Processing {input_path} with ULTRA AGGRESSIVE flood fill...")
    img = Image.open(input_path).convert("RGBA")
    
    # We flood fill from all corners AND all centers of sides
    # With a VERY high threshold to catch textured backgrounds
    points = [
        (0,0), (img.width-1, 0), (0, img.height-1), (img.width-1, img.height-1),
        (img.width//2, 0), (img.width//2, img.height-1), (0, img.height//2), (img.width-1, img.height//2)
    ]
    
    for pt in points:
        ImageDraw.floodfill(img, pt, (0, 0, 0, 0), thresh=80)
            
    # Then we crop
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")

images_v6 = [
    "public/images/pikachu-clean-v6.png",
    "public/images/charizard-clean-v6.png",
    "public/images/gengar-clean-v6.png"
]

if __name__ == "__main__":
    for img_path in images_v6:
        if os.path.exists(img_path):
            v7_path = img_path.replace("v6", "v7")
            process_sticker_v7(img_path, v7_path)
        else:
            # Maybe they exist as v5? (Since I haven't renamed them?)
            # Actually, I am saving v5 as v6.
            # I'll check v6 existence first.
            print(f"File {img_path} not found.")
