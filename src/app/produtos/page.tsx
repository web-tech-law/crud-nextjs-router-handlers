"use client"
import { TipoLanche } from "@/types/types";
import { cookies } from "next/headers";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Suspense, useEffect, useState } from "react";

export default function Produtos() {

    const navigate = useRouter();

    const [lista,setLista] = useState<TipoLanche[]>([]);

    useEffect(() => {
      const pegaLanche = async () =>
      { 
        const lanche = await fetch('/api/base-route',{
        method: 'GET',
      });
      const lancheJson = await lanche.json();
      setLista(lancheJson);
    }
    pegaLanche();

    }, []);
    
    const handleDelete = async (id:number)=>{

        try {
            const lanche = await fetch(`/api/base-route/${id}`,{
                method: 'DELETE',
                });

                if (lanche.ok) {
                        alert("Produto deletado com sucesso");
                        navigate.push("/");
                 }else{
                    alert("Ocorreu um erro ao tentar deletar o produto!");
                    navigate.push("/");
                 }

        } catch (error) {
            console.error("Falha ao apagar registro:", error);
        }

            
    }


    return (
        <div>
            <Suspense fallback={<p>Loading a ...</p>}>
       
            <h2>Produtos</h2>
            <table className="tabelaProd">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>R$</th>
                        <th>DESCRIÇÃO</th>
                        <th>EDITAR | EXCLUIR</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((lanche) => (
                        <tr key={lanche.id}>
                            <td>{lanche.id}</td>
                            <td>{lanche.nome}</td>
                            <td>{lanche.preco}</td>
                            <td>{lanche.desc}</td>
                            <td> <Link href={`/produtos/produto/${lanche.id}`}>Editar</Link> |
                            
                             <Link href="#" onClick={()=>handleDelete(lanche.id)}>Excluir</Link></td>

                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>
                            Quantidade de lanches : {lista.length}
                        </td>
                    </tr>
                </tfoot>
            </table>
</Suspense>
        </div>
    )
}
