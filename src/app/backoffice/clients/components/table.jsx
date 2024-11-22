'use client';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import useClients from '../../../hooks/useClient';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../components/ui/table';
import { useState } from 'react';

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

export function ClientsTable() {
  const { clients, loading } = useClients();
  const [sorting, setSorting] = useState([]); // Estado para manejar el sorting
  const [globalFilter, setGlobalFilter] = useState(''); // Estado para manejar la búsqueda

  const table = useReactTable({
    data: clients,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Modelo para manejar el filtrado
    state: {
      sorting,
      globalFilter, // Conecta el estado de búsqueda
    },
    onSortingChange: setSorting, // Actualiza el estado de sorting
    onGlobalFilterChange: setGlobalFilter, // Actualiza el estado de búsqueda
    globalFilterFn: 'includesString', // Tipo de filtro (coincidencia parcial de texto)
  });

  if (loading) {
    return 'Cargando tabla...';
  }

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">All Team Members</h2>
      {/* Input para búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search Team Members"
          className="border rounded px-4 py-2 w-full"
        />
      </div>
      <div className="rounded-md border border-gray-200 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-left px-4 py-2 text-sm font-medium text-gray-700">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-50 even:bg-gray-100 odd:bg-white"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-2 text-sm text-gray-800">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
