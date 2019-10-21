// BIBLIOTECAS
import React, { Component } from 'react';
import Axios from 'axios';

// CSS
import '../../assets/css/globalStyle.css';
import '../../assets/css/sessionStyle.css';

// COMPONENTES
import Navbar from '../../components/NavBarSession';
import Footer from '../../components/Footer.js';

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            emailLogin: "",
            senhaLogin: "",
            msgErro: "",
            msgErroCad: "",
            NomeCad: "",
            EmailCad: "",
            SenhaCad: "",
            UrlCad: ""
        }
    }

    // ----------- LOGIN VALUES

    ValorEmailLogin = (event) => {
        // console.log(event.target.value);
        this.setState({ emailLogin: event.target.value })
    }

    ValorSenhaLogin = (event) => {
        // console.log(event.target.value);
        this.setState({ senhaLogin: event.target.value })
    }

    // ----------- CADASTRO VALUES

    ValorNomeCad = (event) => {
        // console.log(event.target.value);
        this.setState({ NomeCad: event.target.value })
    }

    ValorEmailCad = (event) => {
        // console.log(event.target.value);
        this.setState({ EmailCad: event.target.value })
    }

    ValorSenhaCad = (event) => {
        // console.log(event.target.value);
        this.setState({ SenhaCad: event.target.value })
    }

    ValorUrlCad = (event) => {
        // console.log(event.target.value);
        this.setState({ UrlCad: event.target.value })
    }


    LogarUser = (event) => {
        event.preventDefault();

        Axios.post(
            'http://localhost:5000/api/Login',
            {
                email: this.state.emailLogin,
                senha: this.state.senhaLogin
            })
            .then(data => {
                if (data.status === 200) {
                    // console.log(data.data);
                    // console.log(data.data.token);

                    localStorage.setItem("usuario-opflix", data.data.token);
                    this.props.history.push('home');
                    //console.log(this.props.history.location.pathname );
                }
            })
            .catch(erro => {
                this.setState({ msgErro: "Usuário ou senha invalidos(as)" });
            })
    }


    CadastrarUser = (event) => {
        event.preventDefault();
        let urlFoto = "";

        if (this.state.UrlCad == null || this.state.UrlCad == "") {
            urlFoto = 'https://abrilexame.files.wordpress.com/2018/10/capaprofile.jpg?quality=70&strip=info&resize=680,453'
        }else{
            urlFoto = this.state.UrlCad;
        }

        Axios.post(
            'http://localhost:5000/api/Usuarios',
            {
                nome: this.state.NomeCad,
                email: this.state.EmailCad,
                senha: this.state.SenhaCad,
                idPerfil: 2,
                fotoPerfil: urlFoto
            })
            .then(data => {
                if (data.status === 200) {
                    console.log('Cadastrado')
                    this.setState({ msgErroCad: "Seu usuário foi cadastrado com sucesso" });
                }
            })
            .catch(erro => {
                this.setState({ msgErroCad: "Dado(s) nulos, incorretos ou email já existente" });
            })

        this.state.NomeCad = "";
        this.state.EmailCad = "";
        this.state.SenhaCad = "";
        this.state.UrlCad = "";
    }

    render() {
        return (

            <div>
                <header>
                    <Navbar />
                </header>

                <main className="main">
                    <section class="sectionMae">
                        <section>
                            <h2>Login</h2>
                            <input type="email" required placeholder="Email.." onChange={this.ValorEmailLogin} value={this.state.emailLogin} />
                            <input type="password" required placeholder="Senha.." onChange={this.ValorSenhaLogin} value={this.state.senhaLogin} />
                            <button
                                onClick={this.LogarUser}
                            >Logar</button>
                            <p
                                className="text__login"
                                style={{ color: "white", textAlign: "center" }}
                            >
                                {this.state.msgErro}
                            </p>
                        </section>

                        <section>
                            <h2>Cadastro</h2>
                            <input type="text" required placeholder="Nome.." onChange={this.ValorNomeCad} value={this.state.NomeCad} />
                            <input type="email" required placeholder="Email.." onChange={this.ValorEmailCad} value={this.state.EmailCad} />
                            <input type="password" required placeholder="Senha.." onChange={this.ValorSenhaCad} value={this.state.SenhaCad} />
                            <input type="url" placeholder="URL foto perfil.." onChange={this.ValorUrlCad} value={this.state.UrlCad} />
                            <button onClick={this.CadastrarUser} >Cadastrar</button>
                            <p
                                className="text__login"
                                style={{ color: "white", textAlign: "center" }}
                            >
                                {this.state.msgErroCad}
                            </p>
                        </section>
                    </section>
                </main>

                <Footer />

            </div>
        )
    }
}
