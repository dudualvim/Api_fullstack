import React from 'react';
import styles from '../../styles/UserList.module.css';

const UserList = ({ users, onSelectUser }) => {
  return (
    <div className={styles.userList}>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className={styles.userItem} onClick={() => onSelectUser(user)}>
            {user.name} ({user.role})
          </div>
        ))
      ) : (
        <p>Nenhum admin disponível</p>
      )}
    </div>
  );
};

export default UserList;
