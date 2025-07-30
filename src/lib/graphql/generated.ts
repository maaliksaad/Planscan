import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

/** CSICode */
export type CsiCode = {
  __typename?: 'CSICode';
  created_at: Scalars['DateTime']['output'];
  csi_code: Scalars['String']['output'];
  csi_code_id: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

/** Comment */
export type Comment = {
  __typename?: 'Comment';
  comment: Scalars['String']['output'];
  comment_id: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  user: User;
};

export type CreateCommentInput = {
  comment: Scalars['String']['input'];
  text_group_id: Scalars['String']['input'];
};

export type CreateDrawingInput = {
  file_id: Scalars['String']['input'];
  page_end: Scalars['Int']['input'];
  page_start: Scalars['Int']['input'];
  project_id: Scalars['String']['input'];
};

export type CreateProjectInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  office_location?: InputMaybe<Scalars['String']['input']>;
  project_name: Scalars['String']['input'];
  project_number?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateTextGroupInput = {
  page_id: Scalars['String']['input'];
  x1: Scalars['Int']['input'];
  x2: Scalars['Int']['input'];
  y1: Scalars['Int']['input'];
  y2: Scalars['Int']['input'];
};

export type CreateTradePackageInput = {
  project_id: Scalars['String']['input'];
  trade_color: Scalars['String']['input'];
  trade_package_name: Scalars['String']['input'];
  user_ids: Array<Scalars['String']['input']>;
};

export type DownloadPdfInput = {
  file_id: Scalars['String']['input'];
};

/** Drawing */
export type Drawing = {
  __typename?: 'Drawing';
  created_at: Scalars['DateTime']['output'];
  display_file_name: Scalars['String']['output'];
  drawing_id: Scalars['String']['output'];
  drawing_status: DrawingStatus;
};

export enum DrawingStatus {
  Pending = 'PENDING',
  Processed = 'PROCESSED',
  Processing = 'PROCESSING',
  Uploaded = 'UPLOADED'
}

/** Figure */
export type Figure = {
  __typename?: 'Figure';
  figure_id: Scalars['String']['output'];
  figure_number?: Maybe<Scalars['String']['output']>;
  figure_status: FigureStatus;
  figure_title?: Maybe<Scalars['String']['output']>;
  x1: Scalars['Float']['output'];
  x2: Scalars['Float']['output'];
  y1: Scalars['Float']['output'];
  y2: Scalars['Float']['output'];
};

export enum FigureStatus {
  Active = 'ACTIVE'
}

/** File */
export type File = {
  __typename?: 'File';
  created_at: Scalars['DateTime']['output'];
  file_id: Scalars['String']['output'];
  key: Scalars['String']['output'];
  mimetype: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type FilterInput = {
  column: Scalars['String']['input'];
  type: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  apply_trade_package: TradePackage;
  create_comment: Comment;
  create_drawing: Drawing;
  create_project: Project;
  create_text_group: TextGroup;
  create_trade_package: TradePackage;
  generate_pdf: Scalars['String']['output'];
  refresh_token: UserWithToken;
  remove_file: File;
  remove_pages: Array<Page>;
  remove_project: Project;
  remove_text_groups: TextGroup;
  remove_trade_package: TradePackage;
  review_drawing: Drawing;
  star_project: Project;
  unapply_trade_package: TradePackage;
  update_drawing: Drawing;
  update_page: Page;
  update_project: Project;
  update_text_group: TextGroup;
  update_trade_package: TradePackage;
};


export type MutationApply_Trade_PackageArgs = {
  csi_code_ids: Array<Scalars['String']['input']>;
  trade_package_id: Scalars['String']['input'];
};


export type MutationCreate_CommentArgs = {
  data: CreateCommentInput;
};


export type MutationCreate_DrawingArgs = {
  data: CreateDrawingInput;
};


export type MutationCreate_ProjectArgs = {
  data: CreateProjectInput;
};


export type MutationCreate_Text_GroupArgs = {
  data: CreateTextGroupInput;
};


export type MutationCreate_Trade_PackageArgs = {
  data: CreateTradePackageInput;
};


export type MutationGenerate_PdfArgs = {
  data: DownloadPdfInput;
};


export type MutationRemove_FileArgs = {
  key: Scalars['String']['input'];
};


export type MutationRemove_PagesArgs = {
  page_ids: Array<Scalars['String']['input']>;
};


export type MutationRemove_ProjectArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemove_Text_GroupsArgs = {
  text_group_ids: Array<Scalars['String']['input']>;
};


export type MutationRemove_Trade_PackageArgs = {
  trade_package_id: Scalars['String']['input'];
};


export type MutationReview_DrawingArgs = {
  drawing_id: Scalars['String']['input'];
};


export type MutationStar_ProjectArgs = {
  id: Scalars['String']['input'];
  stared: Scalars['Boolean']['input'];
};


export type MutationUnapply_Trade_PackageArgs = {
  csi_code_ids: Array<Scalars['String']['input']>;
  trade_package_id: Scalars['String']['input'];
};


export type MutationUpdate_DrawingArgs = {
  data: UpdateDrawingInput;
  drawing_id: Scalars['String']['input'];
};


export type MutationUpdate_PageArgs = {
  data: UpdatePageInput;
  id: Scalars['String']['input'];
};


export type MutationUpdate_ProjectArgs = {
  data: UpdateProjectInput;
  id: Scalars['String']['input'];
};


export type MutationUpdate_Text_GroupArgs = {
  data: UpdateTextGroupInput;
  id: Scalars['String']['input'];
};


export type MutationUpdate_Trade_PackageArgs = {
  data: UpdateTradePackageInput;
  trade_package_id: Scalars['String']['input'];
};

/** Organization */
export type Organization = {
  __typename?: 'Organization';
  created_at: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  organization_id: Scalars['String']['output'];
};

/** Page */
export type Page = {
  __typename?: 'Page';
  created_at: Scalars['DateTime']['output'];
  drawing_discipline?: Maybe<Scalars['String']['output']>;
  drawing_number?: Maybe<Scalars['String']['output']>;
  page_id: Scalars['String']['output'];
  page_image_height?: Maybe<Scalars['Int']['output']>;
  page_image_uri: Scalars['String']['output'];
  page_image_width?: Maybe<Scalars['Int']['output']>;
  page_number: Scalars['Int']['output'];
  page_pdf_uri?: Maybe<Scalars['String']['output']>;
  page_status?: Maybe<PageStatus>;
  page_thumbnail_uri?: Maybe<Scalars['String']['output']>;
  sheet_title?: Maybe<Scalars['String']['output']>;
  text_groups?: Maybe<Array<TextGroup>>;
};

export enum PageStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED'
}

/** PaginatedProjects */
export type PaginatedProjects = {
  __typename?: 'PaginatedProjects';
  data: Array<Project>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  total_pages: Scalars['Int']['output'];
};

/** Project */
export type Project = {
  __typename?: 'Project';
  address?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['Float']['output'];
  drawing?: Maybe<Drawing>;
  office_location?: Maybe<Scalars['String']['output']>;
  project_id: Scalars['String']['output'];
  project_name: Scalars['String']['output'];
  project_number?: Maybe<Scalars['Int']['output']>;
  project_status: ProjectStatus;
  user_projects: Array<UserProject>;
};

export enum ProjectStatus {
  Active = 'ACTIVE',
  Closed = 'CLOSED'
}

export type Query = {
  __typename?: 'Query';
  csi_codes: Array<CsiCode>;
  figures: Array<Figure>;
  file: File;
  organization: Organization;
  organization_members: Array<User>;
  pages: Array<Page>;
  project: Project;
  projects: PaginatedProjects;
  trade_packages: Array<TradePackage>;
  user: User;
};


export type QueryCsi_CodesArgs = {
  project_id: Scalars['String']['input'];
};


export type QueryFiguresArgs = {
  text_group_id: Scalars['String']['input'];
};


export type QueryFileArgs = {
  key: Scalars['String']['input'];
};


export type QueryPagesArgs = {
  project_id: Scalars['String']['input'];
};


export type QueryProjectArgs = {
  id: Scalars['String']['input'];
};


export type QueryProjectsArgs = {
  filters?: InputMaybe<Array<FilterInput>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTrade_PackagesArgs = {
  project_id: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  update_pages: Array<Page>;
  update_project: Project;
  update_trades: Array<TradePackage>;
};


export type SubscriptionUpdate_PagesArgs = {
  project_id: Scalars['String']['input'];
};


export type SubscriptionUpdate_ProjectArgs = {
  project_id: Scalars['String']['input'];
};


export type SubscriptionUpdate_TradesArgs = {
  project_id: Scalars['String']['input'];
};

/** TextGroup */
export type TextGroup = {
  __typename?: 'TextGroup';
  comments: Array<Comment>;
  created_at: Scalars['DateTime']['output'];
  csi_codes: Array<CsiCode>;
  figure?: Maybe<Figure>;
  text: Scalars['String']['output'];
  text_group_id: Scalars['String']['output'];
  text_group_status: TextGroupStatus;
  trade_packages: Array<TradePackage>;
  user_edited_text?: Maybe<Scalars['String']['output']>;
  x1: Scalars['Float']['output'];
  x2: Scalars['Float']['output'];
  y1: Scalars['Float']['output'];
  y2: Scalars['Float']['output'];
};

export enum TextGroupStatus {
  Active = 'ACTIVE',
  CsiEdited = 'CSI_EDITED',
  CsiEditing = 'CSI_EDITING',
  Extracting = 'EXTRACTING'
}

/** TradePackage */
export type TradePackage = {
  __typename?: 'TradePackage';
  created_at: Scalars['DateTime']['output'];
  csi_codes: Array<CsiCode>;
  trade_color?: Maybe<Scalars['String']['output']>;
  trade_package_id: Scalars['String']['output'];
  trade_package_name: Scalars['String']['output'];
  users: Array<User>;
};

export type UpdateDrawingInput = {
  drawing_status?: InputMaybe<DrawingStatus>;
};

export type UpdatePageInput = {
  drawing_discipline?: InputMaybe<Scalars['String']['input']>;
  drawing_number?: InputMaybe<Scalars['String']['input']>;
  sheet_title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProjectInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  office_location?: InputMaybe<Scalars['String']['input']>;
  project_name?: InputMaybe<Scalars['String']['input']>;
  project_number?: InputMaybe<Scalars['Int']['input']>;
  project_status?: InputMaybe<ProjectStatus>;
};

export type UpdateTextGroupInput = {
  csi_codes?: InputMaybe<Array<Scalars['String']['input']>>;
  figure_id?: InputMaybe<Scalars['String']['input']>;
  text_group_status?: InputMaybe<TextGroupStatus>;
  trades?: InputMaybe<Array<Scalars['String']['input']>>;
  user_edited_text?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTradePackageInput = {
  trade_color?: InputMaybe<Scalars['String']['input']>;
  trade_package_name?: InputMaybe<Scalars['String']['input']>;
  user_ids?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** User */
export type User = {
  __typename?: 'User';
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  profile_photo_url: Scalars['String']['output'];
  user_id: Scalars['String']['output'];
};

/** UserProject */
export type UserProject = {
  __typename?: 'UserProject';
  stared: Scalars['Boolean']['output'];
  user_id: Scalars['String']['output'];
};

/** UserWithToken */
export type UserWithToken = {
  __typename?: 'UserWithToken';
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  profile_photo_url: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user_id: Scalars['String']['output'];
};

export type UserWithTokenFragmentFragment = { __typename?: 'UserWithToken', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, token: string, created_at: string };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refresh_token: { __typename?: 'UserWithToken', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, token: string, created_at: string } };

export type CreateCommentMutationVariables = Exact<{
  data: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', create_comment: { __typename?: 'Comment', comment_id: string, comment: string, created_at: string, user: { __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string } } };

export type CsiCodeFragmentFragment = { __typename?: 'CSICode', csi_code_id: string, csi_code: string, title: string, created_at: string };

export type DrawingFragmentFragment = { __typename?: 'Drawing', drawing_id: string, display_file_name: string, drawing_status: DrawingStatus, created_at: string };

export type CreateDrawingMutationVariables = Exact<{
  data: CreateDrawingInput;
}>;


export type CreateDrawingMutation = { __typename?: 'Mutation', create_drawing: { __typename?: 'Drawing', drawing_id: string, display_file_name: string, drawing_status: DrawingStatus, created_at: string } };

export type ReviewDrawingMutationVariables = Exact<{
  drawing_id: Scalars['String']['input'];
}>;


export type ReviewDrawingMutation = { __typename?: 'Mutation', review_drawing: { __typename?: 'Drawing', drawing_id: string } };

export type UpdateDrawingMutationVariables = Exact<{
  drawing_id: Scalars['String']['input'];
  data: UpdateDrawingInput;
}>;


export type UpdateDrawingMutation = { __typename?: 'Mutation', update_drawing: { __typename?: 'Drawing', drawing_id: string } };

export type FigureFragmentFragment = { __typename?: 'Figure', figure_id: string, figure_title?: string | null, figure_number?: string | null };

export type GetFiguresQueryVariables = Exact<{
  text_group_id: Scalars['String']['input'];
}>;


export type GetFiguresQuery = { __typename?: 'Query', figures: Array<{ __typename?: 'Figure', figure_id: string, figure_title?: string | null, figure_number?: string | null }> };

export type FileFragmentFragment = { __typename?: 'File', file_id: string, name: string, key: string, mimetype: string, created_at: string };

export type GetFileQueryVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type GetFileQuery = { __typename?: 'Query', file: { __typename?: 'File', file_id: string, name: string, key: string, mimetype: string, created_at: string } };

export type RemoveFileMutationVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type RemoveFileMutation = { __typename?: 'Mutation', remove_file: { __typename?: 'File', file_id: string, name: string, key: string, mimetype: string, created_at: string } };

export type OrganizationFragmentFragment = { __typename?: 'Organization', organization_id: string, name: string, created_at: string };

export type GetOrganizationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizationQuery = { __typename?: 'Query', organization: { __typename?: 'Organization', organization_id: string, name: string, created_at: string } };

export type GetOrganizationMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizationMembersQuery = { __typename?: 'Query', organization_members: Array<{ __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string }> };

export type PageFragmentFragment = { __typename?: 'Page', page_id: string, drawing_number?: string | null, drawing_discipline?: string | null, sheet_title?: string | null, page_number: number, page_image_width?: number | null, page_image_height?: number | null, page_thumbnail_uri?: string | null, page_image_uri: string, created_at: string, text_groups?: Array<{ __typename?: 'TextGroup', text_group_id: string, text: string, x1: number, x2: number, y1: number, y2: number, user_edited_text?: string | null, text_group_status: TextGroupStatus, created_at: string, comments: Array<{ __typename?: 'Comment', comment_id: string, comment: string, created_at: string, user: { __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string } }>, csi_codes: Array<{ __typename?: 'CSICode', csi_code_id: string, csi_code: string, title: string, created_at: string }>, trade_packages: Array<{ __typename?: 'TradePackage', trade_package_id: string, trade_package_name: string, trade_color?: string | null, users: Array<{ __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string }>, csi_codes: Array<{ __typename?: 'CSICode', csi_code_id: string, csi_code: string, title: string, created_at: string }> }>, figure?: { __typename?: 'Figure', figure_number?: string | null } | null }> | null };

export type GetProjectPagesQueryVariables = Exact<{
  project_id: Scalars['String']['input'];
}>;


export type GetProjectPagesQuery = { __typename?: 'Query', pages: Array<{ __typename?: 'Page', page_id: string, drawing_number?: string | null, drawing_discipline?: string | null, sheet_title?: string | null, page_number: number, page_image_width?: number | null, page_image_height?: number | null, page_thumbnail_uri?: string | null, page_image_uri: string, created_at: string, text_groups?: Array<{ __typename?: 'TextGroup', text_group_id: string, text: string, x1: number, x2: number, y1: number, y2: number, user_edited_text?: string | null, text_group_status: TextGroupStatus, created_at: string, comments: Array<{ __typename?: 'Comment', comment_id: string, comment: string, created_at: string, user: { __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string } }>, csi_codes: Array<{ __typename?: 'CSICode', csi_code_id: string, csi_code: string, title: string, created_at: string }>, trade_packages: Array<{ __typename?: 'TradePackage', trade_package_id: string, trade_package_name: string, trade_color?: string | null, users: Array<{ __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string }>, csi_codes: Array<{ __typename?: 'CSICode', csi_code_id: string, csi_code: string, title: string, created_at: string }> }>, figure?: { __typename?: 'Figure', figure_number?: string | null } | null }> | null }> };

export type UpdatePageMutationVariables = Exact<{
  page_id: Scalars['String']['input'];
  data: UpdatePageInput;
}>;


export type UpdatePageMutation = { __typename?: 'Mutation', update_page: { __typename?: 'Page', page_id: string, drawing_number?: string | null, drawing_discipline?: string | null, sheet_title?: string | null, page_number: number, page_image_width?: number | null, page_image_height?: number | null, page_thumbnail_uri?: string | null, page_image_uri: string, created_at: string, text_groups?: Array<{ __typename?: 'TextGroup', text_group_id: string, text: string, x1: number, x2: number, y1: number, y2: number, user_edited_text?: string | null, text_group_status: TextGroupStatus, created_at: string, comments: Array<{ __typename?: 'Comment', comment_id: string, comment: string, created_at: string, user: { __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string } }>, csi_codes: Array<{ __typename?: 'CSICode', csi_code_id: string, csi_code: string, title: string, created_at: string }>, trade_packages: Array<{ __typename?: 'TradePackage', trade_package_id: string, trade_package_name: string, trade_color?: string | null, users: Array<{ __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string }>, csi_codes: Array<{ __typename?: 'CSICode', csi_code_id: string, csi_code: string, title: string, created_at: string }> }>, figure?: { __typename?: 'Figure', figure_number?: string | null } | null }> | null } };

export type RemovePagesMutationVariables = Exact<{
  page_ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type RemovePagesMutation = { __typename?: 'Mutation', remove_pages: Array<{ __typename?: 'Page', page_id: string }> };

export type PagesUpdatedSubscriptionVariables = Exact<{
  project_id: Scalars['String']['input'];
}>;


export type PagesUpdatedSubscription = { __typename?: 'Subscription', update_pages: Array<{ __typename?: 'Page', page_id: string, drawing_number?: string | null, drawing_discipline?: string | null, sheet_title?: string | null, page_number: number, page_image_width?: number | null, page_image_height?: number | null, page_thumbnail_uri?: string | null, page_image_uri: string, created_at: string, text_groups?: Array<{ __typename?: 'TextGroup', text_group_id: string, text: string, x1: number, x2: number, y1: number, y2: number, user_edited_text?: string | null, text_group_status: TextGroupStatus, created_at: string, comments: Array<{ __typename?: 'Comment', comment_id: string, comment: string, created_at: string, user: { __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string } }>, csi_codes: Array<{ __typename?: 'CSICode', csi_code_id: string, csi_code: string, title: string, created_at: string }>, trade_packages: Array<{ __typename?: 'TradePackage', trade_package_id: string, trade_package_name: string, trade_color?: string | null, users: Array<{ __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string }>, csi_codes: Array<{ __typename?: 'CSICode', csi_code_id: string, csi_code: string, title: string, created_at: string }> }>, figure?: { __typename?: 'Figure', figure_number?: string | null } | null }> | null }> };

export type GeneratePdfMutationVariables = Exact<{
  data: DownloadPdfInput;
}>;


export type GeneratePdfMutation = { __typename?: 'Mutation', generate_pdf: string };

export type ProjectFragmentFragment = { __typename?: 'Project', project_id: string, project_name: string, project_number?: number | null, office_location?: string | null, address?: string | null, project_status: ProjectStatus, created_at: number, drawing?: { __typename?: 'Drawing', drawing_id: string, display_file_name: string, drawing_status: DrawingStatus, created_at: string } | null, user_projects: Array<{ __typename?: 'UserProject', user_id: string, stared: boolean }> };

export type GetProjectsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<Array<FilterInput> | FilterInput>;
}>;


export type GetProjectsQuery = { __typename?: 'Query', projects: { __typename?: 'PaginatedProjects', total: number, total_pages: number, page: number, limit: number, data: Array<{ __typename?: 'Project', project_id: string, project_name: string, project_number?: number | null, office_location?: string | null, address?: string | null, project_status: ProjectStatus, created_at: number, drawing?: { __typename?: 'Drawing', drawing_id: string, display_file_name: string, drawing_status: DrawingStatus, created_at: string } | null, user_projects: Array<{ __typename?: 'UserProject', user_id: string, stared: boolean }> }> } };

export type GetProjectByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetProjectByIdQuery = { __typename?: 'Query', project: { __typename?: 'Project', project_id: string, project_name: string, project_number?: number | null, office_location?: string | null, address?: string | null, project_status: ProjectStatus, created_at: number, drawing?: { __typename?: 'Drawing', drawing_id: string, display_file_name: string, drawing_status: DrawingStatus, created_at: string } | null, user_projects: Array<{ __typename?: 'UserProject', user_id: string, stared: boolean }> } };

export type CreateProjectMutationVariables = Exact<{
  data: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', create_project: { __typename?: 'Project', project_id: string } };

export type UpdateProjectMutationVariables = Exact<{
  project_id: Scalars['String']['input'];
  data: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', update_project: { __typename?: 'Project', project_id: string } };

export type RemoveProjectMutationVariables = Exact<{
  project_id: Scalars['String']['input'];
}>;


export type RemoveProjectMutation = { __typename?: 'Mutation', remove_project: { __typename?: 'Project', project_id: string } };

export type StarProjectMutationVariables = Exact<{
  project_id: Scalars['String']['input'];
  stared: Scalars['Boolean']['input'];
}>;


export type StarProjectMutation = { __typename?: 'Mutation', star_project: { __typename?: 'Project', project_id: string } };

export type ProjectUpdatedSubscriptionVariables = Exact<{
  project_id: Scalars['String']['input'];
}>;


export type ProjectUpdatedSubscription = { __typename?: 'Subscription', update_project: { __typename?: 'Project', project_id: string, project_name: string, project_number?: number | null, office_location?: string | null, address?: string | null, project_status: ProjectStatus, created_at: number, drawing?: { __typename?: 'Drawing', drawing_id: string, display_file_name: string, drawing_status: DrawingStatus, created_at: string } | null, user_projects: Array<{ __typename?: 'UserProject', user_id: string, stared: boolean }> } };

export type GetProjectDetailsQueryVariables = Exact<{
  project_id: Scalars['String']['input'];
}>;


export type GetProjectDetailsQuery = { __typename?: 'Query', project: { __typename?: 'Project', project_id: string, project_name: string, project_number?: number | null, office_location?: string | null, address?: string | null, project_status: ProjectStatus, created_at: number, drawing?: { __typename?: 'Drawing', drawing_id: string, display_file_name: string, drawing_status: DrawingStatus, created_at: string } | null, user_projects: Array<{ __typename?: 'UserProject', user_id: string, stared: boolean }> }, pages: Array<{ __typename?: 'Page', page_id: string, drawing_number?: string | null, drawing_discipline?: string | null, sheet_title?: string | null, page_number: number, page_image_width?: number | null, page_image_height?: number | null, page_thumbnail_uri?: string | null, page_image_uri: string, created_at: string, text_groups?: Array<{ __typename?: 'TextGroup', text_group_id: string, text: string, x1: number, x2: number, y1: number, y2: number, user_edited_text?: string | null, text_group_status: TextGroupStatus, created_at: string, comments: Array<{ __typename?: 'Comment', comment_id: string, comment: string, created_at: string, user: { __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string } }>, csi_codes: Array<{ __typename?: 'CSICode', csi_code_id: string, csi_code: string, title: string, created_at: string }>, trade_packages: Array<{ __typename?: 'TradePackage', trade_package_id: string, trade_package_name: string, trade_color?: string | null, users: Array<{ __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string }>, csi_codes: Array<{ __typename?: 'CSICode', csi_code_id: string, csi_code: string, title: string, created_at: string }> }>, figure?: { __typename?: 'Figure', figure_number?: string | null } | null }> | null }>, trade_packages: Array<{ __typename?: 'TradePackage', trade_package_id: string, trade_package_name: string, trade_color?: string | null, users: Array<{ __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string }>, csi_codes: Array<{ __typename?: 'CSICode', csi_code_id: string, csi_code: string, title: string, created_at: string }> }> };

export type TextGroupFragmentFragment = { __typename?: 'TextGroup', text_group_id: string, text: string, x1: number, x2: number, y1: number, y2: number, user_edited_text?: string | null, text_group_status: TextGroupStatus, created_at: string, comments: Array<{ __typename?: 'Comment', comment_id: string, comment: string, created_at: string, user: { __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string } }>, csi_codes: Array<{ __typename?: 'CSICode', csi_code_id: string, csi_code: string, title: string, created_at: string }>, trade_packages: Array<{ __typename?: 'TradePackage', trade_package_id: string, trade_package_name: string, trade_color?: string | null, users: Array<{ __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string }>, csi_codes: Array<{ __typename?: 'CSICode', csi_code_id: string, csi_code: string, title: string, created_at: string }> }>, figure?: { __typename?: 'Figure', figure_number?: string | null } | null };

export type CreateTextGroupMutationVariables = Exact<{
  data: CreateTextGroupInput;
}>;


export type CreateTextGroupMutation = { __typename?: 'Mutation', create_text_group: { __typename?: 'TextGroup', text_group_id: string, text: string, x1: number, x2: number, y1: number, y2: number, user_edited_text?: string | null, text_group_status: TextGroupStatus, created_at: string, comments: Array<{ __typename?: 'Comment', comment_id: string, comment: string, created_at: string, user: { __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string } }>, csi_codes: Array<{ __typename?: 'CSICode', csi_code_id: string, csi_code: string, title: string, created_at: string }>, trade_packages: Array<{ __typename?: 'TradePackage', trade_package_id: string, trade_package_name: string, trade_color?: string | null, users: Array<{ __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string }>, csi_codes: Array<{ __typename?: 'CSICode', csi_code_id: string, csi_code: string, title: string, created_at: string }> }>, figure?: { __typename?: 'Figure', figure_number?: string | null } | null } };

export type UpdateTextGroupMutationVariables = Exact<{
  text_group_id: Scalars['String']['input'];
  data: UpdateTextGroupInput;
}>;


export type UpdateTextGroupMutation = { __typename?: 'Mutation', update_text_group: { __typename?: 'TextGroup', text_group_id: string } };

export type RemoveTextGroupsMutationVariables = Exact<{
  text_group_ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type RemoveTextGroupsMutation = { __typename?: 'Mutation', remove_text_groups: { __typename?: 'TextGroup', text_group_id: string } };

export type TradePackageFragmentFragment = { __typename?: 'TradePackage', trade_package_id: string, trade_package_name: string, trade_color?: string | null, users: Array<{ __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string }>, csi_codes: Array<{ __typename?: 'CSICode', csi_code_id: string, csi_code: string, title: string, created_at: string }> };

export type CreateTradePackageMutationVariables = Exact<{
  data: CreateTradePackageInput;
}>;


export type CreateTradePackageMutation = { __typename?: 'Mutation', create_trade_package: { __typename?: 'TradePackage', trade_package_id: string } };

export type UpdateTradePackageMutationVariables = Exact<{
  trade_package_id: Scalars['String']['input'];
  data: UpdateTradePackageInput;
}>;


export type UpdateTradePackageMutation = { __typename?: 'Mutation', update_trade_package: { __typename?: 'TradePackage', trade_package_id: string } };

export type ApplyTradeMutationVariables = Exact<{
  trade_package_id: Scalars['String']['input'];
  csi_code_ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type ApplyTradeMutation = { __typename?: 'Mutation', apply_trade_package: { __typename?: 'TradePackage', trade_package_id: string } };

export type UnApplyTradeMutationVariables = Exact<{
  trade_package_id: Scalars['String']['input'];
  csi_code_ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type UnApplyTradeMutation = { __typename?: 'Mutation', unapply_trade_package: { __typename?: 'TradePackage', trade_package_id: string } };

export type TradesUpdatedSubscriptionVariables = Exact<{
  project_id: Scalars['String']['input'];
}>;


export type TradesUpdatedSubscription = { __typename?: 'Subscription', update_trades: Array<{ __typename?: 'TradePackage', trade_package_id: string, trade_package_name: string, trade_color?: string | null, users: Array<{ __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string }>, csi_codes: Array<{ __typename?: 'CSICode', csi_code_id: string, csi_code: string, title: string, created_at: string }> }> };

export type UserFragmentFragment = { __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', user_id: string, first_name: string, last_name: string, email: string, profile_photo_url: string, created_at: string } };

export const UserWithTokenFragmentFragmentDoc = gql`
    fragment UserWithTokenFragment on UserWithToken {
  user_id
  first_name
  last_name
  email
  profile_photo_url
  token
  created_at
}
    `;
export const FigureFragmentFragmentDoc = gql`
    fragment FigureFragment on Figure {
  figure_id
  figure_title
  figure_number
}
    `;
export const FileFragmentFragmentDoc = gql`
    fragment FileFragment on File {
  file_id
  name
  key
  mimetype
  created_at
}
    `;
export const OrganizationFragmentFragmentDoc = gql`
    fragment OrganizationFragment on Organization {
  organization_id
  name
  created_at
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  user_id
  first_name
  last_name
  email
  profile_photo_url
  created_at
}
    `;
export const CsiCodeFragmentFragmentDoc = gql`
    fragment CSICodeFragment on CSICode {
  csi_code_id
  csi_code
  title
  created_at
}
    `;
export const TradePackageFragmentFragmentDoc = gql`
    fragment TradePackageFragment on TradePackage {
  trade_package_id
  trade_package_name
  trade_color
  users {
    ...UserFragment
  }
  csi_codes {
    ...CSICodeFragment
  }
}
    ${UserFragmentFragmentDoc}
${CsiCodeFragmentFragmentDoc}`;
export const TextGroupFragmentFragmentDoc = gql`
    fragment TextGroupFragment on TextGroup {
  text_group_id
  text
  x1
  x2
  y1
  y2
  user_edited_text
  text_group_status
  created_at
  comments {
    comment_id
    comment
    user {
      ...UserFragment
    }
    created_at
  }
  csi_codes {
    ...CSICodeFragment
  }
  trade_packages {
    ...TradePackageFragment
  }
  figure {
    figure_number
  }
}
    ${UserFragmentFragmentDoc}
${CsiCodeFragmentFragmentDoc}
${TradePackageFragmentFragmentDoc}`;
export const PageFragmentFragmentDoc = gql`
    fragment PageFragment on Page {
  page_id
  drawing_number
  drawing_discipline
  sheet_title
  page_number
  page_image_width
  page_image_height
  page_thumbnail_uri
  page_image_uri
  text_groups {
    ...TextGroupFragment
  }
  created_at
}
    ${TextGroupFragmentFragmentDoc}`;
export const DrawingFragmentFragmentDoc = gql`
    fragment DrawingFragment on Drawing {
  drawing_id
  display_file_name
  drawing_status
  created_at
}
    `;
export const ProjectFragmentFragmentDoc = gql`
    fragment ProjectFragment on Project {
  project_id
  project_name
  project_number
  office_location
  address
  project_status
  drawing {
    ...DrawingFragment
  }
  user_projects {
    user_id
    stared
  }
  created_at
}
    ${DrawingFragmentFragmentDoc}`;
export const RefreshTokenDocument = gql`
    mutation RefreshToken {
  refresh_token {
    ...UserWithTokenFragment
  }
}
    ${UserWithTokenFragmentFragmentDoc}`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($data: CreateCommentInput!) {
  create_comment(data: $data) {
    comment_id
    comment
    user {
      ...UserFragment
    }
    created_at
  }
}
    ${UserFragmentFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateDrawingDocument = gql`
    mutation CreateDrawing($data: CreateDrawingInput!) {
  create_drawing(data: $data) {
    ...DrawingFragment
  }
}
    ${DrawingFragmentFragmentDoc}`;
export type CreateDrawingMutationFn = Apollo.MutationFunction<CreateDrawingMutation, CreateDrawingMutationVariables>;

/**
 * __useCreateDrawingMutation__
 *
 * To run a mutation, you first call `useCreateDrawingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDrawingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDrawingMutation, { data, loading, error }] = useCreateDrawingMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateDrawingMutation(baseOptions?: Apollo.MutationHookOptions<CreateDrawingMutation, CreateDrawingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDrawingMutation, CreateDrawingMutationVariables>(CreateDrawingDocument, options);
      }
export type CreateDrawingMutationHookResult = ReturnType<typeof useCreateDrawingMutation>;
export type CreateDrawingMutationResult = Apollo.MutationResult<CreateDrawingMutation>;
export type CreateDrawingMutationOptions = Apollo.BaseMutationOptions<CreateDrawingMutation, CreateDrawingMutationVariables>;
export const ReviewDrawingDocument = gql`
    mutation ReviewDrawing($drawing_id: String!) {
  review_drawing(drawing_id: $drawing_id) {
    drawing_id
  }
}
    `;
export type ReviewDrawingMutationFn = Apollo.MutationFunction<ReviewDrawingMutation, ReviewDrawingMutationVariables>;

/**
 * __useReviewDrawingMutation__
 *
 * To run a mutation, you first call `useReviewDrawingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReviewDrawingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reviewDrawingMutation, { data, loading, error }] = useReviewDrawingMutation({
 *   variables: {
 *      drawing_id: // value for 'drawing_id'
 *   },
 * });
 */
export function useReviewDrawingMutation(baseOptions?: Apollo.MutationHookOptions<ReviewDrawingMutation, ReviewDrawingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReviewDrawingMutation, ReviewDrawingMutationVariables>(ReviewDrawingDocument, options);
      }
export type ReviewDrawingMutationHookResult = ReturnType<typeof useReviewDrawingMutation>;
export type ReviewDrawingMutationResult = Apollo.MutationResult<ReviewDrawingMutation>;
export type ReviewDrawingMutationOptions = Apollo.BaseMutationOptions<ReviewDrawingMutation, ReviewDrawingMutationVariables>;
export const UpdateDrawingDocument = gql`
    mutation UpdateDrawing($drawing_id: String!, $data: UpdateDrawingInput!) {
  update_drawing(drawing_id: $drawing_id, data: $data) {
    drawing_id
  }
}
    `;
export type UpdateDrawingMutationFn = Apollo.MutationFunction<UpdateDrawingMutation, UpdateDrawingMutationVariables>;

/**
 * __useUpdateDrawingMutation__
 *
 * To run a mutation, you first call `useUpdateDrawingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDrawingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDrawingMutation, { data, loading, error }] = useUpdateDrawingMutation({
 *   variables: {
 *      drawing_id: // value for 'drawing_id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateDrawingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDrawingMutation, UpdateDrawingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDrawingMutation, UpdateDrawingMutationVariables>(UpdateDrawingDocument, options);
      }
export type UpdateDrawingMutationHookResult = ReturnType<typeof useUpdateDrawingMutation>;
export type UpdateDrawingMutationResult = Apollo.MutationResult<UpdateDrawingMutation>;
export type UpdateDrawingMutationOptions = Apollo.BaseMutationOptions<UpdateDrawingMutation, UpdateDrawingMutationVariables>;
export const GetFiguresDocument = gql`
    query GetFigures($text_group_id: String!) {
  figures(text_group_id: $text_group_id) {
    ...FigureFragment
  }
}
    ${FigureFragmentFragmentDoc}`;

/**
 * __useGetFiguresQuery__
 *
 * To run a query within a React component, call `useGetFiguresQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFiguresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFiguresQuery({
 *   variables: {
 *      text_group_id: // value for 'text_group_id'
 *   },
 * });
 */
export function useGetFiguresQuery(baseOptions: Apollo.QueryHookOptions<GetFiguresQuery, GetFiguresQueryVariables> & ({ variables: GetFiguresQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFiguresQuery, GetFiguresQueryVariables>(GetFiguresDocument, options);
      }
export function useGetFiguresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFiguresQuery, GetFiguresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFiguresQuery, GetFiguresQueryVariables>(GetFiguresDocument, options);
        }
export function useGetFiguresSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFiguresQuery, GetFiguresQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFiguresQuery, GetFiguresQueryVariables>(GetFiguresDocument, options);
        }
export type GetFiguresQueryHookResult = ReturnType<typeof useGetFiguresQuery>;
export type GetFiguresLazyQueryHookResult = ReturnType<typeof useGetFiguresLazyQuery>;
export type GetFiguresSuspenseQueryHookResult = ReturnType<typeof useGetFiguresSuspenseQuery>;
export type GetFiguresQueryResult = Apollo.QueryResult<GetFiguresQuery, GetFiguresQueryVariables>;
export const GetFileDocument = gql`
    query GetFile($key: String!) {
  file(key: $key) {
    ...FileFragment
  }
}
    ${FileFragmentFragmentDoc}`;

/**
 * __useGetFileQuery__
 *
 * To run a query within a React component, call `useGetFileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFileQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetFileQuery(baseOptions: Apollo.QueryHookOptions<GetFileQuery, GetFileQueryVariables> & ({ variables: GetFileQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFileQuery, GetFileQueryVariables>(GetFileDocument, options);
      }
export function useGetFileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFileQuery, GetFileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFileQuery, GetFileQueryVariables>(GetFileDocument, options);
        }
export function useGetFileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFileQuery, GetFileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFileQuery, GetFileQueryVariables>(GetFileDocument, options);
        }
export type GetFileQueryHookResult = ReturnType<typeof useGetFileQuery>;
export type GetFileLazyQueryHookResult = ReturnType<typeof useGetFileLazyQuery>;
export type GetFileSuspenseQueryHookResult = ReturnType<typeof useGetFileSuspenseQuery>;
export type GetFileQueryResult = Apollo.QueryResult<GetFileQuery, GetFileQueryVariables>;
export const RemoveFileDocument = gql`
    mutation RemoveFile($key: String!) {
  remove_file(key: $key) {
    ...FileFragment
  }
}
    ${FileFragmentFragmentDoc}`;
export type RemoveFileMutationFn = Apollo.MutationFunction<RemoveFileMutation, RemoveFileMutationVariables>;

/**
 * __useRemoveFileMutation__
 *
 * To run a mutation, you first call `useRemoveFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFileMutation, { data, loading, error }] = useRemoveFileMutation({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useRemoveFileMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFileMutation, RemoveFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFileMutation, RemoveFileMutationVariables>(RemoveFileDocument, options);
      }
export type RemoveFileMutationHookResult = ReturnType<typeof useRemoveFileMutation>;
export type RemoveFileMutationResult = Apollo.MutationResult<RemoveFileMutation>;
export type RemoveFileMutationOptions = Apollo.BaseMutationOptions<RemoveFileMutation, RemoveFileMutationVariables>;
export const GetOrganizationDocument = gql`
    query GetOrganization {
  organization {
    ...OrganizationFragment
  }
}
    ${OrganizationFragmentFragmentDoc}`;

/**
 * __useGetOrganizationQuery__
 *
 * To run a query within a React component, call `useGetOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrganizationQuery(baseOptions?: Apollo.QueryHookOptions<GetOrganizationQuery, GetOrganizationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizationQuery, GetOrganizationQueryVariables>(GetOrganizationDocument, options);
      }
export function useGetOrganizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationQuery, GetOrganizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizationQuery, GetOrganizationQueryVariables>(GetOrganizationDocument, options);
        }
export function useGetOrganizationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrganizationQuery, GetOrganizationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrganizationQuery, GetOrganizationQueryVariables>(GetOrganizationDocument, options);
        }
export type GetOrganizationQueryHookResult = ReturnType<typeof useGetOrganizationQuery>;
export type GetOrganizationLazyQueryHookResult = ReturnType<typeof useGetOrganizationLazyQuery>;
export type GetOrganizationSuspenseQueryHookResult = ReturnType<typeof useGetOrganizationSuspenseQuery>;
export type GetOrganizationQueryResult = Apollo.QueryResult<GetOrganizationQuery, GetOrganizationQueryVariables>;
export const GetOrganizationMembersDocument = gql`
    query GetOrganizationMembers {
  organization_members {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useGetOrganizationMembersQuery__
 *
 * To run a query within a React component, call `useGetOrganizationMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationMembersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrganizationMembersQuery(baseOptions?: Apollo.QueryHookOptions<GetOrganizationMembersQuery, GetOrganizationMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizationMembersQuery, GetOrganizationMembersQueryVariables>(GetOrganizationMembersDocument, options);
      }
export function useGetOrganizationMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationMembersQuery, GetOrganizationMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizationMembersQuery, GetOrganizationMembersQueryVariables>(GetOrganizationMembersDocument, options);
        }
export function useGetOrganizationMembersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrganizationMembersQuery, GetOrganizationMembersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrganizationMembersQuery, GetOrganizationMembersQueryVariables>(GetOrganizationMembersDocument, options);
        }
export type GetOrganizationMembersQueryHookResult = ReturnType<typeof useGetOrganizationMembersQuery>;
export type GetOrganizationMembersLazyQueryHookResult = ReturnType<typeof useGetOrganizationMembersLazyQuery>;
export type GetOrganizationMembersSuspenseQueryHookResult = ReturnType<typeof useGetOrganizationMembersSuspenseQuery>;
export type GetOrganizationMembersQueryResult = Apollo.QueryResult<GetOrganizationMembersQuery, GetOrganizationMembersQueryVariables>;
export const GetProjectPagesDocument = gql`
    query GetProjectPages($project_id: String!) {
  pages(project_id: $project_id) {
    ...PageFragment
  }
}
    ${PageFragmentFragmentDoc}`;

/**
 * __useGetProjectPagesQuery__
 *
 * To run a query within a React component, call `useGetProjectPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectPagesQuery({
 *   variables: {
 *      project_id: // value for 'project_id'
 *   },
 * });
 */
export function useGetProjectPagesQuery(baseOptions: Apollo.QueryHookOptions<GetProjectPagesQuery, GetProjectPagesQueryVariables> & ({ variables: GetProjectPagesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectPagesQuery, GetProjectPagesQueryVariables>(GetProjectPagesDocument, options);
      }
export function useGetProjectPagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectPagesQuery, GetProjectPagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectPagesQuery, GetProjectPagesQueryVariables>(GetProjectPagesDocument, options);
        }
export function useGetProjectPagesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProjectPagesQuery, GetProjectPagesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectPagesQuery, GetProjectPagesQueryVariables>(GetProjectPagesDocument, options);
        }
export type GetProjectPagesQueryHookResult = ReturnType<typeof useGetProjectPagesQuery>;
export type GetProjectPagesLazyQueryHookResult = ReturnType<typeof useGetProjectPagesLazyQuery>;
export type GetProjectPagesSuspenseQueryHookResult = ReturnType<typeof useGetProjectPagesSuspenseQuery>;
export type GetProjectPagesQueryResult = Apollo.QueryResult<GetProjectPagesQuery, GetProjectPagesQueryVariables>;
export const UpdatePageDocument = gql`
    mutation UpdatePage($page_id: String!, $data: UpdatePageInput!) {
  update_page(id: $page_id, data: $data) {
    ...PageFragment
  }
}
    ${PageFragmentFragmentDoc}`;
export type UpdatePageMutationFn = Apollo.MutationFunction<UpdatePageMutation, UpdatePageMutationVariables>;

/**
 * __useUpdatePageMutation__
 *
 * To run a mutation, you first call `useUpdatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePageMutation, { data, loading, error }] = useUpdatePageMutation({
 *   variables: {
 *      page_id: // value for 'page_id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePageMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePageMutation, UpdatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePageMutation, UpdatePageMutationVariables>(UpdatePageDocument, options);
      }
export type UpdatePageMutationHookResult = ReturnType<typeof useUpdatePageMutation>;
export type UpdatePageMutationResult = Apollo.MutationResult<UpdatePageMutation>;
export type UpdatePageMutationOptions = Apollo.BaseMutationOptions<UpdatePageMutation, UpdatePageMutationVariables>;
export const RemovePagesDocument = gql`
    mutation RemovePages($page_ids: [String!]!) {
  remove_pages(page_ids: $page_ids) {
    page_id
  }
}
    `;
export type RemovePagesMutationFn = Apollo.MutationFunction<RemovePagesMutation, RemovePagesMutationVariables>;

/**
 * __useRemovePagesMutation__
 *
 * To run a mutation, you first call `useRemovePagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePagesMutation, { data, loading, error }] = useRemovePagesMutation({
 *   variables: {
 *      page_ids: // value for 'page_ids'
 *   },
 * });
 */
export function useRemovePagesMutation(baseOptions?: Apollo.MutationHookOptions<RemovePagesMutation, RemovePagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePagesMutation, RemovePagesMutationVariables>(RemovePagesDocument, options);
      }
export type RemovePagesMutationHookResult = ReturnType<typeof useRemovePagesMutation>;
export type RemovePagesMutationResult = Apollo.MutationResult<RemovePagesMutation>;
export type RemovePagesMutationOptions = Apollo.BaseMutationOptions<RemovePagesMutation, RemovePagesMutationVariables>;
export const PagesUpdatedDocument = gql`
    subscription PagesUpdated($project_id: String!) {
  update_pages(project_id: $project_id) {
    ...PageFragment
  }
}
    ${PageFragmentFragmentDoc}`;

/**
 * __usePagesUpdatedSubscription__
 *
 * To run a query within a React component, call `usePagesUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePagesUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePagesUpdatedSubscription({
 *   variables: {
 *      project_id: // value for 'project_id'
 *   },
 * });
 */
export function usePagesUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<PagesUpdatedSubscription, PagesUpdatedSubscriptionVariables> & ({ variables: PagesUpdatedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PagesUpdatedSubscription, PagesUpdatedSubscriptionVariables>(PagesUpdatedDocument, options);
      }
export type PagesUpdatedSubscriptionHookResult = ReturnType<typeof usePagesUpdatedSubscription>;
export type PagesUpdatedSubscriptionResult = Apollo.SubscriptionResult<PagesUpdatedSubscription>;
export const GeneratePdfDocument = gql`
    mutation GeneratePDF($data: DownloadPdfInput!) {
  generate_pdf(data: $data)
}
    `;
export type GeneratePdfMutationFn = Apollo.MutationFunction<GeneratePdfMutation, GeneratePdfMutationVariables>;

/**
 * __useGeneratePdfMutation__
 *
 * To run a mutation, you first call `useGeneratePdfMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGeneratePdfMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generatePdfMutation, { data, loading, error }] = useGeneratePdfMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGeneratePdfMutation(baseOptions?: Apollo.MutationHookOptions<GeneratePdfMutation, GeneratePdfMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GeneratePdfMutation, GeneratePdfMutationVariables>(GeneratePdfDocument, options);
      }
export type GeneratePdfMutationHookResult = ReturnType<typeof useGeneratePdfMutation>;
export type GeneratePdfMutationResult = Apollo.MutationResult<GeneratePdfMutation>;
export type GeneratePdfMutationOptions = Apollo.BaseMutationOptions<GeneratePdfMutation, GeneratePdfMutationVariables>;
export const GetProjectsDocument = gql`
    query GetProjects($page: Int, $limit: Int, $filters: [FilterInput!]) {
  projects(page: $page, limit: $limit, filters: $filters) {
    total
    total_pages
    page
    limit
    data {
      ...ProjectFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}`;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export function useGetProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsSuspenseQueryHookResult = ReturnType<typeof useGetProjectsSuspenseQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const GetProjectByIdDocument = gql`
    query GetProjectById($id: String!) {
  project(id: $id) {
    ...ProjectFragment
  }
}
    ${ProjectFragmentFragmentDoc}`;

/**
 * __useGetProjectByIdQuery__
 *
 * To run a query within a React component, call `useGetProjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables> & ({ variables: GetProjectByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
      }
export function useGetProjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
        }
export function useGetProjectByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
        }
export type GetProjectByIdQueryHookResult = ReturnType<typeof useGetProjectByIdQuery>;
export type GetProjectByIdLazyQueryHookResult = ReturnType<typeof useGetProjectByIdLazyQuery>;
export type GetProjectByIdSuspenseQueryHookResult = ReturnType<typeof useGetProjectByIdSuspenseQuery>;
export type GetProjectByIdQueryResult = Apollo.QueryResult<GetProjectByIdQuery, GetProjectByIdQueryVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($data: CreateProjectInput!) {
  create_project(data: $data) {
    project_id
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($project_id: String!, $data: UpdateProjectInput!) {
  update_project(id: $project_id, data: $data) {
    project_id
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      project_id: // value for 'project_id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const RemoveProjectDocument = gql`
    mutation RemoveProject($project_id: String!) {
  remove_project(id: $project_id) {
    project_id
  }
}
    `;
export type RemoveProjectMutationFn = Apollo.MutationFunction<RemoveProjectMutation, RemoveProjectMutationVariables>;

/**
 * __useRemoveProjectMutation__
 *
 * To run a mutation, you first call `useRemoveProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProjectMutation, { data, loading, error }] = useRemoveProjectMutation({
 *   variables: {
 *      project_id: // value for 'project_id'
 *   },
 * });
 */
export function useRemoveProjectMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProjectMutation, RemoveProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProjectMutation, RemoveProjectMutationVariables>(RemoveProjectDocument, options);
      }
export type RemoveProjectMutationHookResult = ReturnType<typeof useRemoveProjectMutation>;
export type RemoveProjectMutationResult = Apollo.MutationResult<RemoveProjectMutation>;
export type RemoveProjectMutationOptions = Apollo.BaseMutationOptions<RemoveProjectMutation, RemoveProjectMutationVariables>;
export const StarProjectDocument = gql`
    mutation StarProject($project_id: String!, $stared: Boolean!) {
  star_project(id: $project_id, stared: $stared) {
    project_id
  }
}
    `;
export type StarProjectMutationFn = Apollo.MutationFunction<StarProjectMutation, StarProjectMutationVariables>;

/**
 * __useStarProjectMutation__
 *
 * To run a mutation, you first call `useStarProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStarProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [starProjectMutation, { data, loading, error }] = useStarProjectMutation({
 *   variables: {
 *      project_id: // value for 'project_id'
 *      stared: // value for 'stared'
 *   },
 * });
 */
export function useStarProjectMutation(baseOptions?: Apollo.MutationHookOptions<StarProjectMutation, StarProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StarProjectMutation, StarProjectMutationVariables>(StarProjectDocument, options);
      }
export type StarProjectMutationHookResult = ReturnType<typeof useStarProjectMutation>;
export type StarProjectMutationResult = Apollo.MutationResult<StarProjectMutation>;
export type StarProjectMutationOptions = Apollo.BaseMutationOptions<StarProjectMutation, StarProjectMutationVariables>;
export const ProjectUpdatedDocument = gql`
    subscription ProjectUpdated($project_id: String!) {
  update_project(project_id: $project_id) {
    ...ProjectFragment
  }
}
    ${ProjectFragmentFragmentDoc}`;

/**
 * __useProjectUpdatedSubscription__
 *
 * To run a query within a React component, call `useProjectUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useProjectUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectUpdatedSubscription({
 *   variables: {
 *      project_id: // value for 'project_id'
 *   },
 * });
 */
export function useProjectUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ProjectUpdatedSubscription, ProjectUpdatedSubscriptionVariables> & ({ variables: ProjectUpdatedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ProjectUpdatedSubscription, ProjectUpdatedSubscriptionVariables>(ProjectUpdatedDocument, options);
      }
export type ProjectUpdatedSubscriptionHookResult = ReturnType<typeof useProjectUpdatedSubscription>;
export type ProjectUpdatedSubscriptionResult = Apollo.SubscriptionResult<ProjectUpdatedSubscription>;
export const GetProjectDetailsDocument = gql`
    query GetProjectDetails($project_id: String!) {
  project(id: $project_id) {
    ...ProjectFragment
  }
  pages(project_id: $project_id) {
    ...PageFragment
  }
  trade_packages(project_id: $project_id) {
    ...TradePackageFragment
  }
}
    ${ProjectFragmentFragmentDoc}
${PageFragmentFragmentDoc}
${TradePackageFragmentFragmentDoc}`;

/**
 * __useGetProjectDetailsQuery__
 *
 * To run a query within a React component, call `useGetProjectDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectDetailsQuery({
 *   variables: {
 *      project_id: // value for 'project_id'
 *   },
 * });
 */
export function useGetProjectDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetProjectDetailsQuery, GetProjectDetailsQueryVariables> & ({ variables: GetProjectDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>(GetProjectDetailsDocument, options);
      }
export function useGetProjectDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>(GetProjectDetailsDocument, options);
        }
export function useGetProjectDetailsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>(GetProjectDetailsDocument, options);
        }
export type GetProjectDetailsQueryHookResult = ReturnType<typeof useGetProjectDetailsQuery>;
export type GetProjectDetailsLazyQueryHookResult = ReturnType<typeof useGetProjectDetailsLazyQuery>;
export type GetProjectDetailsSuspenseQueryHookResult = ReturnType<typeof useGetProjectDetailsSuspenseQuery>;
export type GetProjectDetailsQueryResult = Apollo.QueryResult<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>;
export const CreateTextGroupDocument = gql`
    mutation CreateTextGroup($data: CreateTextGroupInput!) {
  create_text_group(data: $data) {
    ...TextGroupFragment
  }
}
    ${TextGroupFragmentFragmentDoc}`;
export type CreateTextGroupMutationFn = Apollo.MutationFunction<CreateTextGroupMutation, CreateTextGroupMutationVariables>;

/**
 * __useCreateTextGroupMutation__
 *
 * To run a mutation, you first call `useCreateTextGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTextGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTextGroupMutation, { data, loading, error }] = useCreateTextGroupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTextGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateTextGroupMutation, CreateTextGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTextGroupMutation, CreateTextGroupMutationVariables>(CreateTextGroupDocument, options);
      }
export type CreateTextGroupMutationHookResult = ReturnType<typeof useCreateTextGroupMutation>;
export type CreateTextGroupMutationResult = Apollo.MutationResult<CreateTextGroupMutation>;
export type CreateTextGroupMutationOptions = Apollo.BaseMutationOptions<CreateTextGroupMutation, CreateTextGroupMutationVariables>;
export const UpdateTextGroupDocument = gql`
    mutation UpdateTextGroup($text_group_id: String!, $data: UpdateTextGroupInput!) {
  update_text_group(id: $text_group_id, data: $data) {
    text_group_id
  }
}
    `;
export type UpdateTextGroupMutationFn = Apollo.MutationFunction<UpdateTextGroupMutation, UpdateTextGroupMutationVariables>;

/**
 * __useUpdateTextGroupMutation__
 *
 * To run a mutation, you first call `useUpdateTextGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTextGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTextGroupMutation, { data, loading, error }] = useUpdateTextGroupMutation({
 *   variables: {
 *      text_group_id: // value for 'text_group_id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTextGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTextGroupMutation, UpdateTextGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTextGroupMutation, UpdateTextGroupMutationVariables>(UpdateTextGroupDocument, options);
      }
export type UpdateTextGroupMutationHookResult = ReturnType<typeof useUpdateTextGroupMutation>;
export type UpdateTextGroupMutationResult = Apollo.MutationResult<UpdateTextGroupMutation>;
export type UpdateTextGroupMutationOptions = Apollo.BaseMutationOptions<UpdateTextGroupMutation, UpdateTextGroupMutationVariables>;
export const RemoveTextGroupsDocument = gql`
    mutation RemoveTextGroups($text_group_ids: [String!]!) {
  remove_text_groups(text_group_ids: $text_group_ids) {
    text_group_id
  }
}
    `;
export type RemoveTextGroupsMutationFn = Apollo.MutationFunction<RemoveTextGroupsMutation, RemoveTextGroupsMutationVariables>;

/**
 * __useRemoveTextGroupsMutation__
 *
 * To run a mutation, you first call `useRemoveTextGroupsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTextGroupsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTextGroupsMutation, { data, loading, error }] = useRemoveTextGroupsMutation({
 *   variables: {
 *      text_group_ids: // value for 'text_group_ids'
 *   },
 * });
 */
export function useRemoveTextGroupsMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTextGroupsMutation, RemoveTextGroupsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveTextGroupsMutation, RemoveTextGroupsMutationVariables>(RemoveTextGroupsDocument, options);
      }
export type RemoveTextGroupsMutationHookResult = ReturnType<typeof useRemoveTextGroupsMutation>;
export type RemoveTextGroupsMutationResult = Apollo.MutationResult<RemoveTextGroupsMutation>;
export type RemoveTextGroupsMutationOptions = Apollo.BaseMutationOptions<RemoveTextGroupsMutation, RemoveTextGroupsMutationVariables>;
export const CreateTradePackageDocument = gql`
    mutation CreateTradePackage($data: CreateTradePackageInput!) {
  create_trade_package(data: $data) {
    trade_package_id
  }
}
    `;
export type CreateTradePackageMutationFn = Apollo.MutationFunction<CreateTradePackageMutation, CreateTradePackageMutationVariables>;

/**
 * __useCreateTradePackageMutation__
 *
 * To run a mutation, you first call `useCreateTradePackageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTradePackageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTradePackageMutation, { data, loading, error }] = useCreateTradePackageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTradePackageMutation(baseOptions?: Apollo.MutationHookOptions<CreateTradePackageMutation, CreateTradePackageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTradePackageMutation, CreateTradePackageMutationVariables>(CreateTradePackageDocument, options);
      }
export type CreateTradePackageMutationHookResult = ReturnType<typeof useCreateTradePackageMutation>;
export type CreateTradePackageMutationResult = Apollo.MutationResult<CreateTradePackageMutation>;
export type CreateTradePackageMutationOptions = Apollo.BaseMutationOptions<CreateTradePackageMutation, CreateTradePackageMutationVariables>;
export const UpdateTradePackageDocument = gql`
    mutation UpdateTradePackage($trade_package_id: String!, $data: UpdateTradePackageInput!) {
  update_trade_package(trade_package_id: $trade_package_id, data: $data) {
    trade_package_id
  }
}
    `;
export type UpdateTradePackageMutationFn = Apollo.MutationFunction<UpdateTradePackageMutation, UpdateTradePackageMutationVariables>;

/**
 * __useUpdateTradePackageMutation__
 *
 * To run a mutation, you first call `useUpdateTradePackageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTradePackageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTradePackageMutation, { data, loading, error }] = useUpdateTradePackageMutation({
 *   variables: {
 *      trade_package_id: // value for 'trade_package_id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTradePackageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTradePackageMutation, UpdateTradePackageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTradePackageMutation, UpdateTradePackageMutationVariables>(UpdateTradePackageDocument, options);
      }
export type UpdateTradePackageMutationHookResult = ReturnType<typeof useUpdateTradePackageMutation>;
export type UpdateTradePackageMutationResult = Apollo.MutationResult<UpdateTradePackageMutation>;
export type UpdateTradePackageMutationOptions = Apollo.BaseMutationOptions<UpdateTradePackageMutation, UpdateTradePackageMutationVariables>;
export const ApplyTradeDocument = gql`
    mutation ApplyTrade($trade_package_id: String!, $csi_code_ids: [String!]!) {
  apply_trade_package(
    trade_package_id: $trade_package_id
    csi_code_ids: $csi_code_ids
  ) {
    trade_package_id
  }
}
    `;
export type ApplyTradeMutationFn = Apollo.MutationFunction<ApplyTradeMutation, ApplyTradeMutationVariables>;

/**
 * __useApplyTradeMutation__
 *
 * To run a mutation, you first call `useApplyTradeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplyTradeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applyTradeMutation, { data, loading, error }] = useApplyTradeMutation({
 *   variables: {
 *      trade_package_id: // value for 'trade_package_id'
 *      csi_code_ids: // value for 'csi_code_ids'
 *   },
 * });
 */
export function useApplyTradeMutation(baseOptions?: Apollo.MutationHookOptions<ApplyTradeMutation, ApplyTradeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApplyTradeMutation, ApplyTradeMutationVariables>(ApplyTradeDocument, options);
      }
export type ApplyTradeMutationHookResult = ReturnType<typeof useApplyTradeMutation>;
export type ApplyTradeMutationResult = Apollo.MutationResult<ApplyTradeMutation>;
export type ApplyTradeMutationOptions = Apollo.BaseMutationOptions<ApplyTradeMutation, ApplyTradeMutationVariables>;
export const UnApplyTradeDocument = gql`
    mutation UnApplyTrade($trade_package_id: String!, $csi_code_ids: [String!]!) {
  unapply_trade_package(
    trade_package_id: $trade_package_id
    csi_code_ids: $csi_code_ids
  ) {
    trade_package_id
  }
}
    `;
export type UnApplyTradeMutationFn = Apollo.MutationFunction<UnApplyTradeMutation, UnApplyTradeMutationVariables>;

/**
 * __useUnApplyTradeMutation__
 *
 * To run a mutation, you first call `useUnApplyTradeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnApplyTradeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unApplyTradeMutation, { data, loading, error }] = useUnApplyTradeMutation({
 *   variables: {
 *      trade_package_id: // value for 'trade_package_id'
 *      csi_code_ids: // value for 'csi_code_ids'
 *   },
 * });
 */
export function useUnApplyTradeMutation(baseOptions?: Apollo.MutationHookOptions<UnApplyTradeMutation, UnApplyTradeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnApplyTradeMutation, UnApplyTradeMutationVariables>(UnApplyTradeDocument, options);
      }
export type UnApplyTradeMutationHookResult = ReturnType<typeof useUnApplyTradeMutation>;
export type UnApplyTradeMutationResult = Apollo.MutationResult<UnApplyTradeMutation>;
export type UnApplyTradeMutationOptions = Apollo.BaseMutationOptions<UnApplyTradeMutation, UnApplyTradeMutationVariables>;
export const TradesUpdatedDocument = gql`
    subscription TradesUpdated($project_id: String!) {
  update_trades(project_id: $project_id) {
    ...TradePackageFragment
  }
}
    ${TradePackageFragmentFragmentDoc}`;

/**
 * __useTradesUpdatedSubscription__
 *
 * To run a query within a React component, call `useTradesUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTradesUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTradesUpdatedSubscription({
 *   variables: {
 *      project_id: // value for 'project_id'
 *   },
 * });
 */
export function useTradesUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<TradesUpdatedSubscription, TradesUpdatedSubscriptionVariables> & ({ variables: TradesUpdatedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TradesUpdatedSubscription, TradesUpdatedSubscriptionVariables>(TradesUpdatedDocument, options);
      }
export type TradesUpdatedSubscriptionHookResult = ReturnType<typeof useTradesUpdatedSubscription>;
export type TradesUpdatedSubscriptionResult = Apollo.SubscriptionResult<TradesUpdatedSubscription>;
export const GetUserDocument = gql`
    query GetUser {
  user {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;