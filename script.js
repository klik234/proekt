const { createApp } = Vue

createApp({
    data() {
        return {
            massage: 'Hello Vue',
            email: '',
            password: '',
            error: '',
            loading: false
        }
    },
    methods: {
        register() {
             this.loading=true
            fetch('http://studentsystem.xyz:8080/user/', {
                method: "POST",
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            }).then((response) => {
                switch (response.status) {
                    case 201:
                        alert('Пользователь успешно создан')
                        break;
                    case 403:
                        this.error='Такой пользователь уже существует'
                        break;
                    case 400:
                          this.error='Не верные данные'
                        break;
                }
                return response.json();
            }).then((data) => {
                 this.error='Вы успешно зарегистрировались'
               
                  this.loading=false
            }).catch((err) => {
                console.error('awfiwajf', err)
            });
        },   login() {
            this.loading=true
        fetch('http://studentsystem.xyz:8080/user/auth', {
            method: "POST",
            body: JSON.stringify({
                email: this.email,
                password: this.password
            })
        }).then((response) => {
            switch (response.status) {
                case 200:
                    alert('Вы фвторизовались')
                    break;

                case 403:
                     this.error='не верно'
                    break;
                case 400:
                    this.error=('Не верные данные')
                    break;
            }
            return response.json();
        }).then((data) => {
            if (data['access_token']) {
                this.error=('Вы успешно вошли')
                this.loading=false
            }
            
        }).catch((err) => {
            console.error('awfiwajf', err)
        });
    }
    },




}).mount('#app')



