"use server";

import { prisma } from "@/utils/prisma"

export interface Event {
  id?: string | null | undefined;
  image: string;
  imagePublicId: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  attendees: number;
  category: string;
  description: string
  impact: string;
  volunteerServices: string[];
}

export async function createEvent(data: Event) {
  const { id, ...eventData } = data;
  return await prisma.event.create({
    data: eventData
  });
}

export async function updateEvent(data: Event) {
  const { id, ...eventData } = data;
  return await prisma.event.update({
    where: {
      id: id!
    },
    data: eventData
  })
}

export async function getAllEvents() {
  return await prisma.event.findMany();
}

export async function deleteEvent(id: string) {
  return await prisma.event.delete({
    where: {
      id
    }
  });
}