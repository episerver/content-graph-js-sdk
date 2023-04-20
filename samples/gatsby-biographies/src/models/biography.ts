export type BiographyPreview = {
  Name: string
  RouteSegment: string
  Born: string
  Die: string
}

export type Biography = BiographyPreview & {
  FamousQuote: string
  MainBody: string
}
