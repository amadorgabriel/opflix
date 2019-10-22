//Bibliotecas
import React, { Component } from 'react';
import Axios from "axios";

// CSS
import './App.css';
import '../../assets/css/globalStyle.css';
import '../../assets/css/indexStyle.css';

// IMG 
import imgFilme from '../../assets/img/HarryPoterLanç1.jpg'
import slide1 from '../../assets/img/CoringaSlider1.jpg';
import slide2 from '../../assets/img/AngryBirdsSlider2.jpg';
import slide3 from '../../assets/img/BNHSlider3.jpg';
import imgLupa from '../../assets/img/lupa.png';

// COMPONENTES
import Navbar from '../../components/NavBar.js';
import Footer from '../../components/Footer.js';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      listaLancamentos: [],
      listaCategorias: [],
      msgFavoritado: "Favoritar",

      // idLancamento: 1,
      // dataLancamento: "2012-10-25T00:00:00",
      // duracao: "01:16:04",
      // titulo: "A Culpa é das Estrelas",
      // sinopse: "...",
      // idCategoria: 2,
      // idTipoConteudo: 1,
      // idCategoriaNavigation: {
      //   idCategoria: 2,
      //   nome: "Romance"
      // },
      // idTipoConteudoNavigation: {
      //   idTipoConteudo: 1,
      //   nome: "Filme"

    }
  }

  listarLancamentos = () => {
    // fetch('http://localhost:5000/api/Lancamentos')
    //   .then(data => data.json())
    //   .then(res => {
    //     this.setState({ listaLancamentos: res })
    //   })

    fetch('http://localhost:5000/api/Lancamentos', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': "bearer " + localStorage.getItem("usuario-opflix")
      }
    })
      .then(data => data.json())
      .then(res => {
        this.setState({ listaLancamentos: res })
      })
  }

  listar = () => {
    //console.log(this.state.listaLancamentos);
  }

  listarCategorias = () => {

    // fetch('http://localhost:5000/api/Categorias')
    //   .then(data => data.json())
    //   .then(res => { this.setState({ listaCategorias: res }) })
    // .catch(erro => alert('Erro:' + erro))

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

  filtrarPorCategoria = (event) => {
    //console.log(event.target.value);

    fetch('http://localhost:5000/api/Lancamentos/filtrarCategoria/' + event.target.value)
      .then(data => data.json())
      .then(res => { this.setState({ listaLancamentos: res }) })
    //.catch(erro => alert('Erro:' + erro))

  }

  ordenarPorData = (event) => {
    //console.log(event.target.value)
    fetch('http://localhost:5000/api/Lancamentos/filtrarData/' + event.target.value)
      .then(data => data.json())
      .then(res => { this.setState({ listaLancamentos: res }) })
    // .catch(erro => alert('Erro:' + erro))
  }

  listarFavoritos = () => {
    var config = {
      headers: { 'Authorization': "bearer " + localStorage.getItem("usuario-opflix") }
    };

    Axios.get(
      'http://localhost:5000/api/Lancamentos/favoritos',
      config
    ).then((response) => {
      this.setState({ listaLancamentos: response.data })
      //console.log(response.data[1].idLancamentoNavigation.idTipoConteudoNavigation.nome)
      console.log(response.data)
      console.log(this.state.listaLancamentos)
    })
  }

  Favoritar = (event) => {
    var config = {
      headers: { 'Authorization': "bearer " + localStorage.getItem("usuario-opflix") }
    };

    var idBtn = event.target.value;

    Axios.get(
      'http://localhost:5000/api/Lancamentos/favoritar/' + event.target.value,
      config
    )
      .then(data => {
        if (data.status === 200) {

          var btnFav = document.getElementById(idBtn)

          //console.log(btnFav)
          btnFav.textContent = "Favoritado!"
          btnFav.setAttribute('disabled', true)
          btnFav.setAttribute('className', "")
          btnFav.setAttribute('className', "btnFavorito favoritado")

          btnFav.style.border = "1px solid rgb(107, 0, 0)";
          btnFav.style.color = "#fff"
          btnFav.style.background = "rgb(97, 97, 97)"

          //console.log(btnFav)
        }
      })
  }

  componentDidMount() {
    this.listarLancamentos();
    this.listarCategorias();
  }

  render() {

    return (
      <div>
        <header>
          <Navbar />

          {/* <div className="slideshow-container">
              <div className="mySlides fade">
              <img className="imgSlide" src={slide1} />
              <div className="text">O Coringa</div>
              </div>
              <div className="mySlides fade">
              <img className="imgSlide" src={slide2} />
              <div className="text">Os Vingadores</div>
              </div>
              <div className="mySlides fade">
              <img className="imgSlide" src={slide3} />
              <div className="text">Boku no Hero Academia</div>
              </div>
              <a className="prev" onClick="plusSlides(-1)">&#10094;</a>
              <a className="next" onClick="plusSlides(1)">&#10095;</a>
            </div> */}
        </header>

        <main>
          {/* <!-- https://www.myfonts.com/fonts/profonts/graphique-pro?tab=individualStyles --> */}
          <img className="h1" src="./fonts/H1.JPG" alt="" />

          <div className="divFiltro">
            <h2>Filtros:</h2>
            <div className="divChoices">

              <select className="filtroI" onChange={this.filtrarPorCategoria} name="" id="">
                <option selected disabled>Categorias:</option>
                {this.state.listaCategorias.map(element => {
                  return (
                    <option value={element.idCategoria}> {element.nome} </option>
                  )
                })}
              </select>

              <select className="filtroI" onChange={this.ordenarPorData} name="" id="">
                <option selected disabled>Ordem Data:</option>
                <option value="ASC" > Mais antigos</option>
                <option value="DESC" > Mais recentes</option>
              </select>
              <button to="/" className="btnFav" onClick={this.listarFavoritos} > Favoritos </button>

              {/* <!-- <button className="filtroI btn">Favoritos</button> --> */}
              {/* <div className="filtroI">
                <input type="text" placeholder="Lançamento.." />
                <button
                  onClick={this.listar()}
                >
                  <img className="btnImg" src={imgLupa} alt="btnLupa" />
                </button>
              </div> */}
            </div>
          </div>

          {
            this.state.listaLancamentos.map(element => {
              return (

                <section key={element.idLancamento} className="lancamento">

                  <img className="imgFilme" src={(element.fotoLanc != null) ? element.fotoLanc : element.idLancamentoNavigation.fotoLanc} />
                  <article className="infoFilmes">
                    <h3>{(element.titulo != null) ? element.titulo : element.idLancamentoNavigation.titulo}</h3>
                    <p>
                      <strong className="strg">Snopse:</strong>
                      {(element.sinopse != null) ? element.sinopse : element.idLancamentoNavigation.sinopse}
                    </p>
                    <p>
                      <strong className="strg">Duração:</strong>
                      {(element.duracao != null) ? element.duracao : element.idLancamentoNavigation.duracao}
                    </p>
                    <p>
                      <strong className="strg">Data Lançamento:</strong>
                      {(element.dataLancamento != null) ? element.dataLancamento : element.idLancamentoNavigation.dataLancamento}
                    </p>
                    <p>
                      <strong className="strg">Categoria:</strong>
                      {element.idCategoriaNavigation != undefined ? element.idCategoriaNavigation.nome  : 'nulo'}
                    </p>
                    <p>
                      <strong className="strg">Conteúdo:</strong>
                      {element.idTipoConteudoNavigation != undefined ? element.idTipoConteudoNavigation.nome  : 'nulo'}
                    </p>

                    <button className="btnFavorito" id={element.idLancamento} value={element.idLancamento} onClick={this.Favoritar}> {this.state.msgFavoritado} </button>
                  </article>
                </section>
              )
            })
          }

        </main>

        <Footer />

      </div>
    );
  }
}


