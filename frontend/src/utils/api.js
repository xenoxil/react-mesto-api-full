export class Api {
    constructor(options) {
        // тело конструктора
        this._options = options;
        this._headers = this._options.headers;

    }
    //получаем карточки с сервера
    getInitialCards() {
        // ...
        return fetch(`${this._options.baseUrl}/cards`, {
            headers: this._options.headers,
            'credentials': 'include',
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка: ${res.status}`) }
            })
    }
    //удаляем карточку на сервере
    deleteCard(id) {
        return fetch(`${this._options.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            'credentials': 'include',
            headers: this._options.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка: удаление${res.status}`) }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    //получаем данные профайла
    getProfile() {
        return fetch(`${this._options.baseUrl}/users/me`, {
            headers: this._options.headers,
            'credentials': 'include',
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка: ${res.status}`) }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    //патчим профайл на сервере
    editProfile(newName, newTitle) {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: 'PATCH',
            'credentials': 'include',
            headers: this._options.headers,
            body: JSON.stringify({
                name: newName,
                about: newTitle
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка: ${res.status}`) }
            })            
    }
    //одновременное получение инфы по карточкам и профилю
    getInfo() {
        return Promise.all([this.getInitialCards(), this.getProfile()])
    }
    //отправка новой карточки на сервер
    sendElement({ name, link }) {
        return fetch(`${this._options.baseUrl}/cards`, {
            method: 'POST',
            'credentials': 'include',
            headers: this._options.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then((res) => {
                if (res.ok) {                    
                    return res.json();
                } else { return Promise.reject(res.status) }
            })
    }
    //замена аватара на сервере
    changeAvatarIcon(avatar) {
        return fetch(`${this._options.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            'credentials': 'include',
            headers: this._options.headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка обновления аватара: ${res.status}`) }
            })            
    }
    changeLikeCardStatus(id, isLiked) {
        // Обычная реализация: 2 разных метода для удаления и постановки лайка.
        return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            'credentials': 'include',
            headers: this._options.headers,
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    }

    //отправка лайка 
    sendLike(id) {
        return fetch(`${this._options.baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            'credentials': 'include',
            headers: this._options.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка при отправке лайка: ${res.status}`) }
            })
            .catch(() => {
                console.log(`Ошибка при отправке лайка`)
            })
    }

    //удаление лайка на сервере
    removeLike(id) {
        return fetch(`${this._options.baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            'credentials': 'include',
            headers: this._options.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка при удалении лайка: ${res.status}`) }
            })
            .catch((err) => {
                console.log(`Ошибка при удалении лайка ${err}`)
            })
    }


}

const api = new Api({
    //baseUrl: 'http://localhost:3001',
    baseUrl: 'https://api.xenoxil.mesto.nomoredomains.icu',
    headers: {        
        'Content-Type': 'application/json'
    }
});


export default api