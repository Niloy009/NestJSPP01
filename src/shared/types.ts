export interface ResourceList<Dataodel> {
  currentPage: Number;
  pageCount: Number;
  resourceCount: Number;
  data: Dataodel[];
}

export interface ResourcePagination {
  page?: number;
  limit?: number;
  sort?: string;
}
