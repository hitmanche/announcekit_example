export const prmApiUri = "http://localhost:61208/api/vehiclestatus";
export const prmApiLogin = "http://localhost:61208/api/login/";

export const Login = async () => {
    return new Promise((resolve, reject) => {
        fetch(prmApiLogin + 'Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: 'test@test.com', Password: '123456' })
        })
            .then(res => res.json())
            .then(res => {
                localStorage.setItem('token', JSON.stringify(res));
                resolve();
            })
            .catch(() => reject());

    });
}

export const RefreshToken = async () => {
    return new Promise((resolve, reject) => {
        fetch(prmApiLogin + 'RefreshTokenLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken: JSON.parse(localStorage.getItem('token')).refreshToken })
        })
            .then(res => res.json())
            .then(res => {
                localStorage.setItem('token', JSON.stringify(res));
                resolve();
            })
            .catch(() => reject());

    });
}