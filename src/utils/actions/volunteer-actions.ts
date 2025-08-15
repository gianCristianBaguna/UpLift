"use server";

import { prisma } from "@/utils/prisma";

export interface Volunteer {
  name :string;
  sex :string;
  birthday :Date;
  civilStatus :string;
  address :string;
  occupation :string;
  contactNumber :string;
  email :string;
  skills :string[];
}

export async function createVolunteer(data: Volunteer) {
  return await prisma.volunteer.create({
    data
  })
}