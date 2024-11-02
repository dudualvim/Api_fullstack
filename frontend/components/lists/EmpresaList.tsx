import styles from '../../styles/SuperAdminPage.module.css';

const EmpresaList = ({ empresas }: { empresas: any[] }) => {
  return (
    <div className={styles.listContainer}>
        <h3 className={styles.listTitle}>Empresas</h3>
        {empresas.length > 0 ? (
          <div className={styles.cardContainer}>
            {empresas.map((empresa) => (
              <div className={styles.card} key={empresa.id}>
                <h4>ID: {empresa.id}</h4>
                <h4>{empresa.name}</h4>
                <p>Email: {empresa.email}</p>
                <p>Endereço: {empresa.address}</p>
                <p>Telefone: {empresa.phone}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhuma empresa cadastrada</p>
        )}
    </div>
  );
};

export default EmpresaList;