class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(this._baseUrl + `/users/me`, {
      method: "GET",
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  // Загрузка карточек с сервера
  getInitialCards() {
    return fetch(this._baseUrl + `/cards`, {
      method: "GET",
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  // Редактирование профиля
  editUserInfo(data) {
    return fetch(this._baseUrl + `/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  // Добавление новой карточки
  addNewCard(data) {
    return fetch(this._baseUrl + `/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  // Удаление карточки
  deleteCardApi(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  // Постановка и снятие лайка
  putLike(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  takeOfLike(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  // Обновление аватара пользователя
  editAvatar(data) {
    return fetch(this._baseUrl + `/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._checkResult(res);
    });
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
  headers: {
    authorization: "6356ac75-0b91-4413-9681-673544a8d741",
    "Content-Type": "application/json",
  },
});

export default api;
