import AddClient from '../../components/AddClient/AddClient';

const AllClients = () => {
    const handleFormSubmit = () => {
        console.log('Added new client!')
    };

    return (
        <div>
            <AddClient onFormSubmit={handleFormSubmit} />
            <p>All Clients</p>
        </div>
    )
}

export default AllClients;