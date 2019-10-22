// BIBLIOTECAS
import React, { Component } from 'react';
import Axios from 'axios';

// CSS
import '../../assets/css/globalStyle.css';
import '../../assets/css/dashboarStyle.css';
// import 'https://www.w3schools.com/w3css/4/w3.css';

// COMPONENTES
import NavbarAdmin from '../../components/NavBarAdmin.js';
import Footer from '../../components/Footer.js';

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            listaLancamentos: [],
            listaCategorias: [],
            listaPlataformas: [],
            msgErroCad: "",
            NomeCad: "",
            EmailCad: "",
            SenhaCad: "",
            UrlCad: ""
        }
    }

    // --------------- LISTAGENS

    listarLancamentos = () => {
        fetch('http://localhost:5000/api/Lancamentos')
            .then(data => data.json())
            .then(res => {
                this.setState({ listaLancamentos: res })
            })
        // .catch(erro => alert('Erro:' + erro))
    }

    listarPlataformas = () => {
        fetch('http://localhost:5000/api/Plataformas')
            .then(data => data.json())
            .then(res => {
                this.setState({ listaPlataformas: res })
            })
        // .catch(erro => alert('Erro:' + erro))
    }

    listarCategorias = () => {
        var config = {
            headers: { 'Authorization': "bearer " + localStorage.getItem("usuario-opflix") }
        };

        Axios.get(
            'http://localhost:5000/api/Categorias',
            config
        ).then((response) => {
            this.setState({ listaCategorias: response.data })
        })
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

    // --------------- CADASTROS

    CadastrarUser = (event) => {
        event.preventDefault();
        let urlFoto = "";

        var config = {
            headers: { 'Authorization': "bearer " + localStorage.getItem("usuario-opflix") }
        };

        if (this.state.UrlCad == null || this.state.UrlCad == "") {
            urlFoto = 'https://abrilexame.files.wordpress.com/2018/10/capaprofile.jpg?quality=70&strip=info&resize=680,453'
        } else {
            urlFoto = this.state.UrlCad;
        }

        Axios.post(
            'http://localhost:5000/api/Usuarios/cadastrar/admin',
            config,
            {
                nome: this.state.NomeCad,
                email: this.state.EmailCad,
                senha: this.state.SenhaCad,
                idPerfil: 1,
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

    // --------------- DELETES

    DeletarLançamento = () => {
        event.preventDefault();

        Axios.delete(
            'http://localhost:5000/api/Lancamentos/' + event.target.value)
            .then(data => {
                if (data.status === 200) {
                    console.log('Lanç Deletado')
                }
            })
            .catch(erro => {
                this.setState({ msgErroCad: "Dado(s) incorretos ou inexistentes" });
            })

    }

    // --------------- DID MOUNTING

    componentDidMount() {
        this.listarLancamentos();
        this.listarCategorias();
        this.listarPlataformas();
    }

    render() {
        return (

            <div>
                <header>
                    <NavbarAdmin />
                </header>

                <article className="warning">
                    <p>BEM VINDO Administrador! | @Nome Usuário</p>
                </article>

                <section className="Lancamentos">
                    <h1 className="h1">Lançamentos Count()</h1>

                    <section className="cadastrarL">

                        <div className="div1">
                            <h2 className="h2">Cadastrar</h2>
                            <input className="inputIdLan" type="number" placeholder="IdLanç.." />
                        </div>

                        <form className="formCad" action="">
                            <input required className="input" placeholder="Titulo.." type="text" />
                            <input required className="input" placeholder="Sinopse.." type="text" />
                            <input required className="input" placeholder="Duração.." type="text" />
                            <input required className="input" placeholder="Data Laçamento.." type="date" />

                            <select className="input" name="categoriasSel">
                                <option required value="" selected disabled>Categoria: </option>
                            </select>
                            <select className="input" name="plataformasSel">
                                <option value="" selected disabled>Plataforma: </option>
                            </select>

                            <div className="divBtn">
                                <button className="inputGlobal btnCad"> Cadastrar </button>
                                <div>Ou</div>
                                <button className="inputGlobal btnAtu"> Atualizar </button>
                            </div>

                        </form>
                    </section>

                    <section className="cadastrarL">
                        <div className="div1">
                            <h2 className="h2">Listar</h2>
                        </div>

                        <table className="w3-table-all w3-hoverable">
                            <thead>
                                <tr className="w3-light-grey">
                                    <th>#IdL</th>
                                    <th>Titulo</th>
                                    <th>Data Lançamento</th>
                                    <th>Duração</th>
                                    <th>Sinopse</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>

                            {this.state.listaLancamentos.map(element => {
                                return (
                                    <tr key={element.idLancamento}>
                                        <td>{element.idLancamento}</td>
                                        <td>{element.titulo}</td>
                                        <td>{element.dataLancamento}</td>
                                        <td>{element.duracao}</td>
                                        <td>{element.sinopse}</td>
                                        <td><button className="btnDel" value={element.idLancamento} onClick={this.DeletarLançamento} >Deletar</button></td>
                                    </tr>
                                );
                            })}

                        </table>
                    </section>
                </section>


                <section className="Lancamentos">
                    <h2 className="h1">Categorias Count()</h2>

                    <section className="cadastrarL">
                        <div className="div1">
                            <h2 className="h2">Cadastrar</h2>
                            <input className="inputIdLan" type="number" placeholder="IdCat.." />
                        </div>

                        <form className="formCad" action="">
                            <input required className="input" placeholder="Nome.." type="text" />

                            <div className="divBtn">
                                <button className="inputGlobal btnCad"> Cadastrar </button>
                                <div>Ou</div>
                                <button className="inputGlobal btnAtu"> Atualizar </button>
                            </div>
                        </form>
                    </section>

                    <section className="cadastrarL">
                        <div className="div1">
                            <h2 className="h2">Listar</h2>
                        </div>

                        <table className="w3-table-all w3-hoverable">
                            <thead>
                                <tr className="w3-light-grey">
                                    <th>#IdC</th>
                                    <th>Nome</th>
                                </tr>
                            </thead>

                            {
                                this.state.listaCategorias.map(element => {
                                    return (
                                        <tr key={element.idCategoria}>
                                            <td>{element.idCategoria}</td>
                                            <td>{element.nome}</td>
                                        </tr>
                                    );
                                })
                            }

                        </table>

                    </section>
                </section>

                <section className="Lancamentos">
                    <h2 className="h1">Plataformas Count()</h2>

                    <section className="cadastrarL">
                        <div className="div1">
                            <h2 className="h2">Cadastrar</h2>
                            <input className="inputIdLan" type="number" placeholder="IdP.." />
                        </div>

                        <form className="formCad" action="">
                            <input required className="input" placeholder="Nome.." type="text" />

                            <div className="divBtn">
                                <button className="inputGlobal btnCad"> Cadastrar </button>
                                <div>Ou</div>
                                <button className="inputGlobal btnAtu"> Atualizar </button>
                            </div>
                        </form>
                    </section>

                    <section className="cadastrarL">
                        <div className="div1">
                            <h2 className="h2">Listar</h2>
                        </div>

                        <table className="w3-table-all w3-hoverable">
                            <thead>
                                <tr className="w3-light-grey">
                                    <th>#IdP</th>
                                    <th>Nome</th>
                                </tr>
                            </thead>

                            {
                                this.state.listaPlataformas.map(element => {
                                    return (
                                        <tr key={element.idPlataforma}>
                                            <td>{element.idPlataforma}</td>
                                            <td>{element.nome}</td>
                                        </tr>
                                    );
                                })
                            }

                        </table>
                    </section>
                </section>

                <section className="Lancamentos">
                    <h2 className="h1">Usuarios Count()</h2>

                    <section className="cadastrarL">
                        <div className="div1">
                            <h2 className="h2">Cadastrar Administrador</h2>
                        </div>

                        <form className="formCad" action="">
                            <input required className="input" placeholder="Nome.." type="text" onChange={this.ValorNomeCad} value={this.state.NomeCad} />
                            <input required className="input" placeholder="Email.." type="email" onChange={this.ValorEmailCad} value={this.state.EmailCad} />
                            <input required className="input" placeholder="Senha.." type="password" onChange={this.ValorSenhaCad} value={this.state.SenhaCad} />
                            <input required className="input" placeholder="Foto perfil: URL.." type="text" onChange={this.ValorUrlCad} value={this.state.UrlCad} />

                            <div className="divBtn">
                                <button className="inputGlobal btnCad" onClick={this.CadastrarUser} > Cadastrar </button>
                                <p
                                    className="text__login"
                                    style={{ color: "white", textAlign: "center" }}
                                >
                                    {this.state.msgErroCad}
                                </p>
                            </div>
                        </form>
                    </section>
                </section>

                <Footer />

            </div>
        )
    }
}
