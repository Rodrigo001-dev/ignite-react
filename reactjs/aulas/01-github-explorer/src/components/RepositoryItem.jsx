export function RepositoryItem(props) {
  return (
    <li>
      <strong>{props.repository ?? 'Default'}</strong>
      <p>{props.repository.description}</p>

      <a href={props.repository.link}>
        Acessar repositório
      </a>
    </li>
  );
};