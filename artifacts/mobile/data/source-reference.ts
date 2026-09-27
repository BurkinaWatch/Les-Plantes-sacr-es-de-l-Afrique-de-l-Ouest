export type SourceReferenceKind =
  | 'taxonomie'
  | 'scientifique'
  | 'institutionnelle'
  | 'publication sociale';

export interface SourceReference {
  title: string;
  url: string;
  kind: SourceReferenceKind;
  note?: string;
}