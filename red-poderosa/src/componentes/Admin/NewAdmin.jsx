import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewAdmin = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mail, setMail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, lastName, mail, birthdate, password, isAdmin: true };

        try {
            const response = await fetch('http://localhost:5156/User/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
                return;
            }

            alert('Usuario creado correctamente.');
            navigate('/admin');
        } catch (error) {
            console.error('Error creando usuario:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" required />
            <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Apellido" required />
            <input value={mail} onChange={e => setMail(e.target.value)} placeholder="Email" required />
            <input value={birthdate} onChange={e => setBirthdate(e.target.value)} placeholder="Fecha Nacimiento" type="date" required />
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" type="password" required />
            <button type="submit">Crear</button>
        </form>
    );
};

export default NewAdmin;