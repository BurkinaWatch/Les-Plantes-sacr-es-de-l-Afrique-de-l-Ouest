export type ApiErrorCode = 'unauthenticated' | 'unavailable';

export class ApiRequestError extends Error {
  constructor(public readonly code: ApiErrorCode) {
    super(code);
    this.name = 'ApiRequestError';
  }
}

export class ApiRateLimitError extends Error {
  constructor(public readonly resetAt: number | null) {
    super('rate_limit_exhausted');
    this.name = 'ApiRateLimitError';
  }
}

export interface RateLimitInfo {
  remaining: number | null;
  resetAt: number | null;
}

export interface TotemRequest {
  planteId: string;
  planteData: Record<string, unknown>;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  userLang: 'fr' | 'en';
}

export interface PlantRecognitionSuccess {
  nom: string;
  nomScientifique: string;
  famille: string;
  description: string;
  origineGeographique: string;
  utilisationsTraditionnelles: string[];
  proprietesMediacinales: string[];
  symboliqueAfricaine: string;
  conseils: string[];
  curiosite: string;
  confidence: 'high' | 'medium' | 'low';
  error?: false;
}

export interface PlantRecognitionFailure {
  error: true;
  message: string;
}

export type PlantRecognitionResult = PlantRecognitionSuccess | PlantRecognitionFailure;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isNonEmptyString);
}

function isPlantRecognitionResult(value: unknown): value is PlantRecognitionResult {
  if (typeof value !== 'object' || value === null) return false;

  const candidate = value as Record<string, unknown>;
  if (candidate.error === true) {
    return isNonEmptyString(candidate.message);
  }

  return (
    isNonEmptyString(candidate.nom) &&
    isNonEmptyString(candidate.nomScientifique) &&
    isNonEmptyString(candidate.famille) &&
    isNonEmptyString(candidate.description) &&
    isNonEmptyString(candidate.origineGeographique) &&
    isStringArray(candidate.utilisationsTraditionnelles) &&
    isStringArray(candidate.proprietesMediacinales) &&
    isNonEmptyString(candidate.symboliqueAfricaine) &&
    isStringArray(candidate.conseils) &&
    isNonEmptyString(candidate.curiosite) &&
    (candidate.confidence === 'high' || candidate.confidence === 'medium' || candidate.confidence === 'low')
  );
}

export interface PlantResponse {
  plant: PlantRecognitionResult;
  remaining: number | null;
  resetAt: number | null;
}

type FetchLike = typeof fetch;

export function parseRateLimitHeaders(response: Response): RateLimitInfo {
  const remaining = response.headers.get('RateLimit-Remaining') ?? response.headers.get('X-RateLimit-Remaining');
  const reset = response.headers.get('RateLimit-Reset') ?? response.headers.get('X-RateLimit-Reset');
  return {
    remaining: remaining !== null ? parseInt(remaining, 10) : null,
    resetAt: reset !== null ? parseInt(reset, 10) : null,
  };
}

async function postAiRequest<T>(
  path: string,
  apiBase: string | null,
  token: string | null | undefined,
  body: unknown,
  fetchImpl: FetchLike,
): Promise<{ data: T } & RateLimitInfo> {
  if (!apiBase) throw new ApiRequestError('unavailable');
  if (!token) throw new ApiRequestError('unauthenticated');

  const response = await fetchImpl(`${apiBase.replace(/\/$/, '')}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const { remaining, resetAt } = parseRateLimitHeaders(response);
  if (!response.ok) {
    if (response.status === 429) {
      throw new ApiRateLimitError(resetAt);
    }
    const errorBody = await response.json().catch(() => ({})) as { error?: string };
    if (response.status === 401) throw new ApiRequestError('unauthenticated');
    throw new Error(errorBody.error ?? 'Erreur serveur');
  }

  return { data: await response.json() as T, remaining, resetAt };
}

export async function requestTotem(
  args: {
    apiBase: string | null;
    token?: string | null;
    body: TotemRequest;
    fetchImpl?: FetchLike;
  },
): Promise<{ content: string } & RateLimitInfo> {
  const { data, remaining, resetAt } = await postAiRequest<{ content?: string }>(
    '/chat/totem',
    args.apiBase,
    args.token,
    args.body,
    args.fetchImpl ?? fetch,
  );
  if (!isNonEmptyString(data?.content)) {
    throw new ApiRequestError('unavailable');
  }
  return { content: data.content, remaining, resetAt };
}

export async function requestPlantRecognition(
  args: {
    apiBase: string | null;
    imageBase64: string;
    lang: string;
    token?: string | null;
    fetchImpl?: FetchLike;
  },
): Promise<PlantResponse> {
  const { data, remaining, resetAt } = await postAiRequest<{ plant?: unknown }>(
    '/plant-recognition',
    args.apiBase,
    args.token,
    { imageBase64: args.imageBase64, lang: args.lang },
    args.fetchImpl ?? fetch,
  );
  if (!isPlantRecognitionResult(data?.plant)) {
    throw new ApiRequestError('unavailable');
  }
  return { plant: data.plant, remaining, resetAt };
}