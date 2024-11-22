// Configuración de las columnas con soporte para sorting
export const columns = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="flex items-center space-x-2"
      >
        <span>Team Member</span>
        {column.getIsSorted() === 'asc' && <span>▲</span>}
        {column.getIsSorted() === 'desc' && <span>▼</span>}
        {!column.getIsSorted() && <span>⇅</span>}
      </button>
    ),
  },
  {
    accessorKey: 'baseSalary',
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="flex items-center space-x-2"
      >
        <span>Base Salary</span>
        {column.getIsSorted() === 'asc' && <span>▲</span>}
        {column.getIsSorted() === 'desc' && <span>▼</span>}
        {!column.getIsSorted() && <span>⇅</span>}
      </button>
    ),
    cell: ({ getValue }) => `$${getValue().toLocaleString()}`, // Formatea como moneda
  },
  {
    accessorKey: 'team',
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="flex items-center space-x-2"
      >
        <span>Team</span>
        {column.getIsSorted() === 'asc' && <span>▲</span>}
        {column.getIsSorted() === 'desc' && <span>▼</span>}
        {!column.getIsSorted() && <span>⇅</span>}
      </button>
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="flex items-center space-x-2"
      >
        <span>Role</span>
        {column.getIsSorted() === 'asc' && <span>▲</span>}
        {column.getIsSorted() === 'desc' && <span>▼</span>}
        {!column.getIsSorted() && <span>⇅</span>}
      </button>
    ),
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: () => (
      <div className="flex space-x-2 text-blue-500">
        <button className="hover:underline">View</button>
        <button className="hover:underline">Edit</button>
        <button className="hover:underline">Delete</button>
      </div>
    ),
  },
];
