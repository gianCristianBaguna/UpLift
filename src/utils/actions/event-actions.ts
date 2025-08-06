"use server";

import { prisma } from "@/utils/prisma"

export interface Event {
  id?: string | null | undefined;
  image: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  attendees: number;
  category: string;
  description: string
  impact: string;
}

export async function createEvent(data: Event) {
  const { id, ...eventData } = data;
  return await prisma.event.create({
    data: eventData
  });
}

export async function updateEvent(data: Event) {
  return await prisma.event.update({
    where: {
      id: data.id!
    },
    data
  })
}

export async function getAllEvents() {
  return await prisma.event.findMany();
}