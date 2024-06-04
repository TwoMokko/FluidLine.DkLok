type TypeResponseError = {
    state: 'error';
    body: {
        'message': string;
    };
};
type TypeResponseOk = {
    state: 'ok';
    body: any;
};
type TypeResponse = TypeResponseOk | TypeResponseError;
declare namespace Common {
    class Request {
        static sendXHR(formData: FormData, url: string, func?: Function): void;
        static send(formData: FormData, url: string, func?: Function): void;
        private static response;
        static sendFormXHR(form: HTMLFormElement, func?: Function): void;
        static sendFormXHRnoAction(form: HTMLFormElement, url: string, func?: Function): void;
        static sendForm(form: HTMLFormElement, func?: Function): void;
        static sendFormNoAction(form: HTMLFormElement, url: string, func?: Function): void;
        static sendData(data: {
            [key: string]: string | boolean | number;
        }, url: string, func?: Function): void;
    }
}
interface typeCatalog {
    name: string;
    link: string;
}
interface typeProductsContent {
    image: string;
    title: string;
    description: string;
    price: number;
    alias: string;
}
type dataSearchCatalog = {
    catalogs: typeCatalog[];
    products: {
        limit: number;
        content: typeProductsContent[];
    };
};
declare namespace Common {
    class Search {
        private data;
        private currentPage;
        private idValue;
        private searchValue;
        private pageContainerClass;
        private readonly pageContainer;
        private notFound;
        private catalogsContainer;
        private showDoc;
        private hideDoc;
        private productsContainer;
        private btnContainer;
        private firstBtn;
        private previousBtn;
        private numberBtns;
        private nextBtn;
        private lastBtn;
        constructor(pageContainerClass: string);
        static doSearch(input: HTMLInputElement): void;
        static resetValue(input: HTMLInputElement): void;
        private testRequest;
        private initData;
        private setSearchValue;
        private createLoader;
        private createNotFound;
        private initCatalogs;
        private createShowCatalogs;
        private showAllDocuments;
        private hideAllDocuments;
        private doSwitch;
        private initProducts;
        private createBtn;
        private addEventForBtnPagination;
        private updateClassButtons;
        private previousPage;
        private nextPage;
        private updatePage;
    }
}
declare function createElement(tagName: string, className: string | null, textContent: string | null, container: HTMLElement | null): any;
declare function showSearchInputOnHeader(btn: HTMLElement): void;
declare function doSearchOnInput(): void;
declare function showMoreProducts(area: HTMLElement, classContainer: string, classCardContainer: string): void;
declare function showBurger(open: boolean): void;
