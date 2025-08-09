"use server";

import { prisma } from "@/utils/prisma";

export async function getAllServices() {
  return await prisma.skills.findMany();
}

export async function addServices(skills: string[]) {

  const skill = await prisma.skills.findMany();

  return await prisma.skills.update({
    where: {
      id: skill[0].id
    },
    data: {
      skills: {
        push: skills
      }
    }
  });
}

export async function removeServices(skillsToRemove: string[]) {
  const skillRecord = await prisma.skills.findFirst();
  if (!skillRecord) throw new Error("Skills record not found");

  const updatedSkills = skillRecord.skills.filter(
    skill => !skillsToRemove.includes(skill)
  );

  return await prisma.skills.update({
    where: { id: skillRecord.id },
    data: { skills: updatedSkills }
  });
}
