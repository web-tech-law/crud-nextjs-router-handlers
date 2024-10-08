"use client";
import { TipoLanche } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Produto({params}:{params:{id:number}}) {

  const navigate = useRouter();

  // Estados para armazenar os valores dos inputs
  const [produto, setProduto] = useState<TipoLanche>({
    id:0,
    nome: "",
    preco: 0,
    desc: "",
  });

  //Recuperando o objeto da API através do ID:
  useEffect(() => {
   const chamaApi = async ()=>{
    const response = await fetch(`http://localhost:3000/api/base-route/${params.id}`);
    const data = await response.json();
    setProduto(data);
   }
   chamaApi();
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    //Pegar o event target, desestruturar e depois adicionar no state:
    const { name, value } = e.target;
    setProduto((prev) => ({ ...prev, [name]: value }));
  }

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();

    // Exemplo de envio para o backend (integrar com sua API)

    try {
      const response = await fetch(`http://localhost:3000/api/base-route/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
      });

      if (response.ok) {
        alert("Lanche atualizado com sucesso!");
        // Resetar os campos após o envio
        setProduto({
          id:0,
          nome: "",
          preco: 0,
          desc: "",
        });

          navigate.push("/");

      } else {
        alert("Erro ao cadastrar o lanche.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar o lanche:", error);
    }
  };

  return (
    <div>
      <h1>Cadastrar Novo Lanche</h1>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="nome">Nome do Lanche:</label>
        
         <input
            type="text"
            id="nome"
            name="nome"
            value={produto.nome} onChange={(e) => handleChange(e)} required />
       
        </div>
        <div>
          <label htmlFor="preco">Preço:</label>
          <input
            type="number"
            step="0.01"
            id="preco"
            name="preco"
            value={produto.preco} onChange={(e) => handleChange(e)} required />
        </div>
        <div>
          <label htmlFor="desc">Descrição:</label>
          <textarea
            id="desc"
            name="desc"
            value={produto.desc} onChange={(e) => handleChange(e)} required></textarea>
        </div>
        <button type="submit">Atualizar Lanche</button>
      </form>

    </div>
  );
}



// <form onSubmit={handleSubmit}>
// <div>
//   <label htmlFor="nome">Nome do Lanche:</label>
//   <input
//     type="text"
//     id="nome"
//     value={produto.nome}
//     onChange={(e) => setproduto({...produto, nome:e.target.value})}
//     required
//   />
// </div>
// <div>
//   <label htmlFor="preco">Preço:</label>
//   <input
//     type="number"
//     step="0.01"
//     id="preco"
//     value={produto.preco}
//     onChange={(e) => setproduto({...produto, preco: parseFloat(e.target.value)})}
//     required
//   />
// </div>
// <div>
//   <label htmlFor="desc">Descrição:</label>
//   <textarea
//     id="desc"
//     value={produto.desc}
//     onChange={(e) => setproduto({...produto, desc:e.target.value})}
//     required
//   ></textarea>
// </div>
// <button type="submit">Cadastrar Lanche</button>
// </form>





// <form class="max-w-sm mx-auto">
//   <div class="mb-5">
//     <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//     <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
//      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
//       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
//   </div>
//   <div class="mb-5">
//     <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
//     <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
//      block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
//   </div>
//   <div class="flex items-start mb-5">
//     <div class="flex items-center h-5">
//       <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 
//         focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
//     </div>
//     <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
//   </div>
//   <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
//     focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
//      dark:focus:ring-blue-800">Submit</button>
// </form>
