import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Price } from "@/types";
import { User } from "@prisma/client";
import axios from "axios";

type Props = {
    prices: Price ;
    userAuth: User;
};

export default function SimpleSubscriptionCard({ prices ,userAuth}: Props) {
    if (!prices && !userAuth) {
        return <div>Loading...</div>; // o algún otro mensaje o componente de carga
    }

    console.log("datos del UserSquareIcon",userAuth)
    const obtenerSuscripcion = async (priceId: string,userid:string) => {
        try {
          
          const resultado = await axios.post('/api/checkout', { priceId , userid });
      
          // Redirigir al usuario a la URL de Stripe
          if (resultado.data.url) {
            window.location.href = resultado.data.url;  
          }
        } catch (error) {
          console.error("Error al obtener la suscripción:", error);
        }
      };
    
    return (
        <Card className="w-full max-w-sm mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Premium</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-center">
                    <span className="text-4xl font-bold">${(prices.unit_amount / 100).toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground">/mes</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={() => obtenerSuscripcion(prices.id,userAuth.id)} className="w-full">
                    Suscribirse
                </Button>
            </CardFooter>
        </Card>
    );
}