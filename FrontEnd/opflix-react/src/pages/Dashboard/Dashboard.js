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

        }
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
                                    <th>Lançamento</th>
                                    <th>Sinopse</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tr>
                                <td>1</td>
                                <td>Smith</td>
                                <td>50</td>
                                <td>50</td>
                                <td><button className="btnDel">Deletar</button></td>

                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jackson</td>
                                <td>94</td>
                                <td>94</td>
                                <td><button className="btnDel">Deletar</button></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Johnson</td>
                                <td>67</td>
                                <td>94</td>
                                <td><button className="btnDel">Deletar</button></td>
                            </tr>
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
                            <tr>
                                <td>1</td>
                                <td>Smith</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jackson</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Johnson</td>
                            </tr>
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
                            <tr>
                                <td>1</td>
                                <td>Smith</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jackson</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Johnson</td>
                            </tr>
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
                            <input required className="input" placeholder="Nome.." type="text" />
                            <input required className="input" placeholder="Email.." type="email" />
                            <input required className="input" placeholder="Senha.." type="password" />
                            <input required className="input" placeholder="Foto perfil: URL.." type="text" />

                            <div className="divBtn">
                                <button className="inputGlobal btnCad"> Cadastrar </button>
                            </div>
                        </form>
                    </section>
                </section>

                <Footer />

            </div>
        )
    }
}
