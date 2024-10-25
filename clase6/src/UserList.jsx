import React, { useState, useEffect } from 'react';

const UserList = () => {
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [newUserName, setNewUserName] = useState('');
const [selectedUser, setSelectedUser] = useState(null);
const apiUrl = "https://671be1cf2c842d92c3819c1b.mockapi.io/users"; 

 useEffect(() => {
fetch(apiUrl)
.then((response) => response.json())
.then((data) => setUsers(data))
.catch((error) => console.error("Error al obtener usuarios:", error))
.finally(() => {
setLoading(false);
});
}, [apiUrl]);
console.log(loading);

const handleCreateUser = () => {
    
    fetch(apiUrl, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: newUserName }),
    })
    .then((response) => response.json())
    .then(() => {
    
    setNewUserName('');
    })
    .then(() => {
    
    return fetch(apiUrl);
    })
    .then((response) => response.json())
    .then((data) => setUsers(data))
    .catch((error) => console.error(error.message));
    };

    const handleUpdateUser = () => {
        if (!selectedUser) return;
        
        // Realizar solicitud PUT para actualizar un usuario existente
        fetch(`${apiUrl}/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newUserName }),
        })
        .then((response) => response.json())
        .then((updatedUser) => {
        // Actualizar el estado con el usuario actualizado
        setUsers(users.map((user) => (user.id === selectedUser.id ? updatedUser : user)));
        setNewUserName('');
        setSelectedUser(null);
        })
        .catch((error) => console.error('Error al actualizar usuario:', error));
        };

        const handleDeleteUser = (userId) => {
            // Realizar solicitud DELETE para eliminar un usuario
            fetch(`${apiUrl}/${userId}`, {
            method: 'DELETE',
            })
            .then(() => {
            // Actualizar el estado excluyendo al usuario eliminado
            setUsers(users.filter((user) => user.id !== userId));
            setNewUserName('');
            setSelectedUser(null);
            })
            .catch((error) => console.error('Error al eliminar usuario:', error));
            };

 return (
<div>
<h2>Lista de Usuarios</h2>
<div>
<input
type="text"
value={newUserName}
onChange={(e) => setNewUserName(e.target.value)}
placeholder="Nombre del Usuario"/>
{selectedUser ? (
<button onClick={handleUpdateUser}>Actualizar Usuario</button>
) : (
<button onClick={handleCreateUser}>Crear Usuario</button>
)}
</div>
{loading ?
(<h1>Cargando...</h1>) :
( <ul>
{users.map((user) => (
<li key={user.id}>
{user.name}
<button onClick={() => setSelectedUser(user)}>Seleccionar para editar</button>
<button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
</li>
))}
</ul>)}


</div>
);
};

export default UserList;