export interface CutoffRow {
  campus: string;
  programme: string;
  close2025: number;
}

export interface BandResult {
  min: number;
  mid: number;
  max: number;
}

export type ModelKey = 'phodu' | 'mathongo' | 'canvas';

export interface ModelConfig {
  name: string;
  color: string;
  rule: string;
  src: string;
  srcLabel: string;
  band: (m: number, prog?: string) => BandResult;
}

export const MODELS: Record<ModelKey, ModelConfig> = {
  phodu: {
    name: 'Phodu Club',
    color: '#e39ff6',
    rule: 'Safest +10 · neutral +5 / −5 around the 250 line · best case at par',
    src: 'https://www.youtube.com/watch?v=6jRMXMw2jnI',
    srcLabel: 'Source · YouTube',
    band: (m) =>
      m >= 250
        ? { min: m, mid: m + 5, max: m + 10 }
        : { min: m - 5, mid: m - 5, max: m + 10 },
  },
  mathongo: {
    name: 'MathonGo',
    color: '#2f7df6',
    rule: 'Neutral −5 · best case −10 · safest at par (CS & MnC: +5 / 0 / −5)',
    src: 'https://www.youtube.com/watch?v=0Ebi-ULWH-A',
    srcLabel: 'Source · YouTube',
    band: (m, prog = '') => {
      const cs = /Computer Science|Mathematics and Computing/.test(prog);
      return cs
        ? { min: m - 5, mid: m, max: m + 5 }
        : { min: m - 10, mid: m - 5, max: m };
    },
  },
  canvas: {
    name: 'Canvas Classes',
    color: '#0e1b43',
    rule: 'Neutral +10 · best case +5 · safest +15, across all branches',
    src: 'https://www.canvasclasses.in/college-predictor?tool=bitsat',
    srcLabel: 'Source · canvasclasses.in',
    band: (m) => ({ min: m + 5, mid: m + 10, max: m + 15 }),
  },
};

export const MODEL_ORDER: ModelKey[] = ['phodu', 'mathongo', 'canvas'];

export const FALLBACK_CSV = `campus,programme,close2025
Pilani,B.E. Computer Science,304
Pilani,B.E. Mathematics and Computing,295
Pilani,B.E. Electronics & Communication,285
Pilani,B.E. Electrical & Electronics,260
Pilani,B.E. Electronics & Instrumentation,250
Pilani,M.Sc. Economics,251
Pilani,B.E. Mechanical,235
Pilani,M.Sc. Mathematics,229
Pilani,M.Sc. Physics,223
Pilani,M.Sc. Chemistry,212
Pilani,B.E. Manufacturing,211
Pilani,B.E. Chemical,210
Pilani,M.Sc. Biological Sciences,208
Pilani,B.E. Civil,206
Pilani,B.E. Environmental and Sustainability,203
Pilani,B. Pharm,168
Goa,B.E. Computer Science,274
Goa,B.E. Mathematics and Computing,268
Goa,B.E. Electronics and Computer,262
Goa,B.E. Electronics & Communication,255
Goa,B.E. Electrical & Electronics,243
Goa,M.Sc. Economics,237
Goa,B.E. Electronics & Instrumentation,234
Goa,M.Sc. Semiconductors,225
Goa,B.E. Mechanical,223
Goa,M.Sc. Mathematics,216
Goa,M.Sc. Physics,212
Goa,B.E. Chemical,206
Goa,M.Sc. Chemistry,205
Goa,M.Sc. Biological Sciences,203
Goa,B.E. Environmental and Sustainability,189
Hyderabad,B.E. Computer Science,270
Hyderabad,B.E. Mathematics and Computing,266
Hyderabad,B.E. Electronics & Communication,256
Hyderabad,B.E. Electrical & Electronics,239
Hyderabad,B.E. Electronics & Instrumentation,232
Hyderabad,M.Sc. Economics,231
Hyderabad,M.Sc. Semiconductors,225
Hyderabad,B.E. Mechanical,214
Hyderabad,M.Sc. Mathematics,212
Hyderabad,M.Sc. Physics,209
Hyderabad,B.E. Chemical,205
Hyderabad,B.E. Civil,203
Hyderabad,M.Sc. Biological Sciences,203
Hyderabad,M.Sc. Chemistry,203
Hyderabad,B.E. Environmental and Sustainability,181
Hyderabad,B. Pharm,151`;

export function parseCSV(text: string): CutoffRow[] {
  const rows = text.trim().split(/\r?\n/);
  const header = rows[0].split(',').map((h) => h.trim().toLowerCase());
  const campusIdx = header.indexOf('campus');
  const progIdx = header.indexOf('programme');
  const closeIdx = header.indexOf('close2025');

  return rows.slice(1).flatMap((row) => {
    const cols = row.split(',');
    if (cols.length < 3) return [];
    const campus = cols[campusIdx]?.trim();
    const programme = cols[progIdx]?.trim();
    const close = parseInt(cols[closeIdx]?.trim(), 10);
    if (!campus || !programme || isNaN(close)) return [];
    return [{ campus, programme, close2025: close }];
  });
}

export function getAllBranches(rows: CutoffRow[]): string[] {
  const branches = new Set<string>();
  rows.forEach((r) => {
    const match = r.programme.match(/B\.E\.\s(.+)|B\.\s(.+)/);
    if (match) branches.add(match[1] || match[2]);
  });
  return Array.from(branches).sort();
}

export type Tier = 'safe' | 'target' | 'unlikely';

export interface PredictedRow extends CutoffRow {
  predictedCutoff: number;
  margin: number;
  tier: Tier;
}

export function getTier(margin: number): Tier {
  if (margin > 7) return 'safe';
  if (margin >= -7) return 'target';
  return 'unlikely';
}

export function computePredictions(
  rows: CutoffRow[],
  score: number,
  modelKey: ModelKey,
  outlook: number,
  branchFilter: string[]
): PredictedRow[] {
  const model = MODELS[modelKey];
  const t = outlook / 100;

  return rows
    .filter((r) => {
      if (branchFilter.length === 0) return true;
      return branchFilter.some((b) => r.programme.includes(b));
    })
    .map((r) => {
      const band = model.band(r.close2025, r.programme);
      const predicted = Math.round(band.min + (band.max - band.min) * t);
      const margin = score - predicted;
      return { ...r, predictedCutoff: predicted, margin, tier: getTier(margin) };
    })
    .sort((a, b) => b.margin - a.margin);
}
