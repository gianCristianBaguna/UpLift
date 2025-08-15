"use server";

import { prisma } from "@/utils/prisma";

export async function getAllServices() {
  return await prisma.service.findMany();
}

export async function getServicesByEventId(eventId: string) {
  return await prisma.event.findUnique({
    where: { id: eventId },
    select: { volunteerServices: true }
  });
}

export async function createService(serviceName: string) {
  return await prisma.service.create({
    data: {
      serviceName
    }
  });
}

export async function editServiceName(serviceName: string, newServiceName: string) {
  return await prisma.service.update({
    where: {
      serviceName
    },
    data: {
      serviceName: newServiceName
    }
  });
}

export async function removeService(serviceName: string) {
  return await prisma.service.delete({
    where: {
      serviceName
    }
  });
}