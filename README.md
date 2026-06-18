# Alphajee x ApexBITS static share build

This folder is a reduced public package for the Alphajee x ApexBITS handoff.

## Local pages kept

- `predictor.html` / `/predictor`
- `score-data.html` / `/score-data`

The score-data page uses:

- `assets/data/phodu-scores.json`
- `assets/data/scores.json`
- `assets/js/score-data-public.js`

The predictor page uses:

- `assets/data/predictor-cutoffs.csv`

## Redirect behavior

All other known ApexBITS routes are redirects to their `https://apexbits.site` counterparts through `_redirects` and `_worker.js`.

No local PDFs, old section pages, home page assets, or analytics endpoint are included in this reduced build.

## Local preview

Run from this folder:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/predictor.html
http://localhost:8000/score-data.html
```
