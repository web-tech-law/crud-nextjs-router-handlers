import { NextResponse } from "next/server";
import { promises as fs} from "fs";
import { TipoLanche } from "@/types/types";

export async function GET(request:Request, {params}:{params:{id:number}}) {

    try {
        const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
        const produtos:TipoLanche[] = JSON.parse(file);
        const produto = produtos.find(p => p.id == params.id);
        return NextResponse.json(produto);
    } catch (error) {
        return NextResponse.json({msg:"Falha ao ler a lista de lanches: " + error},{status:500})
    }
}

export async function DELETE(request:Request, {params}:{params:{id:number}}) {

    try {
        const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
        const produtos:TipoLanche[] = JSON.parse(file);
        const index = produtos.findIndex(p => p.id == params.id);
        if(index != -1) {
            produtos.splice(index, 1);
            await fs.writeFile(process.cwd() + '/src/data/base.json', JSON.stringify(produtos));
            return NextResponse.json({msg:"Lanche deletado com sucesso!"});
        }
    
    } catch (error) {
        return NextResponse.json({msg:"Falha ao ler a lista de lanches: " + error},{status:500})
    }
}

export async function PUT(request:Request, {params}:{params:{id:number}}) {
    
    try {
        const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
        const produtos:TipoLanche[] = JSON.parse(file);
        const index = produtos.findIndex(p => p.id == params.id);
        if(index != -1) {
            const body = await request.json();
            produtos.splice(index, 1,body);
            await fs.writeFile(process.cwd() + '/src/data/base.json', JSON.stringify(produtos));
            return NextResponse.json({msg:"Lanche atualizado com sucesso!"});
        }

    } catch (error) {
        return NextResponse.json({msg:"Falha ao atualizar a lista de lanches: " + error},{status:500})
    }
}





// export async function GET(request:Request, {params}:{params:{id:number}}) {
//     const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
//     const data:TipoLanche[] = JSON.parse(file);
//     const produto = data.find(p => p.id == params.id);

//     return NextResponse.json(produto);
// }


