import { use } from 'react';

export default function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = use(params);

  return (
    <div>
      <p>Hello Id: {id}</p>
    </div>
  );
}
