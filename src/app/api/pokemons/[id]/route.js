import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { id } = await params;
  const pokemon = await prisma.pokemon.findUnique({ where: { id } });
  if (!pokemon) return NextResponse.json({ error: "Pokémon não encontrado" }, { status: 404 });

  return NextResponse.json(pokemon, { status: 200 });
}

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { id } = await params;
  const { name, type, hp, attack, description, imageUrl, rarity } = await req.json();

  const pokemon = await prisma.pokemon.update({
    where: { id },
    data: { name, type, hp: Number(hp), attack, description, imageUrl, rarity }
  });

  return NextResponse.json(pokemon, { status: 200 });
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { id } = await params;
  await prisma.pokemon.delete({ where: { id } });

  return NextResponse.json({ message: "Pokémon removido" }, { status: 200 });
}