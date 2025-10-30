# Video Site — Local & GitHub Pages

This folder contains a simple HTML page (`index.html`) that plays local MP4 files.

How to run locally (first time):

1. Open PowerShell and change to this directory:

```powershell
cd 'C:\Users\user\Desktop\New folder (2)\video'
```

2. Start a simple HTTP server (Python must be installed):

```powershell
python -m http.server 8000
```

3. Open your browser and go to `http://localhost:8000/index.html`.

Prepare for GitHub Pages:

GitHub Pages serves static sites from a `docs/` folder (or the `gh-pages` branch). Since MP4 files are large, consider using Git LFS for storing them.

This repository includes a helper PowerShell script `prepare_pages.ps1` that will create a `docs/` folder containing the files to publish to GitHub Pages.

Notes:
- If your repo is the root that you want to publish, push the `docs/` folder to GitHub and enable Pages to serve from `docs/` on the repository settings.
- If videos are large, enable Git LFS and track `*.mp4` before committing the files:
  ```powershell
  git lfs install
  git lfs track "*.mp4"
  git add .gitattributes
  ```
