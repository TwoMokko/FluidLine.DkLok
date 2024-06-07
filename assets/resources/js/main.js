"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // hideBreadcrumbs();
    doSearchOnInput();
});
window.addEventListener('resize', (e) => {
    const burgerSpace = document.querySelector('.burger-menu-space');
    if (!burgerSpace.classList.contains('hide')) {
        if (window.innerWidth > 1280)
            burgerSpace.classList.add('hide');
    }
});
// window.onload = () => {
//     document.querySelector('.loader-wrap').classList.add('hide');
// }
function createElement(tagName, className, textContent, container) {
    let elem = document.createElement(tagName);
    if (className)
        elem.className = className;
    if (textContent)
        elem.textContent = textContent;
    if (textContent)
        elem.textContent = textContent;
    if (container)
        container.append(elem);
    return elem;
}
function showSearchInputOnHeader(btn) {
    const input = document.querySelector('.search-text > input');
    console.log(btn);
    if (btn.closest('.header-wrap')) {
        document.querySelector('.header-search-wrap').classList.remove('not-active');
        document.querySelector('.header-search-wrap').classList.add('active');
        input.focus();
    }
    if (btn.closest('.header-search-wrap')) {
        document.querySelector('.header-search-wrap').classList.remove('active');
        document.querySelector('.header-search-wrap').classList.add('not-active');
        input.blur();
    }
}
function doSearchOnInput() {
    let input = document.querySelector('.header-search input');
    input.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            let btn = input.closest('.search-input').querySelector('.search-icon');
            btn.click();
        }
    });
}
// function showForm(url: string = '', method: string = '',  title: string = '', from: string, countProductCode: number|null): void {
//     let form: HTMLFormElement = createElement('form', null, null, null);
//     // form.action = action;
//     form.method = method;
//
//     switch (from) {
//         case 'offer':
//             createInputsProducts(countProductCode, form);
//             break;
//         case 'letter':
//             createInputsMessage(form);
//             break;
//     }
//
//     createInputsPhoneAndEmail(form);
//     createBtnForm(form, url);
//
//     Common.Window.create(title, form);
// }
// function createInputsProducts(countProductCode: number, form: HTMLFormElement): void {
//     for (let i: number = 0; i < countProductCode; i++) {
//         let inputWrap: HTMLDivElement = createElement('div', 'input-wrap', null, form);
//         let inputCode: HTMLInputElement = createElement('input', null, null, inputWrap);
//         inputCode.placeholder = 'Код изделия';
//         inputCode.name = `products[${i}][name]`;
//         let inputCount: HTMLInputElement = createElement('input', null, null, inputWrap);
//         inputCount.placeholder = 'Кол-во';
//         inputCount.name = `products[${i}][count]`;
//
//     }
// }
// function createInputsPhoneAndEmail(form: HTMLFormElement): void {
//     let inputContactsWrap: HTMLDivElement = createElement('div', 'input-wrap contacts', null, form);
//     let inputPhone: HTMLInputElement = createElement('input', null, null, inputContactsWrap);
//     inputPhone.placeholder = 'Телефон';
//     inputPhone.name = 'phone';
//     let inputEmail: HTMLInputElement = createElement('input', null, null, inputContactsWrap);
//     inputEmail.placeholder = 'E-mail';
//     inputEmail.name = 'email';
// }
// function createInputsMessage(form: HTMLFormElement): void {
//     let textMessageWrap: HTMLDivElement = createElement('div', 'text-wrap', null, form);
//     let textMessage: HTMLTextAreaElement = createElement('textarea', null, null, textMessageWrap);
//     textMessage.placeholder = 'Сообщение';
//     textMessage.name = 'message';
// }
// function createBtnForm(form: HTMLFormElement, url: string): void {
//     let btn = createElement('button', 'btn', 'Отправить', form);
//     // btn.setAttribute('type', 'submit');
//     btn.addEventListener('click', () => {
//         Common.Request.sendFormNoAction(form, url, () => { console.log('ok'); });
//         return false;
//     })
// }
// function hideBreadcrumbs(): void {
//     let url: URL = new URL(window.location.href);
//     if (url.pathname === '/') {
//         document.querySelectorAll('.breadcrumbs').forEach((elem: HTMLElement) => elem.style.display = 'none');
//         let productOther: HTMLElement = document.querySelector('.products-other');
//         productOther.style.display = 'none';
//     }
// }
// function showBtnMoreProducts(cardContainer: HTMLElement, classContainer: string): void {
//     const container: HTMLElement = document.querySelector(classContainer);
//     if (cardContainer.children.length <= 4) {
//         container.nextElementSibling.classList.add('hide');
//         container.querySelector('.showAll').classList.add('hide');
//         container.style.marginBottom = '120px';
//     }
//
//     if (classContainer === '.products-section') {
//         container.style.paddingBottom = '68px';
//     }
// }
// function showMoreProducts(area: HTMLElement, classContainer: string, classCardContainer: string): void {
//     area.classList.add('hide');
//     const container: HTMLElement = document.querySelector(classContainer);
//     switch (area.closest('.products-more').className) {
//         case 'products-more showAll hide':
//             if (classContainer === '.products-section') container.style.paddingBottom = '153px';
//             area.closest(classContainer).nextElementSibling.classList.remove('hide');
//             break;
//         case 'products-more hideAll hide':
//             if (classContainer === '.products-section') container.style.paddingBottom = '273px';
//             document.querySelector(classContainer).querySelector('.showAll').classList.remove('hide');
//             break;
//     }
//
//     const cardContainer: HTMLElement = document.querySelector(classCardContainer);
//     if (cardContainer.classList.contains('showFirstCards')) cardContainer.classList.remove('showFirstCards');
//     else cardContainer.classList.add('showFirstCards');
// }
// function showBurger(open: boolean): void {
//     if (!open) {
//         document.querySelector('.burger-menu-space').classList.remove('hide');
//         document.querySelector('body').style.overflow = 'hidden';
//         return;
//     }
//     document.querySelector('.burger-menu-space').classList.add('hide');
//     document.querySelector('body').style.overflow = 'revert';
// }
var Common;
(function (Common) {
    class Request {
        static sendXHR(formData, url, func) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            // xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.send(formData);
            xhr.onload = () => {
                if (xhr.status != 200) {
                    alert('Ошибка' + xhr.status);
                    return;
                }
                func();
            };
        }
        static send(formData, url, func) {
            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(async (response) => {
                let json = await response.json();
                Request.response(json, func);
            })
                .catch(response => { console.log('request failed: ' + url); console.log(response); });
        }
        // public static sendJson(url: string, jsonData: sendDataJson, func?: Function): void {
        //     fetch(url, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json;charset=utf-8'
        //         },
        //         body: JSON.stringify(jsonData)
        //     })
        //         .then(async response => {
        //             let json = await response.json();
        //             Request.response(json, func);
        //         })
        //         .catch(response => { console.log('request failed: ' + url); console.log(response); });
        //
        //
        //     // let xhr = new XMLHttpRequest();
        //     // xhr.open('POST', url);
        //     // xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        //     // xhr.send(JSON.stringify(jsonData));
        //     // xhr.onload =  ()=> {
        //     //     if (xhr.status != 200) {
        //     //         alert('Ошибка' + xhr.status);
        //     //         return;
        //     //     }
        //     // }
        // }
        static response(response, func) {
            switch (response.state) {
                case 'ok':
                    if (func)
                        func(response.body);
                    break;
                case 'error':
                    alert(response.body.message);
                    break;
            }
        }
        // public static send(formData: FormData, url: string, func?: Function): void {
        //     $.ajax({
        //         url				: url,
        //         method			: 'POST',
        //         dataType		: 'json',
        //         data 			: formData,
        //         contentType		: false,
        //         processData		: false,
        //         cache			: false,
        //         // beforeSend: function() { if (funcBeforeSend) funcBeforeSend(); },
        //         // complete: function() { if (funcComplete) funcComplete(); },
        //         success			: (response) => { if (func) func() },
        //         error			: (response) => { console.log('request failed: ' + url); console.log(response); }
        //     });
        // }
        // public static send(formData: FormData, url: string, func?: Function): void {
        //     let xhr = new XMLHttpRequest();
        //     xhr.open('POST', url);
        //     xhr.send(formData);
        //     xhr.onload = () => func();
        //     xhr.onerror = () => alert('Ошибка соединения');
        // }
        static sendFormXHR(form, func) {
            let url = form.getAttribute('action');
            let formData = new FormData(form);
            Request.sendXHR(formData, url, func);
        }
        static sendFormXHRnoAction(form, url, func) {
            let formData = new FormData(form);
            Request.sendXHR(formData, url, func);
        }
        static sendForm(form, func) {
            let url = form.getAttribute('action');
            let formData = new FormData(form);
            Request.send(formData, url, func);
        }
        static sendFormNoAction(form, url, func) {
            let formData = new FormData(form);
            Request.send(formData, url, func);
        }
        static sendData(data, url, func) {
            let formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key].toString());
            }
            Request.send(formData, url, func);
        }
    }
    Common.Request = Request;
})(Common || (Common = {}));
var Common;
(function (Common) {
    class Search {
        data;
        currentPage;
        idValue;
        searchValue;
        pageContainerClass;
        pageContainer;
        notFound;
        catalogsContainer;
        showDoc;
        hideDoc;
        productsContainer;
        btnContainer;
        firstBtn;
        previousBtn;
        numberBtns;
        nextBtn;
        lastBtn;
        constructor(pageContainerClass) {
            this.pageContainerClass = pageContainerClass;
            this.currentPage = 1;
            this.pageContainer = document.querySelector(pageContainerClass);
            this.createLoader(this.pageContainer);
            this.setSearchValue();
            // this.testRequest();
            this.initData();
            // if (this.pageContainerClass === '.search-catalogs-container') new Common.SearchQuote();
        }
        static doSearch(input) {
            // window.location.href = `/result`;
            window.location.href = `/result?page=1&search=${input.value}`;
        }
        static resetValue(input) {
            input.value = '';
            input.focus();
        }
        testRequest() {
            this.data = {
                catalogs: [
                    { name: 'cat he north well', link: 'catlink1' },
                    { name: 'catalog normann true', link: 'catlink2' },
                    { name: 'cat name five', link: 'catlink3' },
                    { name: 'green feel her', link: 'catlink4' }
                ],
                products: {
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
            };
            if (this.catalogsContainer)
                this.catalogsContainer.remove();
            if (this.productsContainer)
                this.productsContainer.remove();
            if (!this.data.catalogs.length && !this.data.products.content.length)
                this.createNotFound();
            if (this.data.catalogs.length) {
                this.initCatalogs();
            }
            if (this.data.products.content.length) {
                this.initProducts();
                if (this.data.products.limit > 1)
                    this.createBtn();
            }
            document.querySelector('.loader-wrap').classList.add('hide');
        }
        initData() {
            fetch(`/api/search?page=${this.currentPage}&search=${this.searchValue}`)
                .then(async (response) => {
                this.data = await response.json();
                if (this.catalogsContainer)
                    this.catalogsContainer.remove();
                if (this.productsContainer)
                    this.productsContainer.remove();
                if (!this.data.catalogs.length && !this.data.products.content.length)
                    this.createNotFound();
                if (this.data.catalogs.length) {
                    this.initCatalogs();
                }
                if (this.data.products.content.length) {
                    this.initProducts();
                    if (this.data.products.limit > 1)
                        this.createBtn();
                }
                document.querySelector('.loader-wrap').classList.add('hide');
            })
                .catch(response => { console.log('request failed'); console.log('resp search', response); });
        }
        setSearchValue() {
            let urlParams = new URLSearchParams(window.location.search);
            this.searchValue = urlParams.get('search');
            this.idValue = urlParams.get('id');
        }
        createLoader(container) {
            let loaderWrap = createElement('div', 'loader-wrap', null, container);
            let loader = createElement('span', 'loader', null, loaderWrap);
            let loaderText = createElement('div', 'loader-text', 'Загрузка...', loaderWrap);
        }
        createNotFound() {
            this.notFound = createElement('div', 'search-not-found', 'По вашему запросу ничего не найдено', this.pageContainer);
        }
        initCatalogs() {
            new Common.SearchQuote();
            switch (this.pageContainerClass) {
                case '.search-result-container':
                    this.catalogsContainer = createElement('div', 'search-catalogs-container', null, this.pageContainer);
                    let catalogsHeader = createElement('div', 'prods-info-head', 'Каталоги', this.catalogsContainer);
                    break;
                case '.search-catalogs-container':
                    this.catalogsContainer = this.pageContainer;
                    document.querySelector('.search-catalogs > div:first-child').addEventListener('click', () => {
                        console.log('hey');
                        this.doSwitch(document.querySelector('.search-catalogs > div:first-child'));
                    });
                    document.querySelector('.search-catalogs > div:last-child').addEventListener('click', () => { this.doSwitch(document.querySelector('.search-catalogs > div:last-child')); });
                    break;
            }
            let catalogsCardsContainer = createElement('div', 'search-catalogs-list showFirst', '', this.catalogsContainer);
            for (let catalog of this.data.catalogs) {
                let itemCatalogsContainer = createElement('div', 'products-catalogs-wrap', null, catalogsCardsContainer);
                if (this.pageContainerClass === '.search-catalogs-container')
                    itemCatalogsContainer.classList.add('back');
                let itemCatalogContainer = createElement('a', 'products-catalogs-item', null, itemCatalogsContainer);
                let iconCatalog = createElement('div', null, null, itemCatalogContainer);
                let nameCatalog = createElement('div', null, catalog.name, itemCatalogContainer);
                let quoteCatalog = createElement('div', 'quote', null, itemCatalogsContainer);
                itemCatalogContainer.href = catalog.link;
            }
            if (Array.from(catalogsCardsContainer.children).length > 3)
                this.createShowCatalogs();
        }
        createShowCatalogs() {
            this.showDoc = createElement('div', 'search-catalogs-show allDoc active', 'Показать всё', this.catalogsContainer);
            this.showDoc.addEventListener('click', () => this.showAllDocuments());
            this.hideDoc = createElement('div', 'search-catalogs-show hideDoc', 'Свернуть', this.catalogsContainer);
            this.hideDoc.addEventListener('click', () => this.hideAllDocuments());
        }
        showAllDocuments() {
            this.showDoc.classList.remove('active');
            this.hideDoc.classList.add('active');
            document.querySelector('.search-catalogs-list').classList.remove('showFirst');
        }
        hideAllDocuments() {
            this.hideDoc.classList.remove('active');
            this.showDoc.classList.add('active');
            document.querySelector('.search-catalogs-list').classList.add('showFirst');
        }
        doSwitch(elem) {
            Array.from(document.querySelectorAll('.search-catalogs > div')).forEach((el) => {
                el.classList.remove('active');
            });
            elem.classList.add('active');
            /* новый запрос */
        }
        initProducts() {
            if (this.pageContainerClass !== '.search-result-container')
                return;
            this.productsContainer = createElement('div', 'products-section', null, this.pageContainer);
            let productsHeader = createElement('div', 'prods-info-head', 'Продукция', this.productsContainer);
            let productsCardsContainer = createElement('div', 'prods-cards', null, this.productsContainer);
            // let productsCardsContainer = createElement('div', 'prods-cards showFirstCards', null, this.productsContainer);
            for (let product of this.data.products.content) {
                let price = 'Цена: ' + product.price + ' руб.';
                let itemProductContainer = createElement('a', 'prods-cards-item', null, productsCardsContainer);
                let imgWrapCatalog = createElement('div', null, null, itemProductContainer);
                // let imgCatalog: HTMLDivElement = createElement('img', null, null, imgWrapCatalog);
                let nameCatalog = createElement('div', null, product.title, itemProductContainer);
                let priceCatalog = createElement('div', 'prods-cards-item-price', price, itemProductContainer);
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
        createBtn() {
            if (!document.querySelector('.search-catalogs-container')
                && !document.querySelector('.search-products-container'))
                return;
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
        addEventForBtnPagination(previous, next) {
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
        updateClassButtons() {
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
        previousPage = () => {
            if (this.currentPage <= 1)
                return;
            this.currentPage--;
            this.initData();
        };
        nextPage = () => {
            if (this.currentPage >= this.data.products.limit)
                return;
            this.currentPage++;
            this.initData();
        };
        updatePage(number) {
            this.currentPage = number;
            this.initData();
        }
    }
    Common.Search = Search;
})(Common || (Common = {}));
var Common;
(function (Common) {
    class SearchQuote {
        data;
        currentPage;
        searchValue;
        searchField;
        textWithQuote;
        constructor() {
            this.testCreateElem();
            this.searchField.addEventListener('change', () => { this.onChangeSearchValue(); });
        }
        getData() {
            fetch(`/api/search?page=${this.currentPage}&search=${this.searchValue}`)
                .then(async (response) => {
                this.data = await response.json();
            })
                .catch(response => { console.log('request failed'); console.log('resp search', response); });
        }
        setSearchValue() {
            this.searchValue = this.searchField.value;
        }
        onChangeSearchValue() {
            console.log(this.searchField.value);
            this.setSearchValue();
            // this.getData();
            this.addNameAccentCatalog();
        }
        createNotFound() {
        }
        createSearchList() {
        }
        addNameAccentCatalog() {
            const regExp = new RegExp(this.searchValue, 'gi');
            const namesArray = document.querySelectorAll('.search-catalogs-list > div > a > div:last-child');
            namesArray.forEach((elem) => {
                let str = elem.textContent;
                elem.innerHTML = str.replace(regExp, () => {
                    return `<strong style="background: rgba(224, 30, 37, 0.3)">${this.searchValue}</strong>`;
                });
                // if (str.match(regExp)) {
                //     elem.innerHTML = str.replace(regExp, () => {
                //         return `<strong style="background: rgba(102, 182, 69, 0.3)">${this.searchValue}</strong>`;
                //     });
                // }
                this.addNameAccentText(regExp, elem);
            });
            // this.addNameAccentText(regExp);
        }
        addNameAccentText(regExp, elem) {
            let textQuote = '';
            fetch('assets/resources/documents/DSS18T.pdf' + '.txt')
                .then(response => response.text())
                .then(text => {
                let notfound = document.querySelector('.input-result-notfound');
                notfound.classList.add('hide');
                let textWithQuote = elem.closest('a').closest('div').querySelector('.quote');
                if (this.searchValue === '') {
                    textWithQuote.innerHTML = '';
                    return;
                }
                let reg = new RegExp(/[^a-z\dа-яё., /?!№;:()*\-+\\"'%=\n]/gi);
                text = text.replace(reg, '');
                text = text.replace(/ {2,}/ig, ' ');
                text = text.replace(/\n{2,}/ig, '\n');
                text = text.replace(/(\n +\n)+/ig, ' ');
                // text = text.replace(/ /ig, '*');
                // text = text.replace(/\n/ig, '+');
                let result = text.match(this.searchValue);
                if (!result) {
                    notfound.classList.remove('hide');
                    textWithQuote.innerHTML = '';
                    return;
                }
                let startQuote = result.index;
                let endQuote = result.index + this.searchValue.length;
                let startBeforeQuote = this.getPositionBefore(text, startQuote - 250, startQuote - 50);
                let endAfterQuote = this.getPositionAfter(text, endQuote + 50, endQuote + 250);
                let strBeforeQuote = text.slice(startBeforeQuote, startQuote);
                let strAfterQuote = text.slice(endQuote, endAfterQuote);
                textWithQuote.innerHTML = strBeforeQuote + `<strong style="background: rgba(224, 30, 37, 0.3)">${this.searchValue}</strong>` + strAfterQuote;
            })
                .then(() => { this.updateActiveForBlockquote(); })
                .catch();
        }
        testCreateElem() {
            this.searchField = createElement('input', 'search-field', null, document.querySelector('.search-result-container'));
            createElement('div', 'input-result-notfound hide', 'нет совпадений', document.querySelector('.search-result-container'));
            this.searchField.placeholder = 'поиск по каталогам';
        }
        getPositionBefore(text, start, end) {
            /* Ищем первое совпадение в промежутке, а надо будет найти последнее совпадение в промежутке для текста после цитаты */
            if (start <= 0)
                return 0;
            let separator = text.slice(start, end);
            let separatorMatch = separator.match(/[.!?;]/);
            if (separatorMatch !== null)
                return start + separatorMatch.index + 1;
            separatorMatch = separator.match(/[ \n]/);
            if (separatorMatch !== null)
                return start + separatorMatch.index + 1;
            return start;
        }
        getPositionAfter(text, start, end) {
            /* Ищем первое совпадение в промежутке, а надо будет найти последнее совпадение в промежутке для текста после цитаты */
            if (end >= text.length)
                return text.length;
            let separator = text.slice(start, end);
            let index1 = separator.lastIndexOf('.');
            let index2 = separator.lastIndexOf('!');
            let index3 = separator.lastIndexOf('?');
            let index4 = separator.lastIndexOf(';');
            let index = Math.max(index1, index2, index3, index4);
            if (index < 0)
                return separator.lastIndexOf(' ');
            // separatorMatch = separator.match(/[ \n]/);
            // if (separatorMatch !== null) return start + separatorMatch.index + 1;
            return start + index + 1;
        }
        updateActiveForBlockquote() {
            document.querySelectorAll('.quote').forEach(elem => {
                if (elem.innerHTML === '')
                    elem.classList.remove('active');
                else
                    elem.classList.add('active');
            });
        }
    }
    Common.SearchQuote = SearchQuote;
})(Common || (Common = {}));
//# sourceMappingURL=main.js.map