namespace Common {
    export class SearchQuote {
        private data            : any;
        private currentPage     : number;
        private searchValue     : string;
        private searchField     : HTMLInputElement;
        private textWithQuote   : HTMLDivElement;

        constructor() {
            this.testCreateElem();
            this.searchField.addEventListener('change', () => { this.onChangeSearchValue(); });
        }

        private getData(): void {
            fetch(`/api/search?page=${this.currentPage}&search=${this.searchValue}`)
                .then(async response => {
                    this.data = await response.json();


                })
                .catch(
                    response => { console.log('request failed'); console.log('resp search', response); }
                );
        }

        private setSearchValue(): void {
            this.searchValue = this.searchField.value;
        }

        private onChangeSearchValue(): void {
            console.log(this.searchField.value);
            this.setSearchValue();
            // this.getData();
            this.addNameAccentCatalog();

        }

        private createNotFound(): void {

        }

        private createSearchList(): void {

        }

        private addNameAccentCatalog(): void {
            const regExp = new RegExp(this.searchValue, 'gi');
            const namesArray = document.querySelectorAll('.search-catalogs-list > div > a > div:last-child');
            namesArray.forEach((elem: HTMLElement) => {
                let str = elem.textContent;
                elem.innerHTML = str.replace(regExp, () => {
                    return `<strong style="background: rgba(224, 30, 37, 0.3)">${this.searchValue}</strong>`;
                });
                // if (str.match(regExp)) {
                //     elem.innerHTML = str.replace(regExp, () => {
                //         return `<strong style="background: rgba(102, 182, 69, 0.3)">${this.searchValue}</strong>`;
                //     });
                // }
                this.addNameAccentText(regExp ,elem);
            })
            // this.addNameAccentText(regExp);
        }

        private addNameAccentText(regExp: RegExp, elem: HTMLElement): void {
            let textQuote = '';
            fetch( 'assets/resources/documents/DSS18T.pdf' + '.txt')
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
                .then(
                    () => {this.updateActiveForBlockquote();}
                )
                .catch()
        }

        private testCreateElem(): void {
            this.searchField = createElement('input', 'search-field', null, document.querySelector('.search-result-container'));
            createElement('div', 'input-result-notfound hide', 'нет совпадений', document.querySelector('.search-result-container'));
            this.searchField.placeholder = 'поиск по каталогам';
        }

        private getPositionBefore(text: string, start: number, end: number): number {
            /* Ищем первое совпадение в промежутке, а надо будет найти последнее совпадение в промежутке для текста после цитаты */
            if (start <= 0) return 0;

            let separator: string = text.slice(start, end);
            let separatorMatch: RegExpMatchArray = separator.match(/[.!?;]/);
            if (separatorMatch !== null) return start + separatorMatch.index + 1;

            separatorMatch = separator.match(/[ \n]/);
            if (separatorMatch !== null) return start + separatorMatch.index + 1;

            return start;
        }

        private getPositionAfter(text: string, start: number, end: number): number {
            /* Ищем первое совпадение в промежутке, а надо будет найти последнее совпадение в промежутке для текста после цитаты */
            if (end >= text.length) return text.length;

            let separator: string = text.slice(start, end);
            let index1 = separator.lastIndexOf('.');
            let index2 = separator.lastIndexOf('!');
            let index3 = separator.lastIndexOf('?');
            let index4 = separator.lastIndexOf(';');

            let index = Math.max(index1, index2, index3, index4);

            if (index < 0) return separator.lastIndexOf(' ');

            // separatorMatch = separator.match(/[ \n]/);
            // if (separatorMatch !== null) return start + separatorMatch.index + 1;

            return start + index + 1;
        }

        private updateActiveForBlockquote() {
            document.querySelectorAll('.quote').forEach(elem => {
                if (elem.innerHTML === '') elem.classList.remove('active');
                else elem.classList.add('active');
            })
        }
    }
}