const getData = (onSuccess, onFail) => {
  fetch('https://29.javascript.htmlacademy.pro/kekstagram')
    .then((response) => response.json())
    .then ((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail('Ошибка загрузки данных!');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://29.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export { getData, sendData };
