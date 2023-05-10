import { useQuery, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Bool: any;
  Date: any;
};

export type ArtistContainerPage = IContent & {
  __typename?: 'ArtistContainerPage';
  Ancestors?: Maybe<Array<Maybe<Scalars['String']>>>;
  Category?: Maybe<Array<Maybe<CategoryModel>>>;
  Changed?: Maybe<Scalars['Date']>;
  ContentLink?: Maybe<ContentModelReference>;
  ContentType?: Maybe<Array<Maybe<Scalars['String']>>>;
  Created?: Maybe<Scalars['Date']>;
  ExistingLanguages?: Maybe<Array<Maybe<ContentLanguageModel>>>;
  IsCommonDraft?: Maybe<Scalars['Bool']>;
  Language?: Maybe<ContentLanguageModel>;
  MasterLanguage?: Maybe<ContentLanguageModel>;
  Name?: Maybe<Scalars['String']>;
  ParentLink?: Maybe<ContentModelReference>;
  RelativePath?: Maybe<Scalars['String']>;
  RouteSegment?: Maybe<Scalars['String']>;
  Saved?: Maybe<Scalars['Date']>;
  StartPublish?: Maybe<Scalars['Date']>;
  Status?: Maybe<Scalars['String']>;
  StopPublish?: Maybe<Scalars['Date']>;
  Url?: Maybe<Scalars['String']>;
  _children?: Maybe<QueryRef>;
  _fulltext?: Maybe<Array<Maybe<Scalars['String']>>>;
  _score?: Maybe<Scalars['Float']>;
};

export type ArtistContainerPageAutocomplete = {
  __typename?: 'ArtistContainerPageAutocomplete';
  Ancestors?: Maybe<Array<Maybe<Scalars['String']>>>;
  Category?: Maybe<CategoryModelAutocomplete>;
  ContentLink?: Maybe<ContentModelReferenceAutocomplete>;
  ContentType?: Maybe<Array<Maybe<Scalars['String']>>>;
  ExistingLanguages?: Maybe<ContentLanguageModelAutocomplete>;
  Language?: Maybe<ContentLanguageModelAutocomplete>;
  MasterLanguage?: Maybe<ContentLanguageModelAutocomplete>;
  ParentLink?: Maybe<ContentModelReferenceAutocomplete>;
  RelativePath?: Maybe<Array<Maybe<Scalars['String']>>>;
  RouteSegment?: Maybe<Array<Maybe<Scalars['String']>>>;
  Status?: Maybe<Array<Maybe<Scalars['String']>>>;
  Url?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type ArtistContainerPageAutocompleteAncestorsArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ArtistContainerPageAutocompleteContentTypeArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ArtistContainerPageAutocompleteRelativePathArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ArtistContainerPageAutocompleteRouteSegmentArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ArtistContainerPageAutocompleteStatusArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ArtistContainerPageAutocompleteUrlArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};

export type ArtistContainerPageFacet = {
  __typename?: 'ArtistContainerPageFacet';
  Ancestors?: Maybe<Array<Maybe<StringFacet>>>;
  Category?: Maybe<CategoryModelFacet>;
  Changed?: Maybe<Array<Maybe<DateFacet>>>;
  ContentLink?: Maybe<ContentModelReferenceFacet>;
  ContentType?: Maybe<Array<Maybe<StringFacet>>>;
  Created?: Maybe<Array<Maybe<DateFacet>>>;
  ExistingLanguages?: Maybe<ContentLanguageModelFacet>;
  IsCommonDraft?: Maybe<Array<Maybe<StringFacet>>>;
  Language?: Maybe<ContentLanguageModelFacet>;
  MasterLanguage?: Maybe<ContentLanguageModelFacet>;
  Name?: Maybe<Array<Maybe<StringFacet>>>;
  ParentLink?: Maybe<ContentModelReferenceFacet>;
  RelativePath?: Maybe<Array<Maybe<StringFacet>>>;
  RouteSegment?: Maybe<Array<Maybe<StringFacet>>>;
  Saved?: Maybe<Array<Maybe<DateFacet>>>;
  StartPublish?: Maybe<Array<Maybe<DateFacet>>>;
  Status?: Maybe<Array<Maybe<StringFacet>>>;
  StopPublish?: Maybe<Array<Maybe<DateFacet>>>;
  Url?: Maybe<Array<Maybe<StringFacet>>>;
};


export type ArtistContainerPageFacetAncestorsArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistContainerPageFacetChangedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ArtistContainerPageFacetContentTypeArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistContainerPageFacetCreatedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ArtistContainerPageFacetIsCommonDraftArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistContainerPageFacetNameArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistContainerPageFacetRelativePathArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistContainerPageFacetRouteSegmentArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistContainerPageFacetSavedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ArtistContainerPageFacetStartPublishArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ArtistContainerPageFacetStatusArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistContainerPageFacetStopPublishArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ArtistContainerPageFacetUrlArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};

export type ArtistContainerPageOrderByInput = {
  Ancestors?: InputMaybe<OrderBy>;
  Category?: InputMaybe<CategoryModelOrderByInput>;
  Changed?: InputMaybe<OrderBy>;
  ContentLink?: InputMaybe<ContentModelReferenceOrderByInput>;
  ContentType?: InputMaybe<OrderBy>;
  Created?: InputMaybe<OrderBy>;
  ExistingLanguages?: InputMaybe<ContentLanguageModelOrderByInput>;
  IsCommonDraft?: InputMaybe<OrderBy>;
  Language?: InputMaybe<ContentLanguageModelOrderByInput>;
  MasterLanguage?: InputMaybe<ContentLanguageModelOrderByInput>;
  Name?: InputMaybe<OrderBy>;
  ParentLink?: InputMaybe<ContentModelReferenceOrderByInput>;
  RelativePath?: InputMaybe<OrderBy>;
  RouteSegment?: InputMaybe<OrderBy>;
  Saved?: InputMaybe<OrderBy>;
  StartPublish?: InputMaybe<OrderBy>;
  Status?: InputMaybe<OrderBy>;
  StopPublish?: InputMaybe<OrderBy>;
  Url?: InputMaybe<OrderBy>;
  _ranking?: InputMaybe<Ranking>;
};

export type ArtistContainerPageOutput = {
  __typename?: 'ArtistContainerPageOutput';
  autocomplete?: Maybe<ArtistContainerPageAutocomplete>;
  cursor?: Maybe<Scalars['String']>;
  facets?: Maybe<ArtistContainerPageFacet>;
  items?: Maybe<Array<Maybe<ArtistContainerPage>>>;
  total?: Maybe<Scalars['Int']>;
};


export type ArtistContainerPageOutputTotalArgs = {
  all?: InputMaybe<Scalars['Boolean']>;
};

export type ArtistContainerPageWhereInput = {
  Ancestors?: InputMaybe<StringFilterInput>;
  Category?: InputMaybe<CategoryModelWhereInput>;
  Changed?: InputMaybe<DateFilterInput>;
  ContentLink?: InputMaybe<ContentModelReferenceWhereInput>;
  ContentType?: InputMaybe<StringFilterInput>;
  Created?: InputMaybe<DateFilterInput>;
  ExistingLanguages?: InputMaybe<ContentLanguageModelWhereInput>;
  IsCommonDraft?: InputMaybe<BoolFilterInput>;
  Language?: InputMaybe<ContentLanguageModelWhereInput>;
  MasterLanguage?: InputMaybe<ContentLanguageModelWhereInput>;
  Name?: InputMaybe<SearchableStringFilterInput>;
  ParentLink?: InputMaybe<ContentModelReferenceWhereInput>;
  RelativePath?: InputMaybe<StringFilterInput>;
  RouteSegment?: InputMaybe<StringFilterInput>;
  Saved?: InputMaybe<DateFilterInput>;
  StartPublish?: InputMaybe<DateFilterInput>;
  Status?: InputMaybe<StringFilterInput>;
  StopPublish?: InputMaybe<DateFilterInput>;
  Url?: InputMaybe<StringFilterInput>;
  _and?: InputMaybe<Array<InputMaybe<ArtistContainerPageWhereInput>>>;
  _fulltext?: InputMaybe<SearchableStringFilterInput>;
  _modified?: InputMaybe<DateFilterInput>;
  _not?: InputMaybe<Array<InputMaybe<ArtistContainerPageWhereInput>>>;
  _or?: InputMaybe<Array<InputMaybe<ArtistContainerPageWhereInput>>>;
};

export type ArtistDetailsPage = IContent & {
  __typename?: 'ArtistDetailsPage';
  Ancestors?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Description to appear on the artist detail page. */
  ArtistDescription?: Maybe<Scalars['String']>;
  ArtistGenre?: Maybe<Scalars['String']>;
  ArtistIsHeadliner?: Maybe<Scalars['Bool']>;
  ArtistName?: Maybe<Scalars['String']>;
  ArtistPhoto?: Maybe<Scalars['String']>;
  Category?: Maybe<Array<Maybe<CategoryModel>>>;
  Changed?: Maybe<Scalars['Date']>;
  ContentLink?: Maybe<ContentModelReference>;
  ContentType?: Maybe<Array<Maybe<Scalars['String']>>>;
  Created?: Maybe<Scalars['Date']>;
  ExistingLanguages?: Maybe<Array<Maybe<ContentLanguageModel>>>;
  IsCommonDraft?: Maybe<Scalars['Bool']>;
  Language?: Maybe<ContentLanguageModel>;
  MasterLanguage?: Maybe<ContentLanguageModel>;
  Name?: Maybe<Scalars['String']>;
  ParentLink?: Maybe<ContentModelReference>;
  PerformanceEndTime?: Maybe<Scalars['Date']>;
  PerformanceStartTime?: Maybe<Scalars['Date']>;
  RelativePath?: Maybe<Scalars['String']>;
  RouteSegment?: Maybe<Scalars['String']>;
  Saved?: Maybe<Scalars['Date']>;
  StageName?: Maybe<Scalars['String']>;
  StartPublish?: Maybe<Scalars['Date']>;
  Status?: Maybe<Scalars['String']>;
  StopPublish?: Maybe<Scalars['Date']>;
  Url?: Maybe<Scalars['String']>;
  _children?: Maybe<QueryRef>;
  _fulltext?: Maybe<Array<Maybe<Scalars['String']>>>;
  _score?: Maybe<Scalars['Float']>;
};

export type ArtistDetailsPageAutocomplete = {
  __typename?: 'ArtistDetailsPageAutocomplete';
  Ancestors?: Maybe<Array<Maybe<Scalars['String']>>>;
  ArtistDescription?: Maybe<Array<Maybe<Scalars['String']>>>;
  ArtistGenre?: Maybe<Array<Maybe<Scalars['String']>>>;
  ArtistName?: Maybe<Array<Maybe<Scalars['String']>>>;
  ArtistPhoto?: Maybe<Array<Maybe<Scalars['String']>>>;
  Category?: Maybe<CategoryModelAutocomplete>;
  ContentLink?: Maybe<ContentModelReferenceAutocomplete>;
  ContentType?: Maybe<Array<Maybe<Scalars['String']>>>;
  ExistingLanguages?: Maybe<ContentLanguageModelAutocomplete>;
  Language?: Maybe<ContentLanguageModelAutocomplete>;
  MasterLanguage?: Maybe<ContentLanguageModelAutocomplete>;
  ParentLink?: Maybe<ContentModelReferenceAutocomplete>;
  RelativePath?: Maybe<Array<Maybe<Scalars['String']>>>;
  RouteSegment?: Maybe<Array<Maybe<Scalars['String']>>>;
  StageName?: Maybe<Array<Maybe<Scalars['String']>>>;
  Status?: Maybe<Array<Maybe<Scalars['String']>>>;
  Url?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type ArtistDetailsPageAutocompleteAncestorsArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ArtistDetailsPageAutocompleteArtistDescriptionArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ArtistDetailsPageAutocompleteArtistGenreArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ArtistDetailsPageAutocompleteArtistNameArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ArtistDetailsPageAutocompleteArtistPhotoArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ArtistDetailsPageAutocompleteContentTypeArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ArtistDetailsPageAutocompleteRelativePathArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ArtistDetailsPageAutocompleteRouteSegmentArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ArtistDetailsPageAutocompleteStageNameArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ArtistDetailsPageAutocompleteStatusArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ArtistDetailsPageAutocompleteUrlArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};

export type ArtistDetailsPageFacet = {
  __typename?: 'ArtistDetailsPageFacet';
  Ancestors?: Maybe<Array<Maybe<StringFacet>>>;
  ArtistDescription?: Maybe<Array<Maybe<StringFacet>>>;
  ArtistGenre?: Maybe<Array<Maybe<StringFacet>>>;
  ArtistIsHeadliner?: Maybe<Array<Maybe<StringFacet>>>;
  ArtistName?: Maybe<Array<Maybe<StringFacet>>>;
  ArtistPhoto?: Maybe<Array<Maybe<StringFacet>>>;
  Category?: Maybe<CategoryModelFacet>;
  Changed?: Maybe<Array<Maybe<DateFacet>>>;
  ContentLink?: Maybe<ContentModelReferenceFacet>;
  ContentType?: Maybe<Array<Maybe<StringFacet>>>;
  Created?: Maybe<Array<Maybe<DateFacet>>>;
  ExistingLanguages?: Maybe<ContentLanguageModelFacet>;
  IsCommonDraft?: Maybe<Array<Maybe<StringFacet>>>;
  Language?: Maybe<ContentLanguageModelFacet>;
  MasterLanguage?: Maybe<ContentLanguageModelFacet>;
  Name?: Maybe<Array<Maybe<StringFacet>>>;
  ParentLink?: Maybe<ContentModelReferenceFacet>;
  PerformanceEndTime?: Maybe<Array<Maybe<DateFacet>>>;
  PerformanceStartTime?: Maybe<Array<Maybe<DateFacet>>>;
  RelativePath?: Maybe<Array<Maybe<StringFacet>>>;
  RouteSegment?: Maybe<Array<Maybe<StringFacet>>>;
  Saved?: Maybe<Array<Maybe<DateFacet>>>;
  StageName?: Maybe<Array<Maybe<StringFacet>>>;
  StartPublish?: Maybe<Array<Maybe<DateFacet>>>;
  Status?: Maybe<Array<Maybe<StringFacet>>>;
  StopPublish?: Maybe<Array<Maybe<DateFacet>>>;
  Url?: Maybe<Array<Maybe<StringFacet>>>;
};


export type ArtistDetailsPageFacetAncestorsArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistDetailsPageFacetArtistDescriptionArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistDetailsPageFacetArtistGenreArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistDetailsPageFacetArtistIsHeadlinerArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistDetailsPageFacetArtistNameArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistDetailsPageFacetArtistPhotoArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistDetailsPageFacetChangedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ArtistDetailsPageFacetContentTypeArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistDetailsPageFacetCreatedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ArtistDetailsPageFacetIsCommonDraftArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistDetailsPageFacetNameArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistDetailsPageFacetPerformanceEndTimeArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ArtistDetailsPageFacetPerformanceStartTimeArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ArtistDetailsPageFacetRelativePathArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistDetailsPageFacetRouteSegmentArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistDetailsPageFacetSavedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ArtistDetailsPageFacetStageNameArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistDetailsPageFacetStartPublishArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ArtistDetailsPageFacetStatusArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ArtistDetailsPageFacetStopPublishArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ArtistDetailsPageFacetUrlArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};

export type ArtistDetailsPageOrderByInput = {
  Ancestors?: InputMaybe<OrderBy>;
  ArtistDescription?: InputMaybe<OrderBy>;
  ArtistGenre?: InputMaybe<OrderBy>;
  ArtistIsHeadliner?: InputMaybe<OrderBy>;
  ArtistName?: InputMaybe<OrderBy>;
  ArtistPhoto?: InputMaybe<OrderBy>;
  Category?: InputMaybe<CategoryModelOrderByInput>;
  Changed?: InputMaybe<OrderBy>;
  ContentLink?: InputMaybe<ContentModelReferenceOrderByInput>;
  ContentType?: InputMaybe<OrderBy>;
  Created?: InputMaybe<OrderBy>;
  ExistingLanguages?: InputMaybe<ContentLanguageModelOrderByInput>;
  IsCommonDraft?: InputMaybe<OrderBy>;
  Language?: InputMaybe<ContentLanguageModelOrderByInput>;
  MasterLanguage?: InputMaybe<ContentLanguageModelOrderByInput>;
  Name?: InputMaybe<OrderBy>;
  ParentLink?: InputMaybe<ContentModelReferenceOrderByInput>;
  PerformanceEndTime?: InputMaybe<OrderBy>;
  PerformanceStartTime?: InputMaybe<OrderBy>;
  RelativePath?: InputMaybe<OrderBy>;
  RouteSegment?: InputMaybe<OrderBy>;
  Saved?: InputMaybe<OrderBy>;
  StageName?: InputMaybe<OrderBy>;
  StartPublish?: InputMaybe<OrderBy>;
  Status?: InputMaybe<OrderBy>;
  StopPublish?: InputMaybe<OrderBy>;
  Url?: InputMaybe<OrderBy>;
  _ranking?: InputMaybe<Ranking>;
};

export type ArtistDetailsPageOutput = {
  __typename?: 'ArtistDetailsPageOutput';
  autocomplete?: Maybe<ArtistDetailsPageAutocomplete>;
  cursor?: Maybe<Scalars['String']>;
  facets?: Maybe<ArtistDetailsPageFacet>;
  items?: Maybe<Array<Maybe<ArtistDetailsPage>>>;
  total?: Maybe<Scalars['Int']>;
};


export type ArtistDetailsPageOutputTotalArgs = {
  all?: InputMaybe<Scalars['Boolean']>;
};

export type ArtistDetailsPageWhereInput = {
  Ancestors?: InputMaybe<StringFilterInput>;
  ArtistDescription?: InputMaybe<StringFilterInput>;
  ArtistGenre?: InputMaybe<StringFilterInput>;
  ArtistIsHeadliner?: InputMaybe<BoolFilterInput>;
  ArtistName?: InputMaybe<StringFilterInput>;
  ArtistPhoto?: InputMaybe<StringFilterInput>;
  Category?: InputMaybe<CategoryModelWhereInput>;
  Changed?: InputMaybe<DateFilterInput>;
  ContentLink?: InputMaybe<ContentModelReferenceWhereInput>;
  ContentType?: InputMaybe<StringFilterInput>;
  Created?: InputMaybe<DateFilterInput>;
  ExistingLanguages?: InputMaybe<ContentLanguageModelWhereInput>;
  IsCommonDraft?: InputMaybe<BoolFilterInput>;
  Language?: InputMaybe<ContentLanguageModelWhereInput>;
  MasterLanguage?: InputMaybe<ContentLanguageModelWhereInput>;
  Name?: InputMaybe<SearchableStringFilterInput>;
  ParentLink?: InputMaybe<ContentModelReferenceWhereInput>;
  PerformanceEndTime?: InputMaybe<DateFilterInput>;
  PerformanceStartTime?: InputMaybe<DateFilterInput>;
  RelativePath?: InputMaybe<StringFilterInput>;
  RouteSegment?: InputMaybe<StringFilterInput>;
  Saved?: InputMaybe<DateFilterInput>;
  StageName?: InputMaybe<StringFilterInput>;
  StartPublish?: InputMaybe<DateFilterInput>;
  Status?: InputMaybe<StringFilterInput>;
  StopPublish?: InputMaybe<DateFilterInput>;
  Url?: InputMaybe<StringFilterInput>;
  _and?: InputMaybe<Array<InputMaybe<ArtistDetailsPageWhereInput>>>;
  _fulltext?: InputMaybe<SearchableStringFilterInput>;
  _modified?: InputMaybe<DateFilterInput>;
  _not?: InputMaybe<Array<InputMaybe<ArtistDetailsPageWhereInput>>>;
  _or?: InputMaybe<Array<InputMaybe<ArtistDetailsPageWhereInput>>>;
};

export type BlobModel = {
  __typename?: 'BlobModel';
  Id?: Maybe<Scalars['String']>;
  Url?: Maybe<Scalars['String']>;
};

export type BlobModelAutocomplete = {
  __typename?: 'BlobModelAutocomplete';
  Id?: Maybe<Array<Maybe<Scalars['String']>>>;
  Url?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type BlobModelAutocompleteIdArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type BlobModelAutocompleteUrlArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};

export type BlobModelFacet = {
  __typename?: 'BlobModelFacet';
  Id?: Maybe<Array<Maybe<StringFacet>>>;
  Url?: Maybe<Array<Maybe<StringFacet>>>;
};


export type BlobModelFacetIdArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type BlobModelFacetUrlArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};

export type BlobModelOrderByInput = {
  Id?: InputMaybe<OrderBy>;
  Url?: InputMaybe<OrderBy>;
};

export type BlobModelWhereInput = {
  Id?: InputMaybe<StringFilterInput>;
  Url?: InputMaybe<StringFilterInput>;
};

export type BoolFilterInput = {
  /** `boost` influences the weight of a field by boosting a match with a number (default: 1) — counts more towards the eventual relevance score which can be projected with `_score` — at query time. Note that `boost` cannot be a negative number. */
  boost?: InputMaybe<Scalars['Int']>;
  /** `eq` matches on an exact value, but the value is case-insensitive. */
  eq?: InputMaybe<Scalars['Boolean']>;
  /** `exist` matches results that have this field. */
  exist?: InputMaybe<Scalars['Boolean']>;
  /** `not_eq` retrieves results not matching with an exact (but case-insensitive) value. */
  notEq?: InputMaybe<Scalars['Boolean']>;
};

export type BuyTicketBlock = IContent & {
  __typename?: 'BuyTicketBlock';
  Ancestors?: Maybe<Array<Maybe<Scalars['String']>>>;
  Category?: Maybe<Array<Maybe<CategoryModel>>>;
  Changed?: Maybe<Scalars['Date']>;
  ContentLink?: Maybe<ContentModelReference>;
  ContentType?: Maybe<Array<Maybe<Scalars['String']>>>;
  Created?: Maybe<Scalars['Date']>;
  ExistingLanguages?: Maybe<Array<Maybe<ContentLanguageModel>>>;
  Heading?: Maybe<Scalars['String']>;
  IsCommonDraft?: Maybe<Scalars['Bool']>;
  Language?: Maybe<ContentLanguageModel>;
  MasterLanguage?: Maybe<ContentLanguageModel>;
  Message?: Maybe<Scalars['String']>;
  Name?: Maybe<Scalars['String']>;
  ParentLink?: Maybe<ContentModelReference>;
  RelativePath?: Maybe<Scalars['String']>;
  RouteSegment?: Maybe<Scalars['String']>;
  Saved?: Maybe<Scalars['Date']>;
  StartPublish?: Maybe<Scalars['Date']>;
  Status?: Maybe<Scalars['String']>;
  StopPublish?: Maybe<Scalars['Date']>;
  Url?: Maybe<Scalars['String']>;
  _children?: Maybe<QueryRef>;
  _fulltext?: Maybe<Array<Maybe<Scalars['String']>>>;
  _score?: Maybe<Scalars['Float']>;
};

export type BuyTicketBlockAutocomplete = {
  __typename?: 'BuyTicketBlockAutocomplete';
  Ancestors?: Maybe<Array<Maybe<Scalars['String']>>>;
  Category?: Maybe<CategoryModelAutocomplete>;
  ContentLink?: Maybe<ContentModelReferenceAutocomplete>;
  ContentType?: Maybe<Array<Maybe<Scalars['String']>>>;
  ExistingLanguages?: Maybe<ContentLanguageModelAutocomplete>;
  Heading?: Maybe<Array<Maybe<Scalars['String']>>>;
  Language?: Maybe<ContentLanguageModelAutocomplete>;
  MasterLanguage?: Maybe<ContentLanguageModelAutocomplete>;
  Message?: Maybe<Array<Maybe<Scalars['String']>>>;
  ParentLink?: Maybe<ContentModelReferenceAutocomplete>;
  RelativePath?: Maybe<Array<Maybe<Scalars['String']>>>;
  RouteSegment?: Maybe<Array<Maybe<Scalars['String']>>>;
  Status?: Maybe<Array<Maybe<Scalars['String']>>>;
  Url?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type BuyTicketBlockAutocompleteAncestorsArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type BuyTicketBlockAutocompleteContentTypeArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type BuyTicketBlockAutocompleteHeadingArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type BuyTicketBlockAutocompleteMessageArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type BuyTicketBlockAutocompleteRelativePathArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type BuyTicketBlockAutocompleteRouteSegmentArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type BuyTicketBlockAutocompleteStatusArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type BuyTicketBlockAutocompleteUrlArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};

export type BuyTicketBlockFacet = {
  __typename?: 'BuyTicketBlockFacet';
  Ancestors?: Maybe<Array<Maybe<StringFacet>>>;
  Category?: Maybe<CategoryModelFacet>;
  Changed?: Maybe<Array<Maybe<DateFacet>>>;
  ContentLink?: Maybe<ContentModelReferenceFacet>;
  ContentType?: Maybe<Array<Maybe<StringFacet>>>;
  Created?: Maybe<Array<Maybe<DateFacet>>>;
  ExistingLanguages?: Maybe<ContentLanguageModelFacet>;
  Heading?: Maybe<Array<Maybe<StringFacet>>>;
  IsCommonDraft?: Maybe<Array<Maybe<StringFacet>>>;
  Language?: Maybe<ContentLanguageModelFacet>;
  MasterLanguage?: Maybe<ContentLanguageModelFacet>;
  Message?: Maybe<Array<Maybe<StringFacet>>>;
  Name?: Maybe<Array<Maybe<StringFacet>>>;
  ParentLink?: Maybe<ContentModelReferenceFacet>;
  RelativePath?: Maybe<Array<Maybe<StringFacet>>>;
  RouteSegment?: Maybe<Array<Maybe<StringFacet>>>;
  Saved?: Maybe<Array<Maybe<DateFacet>>>;
  StartPublish?: Maybe<Array<Maybe<DateFacet>>>;
  Status?: Maybe<Array<Maybe<StringFacet>>>;
  StopPublish?: Maybe<Array<Maybe<DateFacet>>>;
  Url?: Maybe<Array<Maybe<StringFacet>>>;
};


export type BuyTicketBlockFacetAncestorsArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type BuyTicketBlockFacetChangedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type BuyTicketBlockFacetContentTypeArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type BuyTicketBlockFacetCreatedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type BuyTicketBlockFacetHeadingArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type BuyTicketBlockFacetIsCommonDraftArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type BuyTicketBlockFacetMessageArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type BuyTicketBlockFacetNameArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type BuyTicketBlockFacetRelativePathArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type BuyTicketBlockFacetRouteSegmentArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type BuyTicketBlockFacetSavedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type BuyTicketBlockFacetStartPublishArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type BuyTicketBlockFacetStatusArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type BuyTicketBlockFacetStopPublishArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type BuyTicketBlockFacetUrlArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};

export type BuyTicketBlockOrderByInput = {
  Ancestors?: InputMaybe<OrderBy>;
  Category?: InputMaybe<CategoryModelOrderByInput>;
  Changed?: InputMaybe<OrderBy>;
  ContentLink?: InputMaybe<ContentModelReferenceOrderByInput>;
  ContentType?: InputMaybe<OrderBy>;
  Created?: InputMaybe<OrderBy>;
  ExistingLanguages?: InputMaybe<ContentLanguageModelOrderByInput>;
  Heading?: InputMaybe<OrderBy>;
  IsCommonDraft?: InputMaybe<OrderBy>;
  Language?: InputMaybe<ContentLanguageModelOrderByInput>;
  MasterLanguage?: InputMaybe<ContentLanguageModelOrderByInput>;
  Message?: InputMaybe<OrderBy>;
  Name?: InputMaybe<OrderBy>;
  ParentLink?: InputMaybe<ContentModelReferenceOrderByInput>;
  RelativePath?: InputMaybe<OrderBy>;
  RouteSegment?: InputMaybe<OrderBy>;
  Saved?: InputMaybe<OrderBy>;
  StartPublish?: InputMaybe<OrderBy>;
  Status?: InputMaybe<OrderBy>;
  StopPublish?: InputMaybe<OrderBy>;
  Url?: InputMaybe<OrderBy>;
  _ranking?: InputMaybe<Ranking>;
};

export type BuyTicketBlockOutput = {
  __typename?: 'BuyTicketBlockOutput';
  autocomplete?: Maybe<BuyTicketBlockAutocomplete>;
  cursor?: Maybe<Scalars['String']>;
  facets?: Maybe<BuyTicketBlockFacet>;
  items?: Maybe<Array<Maybe<BuyTicketBlock>>>;
  total?: Maybe<Scalars['Int']>;
};


export type BuyTicketBlockOutputTotalArgs = {
  all?: InputMaybe<Scalars['Boolean']>;
};

export type BuyTicketBlockWhereInput = {
  Ancestors?: InputMaybe<StringFilterInput>;
  Category?: InputMaybe<CategoryModelWhereInput>;
  Changed?: InputMaybe<DateFilterInput>;
  ContentLink?: InputMaybe<ContentModelReferenceWhereInput>;
  ContentType?: InputMaybe<StringFilterInput>;
  Created?: InputMaybe<DateFilterInput>;
  ExistingLanguages?: InputMaybe<ContentLanguageModelWhereInput>;
  Heading?: InputMaybe<StringFilterInput>;
  IsCommonDraft?: InputMaybe<BoolFilterInput>;
  Language?: InputMaybe<ContentLanguageModelWhereInput>;
  MasterLanguage?: InputMaybe<ContentLanguageModelWhereInput>;
  Message?: InputMaybe<StringFilterInput>;
  Name?: InputMaybe<SearchableStringFilterInput>;
  ParentLink?: InputMaybe<ContentModelReferenceWhereInput>;
  RelativePath?: InputMaybe<StringFilterInput>;
  RouteSegment?: InputMaybe<StringFilterInput>;
  Saved?: InputMaybe<DateFilterInput>;
  StartPublish?: InputMaybe<DateFilterInput>;
  Status?: InputMaybe<StringFilterInput>;
  StopPublish?: InputMaybe<DateFilterInput>;
  Url?: InputMaybe<StringFilterInput>;
  _and?: InputMaybe<Array<InputMaybe<BuyTicketBlockWhereInput>>>;
  _fulltext?: InputMaybe<SearchableStringFilterInput>;
  _modified?: InputMaybe<DateFilterInput>;
  _not?: InputMaybe<Array<InputMaybe<BuyTicketBlockWhereInput>>>;
  _or?: InputMaybe<Array<InputMaybe<BuyTicketBlockWhereInput>>>;
};

export type CategoryModel = {
  __typename?: 'CategoryModel';
  Description?: Maybe<Scalars['String']>;
  Id?: Maybe<Scalars['Int']>;
  Name?: Maybe<Scalars['String']>;
};

export type CategoryModelAutocomplete = {
  __typename?: 'CategoryModelAutocomplete';
  Description?: Maybe<Array<Maybe<Scalars['String']>>>;
  Name?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type CategoryModelAutocompleteDescriptionArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type CategoryModelAutocompleteNameArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};

export type CategoryModelFacet = {
  __typename?: 'CategoryModelFacet';
  Description?: Maybe<Array<Maybe<StringFacet>>>;
  Id?: Maybe<Array<Maybe<NumberFacet>>>;
  Name?: Maybe<Array<Maybe<StringFacet>>>;
};


export type CategoryModelFacetDescriptionArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type CategoryModelFacetIdArgs = {
  ranges?: InputMaybe<Array<InputMaybe<RangeFacetsInput>>>;
};


export type CategoryModelFacetNameArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};

export type CategoryModelOrderByInput = {
  Description?: InputMaybe<OrderBy>;
  Id?: InputMaybe<OrderBy>;
  Name?: InputMaybe<OrderBy>;
};

export type CategoryModelWhereInput = {
  Description?: InputMaybe<StringFilterInput>;
  Id?: InputMaybe<IntFilterInput>;
  Name?: InputMaybe<StringFilterInput>;
};

export type Content = IContent & {
  __typename?: 'Content';
  Ancestors?: Maybe<Array<Maybe<Scalars['String']>>>;
  Changed?: Maybe<Scalars['Date']>;
  ContentLink?: Maybe<ContentModelReference>;
  ContentType?: Maybe<Array<Maybe<Scalars['String']>>>;
  Created?: Maybe<Scalars['Date']>;
  ExistingLanguages?: Maybe<Array<Maybe<ContentLanguageModel>>>;
  IsCommonDraft?: Maybe<Scalars['Bool']>;
  Language?: Maybe<ContentLanguageModel>;
  MasterLanguage?: Maybe<ContentLanguageModel>;
  Name?: Maybe<Scalars['String']>;
  ParentLink?: Maybe<ContentModelReference>;
  RelativePath?: Maybe<Scalars['String']>;
  RouteSegment?: Maybe<Scalars['String']>;
  Saved?: Maybe<Scalars['Date']>;
  StartPublish?: Maybe<Scalars['Date']>;
  Status?: Maybe<Scalars['String']>;
  StopPublish?: Maybe<Scalars['Date']>;
  Url?: Maybe<Scalars['String']>;
  _children?: Maybe<QueryRef>;
  _fulltext?: Maybe<Array<Maybe<Scalars['String']>>>;
  _score?: Maybe<Scalars['Float']>;
};

export type ContentAreaItemModel = {
  __typename?: 'ContentAreaItemModel';
  ContentLink?: Maybe<ContentModelReference>;
  DisplayOption?: Maybe<Scalars['String']>;
  Tag?: Maybe<Scalars['String']>;
};

export type ContentAreaItemModelAutocomplete = {
  __typename?: 'ContentAreaItemModelAutocomplete';
  ContentLink?: Maybe<ContentModelReferenceAutocomplete>;
  DisplayOption?: Maybe<Array<Maybe<Scalars['String']>>>;
  Tag?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type ContentAreaItemModelAutocompleteDisplayOptionArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ContentAreaItemModelAutocompleteTagArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};

export type ContentAreaItemModelFacet = {
  __typename?: 'ContentAreaItemModelFacet';
  ContentLink?: Maybe<ContentModelReferenceFacet>;
  DisplayOption?: Maybe<Array<Maybe<StringFacet>>>;
  Tag?: Maybe<Array<Maybe<StringFacet>>>;
};


export type ContentAreaItemModelFacetDisplayOptionArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentAreaItemModelFacetTagArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};

export type ContentAreaItemModelOrderByInput = {
  ContentLink?: InputMaybe<ContentModelReferenceOrderByInput>;
  DisplayOption?: InputMaybe<OrderBy>;
  Tag?: InputMaybe<OrderBy>;
};

export type ContentAreaItemModelWhereInput = {
  ContentLink?: InputMaybe<ContentModelReferenceWhereInput>;
  DisplayOption?: InputMaybe<StringFilterInput>;
  Tag?: InputMaybe<StringFilterInput>;
};

export type ContentAutocomplete = {
  __typename?: 'ContentAutocomplete';
  Ancestors?: Maybe<Array<Maybe<Scalars['String']>>>;
  ContentLink?: Maybe<ContentModelReferenceAutocomplete>;
  ContentType?: Maybe<Array<Maybe<Scalars['String']>>>;
  ExistingLanguages?: Maybe<ContentLanguageModelAutocomplete>;
  Language?: Maybe<ContentLanguageModelAutocomplete>;
  MasterLanguage?: Maybe<ContentLanguageModelAutocomplete>;
  ParentLink?: Maybe<ContentModelReferenceAutocomplete>;
  RelativePath?: Maybe<Array<Maybe<Scalars['String']>>>;
  RouteSegment?: Maybe<Array<Maybe<Scalars['String']>>>;
  Status?: Maybe<Array<Maybe<Scalars['String']>>>;
  Url?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type ContentAutocompleteAncestorsArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ContentAutocompleteContentTypeArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ContentAutocompleteRelativePathArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ContentAutocompleteRouteSegmentArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ContentAutocompleteStatusArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ContentAutocompleteUrlArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};

export type ContentBlock = IContent & {
  __typename?: 'ContentBlock';
  Ancestors?: Maybe<Array<Maybe<Scalars['String']>>>;
  Category?: Maybe<Array<Maybe<CategoryModel>>>;
  Changed?: Maybe<Scalars['Date']>;
  Content?: Maybe<Scalars['String']>;
  ContentLink?: Maybe<ContentModelReference>;
  ContentType?: Maybe<Array<Maybe<Scalars['String']>>>;
  Created?: Maybe<Scalars['Date']>;
  ExistingLanguages?: Maybe<Array<Maybe<ContentLanguageModel>>>;
  Image?: Maybe<Scalars['String']>;
  ImageAlignment?: Maybe<Scalars['String']>;
  IsCommonDraft?: Maybe<Scalars['Bool']>;
  Language?: Maybe<ContentLanguageModel>;
  MasterLanguage?: Maybe<ContentLanguageModel>;
  Name?: Maybe<Scalars['String']>;
  ParentLink?: Maybe<ContentModelReference>;
  RelativePath?: Maybe<Scalars['String']>;
  RouteSegment?: Maybe<Scalars['String']>;
  Saved?: Maybe<Scalars['Date']>;
  StartPublish?: Maybe<Scalars['Date']>;
  Status?: Maybe<Scalars['String']>;
  StopPublish?: Maybe<Scalars['Date']>;
  Title?: Maybe<Scalars['String']>;
  Url?: Maybe<Scalars['String']>;
  _children?: Maybe<QueryRef>;
  _fulltext?: Maybe<Array<Maybe<Scalars['String']>>>;
  _score?: Maybe<Scalars['Float']>;
};

export type ContentBlockAutocomplete = {
  __typename?: 'ContentBlockAutocomplete';
  Ancestors?: Maybe<Array<Maybe<Scalars['String']>>>;
  Category?: Maybe<CategoryModelAutocomplete>;
  Content?: Maybe<Array<Maybe<Scalars['String']>>>;
  ContentLink?: Maybe<ContentModelReferenceAutocomplete>;
  ContentType?: Maybe<Array<Maybe<Scalars['String']>>>;
  ExistingLanguages?: Maybe<ContentLanguageModelAutocomplete>;
  Image?: Maybe<Array<Maybe<Scalars['String']>>>;
  ImageAlignment?: Maybe<Array<Maybe<Scalars['String']>>>;
  Language?: Maybe<ContentLanguageModelAutocomplete>;
  MasterLanguage?: Maybe<ContentLanguageModelAutocomplete>;
  ParentLink?: Maybe<ContentModelReferenceAutocomplete>;
  RelativePath?: Maybe<Array<Maybe<Scalars['String']>>>;
  RouteSegment?: Maybe<Array<Maybe<Scalars['String']>>>;
  Status?: Maybe<Array<Maybe<Scalars['String']>>>;
  Title?: Maybe<Array<Maybe<Scalars['String']>>>;
  Url?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type ContentBlockAutocompleteAncestorsArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ContentBlockAutocompleteContentArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ContentBlockAutocompleteContentTypeArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ContentBlockAutocompleteImageArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ContentBlockAutocompleteImageAlignmentArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ContentBlockAutocompleteRelativePathArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ContentBlockAutocompleteRouteSegmentArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ContentBlockAutocompleteStatusArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ContentBlockAutocompleteTitleArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ContentBlockAutocompleteUrlArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};

export type ContentBlockFacet = {
  __typename?: 'ContentBlockFacet';
  Ancestors?: Maybe<Array<Maybe<StringFacet>>>;
  Category?: Maybe<CategoryModelFacet>;
  Changed?: Maybe<Array<Maybe<DateFacet>>>;
  Content?: Maybe<Array<Maybe<StringFacet>>>;
  ContentLink?: Maybe<ContentModelReferenceFacet>;
  ContentType?: Maybe<Array<Maybe<StringFacet>>>;
  Created?: Maybe<Array<Maybe<DateFacet>>>;
  ExistingLanguages?: Maybe<ContentLanguageModelFacet>;
  Image?: Maybe<Array<Maybe<StringFacet>>>;
  ImageAlignment?: Maybe<Array<Maybe<StringFacet>>>;
  IsCommonDraft?: Maybe<Array<Maybe<StringFacet>>>;
  Language?: Maybe<ContentLanguageModelFacet>;
  MasterLanguage?: Maybe<ContentLanguageModelFacet>;
  Name?: Maybe<Array<Maybe<StringFacet>>>;
  ParentLink?: Maybe<ContentModelReferenceFacet>;
  RelativePath?: Maybe<Array<Maybe<StringFacet>>>;
  RouteSegment?: Maybe<Array<Maybe<StringFacet>>>;
  Saved?: Maybe<Array<Maybe<DateFacet>>>;
  StartPublish?: Maybe<Array<Maybe<DateFacet>>>;
  Status?: Maybe<Array<Maybe<StringFacet>>>;
  StopPublish?: Maybe<Array<Maybe<DateFacet>>>;
  Title?: Maybe<Array<Maybe<StringFacet>>>;
  Url?: Maybe<Array<Maybe<StringFacet>>>;
};


export type ContentBlockFacetAncestorsArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentBlockFacetChangedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ContentBlockFacetContentArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentBlockFacetContentTypeArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentBlockFacetCreatedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ContentBlockFacetImageArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentBlockFacetImageAlignmentArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentBlockFacetIsCommonDraftArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentBlockFacetNameArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentBlockFacetRelativePathArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentBlockFacetRouteSegmentArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentBlockFacetSavedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ContentBlockFacetStartPublishArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ContentBlockFacetStatusArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentBlockFacetStopPublishArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ContentBlockFacetTitleArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentBlockFacetUrlArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};

export type ContentBlockOrderByInput = {
  Ancestors?: InputMaybe<OrderBy>;
  Category?: InputMaybe<CategoryModelOrderByInput>;
  Changed?: InputMaybe<OrderBy>;
  Content?: InputMaybe<OrderBy>;
  ContentLink?: InputMaybe<ContentModelReferenceOrderByInput>;
  ContentType?: InputMaybe<OrderBy>;
  Created?: InputMaybe<OrderBy>;
  ExistingLanguages?: InputMaybe<ContentLanguageModelOrderByInput>;
  Image?: InputMaybe<OrderBy>;
  ImageAlignment?: InputMaybe<OrderBy>;
  IsCommonDraft?: InputMaybe<OrderBy>;
  Language?: InputMaybe<ContentLanguageModelOrderByInput>;
  MasterLanguage?: InputMaybe<ContentLanguageModelOrderByInput>;
  Name?: InputMaybe<OrderBy>;
  ParentLink?: InputMaybe<ContentModelReferenceOrderByInput>;
  RelativePath?: InputMaybe<OrderBy>;
  RouteSegment?: InputMaybe<OrderBy>;
  Saved?: InputMaybe<OrderBy>;
  StartPublish?: InputMaybe<OrderBy>;
  Status?: InputMaybe<OrderBy>;
  StopPublish?: InputMaybe<OrderBy>;
  Title?: InputMaybe<OrderBy>;
  Url?: InputMaybe<OrderBy>;
  _ranking?: InputMaybe<Ranking>;
};

export type ContentBlockOutput = {
  __typename?: 'ContentBlockOutput';
  autocomplete?: Maybe<ContentBlockAutocomplete>;
  cursor?: Maybe<Scalars['String']>;
  facets?: Maybe<ContentBlockFacet>;
  items?: Maybe<Array<Maybe<ContentBlock>>>;
  total?: Maybe<Scalars['Int']>;
};


export type ContentBlockOutputTotalArgs = {
  all?: InputMaybe<Scalars['Boolean']>;
};

export type ContentBlockWhereInput = {
  Ancestors?: InputMaybe<StringFilterInput>;
  Category?: InputMaybe<CategoryModelWhereInput>;
  Changed?: InputMaybe<DateFilterInput>;
  Content?: InputMaybe<StringFilterInput>;
  ContentLink?: InputMaybe<ContentModelReferenceWhereInput>;
  ContentType?: InputMaybe<StringFilterInput>;
  Created?: InputMaybe<DateFilterInput>;
  ExistingLanguages?: InputMaybe<ContentLanguageModelWhereInput>;
  Image?: InputMaybe<StringFilterInput>;
  ImageAlignment?: InputMaybe<StringFilterInput>;
  IsCommonDraft?: InputMaybe<BoolFilterInput>;
  Language?: InputMaybe<ContentLanguageModelWhereInput>;
  MasterLanguage?: InputMaybe<ContentLanguageModelWhereInput>;
  Name?: InputMaybe<SearchableStringFilterInput>;
  ParentLink?: InputMaybe<ContentModelReferenceWhereInput>;
  RelativePath?: InputMaybe<StringFilterInput>;
  RouteSegment?: InputMaybe<StringFilterInput>;
  Saved?: InputMaybe<DateFilterInput>;
  StartPublish?: InputMaybe<DateFilterInput>;
  Status?: InputMaybe<StringFilterInput>;
  StopPublish?: InputMaybe<DateFilterInput>;
  Title?: InputMaybe<StringFilterInput>;
  Url?: InputMaybe<StringFilterInput>;
  _and?: InputMaybe<Array<InputMaybe<ContentBlockWhereInput>>>;
  _fulltext?: InputMaybe<SearchableStringFilterInput>;
  _modified?: InputMaybe<DateFilterInput>;
  _not?: InputMaybe<Array<InputMaybe<ContentBlockWhereInput>>>;
  _or?: InputMaybe<Array<InputMaybe<ContentBlockWhereInput>>>;
};

export type ContentFacet = {
  __typename?: 'ContentFacet';
  Ancestors?: Maybe<Array<Maybe<StringFacet>>>;
  Changed?: Maybe<Array<Maybe<DateFacet>>>;
  ContentLink?: Maybe<ContentModelReferenceFacet>;
  ContentType?: Maybe<Array<Maybe<StringFacet>>>;
  Created?: Maybe<Array<Maybe<DateFacet>>>;
  ExistingLanguages?: Maybe<ContentLanguageModelFacet>;
  IsCommonDraft?: Maybe<Array<Maybe<StringFacet>>>;
  Language?: Maybe<ContentLanguageModelFacet>;
  MasterLanguage?: Maybe<ContentLanguageModelFacet>;
  Name?: Maybe<Array<Maybe<StringFacet>>>;
  ParentLink?: Maybe<ContentModelReferenceFacet>;
  RelativePath?: Maybe<Array<Maybe<StringFacet>>>;
  RouteSegment?: Maybe<Array<Maybe<StringFacet>>>;
  Saved?: Maybe<Array<Maybe<DateFacet>>>;
  StartPublish?: Maybe<Array<Maybe<DateFacet>>>;
  Status?: Maybe<Array<Maybe<StringFacet>>>;
  StopPublish?: Maybe<Array<Maybe<DateFacet>>>;
  Url?: Maybe<Array<Maybe<StringFacet>>>;
};


export type ContentFacetAncestorsArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentFacetChangedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ContentFacetContentTypeArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentFacetCreatedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ContentFacetIsCommonDraftArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentFacetNameArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentFacetRelativePathArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentFacetRouteSegmentArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentFacetSavedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ContentFacetStartPublishArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ContentFacetStatusArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentFacetStopPublishArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ContentFacetUrlArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};

export type ContentLanguageModel = {
  __typename?: 'ContentLanguageModel';
  DisplayName?: Maybe<Scalars['String']>;
  Link?: Maybe<Scalars['String']>;
  Name?: Maybe<Scalars['String']>;
};

export type ContentLanguageModelAutocomplete = {
  __typename?: 'ContentLanguageModelAutocomplete';
  DisplayName?: Maybe<Array<Maybe<Scalars['String']>>>;
  Link?: Maybe<Array<Maybe<Scalars['String']>>>;
  Name?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type ContentLanguageModelAutocompleteDisplayNameArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ContentLanguageModelAutocompleteLinkArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ContentLanguageModelAutocompleteNameArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};

export type ContentLanguageModelFacet = {
  __typename?: 'ContentLanguageModelFacet';
  DisplayName?: Maybe<Array<Maybe<StringFacet>>>;
  Link?: Maybe<Array<Maybe<StringFacet>>>;
  Name?: Maybe<Array<Maybe<StringFacet>>>;
};


export type ContentLanguageModelFacetDisplayNameArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentLanguageModelFacetLinkArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentLanguageModelFacetNameArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};

export type ContentLanguageModelOrderByInput = {
  DisplayName?: InputMaybe<OrderBy>;
  Link?: InputMaybe<OrderBy>;
  Name?: InputMaybe<OrderBy>;
};

export type ContentLanguageModelWhereInput = {
  DisplayName?: InputMaybe<StringFilterInput>;
  Link?: InputMaybe<StringFilterInput>;
  Name?: InputMaybe<StringFilterInput>;
};

export type ContentModelReference = {
  __typename?: 'ContentModelReference';
  Expanded?: Maybe<IContent>;
  GuidValue?: Maybe<Scalars['String']>;
  Id?: Maybe<Scalars['Int']>;
  Language?: Maybe<ContentLanguageModel>;
  ProviderName?: Maybe<Scalars['String']>;
  Url?: Maybe<Scalars['String']>;
  WorkId?: Maybe<Scalars['Int']>;
};

export type ContentModelReferenceAutocomplete = {
  __typename?: 'ContentModelReferenceAutocomplete';
  GuidValue?: Maybe<Array<Maybe<Scalars['String']>>>;
  Language?: Maybe<ContentLanguageModelAutocomplete>;
  ProviderName?: Maybe<Array<Maybe<Scalars['String']>>>;
  Url?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type ContentModelReferenceAutocompleteGuidValueArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ContentModelReferenceAutocompleteProviderNameArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ContentModelReferenceAutocompleteUrlArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};

export type ContentModelReferenceFacet = {
  __typename?: 'ContentModelReferenceFacet';
  GuidValue?: Maybe<Array<Maybe<StringFacet>>>;
  Id?: Maybe<Array<Maybe<NumberFacet>>>;
  Language?: Maybe<ContentLanguageModelFacet>;
  ProviderName?: Maybe<Array<Maybe<StringFacet>>>;
  Url?: Maybe<Array<Maybe<StringFacet>>>;
  WorkId?: Maybe<Array<Maybe<NumberFacet>>>;
};


export type ContentModelReferenceFacetGuidValueArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentModelReferenceFacetIdArgs = {
  ranges?: InputMaybe<Array<InputMaybe<RangeFacetsInput>>>;
};


export type ContentModelReferenceFacetProviderNameArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentModelReferenceFacetUrlArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ContentModelReferenceFacetWorkIdArgs = {
  ranges?: InputMaybe<Array<InputMaybe<RangeFacetsInput>>>;
};

export type ContentModelReferenceOrderByInput = {
  GuidValue?: InputMaybe<OrderBy>;
  Id?: InputMaybe<OrderBy>;
  Language?: InputMaybe<ContentLanguageModelOrderByInput>;
  ProviderName?: InputMaybe<OrderBy>;
  Url?: InputMaybe<OrderBy>;
  WorkId?: InputMaybe<OrderBy>;
};

export type ContentModelReferenceWhereInput = {
  GuidValue?: InputMaybe<StringFilterInput>;
  Id?: InputMaybe<IntFilterInput>;
  Language?: InputMaybe<ContentLanguageModelWhereInput>;
  ProviderName?: InputMaybe<StringFilterInput>;
  Url?: InputMaybe<StringFilterInput>;
  WorkId?: InputMaybe<IntFilterInput>;
};

export type ContentOrderByInput = {
  Ancestors?: InputMaybe<OrderBy>;
  Changed?: InputMaybe<OrderBy>;
  ContentLink?: InputMaybe<ContentModelReferenceOrderByInput>;
  ContentType?: InputMaybe<OrderBy>;
  Created?: InputMaybe<OrderBy>;
  ExistingLanguages?: InputMaybe<ContentLanguageModelOrderByInput>;
  IsCommonDraft?: InputMaybe<OrderBy>;
  Language?: InputMaybe<ContentLanguageModelOrderByInput>;
  MasterLanguage?: InputMaybe<ContentLanguageModelOrderByInput>;
  Name?: InputMaybe<OrderBy>;
  ParentLink?: InputMaybe<ContentModelReferenceOrderByInput>;
  RelativePath?: InputMaybe<OrderBy>;
  RouteSegment?: InputMaybe<OrderBy>;
  Saved?: InputMaybe<OrderBy>;
  StartPublish?: InputMaybe<OrderBy>;
  Status?: InputMaybe<OrderBy>;
  StopPublish?: InputMaybe<OrderBy>;
  Url?: InputMaybe<OrderBy>;
  _ranking?: InputMaybe<Ranking>;
};

export type ContentOutput = {
  __typename?: 'ContentOutput';
  autocomplete?: Maybe<ContentAutocomplete>;
  cursor?: Maybe<Scalars['String']>;
  facets?: Maybe<ContentFacet>;
  items?: Maybe<Array<Maybe<IContent>>>;
  total?: Maybe<Scalars['Int']>;
};


export type ContentOutputTotalArgs = {
  all?: InputMaybe<Scalars['Boolean']>;
};

export type ContentRootsModel = {
  __typename?: 'ContentRootsModel';
  ContentAssetsRoot?: Maybe<ContentModelReference>;
  GlobalAssetsRoot?: Maybe<ContentModelReference>;
  RootPage?: Maybe<ContentModelReference>;
  SiteAssetsRoot?: Maybe<ContentModelReference>;
  StartPage?: Maybe<ContentModelReference>;
  WasteBasket?: Maybe<ContentModelReference>;
};

export type ContentRootsModelAutocomplete = {
  __typename?: 'ContentRootsModelAutocomplete';
  ContentAssetsRoot?: Maybe<ContentModelReferenceAutocomplete>;
  GlobalAssetsRoot?: Maybe<ContentModelReferenceAutocomplete>;
  RootPage?: Maybe<ContentModelReferenceAutocomplete>;
  SiteAssetsRoot?: Maybe<ContentModelReferenceAutocomplete>;
  StartPage?: Maybe<ContentModelReferenceAutocomplete>;
  WasteBasket?: Maybe<ContentModelReferenceAutocomplete>;
};

export type ContentRootsModelFacet = {
  __typename?: 'ContentRootsModelFacet';
  ContentAssetsRoot?: Maybe<ContentModelReferenceFacet>;
  GlobalAssetsRoot?: Maybe<ContentModelReferenceFacet>;
  RootPage?: Maybe<ContentModelReferenceFacet>;
  SiteAssetsRoot?: Maybe<ContentModelReferenceFacet>;
  StartPage?: Maybe<ContentModelReferenceFacet>;
  WasteBasket?: Maybe<ContentModelReferenceFacet>;
};

export type ContentRootsModelOrderByInput = {
  ContentAssetsRoot?: InputMaybe<ContentModelReferenceOrderByInput>;
  GlobalAssetsRoot?: InputMaybe<ContentModelReferenceOrderByInput>;
  RootPage?: InputMaybe<ContentModelReferenceOrderByInput>;
  SiteAssetsRoot?: InputMaybe<ContentModelReferenceOrderByInput>;
  StartPage?: InputMaybe<ContentModelReferenceOrderByInput>;
  WasteBasket?: InputMaybe<ContentModelReferenceOrderByInput>;
};

export type ContentRootsModelWhereInput = {
  ContentAssetsRoot?: InputMaybe<ContentModelReferenceWhereInput>;
  GlobalAssetsRoot?: InputMaybe<ContentModelReferenceWhereInput>;
  RootPage?: InputMaybe<ContentModelReferenceWhereInput>;
  SiteAssetsRoot?: InputMaybe<ContentModelReferenceWhereInput>;
  StartPage?: InputMaybe<ContentModelReferenceWhereInput>;
  WasteBasket?: InputMaybe<ContentModelReferenceWhereInput>;
};

export type ContentWhereInput = {
  Ancestors?: InputMaybe<StringFilterInput>;
  Changed?: InputMaybe<DateFilterInput>;
  ContentLink?: InputMaybe<ContentModelReferenceWhereInput>;
  ContentType?: InputMaybe<StringFilterInput>;
  Created?: InputMaybe<DateFilterInput>;
  ExistingLanguages?: InputMaybe<ContentLanguageModelWhereInput>;
  IsCommonDraft?: InputMaybe<BoolFilterInput>;
  Language?: InputMaybe<ContentLanguageModelWhereInput>;
  MasterLanguage?: InputMaybe<ContentLanguageModelWhereInput>;
  Name?: InputMaybe<SearchableStringFilterInput>;
  ParentLink?: InputMaybe<ContentModelReferenceWhereInput>;
  RelativePath?: InputMaybe<StringFilterInput>;
  RouteSegment?: InputMaybe<StringFilterInput>;
  Saved?: InputMaybe<DateFilterInput>;
  StartPublish?: InputMaybe<DateFilterInput>;
  Status?: InputMaybe<StringFilterInput>;
  StopPublish?: InputMaybe<DateFilterInput>;
  Url?: InputMaybe<StringFilterInput>;
  _and?: InputMaybe<Array<InputMaybe<ContentWhereInput>>>;
  _fulltext?: InputMaybe<SearchableStringFilterInput>;
  _modified?: InputMaybe<DateFilterInput>;
  _not?: InputMaybe<Array<InputMaybe<ContentWhereInput>>>;
  _or?: InputMaybe<Array<InputMaybe<ContentWhereInput>>>;
};

export type DateFacet = {
  __typename?: 'DateFacet';
  count?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export enum DateFacetUnit {
  /** Defined as 24 hours (86,400,000 milliseconds). All days begin at the earliest possible time, which is usually 00:00:00 (midnight). */
  Day = 'DAY',
  /** Defined as 60 minutes each (3,600,000 milliseconds). All hours begin at 00 minutes and 00 seconds. */
  Hour = 'HOUR',
  /** Defined as 1000 milliseconds each. */
  Minute = 'MINUTE'
}

export type DateFilterInput = {
  /** `boost` influences the weight of a field by boosting a match with a number (default: 1) — counts more towards the eventual relevance score which can be projected with `_score` — at query time. Note that `boost` cannot be a negative number. */
  boost?: InputMaybe<Scalars['Int']>;
  /** `eq` matches on an exact value, but the value is case-insensitive. */
  eq?: InputMaybe<Scalars['Date']>;
  /** `gt` retrieves results with matches that have a value which is `greater than` it. */
  gt?: InputMaybe<Scalars['Date']>;
  /** `gte` retrieves results with matches that have a value which is `greater than or equal to` it. */
  gte?: InputMaybe<Scalars['Date']>;
  /** `lt` retrieves results with matches that have a value which is `lower than` it. */
  lt?: InputMaybe<Scalars['Date']>;
  /** `lte` retrieves results with matches that have a value which is `lower than or equal to` it. */
  lte?: InputMaybe<Scalars['Date']>;
  /** `not_eq` retrieves results not matching with an exact (but case-insensitive) value. */
  notEq?: InputMaybe<Scalars['Date']>;
};

export type HostDefinitionModel = {
  __typename?: 'HostDefinitionModel';
  Language?: Maybe<ContentLanguageModel>;
  Name?: Maybe<Scalars['String']>;
  Type?: Maybe<Scalars['String']>;
};

export type HostDefinitionModelAutocomplete = {
  __typename?: 'HostDefinitionModelAutocomplete';
  Language?: Maybe<ContentLanguageModelAutocomplete>;
  Name?: Maybe<Array<Maybe<Scalars['String']>>>;
  Type?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type HostDefinitionModelAutocompleteNameArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type HostDefinitionModelAutocompleteTypeArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};

export type HostDefinitionModelFacet = {
  __typename?: 'HostDefinitionModelFacet';
  Language?: Maybe<ContentLanguageModelFacet>;
  Name?: Maybe<Array<Maybe<StringFacet>>>;
  Type?: Maybe<Array<Maybe<StringFacet>>>;
};


export type HostDefinitionModelFacetNameArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type HostDefinitionModelFacetTypeArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};

export type HostDefinitionModelOrderByInput = {
  Language?: InputMaybe<ContentLanguageModelOrderByInput>;
  Name?: InputMaybe<OrderBy>;
  Type?: InputMaybe<OrderBy>;
};

export type HostDefinitionModelWhereInput = {
  Language?: InputMaybe<ContentLanguageModelWhereInput>;
  Name?: InputMaybe<StringFilterInput>;
  Type?: InputMaybe<StringFilterInput>;
};

export type IContent = {
  Ancestors?: Maybe<Array<Maybe<Scalars['String']>>>;
  Changed?: Maybe<Scalars['Date']>;
  ContentLink?: Maybe<ContentModelReference>;
  ContentType?: Maybe<Array<Maybe<Scalars['String']>>>;
  Created?: Maybe<Scalars['Date']>;
  ExistingLanguages?: Maybe<Array<Maybe<ContentLanguageModel>>>;
  IsCommonDraft?: Maybe<Scalars['Bool']>;
  Language?: Maybe<ContentLanguageModel>;
  MasterLanguage?: Maybe<ContentLanguageModel>;
  Name?: Maybe<Scalars['String']>;
  ParentLink?: Maybe<ContentModelReference>;
  RelativePath?: Maybe<Scalars['String']>;
  RouteSegment?: Maybe<Scalars['String']>;
  Saved?: Maybe<Scalars['Date']>;
  StartPublish?: Maybe<Scalars['Date']>;
  Status?: Maybe<Scalars['String']>;
  StopPublish?: Maybe<Scalars['Date']>;
  Url?: Maybe<Scalars['String']>;
  _children?: Maybe<QueryRef>;
  _fulltext?: Maybe<Array<Maybe<Scalars['String']>>>;
  _score?: Maybe<Scalars['Float']>;
};

export type ImageFile = IContent & {
  __typename?: 'ImageFile';
  Ancestors?: Maybe<Array<Maybe<Scalars['String']>>>;
  Category?: Maybe<Array<Maybe<CategoryModel>>>;
  Changed?: Maybe<Scalars['Date']>;
  Content?: Maybe<Scalars['String']>;
  ContentLink?: Maybe<ContentModelReference>;
  ContentType?: Maybe<Array<Maybe<Scalars['String']>>>;
  Created?: Maybe<Scalars['Date']>;
  ExistingLanguages?: Maybe<Array<Maybe<ContentLanguageModel>>>;
  IsCommonDraft?: Maybe<Scalars['Bool']>;
  Language?: Maybe<ContentLanguageModel>;
  MasterLanguage?: Maybe<ContentLanguageModel>;
  MimeType?: Maybe<Scalars['String']>;
  Name?: Maybe<Scalars['String']>;
  ParentLink?: Maybe<ContentModelReference>;
  RelativePath?: Maybe<Scalars['String']>;
  RouteSegment?: Maybe<Scalars['String']>;
  Saved?: Maybe<Scalars['Date']>;
  StartPublish?: Maybe<Scalars['Date']>;
  Status?: Maybe<Scalars['String']>;
  StopPublish?: Maybe<Scalars['Date']>;
  Thumbnail?: Maybe<BlobModel>;
  Url?: Maybe<Scalars['String']>;
  _children?: Maybe<QueryRef>;
  _fulltext?: Maybe<Array<Maybe<Scalars['String']>>>;
  _score?: Maybe<Scalars['Float']>;
};

export type ImageFileAutocomplete = {
  __typename?: 'ImageFileAutocomplete';
  Ancestors?: Maybe<Array<Maybe<Scalars['String']>>>;
  Category?: Maybe<CategoryModelAutocomplete>;
  ContentLink?: Maybe<ContentModelReferenceAutocomplete>;
  ContentType?: Maybe<Array<Maybe<Scalars['String']>>>;
  ExistingLanguages?: Maybe<ContentLanguageModelAutocomplete>;
  Language?: Maybe<ContentLanguageModelAutocomplete>;
  MasterLanguage?: Maybe<ContentLanguageModelAutocomplete>;
  MimeType?: Maybe<Array<Maybe<Scalars['String']>>>;
  ParentLink?: Maybe<ContentModelReferenceAutocomplete>;
  RelativePath?: Maybe<Array<Maybe<Scalars['String']>>>;
  RouteSegment?: Maybe<Array<Maybe<Scalars['String']>>>;
  Status?: Maybe<Array<Maybe<Scalars['String']>>>;
  Thumbnail?: Maybe<BlobModelAutocomplete>;
  Url?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type ImageFileAutocompleteAncestorsArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ImageFileAutocompleteContentTypeArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ImageFileAutocompleteMimeTypeArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ImageFileAutocompleteRelativePathArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ImageFileAutocompleteRouteSegmentArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ImageFileAutocompleteStatusArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ImageFileAutocompleteUrlArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};

export type ImageFileFacet = {
  __typename?: 'ImageFileFacet';
  Ancestors?: Maybe<Array<Maybe<StringFacet>>>;
  Category?: Maybe<CategoryModelFacet>;
  Changed?: Maybe<Array<Maybe<DateFacet>>>;
  Content?: Maybe<Array<Maybe<StringFacet>>>;
  ContentLink?: Maybe<ContentModelReferenceFacet>;
  ContentType?: Maybe<Array<Maybe<StringFacet>>>;
  Created?: Maybe<Array<Maybe<DateFacet>>>;
  ExistingLanguages?: Maybe<ContentLanguageModelFacet>;
  IsCommonDraft?: Maybe<Array<Maybe<StringFacet>>>;
  Language?: Maybe<ContentLanguageModelFacet>;
  MasterLanguage?: Maybe<ContentLanguageModelFacet>;
  MimeType?: Maybe<Array<Maybe<StringFacet>>>;
  Name?: Maybe<Array<Maybe<StringFacet>>>;
  ParentLink?: Maybe<ContentModelReferenceFacet>;
  RelativePath?: Maybe<Array<Maybe<StringFacet>>>;
  RouteSegment?: Maybe<Array<Maybe<StringFacet>>>;
  Saved?: Maybe<Array<Maybe<DateFacet>>>;
  StartPublish?: Maybe<Array<Maybe<DateFacet>>>;
  Status?: Maybe<Array<Maybe<StringFacet>>>;
  StopPublish?: Maybe<Array<Maybe<DateFacet>>>;
  Thumbnail?: Maybe<BlobModelFacet>;
  Url?: Maybe<Array<Maybe<StringFacet>>>;
};


export type ImageFileFacetAncestorsArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ImageFileFacetChangedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ImageFileFacetContentArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ImageFileFacetContentTypeArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ImageFileFacetCreatedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ImageFileFacetIsCommonDraftArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ImageFileFacetMimeTypeArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ImageFileFacetNameArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ImageFileFacetRelativePathArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ImageFileFacetRouteSegmentArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ImageFileFacetSavedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ImageFileFacetStartPublishArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ImageFileFacetStatusArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ImageFileFacetStopPublishArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ImageFileFacetUrlArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};

export type ImageFileOrderByInput = {
  Ancestors?: InputMaybe<OrderBy>;
  Category?: InputMaybe<CategoryModelOrderByInput>;
  Changed?: InputMaybe<OrderBy>;
  Content?: InputMaybe<OrderBy>;
  ContentLink?: InputMaybe<ContentModelReferenceOrderByInput>;
  ContentType?: InputMaybe<OrderBy>;
  Created?: InputMaybe<OrderBy>;
  ExistingLanguages?: InputMaybe<ContentLanguageModelOrderByInput>;
  IsCommonDraft?: InputMaybe<OrderBy>;
  Language?: InputMaybe<ContentLanguageModelOrderByInput>;
  MasterLanguage?: InputMaybe<ContentLanguageModelOrderByInput>;
  MimeType?: InputMaybe<OrderBy>;
  Name?: InputMaybe<OrderBy>;
  ParentLink?: InputMaybe<ContentModelReferenceOrderByInput>;
  RelativePath?: InputMaybe<OrderBy>;
  RouteSegment?: InputMaybe<OrderBy>;
  Saved?: InputMaybe<OrderBy>;
  StartPublish?: InputMaybe<OrderBy>;
  Status?: InputMaybe<OrderBy>;
  StopPublish?: InputMaybe<OrderBy>;
  Thumbnail?: InputMaybe<BlobModelOrderByInput>;
  Url?: InputMaybe<OrderBy>;
  _ranking?: InputMaybe<Ranking>;
};

export type ImageFileOutput = {
  __typename?: 'ImageFileOutput';
  autocomplete?: Maybe<ImageFileAutocomplete>;
  cursor?: Maybe<Scalars['String']>;
  facets?: Maybe<ImageFileFacet>;
  items?: Maybe<Array<Maybe<ImageFile>>>;
  total?: Maybe<Scalars['Int']>;
};


export type ImageFileOutputTotalArgs = {
  all?: InputMaybe<Scalars['Boolean']>;
};

export type ImageFileWhereInput = {
  Ancestors?: InputMaybe<StringFilterInput>;
  Category?: InputMaybe<CategoryModelWhereInput>;
  Changed?: InputMaybe<DateFilterInput>;
  Content?: InputMaybe<SearchableStringFilterInput>;
  ContentLink?: InputMaybe<ContentModelReferenceWhereInput>;
  ContentType?: InputMaybe<StringFilterInput>;
  Created?: InputMaybe<DateFilterInput>;
  ExistingLanguages?: InputMaybe<ContentLanguageModelWhereInput>;
  IsCommonDraft?: InputMaybe<BoolFilterInput>;
  Language?: InputMaybe<ContentLanguageModelWhereInput>;
  MasterLanguage?: InputMaybe<ContentLanguageModelWhereInput>;
  MimeType?: InputMaybe<StringFilterInput>;
  Name?: InputMaybe<SearchableStringFilterInput>;
  ParentLink?: InputMaybe<ContentModelReferenceWhereInput>;
  RelativePath?: InputMaybe<StringFilterInput>;
  RouteSegment?: InputMaybe<StringFilterInput>;
  Saved?: InputMaybe<DateFilterInput>;
  StartPublish?: InputMaybe<DateFilterInput>;
  Status?: InputMaybe<StringFilterInput>;
  StopPublish?: InputMaybe<DateFilterInput>;
  Thumbnail?: InputMaybe<BlobModelWhereInput>;
  Url?: InputMaybe<StringFilterInput>;
  _and?: InputMaybe<Array<InputMaybe<ImageFileWhereInput>>>;
  _fulltext?: InputMaybe<SearchableStringFilterInput>;
  _modified?: InputMaybe<DateFilterInput>;
  _not?: InputMaybe<Array<InputMaybe<ImageFileWhereInput>>>;
  _or?: InputMaybe<Array<InputMaybe<ImageFileWhereInput>>>;
};

export type ImagePage = IContent & {
  __typename?: 'ImagePage';
  Ancestors?: Maybe<Array<Maybe<Scalars['String']>>>;
  Category?: Maybe<Array<Maybe<CategoryModel>>>;
  Changed?: Maybe<Scalars['Date']>;
  Content?: Maybe<Scalars['String']>;
  ContentLink?: Maybe<ContentModelReference>;
  ContentType?: Maybe<Array<Maybe<Scalars['String']>>>;
  Copyright?: Maybe<Scalars['String']>;
  Created?: Maybe<Scalars['Date']>;
  ExistingLanguages?: Maybe<Array<Maybe<ContentLanguageModel>>>;
  IsCommonDraft?: Maybe<Scalars['Bool']>;
  Language?: Maybe<ContentLanguageModel>;
  MasterLanguage?: Maybe<ContentLanguageModel>;
  MimeType?: Maybe<Scalars['String']>;
  Name?: Maybe<Scalars['String']>;
  ParentLink?: Maybe<ContentModelReference>;
  RelativePath?: Maybe<Scalars['String']>;
  RouteSegment?: Maybe<Scalars['String']>;
  Saved?: Maybe<Scalars['Date']>;
  StartPublish?: Maybe<Scalars['Date']>;
  Status?: Maybe<Scalars['String']>;
  StopPublish?: Maybe<Scalars['Date']>;
  Thumbnail?: Maybe<BlobModel>;
  Url?: Maybe<Scalars['String']>;
  _children?: Maybe<QueryRef>;
  _fulltext?: Maybe<Array<Maybe<Scalars['String']>>>;
  _score?: Maybe<Scalars['Float']>;
};

export type ImagePageAutocomplete = {
  __typename?: 'ImagePageAutocomplete';
  Ancestors?: Maybe<Array<Maybe<Scalars['String']>>>;
  Category?: Maybe<CategoryModelAutocomplete>;
  ContentLink?: Maybe<ContentModelReferenceAutocomplete>;
  ContentType?: Maybe<Array<Maybe<Scalars['String']>>>;
  ExistingLanguages?: Maybe<ContentLanguageModelAutocomplete>;
  Language?: Maybe<ContentLanguageModelAutocomplete>;
  MasterLanguage?: Maybe<ContentLanguageModelAutocomplete>;
  MimeType?: Maybe<Array<Maybe<Scalars['String']>>>;
  ParentLink?: Maybe<ContentModelReferenceAutocomplete>;
  RelativePath?: Maybe<Array<Maybe<Scalars['String']>>>;
  RouteSegment?: Maybe<Array<Maybe<Scalars['String']>>>;
  Status?: Maybe<Array<Maybe<Scalars['String']>>>;
  Thumbnail?: Maybe<BlobModelAutocomplete>;
  Url?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type ImagePageAutocompleteAncestorsArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ImagePageAutocompleteContentTypeArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ImagePageAutocompleteMimeTypeArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ImagePageAutocompleteRelativePathArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ImagePageAutocompleteRouteSegmentArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ImagePageAutocompleteStatusArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type ImagePageAutocompleteUrlArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};

export type ImagePageFacet = {
  __typename?: 'ImagePageFacet';
  Ancestors?: Maybe<Array<Maybe<StringFacet>>>;
  Category?: Maybe<CategoryModelFacet>;
  Changed?: Maybe<Array<Maybe<DateFacet>>>;
  Content?: Maybe<Array<Maybe<StringFacet>>>;
  ContentLink?: Maybe<ContentModelReferenceFacet>;
  ContentType?: Maybe<Array<Maybe<StringFacet>>>;
  Copyright?: Maybe<Array<Maybe<StringFacet>>>;
  Created?: Maybe<Array<Maybe<DateFacet>>>;
  ExistingLanguages?: Maybe<ContentLanguageModelFacet>;
  IsCommonDraft?: Maybe<Array<Maybe<StringFacet>>>;
  Language?: Maybe<ContentLanguageModelFacet>;
  MasterLanguage?: Maybe<ContentLanguageModelFacet>;
  MimeType?: Maybe<Array<Maybe<StringFacet>>>;
  Name?: Maybe<Array<Maybe<StringFacet>>>;
  ParentLink?: Maybe<ContentModelReferenceFacet>;
  RelativePath?: Maybe<Array<Maybe<StringFacet>>>;
  RouteSegment?: Maybe<Array<Maybe<StringFacet>>>;
  Saved?: Maybe<Array<Maybe<DateFacet>>>;
  StartPublish?: Maybe<Array<Maybe<DateFacet>>>;
  Status?: Maybe<Array<Maybe<StringFacet>>>;
  StopPublish?: Maybe<Array<Maybe<DateFacet>>>;
  Thumbnail?: Maybe<BlobModelFacet>;
  Url?: Maybe<Array<Maybe<StringFacet>>>;
};


export type ImagePageFacetAncestorsArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ImagePageFacetChangedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ImagePageFacetContentArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ImagePageFacetContentTypeArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ImagePageFacetCopyrightArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ImagePageFacetCreatedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ImagePageFacetIsCommonDraftArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ImagePageFacetMimeTypeArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ImagePageFacetNameArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ImagePageFacetRelativePathArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ImagePageFacetRouteSegmentArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ImagePageFacetSavedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ImagePageFacetStartPublishArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ImagePageFacetStatusArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type ImagePageFacetStopPublishArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type ImagePageFacetUrlArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};

export type ImagePageOrderByInput = {
  Ancestors?: InputMaybe<OrderBy>;
  Category?: InputMaybe<CategoryModelOrderByInput>;
  Changed?: InputMaybe<OrderBy>;
  Content?: InputMaybe<OrderBy>;
  ContentLink?: InputMaybe<ContentModelReferenceOrderByInput>;
  ContentType?: InputMaybe<OrderBy>;
  Copyright?: InputMaybe<OrderBy>;
  Created?: InputMaybe<OrderBy>;
  ExistingLanguages?: InputMaybe<ContentLanguageModelOrderByInput>;
  IsCommonDraft?: InputMaybe<OrderBy>;
  Language?: InputMaybe<ContentLanguageModelOrderByInput>;
  MasterLanguage?: InputMaybe<ContentLanguageModelOrderByInput>;
  MimeType?: InputMaybe<OrderBy>;
  Name?: InputMaybe<OrderBy>;
  ParentLink?: InputMaybe<ContentModelReferenceOrderByInput>;
  RelativePath?: InputMaybe<OrderBy>;
  RouteSegment?: InputMaybe<OrderBy>;
  Saved?: InputMaybe<OrderBy>;
  StartPublish?: InputMaybe<OrderBy>;
  Status?: InputMaybe<OrderBy>;
  StopPublish?: InputMaybe<OrderBy>;
  Thumbnail?: InputMaybe<BlobModelOrderByInput>;
  Url?: InputMaybe<OrderBy>;
  _ranking?: InputMaybe<Ranking>;
};

export type ImagePageOutput = {
  __typename?: 'ImagePageOutput';
  autocomplete?: Maybe<ImagePageAutocomplete>;
  cursor?: Maybe<Scalars['String']>;
  facets?: Maybe<ImagePageFacet>;
  items?: Maybe<Array<Maybe<ImagePage>>>;
  total?: Maybe<Scalars['Int']>;
};


export type ImagePageOutputTotalArgs = {
  all?: InputMaybe<Scalars['Boolean']>;
};

export type ImagePageWhereInput = {
  Ancestors?: InputMaybe<StringFilterInput>;
  Category?: InputMaybe<CategoryModelWhereInput>;
  Changed?: InputMaybe<DateFilterInput>;
  Content?: InputMaybe<SearchableStringFilterInput>;
  ContentLink?: InputMaybe<ContentModelReferenceWhereInput>;
  ContentType?: InputMaybe<StringFilterInput>;
  Copyright?: InputMaybe<SearchableStringFilterInput>;
  Created?: InputMaybe<DateFilterInput>;
  ExistingLanguages?: InputMaybe<ContentLanguageModelWhereInput>;
  IsCommonDraft?: InputMaybe<BoolFilterInput>;
  Language?: InputMaybe<ContentLanguageModelWhereInput>;
  MasterLanguage?: InputMaybe<ContentLanguageModelWhereInput>;
  MimeType?: InputMaybe<StringFilterInput>;
  Name?: InputMaybe<SearchableStringFilterInput>;
  ParentLink?: InputMaybe<ContentModelReferenceWhereInput>;
  RelativePath?: InputMaybe<StringFilterInput>;
  RouteSegment?: InputMaybe<StringFilterInput>;
  Saved?: InputMaybe<DateFilterInput>;
  StartPublish?: InputMaybe<DateFilterInput>;
  Status?: InputMaybe<StringFilterInput>;
  StopPublish?: InputMaybe<DateFilterInput>;
  Thumbnail?: InputMaybe<BlobModelWhereInput>;
  Url?: InputMaybe<StringFilterInput>;
  _and?: InputMaybe<Array<InputMaybe<ImagePageWhereInput>>>;
  _fulltext?: InputMaybe<SearchableStringFilterInput>;
  _modified?: InputMaybe<DateFilterInput>;
  _not?: InputMaybe<Array<InputMaybe<ImagePageWhereInput>>>;
  _or?: InputMaybe<Array<InputMaybe<ImagePageWhereInput>>>;
};

export type IntFilterInput = {
  /** `boost` influences the weight of a field by boosting a match with a number (default: 1) — counts more towards the eventual relevance score which can be projected with `_score` — at query time. Note that `boost` cannot be a negative number. */
  boost?: InputMaybe<Scalars['Int']>;
  /** `eq` matches on an exact value, but the value is case-insensitive. */
  eq?: InputMaybe<Scalars['Int']>;
  /** `exist` matches results that have this field. */
  exist?: InputMaybe<Scalars['Boolean']>;
  /** `gt` retrieves results with matches that have a value which is `greater than` it. */
  gt?: InputMaybe<Scalars['Int']>;
  /** `gte` retrieves results with matches that have a value which is `greater than or equal to` it. */
  gte?: InputMaybe<Scalars['Int']>;
  /** `in` matches with 1 or more exact values in a list. Example: `in: ["word1", "word2", "this is a phrase"]` */
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** `lt` retrieves results with matches that have a value which is `lower than` it. */
  lt?: InputMaybe<Scalars['Int']>;
  /** `lte` retrieves results with matches that have a value which is `lower than or equal to` it. */
  lte?: InputMaybe<Scalars['Int']>;
  /** `not_eq` retrieves results not matching with an exact (but case-insensitive) value. */
  notEq?: InputMaybe<Scalars['Int']>;
  /** `not_in` returns results that do not match with 1 or more exact values in a list. Example: `not_in: ["word1", "word2", "this is a phrase"]` */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type LandingPage = IContent & {
  __typename?: 'LandingPage';
  Ancestors?: Maybe<Array<Maybe<Scalars['String']>>>;
  ArtistsLink?: Maybe<ContentModelReference>;
  BuyTicketBlock?: Maybe<LandingPageBlockData>;
  Category?: Maybe<Array<Maybe<CategoryModel>>>;
  Changed?: Maybe<Scalars['Date']>;
  ContentLink?: Maybe<ContentModelReference>;
  ContentType?: Maybe<Array<Maybe<Scalars['String']>>>;
  Created?: Maybe<Scalars['Date']>;
  ExistingLanguages?: Maybe<Array<Maybe<ContentLanguageModel>>>;
  FooterContentArea?: Maybe<Array<Maybe<ContentAreaItemModel>>>;
  HeroImage?: Maybe<Scalars['String']>;
  IsCommonDraft?: Maybe<Scalars['Bool']>;
  Language?: Maybe<ContentLanguageModel>;
  MainContentArea?: Maybe<Array<Maybe<ContentAreaItemModel>>>;
  MasterLanguage?: Maybe<ContentLanguageModel>;
  Name?: Maybe<Scalars['String']>;
  ParentLink?: Maybe<ContentModelReference>;
  RelativePath?: Maybe<Scalars['String']>;
  RouteSegment?: Maybe<Scalars['String']>;
  Saved?: Maybe<Scalars['Date']>;
  StartPublish?: Maybe<Scalars['Date']>;
  Status?: Maybe<Scalars['String']>;
  StopPublish?: Maybe<Scalars['Date']>;
  Subtitle?: Maybe<Scalars['String']>;
  Title?: Maybe<Scalars['String']>;
  Url?: Maybe<Scalars['String']>;
  _children?: Maybe<QueryRef>;
  _fulltext?: Maybe<Array<Maybe<Scalars['String']>>>;
  _score?: Maybe<Scalars['Float']>;
};

export type LandingPageAutocomplete = {
  __typename?: 'LandingPageAutocomplete';
  Ancestors?: Maybe<Array<Maybe<Scalars['String']>>>;
  ArtistsLink?: Maybe<ContentModelReferenceAutocomplete>;
  BuyTicketBlock?: Maybe<LandingPageBlockDataAutocomplete>;
  Category?: Maybe<CategoryModelAutocomplete>;
  ContentLink?: Maybe<ContentModelReferenceAutocomplete>;
  ContentType?: Maybe<Array<Maybe<Scalars['String']>>>;
  ExistingLanguages?: Maybe<ContentLanguageModelAutocomplete>;
  FooterContentArea?: Maybe<ContentAreaItemModelAutocomplete>;
  HeroImage?: Maybe<Array<Maybe<Scalars['String']>>>;
  Language?: Maybe<ContentLanguageModelAutocomplete>;
  MainContentArea?: Maybe<ContentAreaItemModelAutocomplete>;
  MasterLanguage?: Maybe<ContentLanguageModelAutocomplete>;
  ParentLink?: Maybe<ContentModelReferenceAutocomplete>;
  RelativePath?: Maybe<Array<Maybe<Scalars['String']>>>;
  RouteSegment?: Maybe<Array<Maybe<Scalars['String']>>>;
  Status?: Maybe<Array<Maybe<Scalars['String']>>>;
  Subtitle?: Maybe<Array<Maybe<Scalars['String']>>>;
  Title?: Maybe<Array<Maybe<Scalars['String']>>>;
  Url?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type LandingPageAutocompleteAncestorsArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type LandingPageAutocompleteContentTypeArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type LandingPageAutocompleteHeroImageArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type LandingPageAutocompleteRelativePathArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type LandingPageAutocompleteRouteSegmentArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type LandingPageAutocompleteStatusArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type LandingPageAutocompleteSubtitleArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type LandingPageAutocompleteTitleArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type LandingPageAutocompleteUrlArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};

export type LandingPageBlockData = {
  __typename?: 'LandingPageBlockData';
  Heading?: Maybe<Scalars['String']>;
  Message?: Maybe<Scalars['String']>;
};

export type LandingPageBlockDataAutocomplete = {
  __typename?: 'LandingPageBlockDataAutocomplete';
  Heading?: Maybe<Array<Maybe<Scalars['String']>>>;
  Message?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type LandingPageBlockDataAutocompleteHeadingArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type LandingPageBlockDataAutocompleteMessageArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};

export type LandingPageBlockDataFacet = {
  __typename?: 'LandingPageBlockDataFacet';
  Heading?: Maybe<Array<Maybe<StringFacet>>>;
  Message?: Maybe<Array<Maybe<StringFacet>>>;
};


export type LandingPageBlockDataFacetHeadingArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type LandingPageBlockDataFacetMessageArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};

export type LandingPageBlockDataOrderByInput = {
  Heading?: InputMaybe<OrderBy>;
  Message?: InputMaybe<OrderBy>;
};

export type LandingPageBlockDataWhereInput = {
  Heading?: InputMaybe<StringFilterInput>;
  Message?: InputMaybe<StringFilterInput>;
};

export type LandingPageFacet = {
  __typename?: 'LandingPageFacet';
  Ancestors?: Maybe<Array<Maybe<StringFacet>>>;
  ArtistsLink?: Maybe<ContentModelReferenceFacet>;
  BuyTicketBlock?: Maybe<LandingPageBlockDataFacet>;
  Category?: Maybe<CategoryModelFacet>;
  Changed?: Maybe<Array<Maybe<DateFacet>>>;
  ContentLink?: Maybe<ContentModelReferenceFacet>;
  ContentType?: Maybe<Array<Maybe<StringFacet>>>;
  Created?: Maybe<Array<Maybe<DateFacet>>>;
  ExistingLanguages?: Maybe<ContentLanguageModelFacet>;
  FooterContentArea?: Maybe<ContentAreaItemModelFacet>;
  HeroImage?: Maybe<Array<Maybe<StringFacet>>>;
  IsCommonDraft?: Maybe<Array<Maybe<StringFacet>>>;
  Language?: Maybe<ContentLanguageModelFacet>;
  MainContentArea?: Maybe<ContentAreaItemModelFacet>;
  MasterLanguage?: Maybe<ContentLanguageModelFacet>;
  Name?: Maybe<Array<Maybe<StringFacet>>>;
  ParentLink?: Maybe<ContentModelReferenceFacet>;
  RelativePath?: Maybe<Array<Maybe<StringFacet>>>;
  RouteSegment?: Maybe<Array<Maybe<StringFacet>>>;
  Saved?: Maybe<Array<Maybe<DateFacet>>>;
  StartPublish?: Maybe<Array<Maybe<DateFacet>>>;
  Status?: Maybe<Array<Maybe<StringFacet>>>;
  StopPublish?: Maybe<Array<Maybe<DateFacet>>>;
  Subtitle?: Maybe<Array<Maybe<StringFacet>>>;
  Title?: Maybe<Array<Maybe<StringFacet>>>;
  Url?: Maybe<Array<Maybe<StringFacet>>>;
};


export type LandingPageFacetAncestorsArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type LandingPageFacetChangedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type LandingPageFacetContentTypeArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type LandingPageFacetCreatedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type LandingPageFacetHeroImageArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type LandingPageFacetIsCommonDraftArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type LandingPageFacetNameArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type LandingPageFacetRelativePathArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type LandingPageFacetRouteSegmentArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type LandingPageFacetSavedArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type LandingPageFacetStartPublishArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type LandingPageFacetStatusArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type LandingPageFacetStopPublishArgs = {
  unit?: InputMaybe<DateFacetUnit>;
  value?: InputMaybe<Scalars['Int']>;
};


export type LandingPageFacetSubtitleArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type LandingPageFacetTitleArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type LandingPageFacetUrlArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};

export type LandingPageOrderByInput = {
  Ancestors?: InputMaybe<OrderBy>;
  ArtistsLink?: InputMaybe<ContentModelReferenceOrderByInput>;
  BuyTicketBlock?: InputMaybe<LandingPageBlockDataOrderByInput>;
  Category?: InputMaybe<CategoryModelOrderByInput>;
  Changed?: InputMaybe<OrderBy>;
  ContentLink?: InputMaybe<ContentModelReferenceOrderByInput>;
  ContentType?: InputMaybe<OrderBy>;
  Created?: InputMaybe<OrderBy>;
  ExistingLanguages?: InputMaybe<ContentLanguageModelOrderByInput>;
  FooterContentArea?: InputMaybe<ContentAreaItemModelOrderByInput>;
  HeroImage?: InputMaybe<OrderBy>;
  IsCommonDraft?: InputMaybe<OrderBy>;
  Language?: InputMaybe<ContentLanguageModelOrderByInput>;
  MainContentArea?: InputMaybe<ContentAreaItemModelOrderByInput>;
  MasterLanguage?: InputMaybe<ContentLanguageModelOrderByInput>;
  Name?: InputMaybe<OrderBy>;
  ParentLink?: InputMaybe<ContentModelReferenceOrderByInput>;
  RelativePath?: InputMaybe<OrderBy>;
  RouteSegment?: InputMaybe<OrderBy>;
  Saved?: InputMaybe<OrderBy>;
  StartPublish?: InputMaybe<OrderBy>;
  Status?: InputMaybe<OrderBy>;
  StopPublish?: InputMaybe<OrderBy>;
  Subtitle?: InputMaybe<OrderBy>;
  Title?: InputMaybe<OrderBy>;
  Url?: InputMaybe<OrderBy>;
  _ranking?: InputMaybe<Ranking>;
};

export type LandingPageOutput = {
  __typename?: 'LandingPageOutput';
  autocomplete?: Maybe<LandingPageAutocomplete>;
  cursor?: Maybe<Scalars['String']>;
  facets?: Maybe<LandingPageFacet>;
  items?: Maybe<Array<Maybe<LandingPage>>>;
  total?: Maybe<Scalars['Int']>;
};


export type LandingPageOutputTotalArgs = {
  all?: InputMaybe<Scalars['Boolean']>;
};

export type LandingPageWhereInput = {
  Ancestors?: InputMaybe<StringFilterInput>;
  ArtistsLink?: InputMaybe<ContentModelReferenceWhereInput>;
  BuyTicketBlock?: InputMaybe<LandingPageBlockDataWhereInput>;
  Category?: InputMaybe<CategoryModelWhereInput>;
  Changed?: InputMaybe<DateFilterInput>;
  ContentLink?: InputMaybe<ContentModelReferenceWhereInput>;
  ContentType?: InputMaybe<StringFilterInput>;
  Created?: InputMaybe<DateFilterInput>;
  ExistingLanguages?: InputMaybe<ContentLanguageModelWhereInput>;
  FooterContentArea?: InputMaybe<ContentAreaItemModelWhereInput>;
  HeroImage?: InputMaybe<StringFilterInput>;
  IsCommonDraft?: InputMaybe<BoolFilterInput>;
  Language?: InputMaybe<ContentLanguageModelWhereInput>;
  MainContentArea?: InputMaybe<ContentAreaItemModelWhereInput>;
  MasterLanguage?: InputMaybe<ContentLanguageModelWhereInput>;
  Name?: InputMaybe<SearchableStringFilterInput>;
  ParentLink?: InputMaybe<ContentModelReferenceWhereInput>;
  RelativePath?: InputMaybe<StringFilterInput>;
  RouteSegment?: InputMaybe<StringFilterInput>;
  Saved?: InputMaybe<DateFilterInput>;
  StartPublish?: InputMaybe<DateFilterInput>;
  Status?: InputMaybe<StringFilterInput>;
  StopPublish?: InputMaybe<DateFilterInput>;
  Subtitle?: InputMaybe<StringFilterInput>;
  Title?: InputMaybe<StringFilterInput>;
  Url?: InputMaybe<StringFilterInput>;
  _and?: InputMaybe<Array<InputMaybe<LandingPageWhereInput>>>;
  _fulltext?: InputMaybe<SearchableStringFilterInput>;
  _modified?: InputMaybe<DateFilterInput>;
  _not?: InputMaybe<Array<InputMaybe<LandingPageWhereInput>>>;
  _or?: InputMaybe<Array<InputMaybe<LandingPageWhereInput>>>;
};

export enum Locales {
  All = 'ALL',
  Invariant = 'INVARIANT',
  En = 'en',
  Sv = 'sv'
}

export type NumberFacet = {
  __typename?: 'NumberFacet';
  count?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export enum OrderBy {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum OrderByFacetType {
  Count = 'COUNT',
  Value = 'VALUE'
}

export type Query = {
  __typename?: 'Query';
  ArtistContainerPage?: Maybe<ArtistContainerPageOutput>;
  ArtistDetailsPage?: Maybe<ArtistDetailsPageOutput>;
  BuyTicketBlock?: Maybe<BuyTicketBlockOutput>;
  Content?: Maybe<ContentOutput>;
  ContentBlock?: Maybe<ContentBlockOutput>;
  ImageFile?: Maybe<ImageFileOutput>;
  ImagePage?: Maybe<ImagePageOutput>;
  LandingPage?: Maybe<LandingPageOutput>;
  SiteDefinition?: Maybe<SiteDefinitionOutput>;
};


export type QueryArtistContainerPageArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Array<Locales>>;
  orderBy?: InputMaybe<ArtistContainerPageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArtistContainerPageWhereInput>;
};


export type QueryArtistDetailsPageArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Array<Locales>>;
  orderBy?: InputMaybe<ArtistDetailsPageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArtistDetailsPageWhereInput>;
};


export type QueryBuyTicketBlockArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Array<Locales>>;
  orderBy?: InputMaybe<BuyTicketBlockOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BuyTicketBlockWhereInput>;
};


export type QueryContentArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Array<Locales>>;
  orderBy?: InputMaybe<ContentOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ContentWhereInput>;
};


export type QueryContentBlockArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Array<Locales>>;
  orderBy?: InputMaybe<ContentBlockOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ContentBlockWhereInput>;
};


export type QueryImageFileArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Array<Locales>>;
  orderBy?: InputMaybe<ImageFileOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImageFileWhereInput>;
};


export type QueryImagePageArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Array<Locales>>;
  orderBy?: InputMaybe<ImagePageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImagePageWhereInput>;
};


export type QueryLandingPageArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Array<Locales>>;
  orderBy?: InputMaybe<LandingPageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LandingPageWhereInput>;
};


export type QuerySiteDefinitionArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Array<Locales>>;
  orderBy?: InputMaybe<SiteDefinitionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SiteDefinitionWhereInput>;
};

export type QueryRef = {
  __typename?: 'QueryRef';
  ArtistContainerPage?: Maybe<ArtistContainerPageOutput>;
  ArtistDetailsPage?: Maybe<ArtistDetailsPageOutput>;
  BuyTicketBlock?: Maybe<BuyTicketBlockOutput>;
  Content?: Maybe<ContentOutput>;
  ContentBlock?: Maybe<ContentBlockOutput>;
  ImageFile?: Maybe<ImageFileOutput>;
  ImagePage?: Maybe<ImagePageOutput>;
  LandingPage?: Maybe<LandingPageOutput>;
  SiteDefinition?: Maybe<SiteDefinitionOutput>;
};


export type QueryRefArtistContainerPageArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Array<Locales>>;
  orderBy?: InputMaybe<ArtistContainerPageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArtistContainerPageWhereInput>;
};


export type QueryRefArtistDetailsPageArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Array<Locales>>;
  orderBy?: InputMaybe<ArtistDetailsPageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArtistDetailsPageWhereInput>;
};


export type QueryRefBuyTicketBlockArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Array<Locales>>;
  orderBy?: InputMaybe<BuyTicketBlockOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BuyTicketBlockWhereInput>;
};


export type QueryRefContentArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Array<Locales>>;
  orderBy?: InputMaybe<ContentOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ContentWhereInput>;
};


export type QueryRefContentBlockArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Array<Locales>>;
  orderBy?: InputMaybe<ContentBlockOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ContentBlockWhereInput>;
};


export type QueryRefImageFileArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Array<Locales>>;
  orderBy?: InputMaybe<ImageFileOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImageFileWhereInput>;
};


export type QueryRefImagePageArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Array<Locales>>;
  orderBy?: InputMaybe<ImagePageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImagePageWhereInput>;
};


export type QueryRefLandingPageArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Array<Locales>>;
  orderBy?: InputMaybe<LandingPageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LandingPageWhereInput>;
};


export type QueryRefSiteDefinitionArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Array<Locales>>;
  orderBy?: InputMaybe<SiteDefinitionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SiteDefinitionWhereInput>;
};

export type RangeFacetsInput = {
  from?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<Scalars['Int']>;
};

export enum Ranking {
  BoostOnly = 'BOOST_ONLY',
  Doc = 'DOC',
  Relevance = 'RELEVANCE'
}

export type SearchableStringFilterInput = {
  /** `boost` influences the weight of a field by boosting a match with a number (default: 1) — counts more towards the eventual relevance score which can be projected with `_score` — at query time. Note that `boost` cannot be a negative number. */
  boost?: InputMaybe<Scalars['Int']>;
  /** `contains` performs full-text search on a word or phrase. */
  contains?: InputMaybe<Scalars['String']>;
  /** `eq` matches on an exact value, but the value is case-insensitive. */
  eq?: InputMaybe<Scalars['String']>;
  /** `exist` matches results that have this field. */
  exist?: InputMaybe<Scalars['Boolean']>;
  /** `in` matches with 1 or more exact values in a list. Example: `in: ["word1", "word2", "this is a phrase"]` */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** `like` matches on substrings with wildcard support: `%` to match on 0 or more characters, `_` to match on any character.  */
  like?: InputMaybe<Scalars['String']>;
  /** `not_eq` retrieves results not matching with an exact (but case-insensitive) value. */
  notEq?: InputMaybe<Scalars['String']>;
  /** `not_in` returns results that do not match with 1 or more exact values in a list. Example: `not_in: ["word1", "word2", "this is a phrase"]` */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** `starts_with` retrieves matches that start with a certain value (prefix). */
  startsWith?: InputMaybe<Scalars['String']>;
  /** expands query value with synonyms. Example: if `H2O` is a synonym of `water`, then querying for `water` will also return results with `H2O`. */
  synonyms?: InputMaybe<Array<InputMaybe<SynonymSlot>>>;
};

export type SiteDefinition = {
  __typename?: 'SiteDefinition';
  ContentLink?: Maybe<ContentModelReference>;
  ContentRoots?: Maybe<ContentRootsModel>;
  ContentType?: Maybe<Array<Maybe<Scalars['String']>>>;
  EditLocation?: Maybe<Scalars['String']>;
  Hosts?: Maybe<Array<Maybe<HostDefinitionModel>>>;
  Id?: Maybe<Scalars['String']>;
  Languages?: Maybe<Array<Maybe<SiteDefinitionLanguageModel>>>;
  Name?: Maybe<Scalars['String']>;
  Status?: Maybe<Scalars['String']>;
  _children?: Maybe<QueryRef>;
  _fulltext?: Maybe<Array<Maybe<Scalars['String']>>>;
  _score?: Maybe<Scalars['Float']>;
};

export type SiteDefinitionAutocomplete = {
  __typename?: 'SiteDefinitionAutocomplete';
  ContentLink?: Maybe<ContentModelReferenceAutocomplete>;
  ContentRoots?: Maybe<ContentRootsModelAutocomplete>;
  ContentType?: Maybe<Array<Maybe<Scalars['String']>>>;
  EditLocation?: Maybe<Array<Maybe<Scalars['String']>>>;
  Hosts?: Maybe<HostDefinitionModelAutocomplete>;
  Id?: Maybe<Array<Maybe<Scalars['String']>>>;
  Languages?: Maybe<SiteDefinitionLanguageModelAutocomplete>;
  Status?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type SiteDefinitionAutocompleteContentTypeArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type SiteDefinitionAutocompleteEditLocationArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type SiteDefinitionAutocompleteIdArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type SiteDefinitionAutocompleteStatusArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};

export type SiteDefinitionFacet = {
  __typename?: 'SiteDefinitionFacet';
  ContentLink?: Maybe<ContentModelReferenceFacet>;
  ContentRoots?: Maybe<ContentRootsModelFacet>;
  ContentType?: Maybe<Array<Maybe<StringFacet>>>;
  EditLocation?: Maybe<Array<Maybe<StringFacet>>>;
  Hosts?: Maybe<HostDefinitionModelFacet>;
  Id?: Maybe<Array<Maybe<StringFacet>>>;
  Languages?: Maybe<SiteDefinitionLanguageModelFacet>;
  Name?: Maybe<Array<Maybe<StringFacet>>>;
  Status?: Maybe<Array<Maybe<StringFacet>>>;
};


export type SiteDefinitionFacetContentTypeArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type SiteDefinitionFacetEditLocationArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type SiteDefinitionFacetIdArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type SiteDefinitionFacetNameArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type SiteDefinitionFacetStatusArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};

export type SiteDefinitionLanguageModel = {
  __typename?: 'SiteDefinitionLanguageModel';
  DisplayName?: Maybe<Scalars['String']>;
  IsMasterLanguage?: Maybe<Scalars['Bool']>;
  Name?: Maybe<Scalars['String']>;
  Url?: Maybe<Scalars['String']>;
  UrlSegment?: Maybe<Scalars['String']>;
};

export type SiteDefinitionLanguageModelAutocomplete = {
  __typename?: 'SiteDefinitionLanguageModelAutocomplete';
  DisplayName?: Maybe<Array<Maybe<Scalars['String']>>>;
  Name?: Maybe<Array<Maybe<Scalars['String']>>>;
  Url?: Maybe<Array<Maybe<Scalars['String']>>>;
  UrlSegment?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type SiteDefinitionLanguageModelAutocompleteDisplayNameArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type SiteDefinitionLanguageModelAutocompleteNameArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type SiteDefinitionLanguageModelAutocompleteUrlArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};


export type SiteDefinitionLanguageModelAutocompleteUrlSegmentArgs = {
  limit?: Scalars['Int'];
  value: Scalars['String'];
};

export type SiteDefinitionLanguageModelFacet = {
  __typename?: 'SiteDefinitionLanguageModelFacet';
  DisplayName?: Maybe<Array<Maybe<StringFacet>>>;
  IsMasterLanguage?: Maybe<Array<Maybe<StringFacet>>>;
  Name?: Maybe<Array<Maybe<StringFacet>>>;
  Url?: Maybe<Array<Maybe<StringFacet>>>;
  UrlSegment?: Maybe<Array<Maybe<StringFacet>>>;
};


export type SiteDefinitionLanguageModelFacetDisplayNameArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type SiteDefinitionLanguageModelFacetIsMasterLanguageArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type SiteDefinitionLanguageModelFacetNameArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type SiteDefinitionLanguageModelFacetUrlArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};


export type SiteDefinitionLanguageModelFacetUrlSegmentArgs = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  limit?: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  orderType?: InputMaybe<OrderByFacetType>;
};

export type SiteDefinitionLanguageModelOrderByInput = {
  DisplayName?: InputMaybe<OrderBy>;
  IsMasterLanguage?: InputMaybe<OrderBy>;
  Name?: InputMaybe<OrderBy>;
  Url?: InputMaybe<OrderBy>;
  UrlSegment?: InputMaybe<OrderBy>;
};

export type SiteDefinitionLanguageModelWhereInput = {
  DisplayName?: InputMaybe<StringFilterInput>;
  IsMasterLanguage?: InputMaybe<BoolFilterInput>;
  Name?: InputMaybe<StringFilterInput>;
  Url?: InputMaybe<StringFilterInput>;
  UrlSegment?: InputMaybe<StringFilterInput>;
};

export type SiteDefinitionOrderByInput = {
  ContentLink?: InputMaybe<ContentModelReferenceOrderByInput>;
  ContentRoots?: InputMaybe<ContentRootsModelOrderByInput>;
  ContentType?: InputMaybe<OrderBy>;
  EditLocation?: InputMaybe<OrderBy>;
  Hosts?: InputMaybe<HostDefinitionModelOrderByInput>;
  Id?: InputMaybe<OrderBy>;
  Languages?: InputMaybe<SiteDefinitionLanguageModelOrderByInput>;
  Name?: InputMaybe<OrderBy>;
  Status?: InputMaybe<OrderBy>;
  _ranking?: InputMaybe<Ranking>;
};

export type SiteDefinitionOutput = {
  __typename?: 'SiteDefinitionOutput';
  autocomplete?: Maybe<SiteDefinitionAutocomplete>;
  cursor?: Maybe<Scalars['String']>;
  facets?: Maybe<SiteDefinitionFacet>;
  items?: Maybe<Array<Maybe<SiteDefinition>>>;
  total?: Maybe<Scalars['Int']>;
};


export type SiteDefinitionOutputTotalArgs = {
  all?: InputMaybe<Scalars['Boolean']>;
};

export type SiteDefinitionWhereInput = {
  ContentLink?: InputMaybe<ContentModelReferenceWhereInput>;
  ContentRoots?: InputMaybe<ContentRootsModelWhereInput>;
  ContentType?: InputMaybe<StringFilterInput>;
  EditLocation?: InputMaybe<StringFilterInput>;
  Hosts?: InputMaybe<HostDefinitionModelWhereInput>;
  Id?: InputMaybe<StringFilterInput>;
  Languages?: InputMaybe<SiteDefinitionLanguageModelWhereInput>;
  Name?: InputMaybe<SearchableStringFilterInput>;
  Status?: InputMaybe<StringFilterInput>;
  _and?: InputMaybe<Array<InputMaybe<SiteDefinitionWhereInput>>>;
  _fulltext?: InputMaybe<SearchableStringFilterInput>;
  _modified?: InputMaybe<DateFilterInput>;
  _not?: InputMaybe<Array<InputMaybe<SiteDefinitionWhereInput>>>;
  _or?: InputMaybe<Array<InputMaybe<SiteDefinitionWhereInput>>>;
};

export type StringFacet = {
  __typename?: 'StringFacet';
  count?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type StringFilterInput = {
  /** `boost` influences the weight of a field by boosting a match with a number (default: 1) — counts more towards the eventual relevance score which can be projected with `_score` — at query time. Note that `boost` cannot be a negative number. */
  boost?: InputMaybe<Scalars['Int']>;
  /** `ends_with` retrieves matches that end with a certain value (suffix). */
  endsWith?: InputMaybe<Scalars['String']>;
  /** `eq` matches on an exact value, but the value is case-insensitive. */
  eq?: InputMaybe<Scalars['String']>;
  /** `exist` matches results that have this field. */
  exist?: InputMaybe<Scalars['Boolean']>;
  /** `in` matches with 1 or more exact values in a list. Example: `in: ["word1", "word2", "this is a phrase"]` */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** `like` matches on substrings with wildcard support: `%` to match on 0 or more characters, `_` to match on any character.  */
  like?: InputMaybe<Scalars['String']>;
  /** `not_eq` retrieves results not matching with an exact (but case-insensitive) value. */
  notEq?: InputMaybe<Scalars['String']>;
  /** `not_in` returns results that do not match with 1 or more exact values in a list. Example: `not_in: ["word1", "word2", "this is a phrase"]` */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** `starts_with` retrieves matches that start with a certain value (prefix). */
  startsWith?: InputMaybe<Scalars['String']>;
  /** expands query value with synonyms. Example: if `H2O` is a synonym of `water`, then querying for `water` will also return results with `H2O`. */
  synonyms?: InputMaybe<Array<InputMaybe<SynonymSlot>>>;
};

export enum SynonymSlot {
  /** synonym slot 1 */
  One = 'ONE',
  /** synonym slot 2 */
  Two = 'TWO'
}

export type SearchQueryVariables = Exact<{
  searchParam?: InputMaybe<Scalars['String']>;
  locales: Locales;
  order?: InputMaybe<OrderBy>;
}>;


export type SearchQuery = { __typename?: 'Query', ArtistDetailsPage?: { __typename?: 'ArtistDetailsPageOutput', items?: Array<{ __typename?: 'ArtistDetailsPage', PerformanceStartTime?: any | null, PerformanceEndTime?: any | null, StageName?: string | null, ArtistName?: string | null, ArtistPhoto?: string | null, ArtistGenre?: string | null, ArtistDescription?: string | null, ArtistIsHeadliner?: any | null, RelativePath?: string | null, _fulltext?: Array<string | null> | null, ParentLink?: { __typename?: 'ContentModelReference', Url?: string | null } | null } | null> | null } | null };

export type StartQueryVariables = Exact<{
  relativePath?: InputMaybe<Scalars['String']>;
  locales: Locales;
  language?: InputMaybe<Scalars['String']>;
  stageName?: InputMaybe<Scalars['String']>;
  artistGenre?: InputMaybe<Scalars['String']>;
  contentId?: InputMaybe<Scalars['Int']>;
  workId?: InputMaybe<Scalars['Int']>;
  statusEqual?: InputMaybe<Scalars['String']>;
  isCommonDraft?: InputMaybe<Scalars['Boolean']>;
}>;


export type StartQuery = { __typename?: 'Query', Content?: { __typename?: 'ContentOutput', items?: Array<{ __typename: 'ArtistContainerPage', Name?: string | null, RelativePath?: string | null, Url?: string | null, artists?: { __typename?: 'QueryRef', ArtistDetailsPage?: { __typename?: 'ArtistDetailsPageOutput', items?: Array<{ __typename?: 'ArtistDetailsPage', PerformanceStartTime?: any | null, PerformanceEndTime?: any | null, StageName?: string | null, ArtistName?: string | null, ArtistPhoto?: string | null, ArtistGenre?: string | null, ArtistDescription?: string | null, ArtistIsHeadliner?: any | null, Name?: string | null, RelativePath?: string | null, ParentLink?: { __typename?: 'ContentModelReference', Url?: string | null } | null } | null> | null, facets?: { __typename?: 'ArtistDetailsPageFacet', ArtistGenre?: Array<{ __typename?: 'StringFacet', name?: string | null, count?: number | null } | null> | null, StageName?: Array<{ __typename?: 'StringFacet', name?: string | null, count?: number | null } | null> | null } | null } | null } | null, ParentLink?: { __typename?: 'ContentModelReference', Url?: string | null } | null } | { __typename: 'ArtistDetailsPage', Name?: string | null, Url?: string | null, RelativePath?: string | null, PerformanceStartTime?: any | null, PerformanceEndTime?: any | null, StageName?: string | null, ArtistName?: string | null, ArtistPhoto?: string | null, ArtistGenre?: string | null, ArtistDescription?: string | null, ArtistIsHeadliner?: any | null, ParentLink?: { __typename?: 'ContentModelReference', Url?: string | null } | null } | { __typename: 'BuyTicketBlock', Name?: string | null, Url?: string | null, RelativePath?: string | null, ParentLink?: { __typename?: 'ContentModelReference', Url?: string | null } | null } | { __typename: 'Content', Name?: string | null, Url?: string | null, RelativePath?: string | null, ParentLink?: { __typename?: 'ContentModelReference', Url?: string | null } | null } | { __typename: 'ContentBlock', Title?: string | null, Image?: string | null, ImageAlignment?: string | null, Content?: string | null, Name?: string | null, Url?: string | null, RelativePath?: string | null, ParentLink?: { __typename?: 'ContentModelReference', Url?: string | null } | null } | { __typename: 'ImageFile', Name?: string | null, Url?: string | null, RelativePath?: string | null, ParentLink?: { __typename?: 'ContentModelReference', Url?: string | null } | null } | { __typename: 'ImagePage', Name?: string | null, Url?: string | null, RelativePath?: string | null, ParentLink?: { __typename?: 'ContentModelReference', Url?: string | null } | null } | { __typename: 'LandingPage', Name?: string | null, Url?: string | null, RelativePath?: string | null, Title?: string | null, Subtitle?: string | null, HeroImage?: string | null, _children?: { __typename?: 'QueryRef', ArtistContainerPage?: { __typename?: 'ArtistContainerPageOutput', items?: Array<{ __typename?: 'ArtistContainerPage', Name?: string | null, RelativePath?: string | null, headlines?: { __typename?: 'QueryRef', ArtistDetailsPage?: { __typename?: 'ArtistDetailsPageOutput', items?: Array<{ __typename?: 'ArtistDetailsPage', PerformanceStartTime?: any | null, PerformanceEndTime?: any | null, StageName?: string | null, ArtistName?: string | null, ArtistPhoto?: string | null, ArtistGenre?: string | null, ArtistDescription?: string | null, ArtistIsHeadliner?: any | null, Name?: string | null, RelativePath?: string | null, ParentLink?: { __typename?: 'ContentModelReference', Url?: string | null } | null } | null> | null } | null } | null } | null> | null } | null } | null, ParentLink?: { __typename?: 'ContentModelReference', Url?: string | null } | null, BuyTicketBlock?: { __typename?: 'LandingPageBlockData', Heading?: string | null, Message?: string | null } | null, ArtistsLink?: { __typename?: 'ContentModelReference', Expanded?: { __typename?: 'ArtistContainerPage', Name?: string | null, RelativePath?: string | null } | { __typename?: 'ArtistDetailsPage', Name?: string | null, RelativePath?: string | null } | { __typename?: 'BuyTicketBlock', Name?: string | null, RelativePath?: string | null } | { __typename?: 'Content', Name?: string | null, RelativePath?: string | null } | { __typename?: 'ContentBlock', Name?: string | null, RelativePath?: string | null } | { __typename?: 'ImageFile', Name?: string | null, RelativePath?: string | null } | { __typename?: 'ImagePage', Name?: string | null, RelativePath?: string | null } | { __typename?: 'LandingPage', Name?: string | null, RelativePath?: string | null } | null } | null, MainContentArea?: Array<{ __typename?: 'ContentAreaItemModel', ContentLink?: { __typename?: 'ContentModelReference', Expanded?: { __typename: 'ArtistContainerPage' } | { __typename: 'ArtistDetailsPage' } | { __typename: 'BuyTicketBlock' } | { __typename: 'Content' } | { __typename: 'ContentBlock', Title?: string | null, Image?: string | null, ImageAlignment?: string | null, Content?: string | null } | { __typename: 'ImageFile', Content?: string | null, Url?: string | null, Thumbnail?: { __typename?: 'BlobModel', Url?: string | null } | null } | { __typename: 'ImagePage' } | { __typename: 'LandingPage' } | null } | null } | null> | null, FooterContentArea?: Array<{ __typename?: 'ContentAreaItemModel', ContentLink?: { __typename?: 'ContentModelReference', Expanded?: { __typename: 'ArtistContainerPage' } | { __typename: 'ArtistDetailsPage' } | { __typename: 'BuyTicketBlock' } | { __typename: 'Content' } | { __typename: 'ContentBlock', Title?: string | null, Image?: string | null, ImageAlignment?: string | null, Content?: string | null } | { __typename: 'ImageFile', Content?: string | null, Url?: string | null, Thumbnail?: { __typename?: 'BlobModel', Url?: string | null } | null } | { __typename: 'ImagePage' } | { __typename: 'LandingPage' } | null } | null } | null> | null } | null> | null } | null };

export type ArtistDetailsPageFragment = { __typename?: 'ArtistDetailsPage', PerformanceStartTime?: any | null, PerformanceEndTime?: any | null, StageName?: string | null, ArtistName?: string | null, ArtistPhoto?: string | null, ArtistGenre?: string | null, ArtistDescription?: string | null, ArtistIsHeadliner?: any | null, Name?: string | null, RelativePath?: string | null, ParentLink?: { __typename?: 'ContentModelReference', Url?: string | null } | null };

export type ContentBlockFragment = { __typename?: 'ContentBlock', Title?: string | null, Image?: string | null, ImageAlignment?: string | null, Content?: string | null };

export type ImageFileFragment = { __typename?: 'ImageFile', Content?: string | null, Url?: string | null, Thumbnail?: { __typename?: 'BlobModel', Url?: string | null } | null };

type ItemsInContentArea_ArtistContainerPage_Fragment = { __typename: 'ArtistContainerPage' };

type ItemsInContentArea_ArtistDetailsPage_Fragment = { __typename: 'ArtistDetailsPage' };

type ItemsInContentArea_BuyTicketBlock_Fragment = { __typename: 'BuyTicketBlock' };

type ItemsInContentArea_Content_Fragment = { __typename: 'Content' };

type ItemsInContentArea_ContentBlock_Fragment = { __typename: 'ContentBlock', Title?: string | null, Image?: string | null, ImageAlignment?: string | null, Content?: string | null };

type ItemsInContentArea_ImageFile_Fragment = { __typename: 'ImageFile', Content?: string | null, Url?: string | null, Thumbnail?: { __typename?: 'BlobModel', Url?: string | null } | null };

type ItemsInContentArea_ImagePage_Fragment = { __typename: 'ImagePage' };

type ItemsInContentArea_LandingPage_Fragment = { __typename: 'LandingPage' };

export type ItemsInContentAreaFragment = ItemsInContentArea_ArtistContainerPage_Fragment | ItemsInContentArea_ArtistDetailsPage_Fragment | ItemsInContentArea_BuyTicketBlock_Fragment | ItemsInContentArea_Content_Fragment | ItemsInContentArea_ContentBlock_Fragment | ItemsInContentArea_ImageFile_Fragment | ItemsInContentArea_ImagePage_Fragment | ItemsInContentArea_LandingPage_Fragment;

export type LandingPageFragment = { __typename?: 'LandingPage', Title?: string | null, Subtitle?: string | null, HeroImage?: string | null, BuyTicketBlock?: { __typename?: 'LandingPageBlockData', Heading?: string | null, Message?: string | null } | null, ArtistsLink?: { __typename?: 'ContentModelReference', Expanded?: { __typename?: 'ArtistContainerPage', Name?: string | null, RelativePath?: string | null } | { __typename?: 'ArtistDetailsPage', Name?: string | null, RelativePath?: string | null } | { __typename?: 'BuyTicketBlock', Name?: string | null, RelativePath?: string | null } | { __typename?: 'Content', Name?: string | null, RelativePath?: string | null } | { __typename?: 'ContentBlock', Name?: string | null, RelativePath?: string | null } | { __typename?: 'ImageFile', Name?: string | null, RelativePath?: string | null } | { __typename?: 'ImagePage', Name?: string | null, RelativePath?: string | null } | { __typename?: 'LandingPage', Name?: string | null, RelativePath?: string | null } | null } | null, MainContentArea?: Array<{ __typename?: 'ContentAreaItemModel', ContentLink?: { __typename?: 'ContentModelReference', Expanded?: { __typename: 'ArtistContainerPage' } | { __typename: 'ArtistDetailsPage' } | { __typename: 'BuyTicketBlock' } | { __typename: 'Content' } | { __typename: 'ContentBlock', Title?: string | null, Image?: string | null, ImageAlignment?: string | null, Content?: string | null } | { __typename: 'ImageFile', Content?: string | null, Url?: string | null, Thumbnail?: { __typename?: 'BlobModel', Url?: string | null } | null } | { __typename: 'ImagePage' } | { __typename: 'LandingPage' } | null } | null } | null> | null, FooterContentArea?: Array<{ __typename?: 'ContentAreaItemModel', ContentLink?: { __typename?: 'ContentModelReference', Expanded?: { __typename: 'ArtistContainerPage' } | { __typename: 'ArtistDetailsPage' } | { __typename: 'BuyTicketBlock' } | { __typename: 'Content' } | { __typename: 'ContentBlock', Title?: string | null, Image?: string | null, ImageAlignment?: string | null, Content?: string | null } | { __typename: 'ImageFile', Content?: string | null, Url?: string | null, Thumbnail?: { __typename?: 'BlobModel', Url?: string | null } | null } | { __typename: 'ImagePage' } | { __typename: 'LandingPage' } | null } | null } | null> | null };

export type LandingPageBlockDataFragment = { __typename?: 'LandingPageBlockData', Heading?: string | null, Message?: string | null };

export const ArtistDetailsPageFragmentDoc = `
    fragment ArtistDetailsPage on ArtistDetailsPage {
  PerformanceStartTime
  PerformanceEndTime
  StageName
  ArtistName
  ArtistPhoto
  ArtistGenre
  ArtistDescription
  ArtistIsHeadliner
  Name
  RelativePath
  ParentLink {
    Url
  }
}
    `;
export const LandingPageBlockDataFragmentDoc = `
    fragment LandingPageBlockData on LandingPageBlockData {
  Heading
  Message
}
    `;
export const ContentBlockFragmentDoc = `
    fragment ContentBlock on ContentBlock {
  Title
  Image
  ImageAlignment
  Content
}
    `;
export const ImageFileFragmentDoc = `
    fragment ImageFile on ImageFile {
  Thumbnail {
    Url
  }
  Content
  Url
}
    `;
export const ItemsInContentAreaFragmentDoc = `
    fragment ItemsInContentArea on IContent {
  __typename
  ... on ContentBlock {
    ...ContentBlock
  }
  ... on ImageFile {
    ...ImageFile
  }
}
    ${ContentBlockFragmentDoc}
${ImageFileFragmentDoc}`;
export const LandingPageFragmentDoc = `
    fragment LandingPage on LandingPage {
  Title
  Subtitle
  BuyTicketBlock {
    ...LandingPageBlockData
  }
  HeroImage
  ArtistsLink {
    Expanded {
      Name
      RelativePath
    }
  }
  MainContentArea {
    ContentLink {
      Expanded {
        ...ItemsInContentArea
      }
    }
  }
  FooterContentArea {
    ContentLink {
      Expanded {
        ...ItemsInContentArea
      }
    }
  }
}
    ${LandingPageBlockDataFragmentDoc}
${ItemsInContentAreaFragmentDoc}`;
export const SearchDocument = `
    query Search($searchParam: String, $locales: Locales!, $order: OrderBy) {
  ArtistDetailsPage(
    locale: [$locales]
    orderBy: {ArtistName: $order}
    where: {_or: [{Name: {contains: $searchParam, boost: 10}}, {Name: {startsWith: $searchParam, boost: 10}}, {StageName: {startsWith: $searchParam}}]}
  ) {
    items {
      PerformanceStartTime
      PerformanceEndTime
      StageName
      ArtistName
      ArtistPhoto
      ArtistGenre
      ArtistDescription
      ArtistIsHeadliner
      RelativePath
      ParentLink {
        Url
      }
      _fulltext
    }
  }
}
    `;
export const useSearchQuery = <
      TData = SearchQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: SearchQueryVariables,
      options?: UseQueryOptions<SearchQuery, TError, TData>
    ) =>
    useQuery<SearchQuery, TError, TData>(
      ['Search', variables],
      fetcher<SearchQuery, SearchQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, SearchDocument, variables),
      options
    );
export const StartDocument = `
    query Start($relativePath: String, $locales: Locales!, $language: String, $stageName: String, $artistGenre: String, $contentId: Int, $workId: Int, $statusEqual: String, $isCommonDraft: Boolean) {
  Content(
    locale: [$locales]
    where: {ContentLink: {WorkId: {eq: $workId}, Id: {eq: $contentId}}, RelativePath: {eq: $relativePath}, Language: {Name: {eq: $language}}, Status: {eq: $statusEqual}, IsCommonDraft: {eq: $isCommonDraft}}
    orderBy: {Saved: DESC}
    limit: 1
  ) {
    items {
      Name
      ParentLink {
        Url
      }
      Url
      __typename
      RelativePath
      ... on LandingPage {
        ...LandingPage
        _children {
          ArtistContainerPage {
            items {
              Name
              RelativePath
              headlines: _children {
                ArtistDetailsPage(
                  where: {ArtistIsHeadliner: {eq: true}}
                  orderBy: {PerformanceStartTime: ASC, Name: ASC}
                ) {
                  items {
                    ...ArtistDetailsPage
                  }
                }
              }
            }
          }
        }
      }
      ... on ArtistContainerPage {
        Name
        RelativePath
        artists: _children {
          ArtistDetailsPage(
            where: {StageName: {eq: $stageName}, ArtistGenre: {eq: $artistGenre}, Status: {eq: "Published"}}
            orderBy: {Name: ASC, ArtistIsHeadliner: ASC, PerformanceStartTime: ASC, StageName: ASC}
            limit: 100
          ) {
            items {
              ...ArtistDetailsPage
            }
            facets {
              ArtistGenre(orderType: VALUE, orderBy: ASC, limit: 10) {
                name
                count
              }
              StageName(orderType: VALUE, orderBy: ASC, limit: 10) {
                name
                count
              }
            }
          }
        }
      }
      ... on ArtistDetailsPage {
        ...ArtistDetailsPage
      }
      ... on ContentBlock {
        Title
        Image
        ImageAlignment
        Content
      }
    }
  }
}
    ${LandingPageFragmentDoc}
${ArtistDetailsPageFragmentDoc}`;
export const useStartQuery = <
      TData = StartQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: StartQueryVariables,
      options?: UseQueryOptions<StartQuery, TError, TData>
    ) =>
    useQuery<StartQuery, TError, TData>(
      ['Start', variables],
      fetcher<StartQuery, StartQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, StartDocument, variables),
      options
    );