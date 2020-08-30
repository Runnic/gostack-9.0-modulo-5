import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'
import api from '../../services/api'
import { Link } from "react-router-dom";

import Container from '../../Components/Container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
        error: false,
    }

    //Carregar os dados do LocalStorage
    componentDidMount() {
        const repositories = localStorage.getItem('repositories')

        if(repositories)
            this.setState({ repositories: JSON.parse(repositories) })
    }

    // Salvar os dados no LocalStorage
    componentDidUpdate(_, prevState) {
        if(prevState.repositories !== this.state.repositories){
            localStorage.setItem('repositories', JSON.stringify(this.state.repositories))
        }
    }

    handleInputChange = event => {
        this.setState({ newRepo: event.target.value })
    }

    handleSubmit = async event => {
        event.preventDefault()
        this.setState({ loading: true })
        const { newRepo, repositories } = this.state

        try {
            const resp = await api.get(`/repos/${newRepo}`)
            const data = {
                name: resp.data.full_name,
            }

            const hasRepo = repositories.find(r => r.name === newRepo)

            if(hasRepo)
                throw new Error('Repositório duplicado')

            this.setState({
                repositories: [...repositories, data],
                newRepo: "",
            })

        }catch(error){
            console.log(error)
            this.setState({ error: true })
        }finally{
            this.setState({ loading: false })
        }
    }


    render() {
        const { newRepo, repositories, loading, error } = this.state

        return (
            <Container>
                <h1><FaGithubAlt />Repositórios</h1>

                <Form onSubmit={this.handleSubmit} error={error}>
                    <input
                        type="text"
                        placeholder="Adicionar Repositorio"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />
                    <SubmitButton loading={loading}>
                        { loading ? <FaSpinner color="#fff" size={14} /> : <FaPlus color="#fff" size={14} />}
                    </SubmitButton>
                </Form>
                <List>
                    {repositories.map(repository => (
                        <li key={repository.name} >
                            <span>{repository.name}</span>
                            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
                        </li>
                    ))}
                </List>
            </Container>
        )
    }
}

