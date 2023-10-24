'use client';

import trpc from '@/utils/trpc';

const generateId = () => (Math.random() + 1).toString(36).substring(7);

const Page = () => {
  const users = trpc.getUsers.useQuery();
  const createUser = trpc.createUser.useMutation({
    onSettled: () => {
      users.refetch();
    },
  });

  const listUsers = () => {
    return users.data?.map((id) => <li key={id}>{id}</li>) ?? [];
  };

  //loading state is already given from the react query
  if (users.isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => createUser.mutate({ userId: generateId() })}
      >
        Add User
      </button>
      <div>
        <ul>{listUsers()}</ul>
      </div>
    </div>
  );
};
export default Page;
