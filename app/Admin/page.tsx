"use client"

import { useState } from "react"
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

export default function Component() {

  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "Premium" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", status: "Basic" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", status: "Premium" },
    { id: 4, name: "David Lee", email: "david@example.com", status: "Basic" },
    { id: 5, name: "Eva Martinez", email: "eva@example.com", status: "Premium" },
  ])

  const totalUsers = users.length
  const premiumUsers = users.filter(user => user.status === "Premium").length
  const basicUsers = users.filter(user => user.status === "Basic").length

  const barChartData = [
    { name: "Jan", users: 500 },
    { name: "Feb", users: 300 },
    { name: "Mar", users: 500 },
    { name: "Apr", users: 280 },
    { name: "May", users: 590 },
  ]

  const pieChartData = [
    { name: "Premium", value: premiumUsers },
    { name: "Basic", value: basicUsers },
  ]

  const PASTEL_COLORS = ['Grey', 'green'] // Pastel blue and pastel black (gray)

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id))
  }

  const handleToggleStatus = (id: number) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === "Premium" ? "Basic" : "Premium" }
        : user
    ))
  }

 
  return (
    <div className="container mx-auto p-4">
      <Header/>
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
              <Bar dataKey="users" fill="grey" /> {/* Pastel blue */}
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
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge 
                    variant={user.status === "Premium" ? "default" : "secondary"}
                    className={`${user.status === "Premium" ? "bg-[#D6E0F0] text-[#2C3E50]" : "bg-[#E0E0E0] text-[#333333]"}`}
                  >
                    {user.status}
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
                      <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                        <ArrowUpDown className="mr-2 h-4 w-4" />
                        <span>Cambiar Membresía</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDelete(user.id)}>
                        <UserMinus className="mr-2 h-4 w-4" />
                        <span>Eliminar Usuario</span>
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
  )
}