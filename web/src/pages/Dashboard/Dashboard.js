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
            //Listas
            listaLancamentos: [],
            listaCategorias: [],
            listaPlataformas: [],
            msgErroCad: "",

            //Cadastro Usuário
            NomeCad: "",
            EmailCad: "",
            SenhaCad: "",
            UrlCad: "",

            nomeAdmin: "",

            //Cadastro Lançamentos
            tituloL: "",
            dataL: "",
            duracao: "",
            sinopse: "",
            idCatCad: "",
            idPlatCad: "",
            msgCatCad: "",
            nomeCatCad: "",
            nomePlatCad: "",
            fotoL: "",
            idTipoCad: "",

            //Atualizar 
            idPlataformaAtualizar: "",
            idCategoriaAtualizar: "",
            idLancAtualizar: "",

        }
    }

    // --------------- LISTAGENS

    listarLancamentos = () => {
        var config = {
            headers: { 'Authorization': "bearer " + localStorage.getItem("usuario-opflix") }
        };

        Axios.get(
            'http://192.168.4.199:5000/api/Lancamentos',
            config
        ).then((response) => {
            this.setState({ listaLancamentos: response.data })
        })
    }

    listarPlataformas = () => {
        var config = {
            headers: { 'Authorization': "bearer " + localStorage.getItem("usuario-opflix") }
        };

        Axios.get(
            'http://192.168.4.199:5000/api/Plataformas',
            config
        ).then((response) => {
            this.setState({ listaPlataformas: response.data })
        })
            .catch(err => console.log(err))
    }

    listarCategorias = () => {
        var config = {
            headers: { 'Authorization': "bearer " + localStorage.getItem("usuario-opflix") }
        };

        Axios.get(
            'http://192.168.4.199:5000/api/Categorias',
            config
        ).then((response) => {
            this.setState({ listaCategorias: response.data })
        })
    }

    // --------------- OnChange Values

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
    SetarNomeAdmin = (event) => {
        var token = localStorage.getItem("usuario-opflix").split('.');
        var base64Url = token[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var tokenJSON = JSON.parse(window.atob(base64));
        var nomeAdmin = (tokenJSON.nome)

        this.setState({ nomeAdmin: nomeAdmin })
    }
    ValorSnopse = (event) => {
        this.setState({ sinopse: event.target.value })
    }
    ValorTitulo = (event) => {
        this.setState({ tituloL: event.target.value })
    }
    ValorDuracao = (event) => {
        this.setState({ duracao: event.target.value })
    }
    ValorData = (event) => {
        this.setState({ dataL: event.target.value })
    }
    ValorFoto = (event) => {
        console.log(event.target.value)
        this.setState({ fotoL: event.target.value })
    }
    setarCatCad = (event) => {
        this.setState({ idCatCad: event.target.value })
    }
    setarTipoCad = (event) => {
        this.setState({ idTipoCad: event.target.value })
    }
    ValorNomeCatCad = (event) => {
        this.setState({ nomeCatCad: event.target.value })
    }
    ValorNomePlatCad = (event) => {
        this.setState({ nomePlatCad: event.target.value })
    }
    ValorIdPlat = (event) => {
        this.setState({ idPlataformaAtualizar: event.target.value })
    }
    ValorIdCat = (event) => {
        this.setState({ idCategoriaAtualizar: event.target.value })
    }
    ValorIdLanc = (event) => {
        this.setState({ idLancAtualizar: event.target.value })
    }


    //------------ CADASTROS

    CadastrarLancamento = (event) => {
        event.preventDefault();

        if (this.state.idLancAtualizar == "") {

            fetch('http://192.168.4.199:5000/api/Lancamentos', {
                method: "POST",
                body: JSON.stringify({
                    dataLancamento: this.state.dataL,
                    duracao: this.state.duracao,
                    titulo: this.state.tituloL,
                    sinopse: this.state.sinopse,
                    idCategoria: this.state.idCatCad,
                    idTipoConteudo: this.state.idTipoCad,
                    fotoLanc: this.state.fotoL,
                }),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': "bearer " + localStorage.getItem("usuario-opflix")
                }
            })
                .then(data => {
                    if (data.status === 200) {
                        alert("Lançamento Cadastrado")
                        this.listarLancamentos();
                    } else {
                        console.log('n cadas')
                    }
                })
                .catch(erro => {
                    this.setState({ msgCatCad: "Não Cadastrado" });
                })

        } else {
            alert('Se for cadastrar um lançamento exclua o o campo de id');
        }
    }

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

        fetch('http://192.168.4.199:5000/api/Usuarios/cadastrar/admin', {
            method: "POST",
            body: JSON.stringify({
                nome: this.state.NomeCad,
                email: this.state.EmailCad,
                senha: this.state.SenhaCad,
                idPerfil: 1,
                fotoPerfil: urlFoto
            }),
            headers: {
                "Content-Type": "application/json",
                'Authorization': "bearer " + localStorage.getItem("usuario-opflix")
            }
        })
            .then(data => {
                if (data.status === 200) {
                    console.log('Admim Cadastrado')
                    alert('Administrador Cadastrado')
                }
            })
            .catch(erro => {
                console.log('ADM Não Cadastrado, dado(s) incorretos ou email existente')

            })

        this.state.NomeCad = "";
        this.state.EmailCad = "";
        this.state.SenhaCad = "";
        this.state.UrlCad = "";
    }


    CadastrarPlataforma = () => {

        if (this.state.idPlataformaAtualizar == "") {

            fetch('http://192.168.4.199:5000/api/Plataformas', {
                method: "POST",
                body: JSON.stringify({
                    nome: this.state.nomePlatCad
                }),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': "bearer " + localStorage.getItem("usuario-opflix")
                }
            })
                .then(data => {
                    if (data.status === 200) {
                        alert("Plataforma Cadastrada")
                        this.listarPlataformas();
                    } else {
                        console.log('n cadas')
                    }
                })
                .catch(erro => {
                    this.setState({ msgCatCad: "Não Cadastrado" });
                })
        } else {
            alert('Se for cadastrar uma plataforma exclua o o campo de id');
        }

    }

    CadastrarCategoria = () => {

        if (this.state.idCategoriaAtualizar == "") {

            fetch('http://192.168.4.199:5000/api/Categorias', {
                method: "POST",
                body: JSON.stringify({
                    nome: this.state.nomeCatCad
                }),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': "bearer " + localStorage.getItem("usuario-opflix")
                }
            })
                .then(data => {
                    if (data.status === 200) {
                        alert("Categoria Cadastrada")
                        this.listarCategorias();
                    } else {
                        console.log('n cadas')
                    }
                })
                .catch(erro => {
                    this.setState({ msgCatCad: "Não Cadastrado" });
                })
        }
        else {
            alert('Se for cadastrar uma categoria exclua o o campo de id');
        }
    }



    //---------------- ATUALIZAÇÕES

    AtualizarPlataforma = (event) => {
        event.preventDefault();

        var url = 'http://192.168.4.199:5000/api/Plataformas/' + this.state.idPlataformaAtualizar;

        if (this.state.idPlataformaAtualizar != null && this.state.nomePlatCad != "") {
            fetch(url,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        nome: this.state.nomePlatCad
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': "bearer " + localStorage.getItem("usuario-opflix")
                    }
                })
                .then(data => {
                    if (data.status === 200) {
                        alert("Plataforma Atualizada")
                        this.listarPlataformas();
                    } else {
                        console.log('Plataforma não atualizada')
                        alert('Plataforma não atualizada, ID inexistente, dado(s) nulos ou incorretos')

                    }
                })
        } else {
            alert('Você só pode atualizar se houver um Id e Nome digitado')
        }
    }

    AtualizarCategoria = (event) => {
        event.preventDefault();

        var url = 'http://192.168.4.199:5000/api/Categorias/' + this.state.idCategoriaAtualizar;

        if (this.state.idCategoriaAtualizar != null && this.state.nomeCatCad != "") {

            fetch(url,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        nome: this.state.nomeCatCad
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': "bearer " + localStorage.getItem("usuario-opflix")
                    }
                })
                .then(data => {
                    if (data.status === 200) {
                        alert("Categoria Atualizada")
                        this.listarCategorias();
                    } else {
                        console.log('Categoria não atualizada')
                        alert('Categoria não atualizada, ID inexistente, dado(s) nulos ou incorretos')

                    }
                })

        } else {
            alert('Você só pode atualizar se houver um Id e Nome digitado')
        }
    }

    AtualizarLancamento = (event) => {
        event.preventDefault();

        var url = 'http://192.168.4.199:5000/api/Lancamentos/' + this.state.idLancAtualizar;

        if (this.state.idLancAtualizar != '') {

            var a = this.state.tituloL
            var b = this.state.sinopse
            var c = this.state.duracao
            var d = this.state.dataL
            var e = this.state.idCatCad
            var f = this.state.idTipoCad
            var g = this.state.fotoL 

            console.log(a, b, c, d, e, f, g, url)

            if (a != "" && b != "" && c != "" && d != "" && e != "" && f != "" ) {

                fetch(url,
                    {
                        method: "PUT",
                        body: JSON.stringify({
                            titulo: a,
                            sinopse: b,
                            duracao: c,
                            dataLancamento: d,
                            idCategoria: e,
                            idTipoConteudo: f,
                            fotoLanc: g
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': "bearer " + localStorage.getItem("usuario-opflix")
                        }
                    })
                    .then(data => {
                        if (data.status === 200) {
                            alert("Lançamento Atualizado")
                            this.listarLancamentos();
                        } else {
                            console.log('Lançamento não atualizado')
                            alert('Lançamento não atualizado, ID inexistente, dado(s) nulos ou incorretos')
                        }
                    })
            }

        } else {
            alert('Você só pode atualizar se houverem todos dados digitados')
        }

        // var config = {
        //     headers: { 'Authorization': "bearer " + localStorage.getItem("usuario-opflix") }
        // };

        // Axios.put(
        //     'http://localhost:5000/api/Lancamentos/' + this.state.idLancAtualizar,
        //     config,
        //     body: JSON.stringify({
        //         dataLancamento: this.state.dataL,
        //         duracao: this.state.duracao,
        //         titulo: this.state.tituloL,
        //         sinopse: this.state.sinopse,
        //         idCategoria: this.state.idCatCad,
        //         idTipoConteudo: this.state.idPlatCad
        //     })
        // ).then((response) => {
        //     console.log(response.status)
        //     console.log(response.data)
        // })

    }

    // --------------- DID MOUNTING

    componentDidMount() {
        this.listarLancamentos();
        this.listarCategorias();
        this.listarPlataformas();
        this.SetarNomeAdmin();
    }

    render() {
        return (

            <div>
                <header>
                    <NavbarAdmin />
                </header>

                <article className="warning">
                    <p>  Administrador! | BEM VINDO, {this.state.nomeAdmin} </p>
                </article>

                <section className="Lancamentos">
                    <h1 className="h1">Lançamentos Quant({this.state.listaLancamentos.length})</h1>

                    <section className="cadastrarL">

                        <div className="div1">
                            <h2 className="h2">Cadastrar</h2>
                            <input className="inputIdLan" type="number" placeholder="IdLanç.." onChange={this.ValorIdLanc} value={this.state.idLancAtualizar} />
                        </div>

                        <form className="formCad" action="">
                            <input className="input" placeholder="Titulo.." type="text" onChange={this.ValorTitulo} value={this.state.tituloL} />
                            <input className="input" placeholder="Sinopse.." type="text" onChange={this.ValorSnopse} value={this.state.sinopse} />
                            <input className="input" placeholder="Duração.." type="time" onChange={this.ValorDuracao} value={this.state.duracao} />
                            <input className="input" placeholder="Data Laçamento.." type="date" onChange={this.ValorData} value={this.state.dataL} />
                            <input className="input" placeholder="URL ou Endereco de Imagem.. (max 500 caracteres)" type="text" onChange={this.ValorFoto} value={this.state.fotoL} />

                            <select className="input" name="categoriasSel" onChange={this.setarCatCad} >
                                <option required value="" selected disabled>Categorias:</option>
                                {this.state.listaCategorias.map(element => {
                                    return (
                                        <option className="blackColor" value={element.idCategoria}> {element.nome} </option>
                                    )
                                })}
                            </select>

                            <select className="input" name="plataformasSel" onChange={this.setarTipoCad}  >
                                <option value="" selected disabled>Tipo Conteudo:</option>
                                <option className="blackColor" value="1"> Filme </option>
                                <option className="blackColor" value="2"> Série </option>
                            </select>

                            <div className="divBtn">
                                <button className="inputGlobal btnCad" onClick={this.CadastrarLancamento}> Cadastrar </button>
                                <div>Ou</div>
                                <button className="inputGlobal btnAtu" onClick={this.AtualizarLancamento} > Atualizar </button>
                            </div>

                        </form>
                    </section>

                    <section className="cadastrarL">
                        <div className="div1">
                            <h2 className="h2">Listar</h2>
                        </div>

                        <table className="tableAlign">
                            <thead>
                                <tr>
                                    <th>#IdL</th>
                                    <th>Titulo</th>
                                    <th>Data Lançamento</th>
                                    <th>Duração</th>
                                    <th>Sinopse</th>
                                    {/* <th>Ação</th> */}
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.listaLancamentos.map(element => {
                                    return (
                                        <tr key={element.idLancamento}>
                                            <td>{element.idLancamento}</td>
                                            <td>{element.titulo}</td>
                                            <td>{element.dataLancamento}</td>
                                            <td>{element.duracao}</td>
                                            <td>{element.sinopse}</td>
                                            {/* <td><button className="btnDel" value={element.idLancamento} onClick={this.DeletarLançamento} >Deletar</button></td> */}
                                        </tr>
                                    );
                                })}
                            </tbody>

                        </table>
                    </section>
                </section>


                <section className="Lancamentos">
                    <h2 className="h1">Categorias Quant({this.state.listaCategorias.length})</h2>

                    <section className="cadastrarL">
                        <div className="div1">
                            <h2 className="h2">Cadastrar</h2>
                            <input className="inputIdLan" type="number" placeholder="IdCat.." onChange={this.ValorIdCat} value={this.state.idCategoriaAtualizar} />
                        </div>

                        <form className="formCad" action="">
                            <input className="input" onChange={this.ValorNomeCatCad} value={this.state.nomeCatCad} placeholder="Nome.." type="text" />

                            <div className="divBtn">
                                <button className="inputGlobal btnCad" onClick={this.CadastrarCategoria} > Cadastrar </button>
                                <div>Ou</div>
                                <button className="inputGlobal btnAtu" onClick={this.AtualizarCategoria}> Atualizar </button>
                            </div>
                        </form>
                    </section>

                    <section className="cadastrarL">
                        <div className="div1">
                            <h2 className="h2">Listar</h2>
                        </div>

                        <table className="tableAlign">
                            <thead>
                                <tr className="w3-light-grey">
                                    <th>#IdC</th>
                                    <th>Nome</th>
                                </tr>
                            </thead>

                            <tbody>
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
                            </tbody>

                        </table>

                    </section>
                </section>

                <section className="Lancamentos">
                    <h2 className="h1">Plataformas Quant({this.state.listaPlataformas.length})</h2>

                    <section className="cadastrarL">
                        <div className="div1">
                            <h2 className="h2">Cadastrar</h2>
                            <input className="inputIdLan" type="number" placeholder="IdP.." onChange={this.ValorIdPlat} value={this.state.idPlataformaAtualizar} />
                        </div>

                        <form className="formCad" action="">
                            <input onChange={this.ValorNomePlatCad} value={this.state.nomePlatCad} className="input" placeholder="Nome.." type="text" />

                            <div className="divBtn">
                                <button className="inputGlobal btnCad" onClick={this.CadastrarPlataforma}> Cadastrar </button>
                                <div>Ou</div>
                                <button className="inputGlobal btnAtu" onClick={this.AtualizarPlataforma} > Atualizar </button>
                            </div>
                        </form>
                    </section>

                    <section className="cadastrarL">
                        <div className="div1">
                            <h2 className="h2">Listar</h2>
                        </div>

                        <table className="tableAlign">
                            <thead className="trTable">
                                <tr>
                                    <th>#IdP</th>
                                    <th>Nome</th>
                                </tr>
                            </thead>

                            <tbody>
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
                            </tbody>

                        </table>
                    </section>
                </section>

                <section className="Lancamentos">
                    <h2 className="h1">Usuarios</h2>

                    <section className="cadastrarL teste">
                        <div className="div1">
                            <h2 className="h2">Cadastrar Administrador</h2>
                        </div>

                        <form className="formCad" action="">
                            <input className="input" placeholder="Nome.." type="text" onChange={this.ValorNomeCad} value={this.state.NomeCad} />
                            <input className="input" placeholder="Email.." type="email" onChange={this.ValorEmailCad} value={this.state.EmailCad} />
                            <input className="input" placeholder="Senha.." type="password" onChange={this.ValorSenhaCad} value={this.state.SenhaCad} />
                            <input className="input" placeholder="Foto perfil: URL.." type="text" onChange={this.ValorUrlCad} value={this.state.UrlCad} />

                            <div className="divBtn">
                                <button className="inputGlobal btnCad" onClick={this.CadastrarUser} > Cadastrar </button>

                            </div>
                        </form>
                    </section>

                </section>

                <Footer />

            </div>
        )
    }
}
