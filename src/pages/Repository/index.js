import React, { Component } from 'react';
import api from '../../services/api'
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Container from '../../Components/Container'
import { Loading, Owner, IssueList, SelectStatus, ButtonContainer } from './styles';

class Repository extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string,
            })
        }).isRequired,

    }

    state = {
        repository: {},
        issues: [],
        loading: true,
        page: 1,
        repoName: '',
        selectedOption: 'all',
    }

    async componentDidMount(){
        const { match } = this.props
        const { page } = this.state
        const repoName = decodeURIComponent(match.params.repository)

        const [repository, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: 'all' ,
                    per_page: 10,
                    page,
                }
            })
        ])

        this.setState({
            repository: repository.data,
            issues: issues.data,
            loading: false,
            repoName,
        })
    }

    handleIssuesFilter = async (event) => {
        const state = event.target.value
        const { page, repoName } = this.state
        const resp = await api.get(`/repos/${repoName}/issues`, {
            params: {
                state,
                per_page: 10,
                page,
            }
        })

        this.setState({ issues: resp.data, selectedOption: state })
    }

    handleNextPage = async () => {
        const { page, repoName, selectedOption } = this.state
        const resp = await api.get(`/repos/${repoName}/issues`, {
            params: {
                state: selectedOption,
                per_page: 10,
                page: page + 1,
            }
        })

        this.setState({ issues: resp.data, page: page + 1 })
    }

    handleBackPage = async () => {
        const { page, repoName, selectedOption } = this.state
        const resp = await api.get(`/repos/${repoName}/issues`, {
            params: {
                state: selectedOption,
                per_page: 10,
                page: page - 1,
            }
        })

        this.setState({ issues: resp.data, page: page - 1 })
    }

    render() {
        const { repository, issues, loading } = this.state

        if(loading) {
            return <Loading>Carregando...</Loading>
        }

        return (
            <Container>
                <Owner>
                    <Link to='/'>Voltar aos repositórios</Link>
                    <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>

                <IssueList>
                    <SelectStatus onChange={this.handleIssuesFilter}>
                        <input type="radio" name="status" id="all" value="all" checked={this.state.selectedOption === 'all'} />
                        <label for="all">Todos</label>
                        <input type="radio" name="status" id="open" value="open" checked={this.state.selectedOption === 'open'} />
                        <label for="open">Abertos</label>
                        <input type="radio" name="status" id="closed" value="closed" checked={this.state.selectedOption === 'closed'} />
                        <label for="closed">Fechados</label>
                    </SelectStatus>
                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login} />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>{label.name}</span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                                <p style={{ color: issue.state === "open" ? "#f79205" : "#2ad111" }} >{issue.state === "open" ? "Aberto" : "Fechado"}</p>
                            </div>
                        </li>
                    ))}
                </IssueList>
                <ButtonContainer>
                    <button onClick={this.handleBackPage}> {"<"} </button>
                    <button onClick={this.handleNextPage}> {">"} </button>
                </ButtonContainer>
            </Container>
        )
    }
}

export default Repository;
