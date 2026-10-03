import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/users', {
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const normalizedUsers = Array.isArray(data)
          ? data
          : Array.isArray(data.users)
            ? data.users
            : Object.values(data ?? {});

        setUsers(normalizedUsers);
      } catch (err) {
        setError(err.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <main className="app">
      <h1>Users</h1>

      {loading && <p>Loading users...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && users.length === 0 && <p>No users found.</p>}

      {!loading && !error && (
        <ul className="user-list">
          {users.map((user, index) => {
            const id = user.id ?? user._id ?? index + 1;
            const name = user.name ?? user.username ?? user.email ?? `User ${id}`;
            const details = user.email ?? user.username ?? user.role ?? 'No additional details';

            return (
              <li key={id} className="user-item">
                <strong>{name}</strong>
                <span>{details}</span>
                {user.role && <small>{user.role}</small>}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

export default App;
