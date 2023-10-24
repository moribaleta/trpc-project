'use client';

import { useEffect, useState } from 'react';

import generateId from '@/utils/generateRandom';
import trpc from '@/utils/trpc';

const Page = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('api/getUsers', { method: 'GET' }).then(
      (res) => res.json(),
    );
    console.log(response.result);
    setUsers(response.result.data);
  };

  const onCreateUser = async () => {
    await fetch('api/createUser', {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Connection: 'keep-alive',
        Accept: '*',
      },
      method: 'POST',
      body: JSON.stringify({
        userId: generateId(),
      }),
    });
    await fetchUsers();
  };

  const listUsers = () => {
    return users.map((id) => <li key={id}>{id}</li>);
  };

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <button type="button" onClick={onCreateUser}>
        Add User
      </button>
      <div>
        <ul>{listUsers()}</ul>
      </div>
    </div>
  );
};
export default Page;
