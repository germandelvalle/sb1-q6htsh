'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';

// Esquema de validación para login
const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().nonempty({ message: 'Password is required.' }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Manejo del envío del formulario
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Login Data:', values); // Muestra los valores en la consola
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {/* Campo Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@digifianz.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Contraseña */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón de Submit */}
        <div className='submit-button'>
          <Button type="submit" className="w-full primary mt-5">
            Login
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
    </Form>
  );
}
