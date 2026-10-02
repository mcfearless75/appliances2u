"""Render the 1200x630 Open Graph share card: src/assets/img/site/og-card.jpg"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "src" / "assets" / "img"
FONTS = Path("C:/Windows/Fonts")
NAVY, SKY, WHITE = (14, 17, 87), (43, 181, 242), (255, 255, 255)


def font(name, size):
    return ImageFont.truetype(str(FONTS / name), size)


card = Image.new("RGB", (1200, 630), NAVY)
shop = Image.open(IMG / "site" / "shop-front-bootle.webp").convert("RGB")
shop = shop.resize((480, round(shop.height * 480 / shop.width)))
card.paste(shop.crop((0, 5, 480, 635)), (720, 0))
d = ImageDraw.Draw(card)
d.polygon([(660, 0), (760, 0), (700, 630), (600, 630)], fill=NAVY)
logo = Image.open(IMG / "brand" / "logo.png").convert("RGBA").resize((150, 150))
card.paste(logo, (60, 50), logo)
d.text((60, 230), "New & Graded", font=font("segoeuib.ttf", 64), fill=WHITE)
d.text((60, 305), "Appliances", font=font("segoeuib.ttf", 64), fill=SKY)
d.text((60, 390), "Washers · Fridge Freezers · Cookers · Dryers", font=font("segoeui.ttf", 28), fill=WHITE)
d.rounded_rectangle((60, 470, 440, 540), radius=35, fill=SKY)
d.text((92, 482), "07769 865432", font=font("segoeuib.ttf", 38), fill=NAVY)
d.text((60, 565), "203 Strand Road, Bootle, Liverpool L20 3HJ", font=font("segoeui.ttf", 24), fill=(201, 208, 245))
card.save(IMG / "site" / "og-card.jpg", quality=85, optimize=True)
print("ok")
