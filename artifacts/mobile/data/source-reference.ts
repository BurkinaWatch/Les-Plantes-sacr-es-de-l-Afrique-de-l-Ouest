export type SourceReferenceKind =
  | 'taxonomie'
  | 'scientifique'
  | 'institutionnelle'
  | 'source culinaire'
  | 'publication sociale';

export interface SourceReference {
  title: string;
  url: string;
  kind: SourceReferenceKind;
  note?: string;
}