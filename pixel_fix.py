from PIL import Image, ImageChops, ImageDraw, ImageFilter
import os

def ultimate_clean(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # We create a mask
    mask = Image.new("L", (width, height), 255)
    mask_pix = mask.load()
    pix = img.load()
    
    # Very generous background detection (anything bright/white/gray)
    def is_junk(x, y):
        r, g, b, a = pix[x, y]
        # Neutral-ish and bright
        diff = max(abs(r-g), abs(g-b), abs(r-b))
        brightness = (r + g + b) / 3
        # If it's very white/gray, it's junk (including the border)
        return diff < 40 and brightness > 120

    # Flood fill corners
    for start in [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]:
        if not is_junk(*start): continue
        stack = [start]
        while stack:
            x, y = stack.pop()
            if mask_pix[x, y] == 0: continue
            mask_pix[x, y] = 0
            for dx, dy in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height:
                    if mask_pix[nx, ny] == 255 and is_junk(nx, ny):
                        stack.append((nx, ny))
                        
    # AGGRESSIVE erosion to remove the white border entirely
    # MinFilter(9) will eat 4-5 pixels in from the edge
    mask_img = mask.filter(ImageFilter.MinFilter(9))
    # Smooth the result
    mask_img = mask_img.filter(ImageFilter.GaussianBlur(2))
    
    # Apply mask
    new_data = []
    datas = img.getdata()
    m_datas = mask_img.getdata()
    for i in range(len(datas)):
        r, g, b, a = datas[i]
        new_data.append((r, g, b, m_datas[i]))
    img.putdata(new_data)
    img.save(output_path, "PNG")

images = ["pikachu-clean.png", "charizard-clean.png", "gengar-clean.png"]
base_dir = r"c:/Users/Lexy/Desktop/pokemoners/public/images"
for img_name in images:
    p = os.path.join(base_dir, img_name)
    # We overwrite the -clean ones directly now
    print(f"Ultimate clean: {img_name}")
    ultimate_clean(p, p)
