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
