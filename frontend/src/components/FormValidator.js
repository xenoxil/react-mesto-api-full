export class FormValidator {
    constructor(config, formElem) {
            this._config = config;
            this._form = formElem;                    
            this._btn = this._form.querySelector(config.submitButtonSelector);
        }
        //функция показа ошибки
    _showError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this._config.errorClass);
    }

    //функция удаления ошибки
    _hideError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = '';
        input.classList.remove(this._config.errorClass);
    }

    //проверка валидности инпута
    _isValid(input) {
        if (input.validity.valid) {
            this._hideError(input);
        } else {
            this._showError(input);
        }
    }

    //изменение статуса кнопки сабмит 
    setSubmitBtnState(validationStatus) {
        if (!validationStatus) {
            this._btn.classList.add(this._config.inactiveButtonClass);
            this._btn.disabled = true;
        } else {
            this._btn.classList.remove(this._config.inactiveButtonClass);
            this._btn.disabled = false;
        }
    }

    // повесить обработчики на инпуты
    setErrorListener() {
            const inputList = this._form.querySelectorAll(this._config.inputSelector);
            inputList.forEach((input) => {
                input.addEventListener('input', () => {
                    this._isValid(input);
                    this.setSubmitBtnState(this._form.checkValidity());
                })
                this._form.addEventListener('reset', () => {
                    inputList.forEach((inputElement) => {
                        this._hideError(inputElement)
                        this.setSubmitBtnState(false);
                    })
                });
            })
        }
        // включить валидацию по конфигу
    enableValidation() {
        this.setErrorListener();
        this.setSubmitBtnState(this._form.checkValidity());
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
    }
}