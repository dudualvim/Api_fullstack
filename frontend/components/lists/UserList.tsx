import styles from '../../styles/SuperAdminPage.module.css';

const UserList = ({ users, empresas }: { users: any[], empresas: any[] }) => {
  return (
    <div className={styles.listContainer}>
        <h3 className={styles.listTitle}>Usuários</h3>
        {users.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Função</th>
                <th>Empresa</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const empresa = empresas.find((empresa) => empresa.id === user.empresa_id);
                return (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{empresa ? empresa.name : 'Não atribuída'}</td> {/* Se não encontrar, mostrar 'Não atribuída' */}
                  </tr>
                );
              })}
            </tbody>

          </table>
        ) : (
          <p>Nenhum usuário cadastrado</p>
        )}
      </div>
  );
};

export default UserList;
