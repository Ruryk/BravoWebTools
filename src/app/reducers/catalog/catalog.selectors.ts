import { ICatalogData, ICatalogState } from 'src/app/interfaces/interfaces';

export const selectCatalogDataSource = (state: ICatalogState): ICatalogData => state.data;

export const selectCatalogErrorMessage = (state: ICatalogState): {type: string, status: boolean, message: string} => state.error;
