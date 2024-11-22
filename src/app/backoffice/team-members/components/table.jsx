'use client';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import useClients from '../../../hooks/useClient';
import { columns } from './tableColumns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../components/ui/table';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function MembersTable() {
  const { clients, loading } = useClients();

  const [sorting, setSorting] = useState(() => {
    // Cargar el sorting inicial desde el local storage o establecer el default
    const savedSorting = localStorage.getItem('table-sorting');
    return savedSorting ? JSON.parse(savedSorting) : [{ id: 'name', desc: false }]; // Orden inicial por el primer campo
  });

  const [globalFilter, setGlobalFilter] = useState(''); // Estado para manejar la búsqueda

  useEffect(() => {
    // Guardar el sorting en el local storage cada vez que cambie
    localStorage.setItem('table-sorting', JSON.stringify(sorting));
  }, [sorting]);

  const table = useReactTable({
    data: clients,
    columns, // Importamos las columnas desde el archivo externo
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
        <div className="relative">
          <Input
            id="input-26"
            className="peer pe-9 ps-9"
            placeholder="Search..."
            type="search"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <Search size={16} strokeWidth={2} />
          </div>
        </div>
      </div>
      <div className="rounded-md border border-gray-200 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-left px-4 py-2 text-sm font-medium text-gray-700"
                  >
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
                <TableRow key={row.id} className="hover:bg-gray-50 even:bg-gray-100 odd:bg-white">
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
