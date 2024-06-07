document.addEventListener("DOMContentLoaded", () => {
    // hideBreadcrumbs();
    doSearchOnInput();
})

window.addEventListener('resize', (e) => {
    const burgerSpace = document.querySelector('.burger-menu-space');
    if (!burgerSpace.classList.contains('hide')) {
        if (window.innerWidth > 1280) burgerSpace.classList.add('hide');
    }
});

// window.onload = () => {
//     document.querySelector('.loader-wrap').classList.add('hide');
// }

function createElement(tagName: string, className: string|null, textContent: string|null, container: HTMLElement|null): any {
    let elem: HTMLElement = document.createElement(tagName);
    if (className) elem.className = className;
    if (textContent) elem.textContent = textContent;
    if (textContent) elem.textContent = textContent;
    if (container) container.append(elem);
    return elem;
}

function showSearchInputOnHeader(btn: HTMLElement): void {
    const input: HTMLInputElement = document.querySelector('.search-text > input');
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

function doSearchOnInput(): void {
    let input: HTMLInputElement = document.querySelector('.header-search input')
    input.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            let btn: HTMLElement = input.closest('.search-input').querySelector('.search-icon');
            btn.click();
        }
    })
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
