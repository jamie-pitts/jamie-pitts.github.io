# Jamie Pitts — Personal Website

A hand-crafted personal website, built with vanilla HTML, CSS, and a single tiny JS file. No build step, no dependencies, no frameworks. Just three files.

## Files

| File         | Purpose                                                      |
| ------------ | ------------------------------------------------------------ |
| `index.html` | All page content — clearly sectioned with HTML comments.     |
| `style.css`  | All styling — design tokens at the top for easy customisation. |
| `script.js`  | ~30 lines — fades sections in as they scroll into view.      |

## Quick edits

### Changing colours

Open `style.css`. All colours live as CSS custom properties at the top:

```css
:root {
  --color-bg: #f4efe6;        /* warm cream background */
  --color-text: #1a1a1a;      /* deep ink */
  --color-accent: #c7522a;    /* terracotta */
  ...
}
```

Change the hex codes — the whole site re-skins instantly.

### Changing fonts

Fonts are loaded from Google Fonts in `index.html` (line ~26). To swap:

1. Update the `<link href="...">` URL with the new font from [fonts.google.com](https://fonts.google.com).
2. Update `--font-display`, `--font-body`, `--font-mono` in `style.css`.

### Updating content

All content is in `index.html`. Each section is wrapped in a clearly named HTML comment block (`HERO`, `ABOUT`, `EXPERIENCE`, etc.). Edit the text directly.

## Local preview

Just open `index.html` in your browser. Done.

For better dev experience (live reload), you can run a simple local server:

```bash
# From this folder
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## GitHub Pages deployment

1. Copy these files to the root of your GitHub Pages repo (e.g. `jamiepitts.github.io` or your custom-domain repo).
2. **Copy over the `img/` folder and `files/` folder** from your existing site so the project screenshots / app store badge / .jar download resolve.
3. Commit and push.
4. The site will be live within ~30 seconds at your Pages URL.

If using a custom domain like `jamiepitts.com`, make sure your `CNAME` file is preserved at the repo root.

### Image paths used

The project section references these existing paths from your current site:

- `img/gigtrack/thumb/ios/1.png` through `6.png` — GigTrack iOS screenshots
- `img/gigtrack/full_size/ios/*` — full-resolution versions linked on click
- `img/app-store-badge.png` — Apple App Store badge
- `img/guess_the_horse/thumb/*` — Guess The Horse screenshots
- `img/fireFly/*_s.png` — Fire Fly Simulator screenshots
- `img/clock/*` — Intelligent Alarm Clock photos
- `files/Fire Fly Simulator.jar` — Fire Fly download

Just copy those folders over and everything will work.

## Design notes

- **Aesthetic**: editorial / engineering hybrid. Warm cream paper background, deep ink text, terracotta accent. Inspired by literary journals and engineering notebooks.
- **Typography**: Instrument Serif (display, with italic moments), DM Sans (body), JetBrains Mono (technical marginalia).
- **Layout**: Numbered sections like book chapters. Asymmetric hero. Generous negative space.
- **Motion**: Subtle entrance animations on hero, gentle scroll reveals. Honours `prefers-reduced-motion`.
- **Responsive**: Mobile breakpoint at 760px.

## License

Content © Jamie Pitts. Code MIT-licensed if you'd like to reuse the structure for your own site.
