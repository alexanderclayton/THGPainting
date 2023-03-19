import AddClient from '../../components/AddClient/AddClient';
import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../../utils/queries';
import { Link } from 'react-router-dom'
import './AllClients.css';

const AllClients = () => {

    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    const handleFormSubmit = () => {
        console.log('Added new client!');
        alert('Client added successfully!')
    };



    return (
        <div>
            <p>All Clients</p>
            {data.getClients.map(client => (
                // console.log('getclient:', client);
                <Link to={`client/${client.name}`} className="client-card" key={client.name}>
                    <p>{client.name}</p>
                    <p>{client.address}</p>
                    <p>{client.email}</p>
                    <p>{client.phoneNumber}</p>
                </Link>
            ))}
            <AddClient onFormSubmit={handleFormSubmit} />
            <p>All Clients</p>
        </div>
    );
}

export default AllClients;

