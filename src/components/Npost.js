import React, { Component } from 'react';
import './Components.css';
import Modal from 'react-modal';
import Axios from 'axios';

const deleteUrl="http://testapi.ibb.su/removeNews";
const edtNews="http://testapi.ibb.su/setNews";
const getdetNews="http://testapi.ibb.su/getNewsDetails";


class Npost extends Component {

    constructor(props) {
        super(props);
        this.state = {headerNews: 'заголовок'};
        this.state = {textNews: ''};
        this.state={modalIsOpen:false};
        this.state={modalIsOpenEdit:false};

        this.delnews = this.delnews.bind(this);
        this.editnews = this.editnews.bind(this);

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.openModalEdit = this.openModalEdit.bind(this);
        this.closeModalEdit = this.closeModalEdit.bind(this);

        this.handleChangeHeader = this.handleChangeHeader.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    /* FETCH сохранения отредактированной новости на сервер*/
    editnews =() => {
        fetch(edtNews, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"id":this.props.idNews, "header": this.state.headerNews, "text":this.state.textNews})
        });
        this.closeModalEdit();
    };
    /*удаление новости по id*/
    delnews = () => {
            fetch(deleteUrl, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"id": this.props.idNews})
            });
        this.closeModal();
    };

    /*AXIOS*/
    editnewsAxios = () => {
        Axios.post(
            edtNews,
            {
                "id": this.props.idNews, "header": this.state.headerNews, "text":this.state.textNews
            }
            )
        this.closeModalEdit();
    };
    delnewsAxios = () => {
        Axios.post(deleteUrl,{"id": this.props.idNews})
    };

    /*открытие модального окна удаления*/
    openModal() {
        this.setState({modalIsOpen: true});
    }
    /*закрытие модального окна удаления*/
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    /*открытие модального окна редактирования*/
    openModalEdit() {
        this.setState({modalIsOpenEdit: true});
    }
    /*закрытие модального окна редактирования*/
    closeModalEdit() {
        this.setState({modalIsOpenEdit: false});
    }

    handleChangeHeader(event){
        this.setState({headerNews: event.target.value});
        console.log(this.state.headerNews);
        event.preventDefault(); /*отмена действия по умолчанию*/
    };
    handleChangeText(event){
        this.setState({textNews: event.target.value});
        event.preventDefault(); /*отмена действия по умолчанию*/
    };
    handleSubmit(event){
        this.setState({headerNews: document.getElementById("header").value=""});
        this.setState({textNews: document.getElementById("txtNews").value=""});
        this.editnewsAxios();
        event.preventDefault(); /*отмена действия по умолчанию*/
    };

    render() {
        return (
            <div className="Npost">
                <h5>{this.props.headerNews}</h5>
                <p>{this.props.textN}</p>

                <button onClick={this.openModalEdit}>Редактировать</button>
                <button onClick={this.openModal}>Удалить</button>

                {/*модальное окно удаления новости*/}
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    className="Modal"
                >

                    <h2>Удалить</h2>
                    <button onClick={this.delnewsAxios}>Да</button>
                    <button onClick={this.closeModal}>Отмена</button>
                </Modal>
                {/*модальное окно редактирования новости*/}
                <Modal
                    isOpen={this.state.modalIsOpenEdit}
                    onRequestClose={this.closeModalEdit}
                    className="ModalEdit"
                    onSubmit={this.handleSubmit}
                >
                    <h5>Редактирование</h5>
                    <textarea className="txtEditHeader" value={this.state.headerNews} id="header" onChange={this.handleChangeHeader}>{this.props.headerNews}</textarea>
                    <textarea className="txtEditText" value={this.state.textNews} id="txtNews" onChange={this.handleChangeText}>{this.props.textN}</textarea>

                    <button onClick={this.handleSubmit}>Сохранить</button>
                </Modal>

            </div>
        );
    }
}

export default Npost;