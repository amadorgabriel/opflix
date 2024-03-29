import React, { Component } from "react";
import Axios from "axios";

import "../../assets/css/globalStyle.css";
import "../../assets/css/sessionStyle.css";

import { parseJwt } from "../../services/autorizacao";

import Navbar from "../../components/NavBarSession";
import Footer from "../../components/Footer.js";

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
      UrlCad: "",
    };
  }

  ValorEmailLogin = (event) => {
    this.setState({ emailLogin: event.target.value });
  };

  ValorSenhaLogin = (event) => {
    this.setState({ senhaLogin: event.target.value });
  };

  ValorNomeCad = (event) => {
    this.setState({ NomeCad: event.target.value });
  };

  ValorEmailCad = (event) => {
    this.setState({ EmailCad: event.target.value });
  };

  ValorSenhaCad = (event) => {
    this.setState({ SenhaCad: event.target.value });
  };

  ValorUrlCad = (event) => {
    this.setState({ UrlCad: event.target.value });
  };

  LogarUser = (event) => {
    event.preventDefault();

    Axios.post("http://192.168.4.199:5000/api/Login", {
      email: this.state.emailLogin,
      senha: this.state.senhaLogin,
    })
      .then((data) => {
        if (data.status === 200) {
          localStorage.setItem("usuario-opflix", data.data.token);

          var token = localStorage.getItem("usuario-opflix").split(".");
          var base64Url = token[1];
          var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          var tokenJSON = JSON.parse(window.atob(base64));
          var permToken = tokenJSON.perm;

          console.log(permToken);

          if (permToken == "Admin") {
            this.props.history.push("dashboard");
          } else {
            this.props.history.push("home");
          }
        }
      })
      .catch((erro) => {
        this.setState({ msgErro: "Usuário ou senha invalidos(as)" });
      });
  };

  CadastrarUser = (event) => {
    event.preventDefault();
    let urlFoto = "";

    if (this.state.UrlCad == null || this.state.UrlCad == "") {
      urlFoto =
        "https://abrilexame.files.wordpress.com/2018/10/capaprofile.jpg?quality=70&strip=info&resize=680,453";
    } else {
      urlFoto = this.state.UrlCad;
    }

    Axios.post("http://192.168.4.199:5000/api/Usuarios", {
      nome: this.state.NomeCad,
      email: this.state.EmailCad,
      senha: this.state.SenhaCad,
      idPerfil: 2,
      fotoPerfil: urlFoto,
    })
      .then((data) => {
        if (data.status === 200) {
          console.log("Cadastrado");
          this.setState({
            msgErroCad: "Seu usuário foi cadastrado com sucesso",
          });
        }
      })
      .catch((erro) => {
        this.setState({
          msgErroCad: "Dado(s) nulos, incorretos ou email já existente",
        });
      });

    this.state.NomeCad = "";
    this.state.EmailCad = "";
    this.state.SenhaCad = "";
    this.state.UrlCad = "";
  };

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
              <input
                type="email"
                required
                placeholder="Email.."
                onChange={this.ValorEmailLogin}
                value={this.state.emailLogin}
              />
              <input
                type="password"
                required
                placeholder="Senha.."
                onChange={this.ValorSenhaLogin}
                value={this.state.senhaLogin}
              />
              <button onClick={this.LogarUser}>Logar</button>
              <p
                className="text__login"
                style={{ color: "white", textAlign: "center" }}
              >
                {this.state.msgErro}
              </p>
            </section>

            <section>
              <h2>Cadastro</h2>
              <input
                type="text"
                required
                placeholder="Nome.."
                onChange={this.ValorNomeCad}
                value={this.state.NomeCad}
              />

              <input
                type="email"
                required
                placeholder="Email.."
                onChange={this.ValorEmailCad}
                value={this.state.EmailCad}
              />

              <input
                type="password"
                required
                placeholder="Senha.."
                onChange={this.ValorSenhaCad}
                value={this.state.SenhaCad}
              />

              <input
                type="url"
                placeholder="URL foto perfil.. (max 500 caracteres)"
                onChange={this.ValorUrlCad}
                value={this.state.UrlCad}
              />

              <button onClick={this.CadastrarUser}>Cadastrar</button>

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
    );
  }
}
