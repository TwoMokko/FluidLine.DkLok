interface typeCatalog {
    name: string,
    link: string
}

interface typeProductsContent {
    image: string,
    title: string,
    description: string
    price: number,
    alias: string,
}

type dataSearchCatalog = {
    catalogs: typeCatalog[],
    products: {
        limit: number
        content: typeProductsContent[],
    }
}

namespace Common {
    export class Search {
        private data                            : dataSearchCatalog;
        private currentPage                     : number;
        private idValue                         : string;
        private searchValue                     : string;
        private pageContainerClass              : string;

        private readonly pageContainer          : HTMLElement;
        private notFound                        : HTMLElement;


        private catalogsContainer               : HTMLElement;
        private showDoc                         : HTMLElement;
        private hideDoc                         : HTMLElement;


        private productsContainer               : HTMLElement;


        private btnContainer                    : HTMLElement;
        private firstBtn                        : HTMLElement;
        private previousBtn                     : HTMLElement;
        private numberBtns                      : HTMLElement;
        private nextBtn                         : HTMLElement;
        private lastBtn                         : HTMLElement;


        constructor(pageContainerClass: string) {
            this.pageContainerClass = pageContainerClass;
            this.currentPage = 1;
            this.pageContainer = document.querySelector(pageContainerClass);
            this.createLoader(this.pageContainer);

            this.setSearchValue();
            // this.testRequest();
            this.initData();
            // if (this.pageContainerClass === '.search-catalogs-container') new Common.SearchQuote();

        }

        public static doSearch(input: HTMLInputElement): void {
            // window.location.href = `/result`;
            window.location.href = `/result?page=1&search=${input.value}`;
        }

        public static resetValue(input: HTMLInputElement): void {
            input.value = '';
            input.focus();
        }

        private testRequest(): void {
            this.data = {
                catalogs: [
                    { name: 'cat he north well', link: 'catlink1' },
                    { name: 'catalog normann true', link: 'catlink2' },
                    { name: 'cat name five', link: 'catlink3' },
                    { name: 'green feel her', link: 'catlink4' }
                ],
                products:
                    {
                        limit: 20,
                        content: [
                            { image: 'prod img 1', title: 'prod name 1', description: 'prod description 1', alias: 'prod path 1', price: 24 },
                            { image: 'prod img 2', title: 'prod name 2', description: 'prod description 2', alias: 'prod path 2', price: 678 },
                            { image: 'prod img 1', title: 'prod name 1', description: 'prod description 1', alias: 'prod path 1', price: 24 },
                            { image: 'prod img 2', title: 'prod name 2', description: 'prod description 2', alias: 'prod path 2', price: 678 },
                            // { image: 'prod img 1', title: 'prod name 1', description: 'prod description 1', alias: 'prod path 1', price: 24 },
                            // { image: 'prod img 2', title: 'prod name 2', description: 'prod description 2', alias: 'prod path 2', price: 678 },
                            // { image: 'prod img 1', title: 'prod name 1', description: 'prod description 1', alias: 'prod path 1', price: 24 },
                            // { image: 'prod img 2', title: 'prod name 2', description: 'prod description 2', alias: 'prod path 2', price: 678 },
                        ],
                    }
            }

            if (this.catalogsContainer) this.catalogsContainer.remove();
            if (this.productsContainer) this.productsContainer.remove();

            if (!this.data.catalogs.length && !this.data.products.content.length) this.createNotFound();
            if (this.data.catalogs.length) {
                this.initCatalogs();
            }
            if (this.data.products.content.length) {
                this.initProducts();
                if (this.data.products.limit > 1) this.createBtn();

            }

            document.querySelector('.loader-wrap').classList.add('hide');
        }

        private initData(): void {
            fetch(`/api/search?page=${this.currentPage}&search=${this.searchValue}`)
                .then(async response => {
                    this.data = await response.json();

                    if (this.catalogsContainer) this.catalogsContainer.remove();
                    if (this.productsContainer) this.productsContainer.remove();

                    if (!this.data.catalogs.length && !this.data.products.content.length) this.createNotFound();
                    if (this.data.catalogs.length) {
                        this.initCatalogs();
                    }
                    if (this.data.products.content.length) {
                        this.initProducts();
                        if (this.data.products.limit > 1) this.createBtn();

                    }

                    document.querySelector('.loader-wrap').classList.add('hide');
                })
                .catch(
                    response => { console.log('request failed'); console.log('resp search', response); }
                );
        }

        private setSearchValue(): void {
            let urlParams  = new URLSearchParams(window.location.search);
            this.searchValue = urlParams .get('search');
            this.idValue = urlParams .get('id');
        }

        private createLoader(container: HTMLElement): void {
            let loaderWrap = createElement('div', 'loader-wrap', null, container);
            let loader = createElement('span', 'loader', null, loaderWrap);
            let loaderText = createElement('div', 'loader-text', 'Загрузка...', loaderWrap);
        }

        private createNotFound(): void {
            this.notFound = createElement('div', 'search-not-found', 'По вашему запросу ничего не найдено', this.pageContainer);
        }

        private initCatalogs(): void {
            new Common.SearchQuote();
            switch (this.pageContainerClass) {
                case '.search-result-container':
                    this.catalogsContainer = createElement('div', 'search-catalogs-container', null, this.pageContainer);
                    let catalogsHeader: HTMLDivElement = createElement('div', 'prods-info-head', 'Каталоги', this.catalogsContainer);
                    break;
                case '.search-catalogs-container':
                    this.catalogsContainer = this.pageContainer;
                    document.querySelector('.search-catalogs > div:first-child').addEventListener('click', () => {
                        console.log('hey');
                        this.doSwitch(document.querySelector('.search-catalogs > div:first-child'));
                    })
                    document.querySelector('.search-catalogs > div:last-child').addEventListener('click', () => { this.doSwitch(document.querySelector('.search-catalogs > div:last-child')); })
                    break;
            }

            let catalogsCardsContainer: HTMLElement = createElement('div', 'search-catalogs-list showFirst', '', this.catalogsContainer);

            for (let catalog of this.data.catalogs) {
                let itemCatalogsContainer: HTMLAnchorElement = createElement('div', 'products-catalogs-wrap', null, catalogsCardsContainer);
                if (this.pageContainerClass === '.search-catalogs-container') itemCatalogsContainer.classList.add('back');
                let itemCatalogContainer: HTMLAnchorElement = createElement('a', 'products-catalogs-item', null, itemCatalogsContainer);
                let iconCatalog: HTMLDivElement = createElement('div', null, null, itemCatalogContainer);
                let nameCatalog: HTMLDivElement = createElement('div', null, catalog.name, itemCatalogContainer);
                let quoteCatalog: HTMLDivElement = createElement('div', 'quote', null, itemCatalogsContainer);

                itemCatalogContainer.href = catalog.link;
            }

            if (Array.from(catalogsCardsContainer.children).length > 3) this.createShowCatalogs();
        }

        private createShowCatalogs(): void {
            this.showDoc = createElement('div', 'search-catalogs-show allDoc active', 'Показать всё', this.catalogsContainer)
            this.showDoc.addEventListener('click', () => this.showAllDocuments());

            this.hideDoc = createElement('div', 'search-catalogs-show hideDoc', 'Свернуть', this.catalogsContainer);
            this.hideDoc.addEventListener('click', () => this.hideAllDocuments());
        }
        private showAllDocuments(): void {
            this.showDoc.classList.remove('active');
            this.hideDoc.classList.add('active');
            document.querySelector('.search-catalogs-list').classList.remove('showFirst');
        }

        private hideAllDocuments(): void {
            this.hideDoc.classList.remove('active');
            this.showDoc.classList.add('active');
            document.querySelector('.search-catalogs-list').classList.add('showFirst');
        }

        private doSwitch(elem: HTMLElement): void {
            Array.from(document.querySelectorAll('.search-catalogs > div')).forEach((el) => {
                el.classList.remove('active');
            })
            elem.classList.add('active');
            /* новый запрос */
        }

        private initProducts(): void {
            if (this.pageContainerClass !== '.search-result-container') return;
            this.productsContainer = createElement('div', 'products-section', null, this.pageContainer);
            let productsHeader = createElement('div', 'prods-info-head', 'Продукция', this.productsContainer);
            let productsCardsContainer = createElement('div', 'prods-cards', null, this.productsContainer);
            // let productsCardsContainer = createElement('div', 'prods-cards showFirstCards', null, this.productsContainer);


            for (let product of this.data.products.content) {
                let price = 'Цена: ' + product.price + ' руб.'

                let itemProductContainer: HTMLAnchorElement = createElement('a', 'prods-cards-item', null, productsCardsContainer);
                let imgWrapCatalog: HTMLDivElement = createElement('div', null, null, itemProductContainer);
                // let imgCatalog: HTMLDivElement = createElement('img', null, null, imgWrapCatalog);
                let nameCatalog: HTMLDivElement = createElement('div', null, product.title, itemProductContainer);
                let priceCatalog: HTMLDivElement = createElement('div', 'prods-cards-item-price', price, itemProductContainer);
                // let btnContainerCatalog: HTMLDivElement = createElement('div', 'products-section-btn', null, itemProductContainer);
                // let btnCatalog: HTMLAnchorElement = createElement('a', 'btn', 'Подробнее', btnContainerCatalog);


                imgWrapCatalog.style.backgroundImage = `url(${product.image})`;
                itemProductContainer.href = product.alias;
            }

            // this.productsContainer.style.marginBottom = '120px';
            // this.productsContainer.style.paddingBottom = '68px';

            // let productMoreShowWrap = createElement('div', 'products-more showAll', null, document.querySelector('.products-section'));
            // let productMoreShow = createElement('div', null, null, productMoreShowWrap);
            // productMoreShow.addEventListener('click', () => { showMoreProducts(productMoreShow.closest('.products-more'), '.products-section', '.products-section-cards') })
            //
            // let productMoreHideWrap = createElement('div', 'products-more hideAll hide', null, this.pageContainer);
            // let productMoreHide = createElement('div', null, null, productMoreHideWrap);
            // productMoreHide.addEventListener('click', () => { showMoreProducts(productMoreHide.closest('.products-more'), '.products-section', '.products-section-cards') })

            // showBtnMoreProducts(document.querySelector('.products-section-cards'), '.products-section');
        }

        private createBtn(): void {
            if (!document.querySelector('.search-catalogs-container')
                && !document.querySelector('.search-products-container')) return;
            // let container = createElement('div', 'container', null, this.pageContainer);
            this.btnContainer = createElement('div', 'mini switcher', null, this.productsContainer);

            this.firstBtn = createElement('div', 'switch', 'в начало', this.btnContainer);
            this.previousBtn = createElement('div', 'number-page', '<', this.btnContainer);
            this.numberBtns = createElement('div', 'number-page', String(this.currentPage), this.btnContainer);
            // this.numberBtns = createElement('div', 'number-wrap', null, this.btnContainer);
            //
            //
            // for (let i = 1; i <= this.data.products.limit; i++) {
            //     let pageNumberBtn: HTMLElement = createElement('div', 'number-page', String(i), this.numberBtns);
            //     pageNumberBtn.addEventListener('click', () => this.updatePage(i));
            // }

            this.nextBtn = createElement('div', 'number-page', '>', this.btnContainer);
            this.lastBtn = createElement('div', 'switch', 'в конец', this.btnContainer);

            // this.addEventForBtnPagination();
            this.updateClassButtons();
            this.btnContainer.style.margin = '90px auto 0';
        }

        private addEventForBtnPagination(previous: boolean, next: boolean): void {
            // this.firstBtn.addEventListener('click', () => this.updatePage(1));
            if (!previous) {
                this.nextBtn.addEventListener('click', () => this.nextPage());
                this.lastBtn.addEventListener('click', () => this.updatePage(1));
                return;
            }
            if (!next) {
                this.firstBtn.addEventListener('click', () => this.updatePage(this.data.products.limit));
                this.previousBtn.addEventListener('click', () => this.previousPage());
                return;
            }
            this.previousBtn.addEventListener('click', () => this.previousPage());
            this.nextBtn.addEventListener('click', () => this.nextPage());

            // this.lastBtn.addEventListener('click', () => this.updatePage(this.data.products.limit));
        }

        private updateClassButtons(): void {
            // Array.from(document.querySelectorAll('.number-page')).forEach(elem => {
            //     if (elem.textContent === String(this.currentPage)) elem.classList.add('active');
            // });
            switch (this.currentPage) {
                case 1:
                    this.firstBtn.classList.add('disabled');
                    this.previousBtn.classList.add('disabled');
                    this.addEventForBtnPagination(false, true);
                    break;
                case this.data.products.limit:
                    this.nextBtn.classList.add('disabled');
                    this.lastBtn.classList.add('disabled');
                    this.addEventForBtnPagination(true, false);
                    break;
                default:
                    this.addEventForBtnPagination(true, true);
                    break;
            }
        }

        private previousPage = (): void => {
            if (this.currentPage <= 1) return;
            this.currentPage--;
            this.initData();
        }

        private nextPage = (): void => {
            if (this.currentPage >= this.data.products.limit) return;
            this.currentPage++;
            this.initData();
        }

        private updatePage(number: number): void {
            this.currentPage = number;
            this.initData();
        }
    }
}
