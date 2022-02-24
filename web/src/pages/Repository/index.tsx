import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import { Header, RepositoryInfo, Issues } from './styles';

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  html_url: string;
  title: string;
  owner: {
    login: string;
  }
}

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<Repository|null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { pUser, pRepository } = useParams();

  useEffect(() => {
    api.get(`repos/${pUser}/${pRepository}`).then((response) => {
      setRepository(response.data)
    });

    api.get(`repos/${pUser}/${pRepository}`).then((response) => {
      setIssues([...issues, response.data])
    });
  }, [`${pUser}/${pRepository}`]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
        <h1>Repository:{pUser + '/' +pRepository}</h1>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues Abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {console.log('issues')}
        {console.log(issues)}
        {issues.map((issue) => (
          <a key={issue.id} target="_blank" href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.owner.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}

      </Issues>
    </>
  );

}

export default Repository;

