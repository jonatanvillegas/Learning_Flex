"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { MoreHorizontal, ArrowUpDown, UserMinus, Users, UserCheck, UserX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Header from "../dashboard/_components/Header"
import axios from "axios"
import { User } from "@prisma/client"

export default function Component() {

  const [users, setUsers] = useState<User[]>([])
  const [barChartData, setBarChartData] = useState([
    { name: "Jan", users: 0 },
    { name: "Feb", users: 0 },
    { name: "Mar", users: 0 },
    { name: "Apr", users: 0 },
    { name: "May", users: 0 },
    { name: "Jun", users: 0 },
    { name: "Jul", users: 0 },
    { name: "Aug", users: 0 },
    { name: "Sep", users: 0 },
    { name: "Oct", users: 0 },
    { name: "Nov", users: 0 },
    { name: "Dec", users: 0 },
  ]);

  const handleDelete = (id: string) => {
    axios.delete('/api/user', { data: { id } })
      .then(response => {
        console.log(response.data.message);
        setUsers(users.filter(user => user.id !== id)); // Actualiza el estado después de eliminar
      })
      .catch(error => {
        console.error("Error eliminando el usuario:", error);
      });
  }

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await axios.patch('/api/user', { id });

      // Si la solicitud fue exitosa
      console.log('Estado del usuario actualizado:', response.data);
      // Actualiza el estado local después de cambiar el estado del usuario
      setUsers(users.map(user =>
        user.id === id ? { ...user, premium: !user.premium } : user
      ));
    } catch (error: any) {
      // Manejo de errores
      if (error.response) {
        console.error('Error actualizando el estado del usuario:', error.response.data.error);
      } else {
        console.error('Error al hacer la solicitud:', error.message);
      }
    }
  }
  function countUsersByMonth(users: User[]) {
    const months = [
      { name: "Jan", users: 0 },
      { name: "Feb", users: 0 },
      { name: "Mar", users: 0 },
      { name: "Apr", users: 0 },
      { name: "May", users: 0 },
      { name: "Jun", users: 0 },
      { name: "Jul", users: 0 },
      { name: "Aug", users: 0 },
      { name: "Sep", users: 0 },
      { name: "Oct", users: 0 },
      { name: "Nov", users: 0 },
      { name: "Dec", users: 0 },
    ];

    users.forEach(user => {
      const createdMonth = new Date(user.createdAt).getUTCMonth();
      months[createdMonth].users += 1;
    });

    setBarChartData(months);
  }

  useEffect(() => {
    // petición al cargar el componente
    axios.get('/api/user')
      .then(response => {
        setUsers(response.data);
        countUsersByMonth(response.data);  
      })
      .catch(error => {
        console.error("Error fetching users:", error)
      })
  }, []); 

  const totalUsers = users.length
  const premiumUsers = users.filter(user => user.premium === true).length
  const basicUsers = users.filter(user => user.premium === false).length

  const pieChartData = [
    { name: "Premium", value: premiumUsers },
    { name: "Basic", value: basicUsers },
  ]

  const PASTEL_COLORS = ['Grey', 'green']


  return (
    <div className="container mx-auto p-4">
      <Header />
      <h1 className="text-2xl font-bold mb-4">Panel Administrativo</h1>
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Premium</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{premiumUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Básicos</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{basicUsers}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-card text-card-foreground rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold p-4">Usuarios por Mes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="users" fill="grey" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card text-card-foreground rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold p-4">Distribución de Membresías</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PASTEL_COLORS[index % PASTEL_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-card text-card-foreground rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.premium === true ? "default" : "secondary"}
                    className={`${user.premium === false ? "bg-[#D6E0F0] text-[#2C3E50]" : "bg-[#E0E0E0] text-[#333333]"}`}
                  >
                    {user.premium === true ? 'Premium' : 'Basic'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        Cambiar Membresía
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500"
                      >
                        Eliminar Usuario
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
