"""Download images from the old Wix site and save optimised WebP copies.

Originals go to scrape/originals/ (git-ignored); web copies go to src/assets/img/.
Re-run safely: existing files are skipped.
"""
import json
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ORIG = ROOT / "scrape" / "originals"
OUT = ROOT / "src" / "assets" / "img"
WIX = "https://static.wixstatic.com/media/"
MAX_W = 1200
THUMB_W = 600

# category -> list of Wix media ids (scraped 2026-10-02)
GALLERIES = {
    "washing-machines": """09bcdfa2977447bda5ba6e1442c0247d 727ccc295afb4fbca30f5930a69e6df9 d9b16460820f4d4383e1a0b8ee0ad6a9
        fb424ee9106b442b8e9c072038054092 40e78c73bc134b68a2ce237a998c19da c9386100ab5c4298b4ae6ba0f5bdde39
        ee0309105f4048edb764f782d048210b cf6a4278e52f4ba88ea965aa0e14b3b5 82a23d5cf7404477a5fe4b1079b27b6a
        ba735d1a1b0749fc98124dab46500b78 c97e870736f34f30ae175b273492589d 317300f5ab72479383c9560c3695a67b
        5254d8b4cc514fc3b4593e8baae4ca2b 78354a21a15c45199355d5a0eb28e2ef 1d94c7671ac641c69ec4696edd1ca626
        34acbb85f3be4acfa63346ff958e761f""",
    "cookers": """b28cd9e0c7cc451b8dbf18716ea800a7 10e67fae96da438780399e284df2db66 0de14810856e469db89459c7a9f7dbc4
        8c1b6de7d94d46fe8f935e479839abb5 cf63fb3a809342b9940038f794edcad6 bf6c10b8a5e44209b4feef44e0757003
        566397464cdd40ab95f8cf59b9089ca8 673f8c9c35d547b99c8666925aa6f1de 11230c3b1e8d46dfb97322cdf7d9931d
        d7267ac876634fc69fdba45310763b29 890a56e06944499d9b02c3101d02d425 dd08e8c7f513488683e53ca9adb5e332
        0e82831a0ee34c779014d5225a2190ad""",
    "fridge-freezers": """3f78f01743d5492cbeeb437e3ede77cf 40267f1c79b4434b892002c7247c14c2 6df292e9ef044a53b2792a9aa66e9ddd
        a276854ece44402fb6bb900dbc89f3f8 45555cf7838445109ce22ab933eb5dac b2b1a14f91ee442b9a648ecfa84fea15
        147aa6f1a8b0478892b0e2e949ec8f41 74ccb868c7bb4924854b8485d9008035 dfa263fd5194400c8f4477f0c9883b8d
        09666832d9d0468599da0dbd5560ec0f 2dca21d2491542919c3803147af01ff4 a80571bb01d546508ee13dfcfa12bddd
        2b27aa68e1ce45f0a46b69da5e1e7ad6 15d352e1821d4afe8efb639dacb59412 c7189c0a168346cf9beab012ed873792""",
    "tumble-dryers": """b38b3a39f11b4c4499f02f571877d78f 8edbbe0298f743a1a0da7e1d6bfa5311 c6686ab418a241079f709cefe7b89797
        20791859d154400b87e1f9d20eb9f07e aa20c2accb2741769c96e9f029ae26c3 06d2505b6aef46f8af75f89391bffbb7
        c66d72f3d37f41c3a35eb317f1afd61e""",
    "integrated": """cefd71c4321649fdbf0ad47fe276fe3c 35f11aa3f26749ca8dbf1f6b90b9674c 63d2b4885f364599990aeef85af6f3ca
        d6dd3662575041518350a21638904300 e6eeb5f367a048d9b2d5930bc3250e31 e6e12ef1fca5404784f83337568ef530
        2fd5a833518b4daf8e5ff29b767a2bcd 42f1c7ec04dc4114b23f4433a2e1aa79 70d0f92f23754cbd977678518a4a9649
        f5d130a81cfb41d4aad5bd14bdc2ffca 3057c51c8dfa431b84460c61ee9ceb41 e57083f7c863490c8bdb5a0844a06351
        5526fa128f6642c4af971391c690deaf 4e85d30e74b547e59a87707d06e338c0 77e66adbdc3d434bacb31d3cb097e657""",
}

# named site images: output name -> (wix file, keep_png)
SINGLES = {
    "brand/logo": ("83a797_820415107b784983900625f81c300a6a~mv2.png", True),
    "brand/call-badge": ("83a797_814b34f6e1214329a6ec98e89a7085c9~mv2.png", True),
    "site/van-bootle": ("83a797_61caa1e9135541c4840d3a40257b94e9~mv2.jpg", False),
    "site/shop-front-bootle": ("83a797_c81714abff034633b379194d47d0fb04~mv2.jpg", False),
    "brands/candy": ("83a797_3a4845257f2d4b60912ff599a5ee6686~mv2.png", False),
    "brands/hoover": ("83a797_48999ec3d3bd48fc86889f9ed05651bd~mv2.png", False),
    "brands/beko": ("83a797_13e9aa8ac03f4d6ba63e61c53373563c~mv2.png", False),
    "brands/samsung": ("83a797_95bea20041ec4f9093cbd15185454fcd~mv2.png", False),
    "brand/visa": ("84770f_27001c40036842889a78a72766ad4700~mv2.png", True),
    "brand/mastercard": ("c837a6_e8798fcfdaf144478a5c7da1ba28ff2c~mv2.png", True),
}


def download(name: str) -> Path:
    dest = ORIG / name
    if not dest.exists():
        dest.parent.mkdir(parents=True, exist_ok=True)
        req = urllib.request.Request(WIX + name, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as r:
            dest.write_bytes(r.read())
    return dest


def convert(src: Path, out_stem: Path, keep_png: bool) -> dict:
    out_stem.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as im:
        if im.width > MAX_W:
            im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
        if keep_png:
            dest = out_stem.with_suffix(".png")
            im.save(dest, optimize=True)
        else:
            dest = out_stem.with_suffix(".webp")
            alpha = im.mode in ("RGBA", "LA", "P")
            im = im.convert("RGBA" if alpha else "RGB")
            im.save(dest, "WEBP", quality=78, method=6)
            if not alpha and im.width > THUMB_W:
                th = im.resize((THUMB_W, round(im.height * THUMB_W / im.width)), Image.LANCZOS)
                th.save(out_stem.with_name(out_stem.name + "-600.webp"), "WEBP", quality=74, method=6)
        return {"src": dest.relative_to(ROOT / "src").as_posix(), "w": im.width, "h": im.height}


def main() -> None:
    manifest = {"galleries": {}, "singles": {}}
    for cat, ids in GALLERIES.items():
        items = []
        for i, mid in enumerate(ids.split(), 1):
            src = download(f"83a797_{mid}~mv2.jpg")
            items.append(convert(src, OUT / cat / f"{cat}-liverpool-{i:02d}", False))
        manifest["galleries"][cat] = items
        print(f"{cat}: {len(items)}")
    for key, (name, keep_png) in SINGLES.items():
        manifest["singles"][key] = convert(download(name), OUT / key, keep_png)
    (ROOT / "src" / "data" / "images.json").parent.mkdir(parents=True, exist_ok=True)
    (ROOT / "src" / "data" / "images.json").write_text(json.dumps(manifest, indent=2))
    print("singles:", len(manifest["singles"]))




def icons() -> None:
    """Favicons and small logo variants from the full-size logo."""
    with Image.open(OUT / "brand" / "logo.png") as logo:
        logo = logo.convert("RGBA")
        for size, name in [(32, "favicon-32.png"), (180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")]:
            logo.resize((size, size), Image.LANCZOS).save(OUT / "brand" / name, optimize=True)
        logo.resize((240, 240), Image.LANCZOS).save(OUT / "brand" / "logo-240.webp", "WEBP", quality=85)
        logo.resize((96, 96), Image.LANCZOS).save(OUT / "brand" / "logo-96.webp", "WEBP", quality=85)


if __name__ == "__main__":
    main()
    icons()
