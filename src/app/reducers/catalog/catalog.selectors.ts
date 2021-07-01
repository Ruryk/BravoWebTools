import { ICatalogData, ICatalogState } from 'src/app/interfaces/interfaces';

export const selectCatalogDataSource = (state: ICatalogState): ICatalogData => state.data;
