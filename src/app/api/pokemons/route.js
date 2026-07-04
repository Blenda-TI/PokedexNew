import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { name, type, hp, attack, description, imageUrl, rarity } = await req.json();
  const pokemon = await prisma.pokemon.create({
    data: { name, type, hp: Number(hp), attack, description, imageUrl, rarity, userId: session.user.id }
  });
  return NextResponse.json(pokemon, { status: 201 });
}

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  const pokemons = await prisma.pokemon.findMany({
    where: {
      userId: session.user.id,
      name: { contains: search, mode: "insensitive" }
    },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(pokemons);
}