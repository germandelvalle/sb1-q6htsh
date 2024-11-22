'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import Link from 'next/link';
import ContentWrapperLayout from '@/src/components/content-wrapper-layout';
import { DatePickerWithRange } from '@/src/components/date-picker-with-range';
import InputWithTags from '@/src/components/input-with-tags';

// Esquema de validación para el formulario
const formSchema = z.object({
  scope_name: z.string().nonempty({ message: 'Scope name is required.' }),
  client: z.string().nonempty({ message: 'Client is required.' }),
  scope_amount: z
    .string()
    .nonempty({ message: 'Scope amount is required.' })
    .refine((value) => !isNaN(Number(value)), {
      message: 'Scope amount must be a number.',
    }),
  date_range: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }),
  sold_by: z.array(z.string()).optional(),
  teams_involved: z.array(z.string()).optional(),
});

export function NewScopeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      client: '',
      scope_name: '',
      scope_amount: '',
      date_range: undefined, // Valor inicial para el rango de fechas
      sold_by: [],
      teams_involved: [],
    },
  });

  // Manejo del envío del formulario
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Form Data:', values); // Muestra los valores en la consola
  };

  return (
    <Form {...form}>
      <div className="w-full">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <ContentWrapperLayout title="General Settings">
            <div className="grid grid-cols-2 gap-y-5 gap-x-10">
              {/* Campo Client */}
              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a client" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="client1">Client 1</SelectItem>
                          <SelectItem value="client2">Client 2</SelectItem>
                          <SelectItem value="client3">Client 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Scope Name */}
              <FormField
                control={form.control}
                name="scope_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scope Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter the scope name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Scope Amount */}
              <FormField
                control={form.control}
                name="scope_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scope Amount</FormLabel>
                    <FormControl>
                      <div className="relative flex rounded-lg">
                        <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground">
                          $
                        </span>
                        <Input
                          className="pl-8 pr-2 rounded-r-none"
                          placeholder="0.00"
                          type="text"
                          {...field}
                        />
                        <span className="inline-flex items-center rounded-e-lg border border-input bg-background px-3 text-sm text-muted-foreground">
                          USD
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Date Picker */}
              <FormField
                control={form.control}
                name="date_range"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Range</FormLabel>
                    <FormControl>
                      <DatePickerWithRange
                        value={field.value || { from: undefined, to: undefined }}
                        onChange={(range) => field.onChange(range)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Sold By */}
              <FormField
                control={form.control}
                name="sold_by"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sold By</FormLabel>
                    <FormControl>
                      <InputWithTags
                        value={field.value || []}
                        onChange={(tags) => field.onChange(tags)}
                        placeholder="Add people involved"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Teams Involved */}
              <FormField
                control={form.control}
                name="teams_involved"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teams Involved</FormLabel>
                    <FormControl>
                      <InputWithTags
                        value={field.value || []}
                        onChange={(tags) => field.onChange(tags)}
                        placeholder="Add teams involved"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </ContentWrapperLayout>

          {/* Botón de Submit */}
          <div className="submit-button">
            <Button type="submit" className="w-full primary mt-5">
              Save Changes
            </Button>
          </div>

          {/* Texto debajo del botón */}
          <div className="flex justify-between text-sm text-gray-500">
            <Link href="/auth/register" className="hover:underline">
              Have you forgotten your password?
            </Link>
            <Link href="/auth/register" className="hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </Form>
  );
}
