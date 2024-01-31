import { headers } from "next/headers";
import { NextRequest } from "next/server";

import { Webhook } from "svix";

import { prisma } from "@/lib/prisma";

const webhookSecret: string = process.env.NGROK_WEBHOOK_SECRET || "";

type Event = {
  data: EventData;
  object: "event";
  type: EventType;
};

type EventType = "user.created" | "user.deleted";

type EventData = {
  id: string;
  username: string;
  external_accounts: [
    {
      avatar_url?: string;
      email_address: string;
      first_name: string;
    },
  ];
};

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const payloadString = JSON.stringify(payload);
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixIdTimeStamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");
  if (!svixId || !svixIdTimeStamp || !svixSignature) {
    console.log("svixId", svixId);
    console.log("svixIdTimeStamp", svixIdTimeStamp);
    console.log("svixSignature", svixSignature);
    return new Response("Error occured", {
      status: 400,
    });
  }
  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixIdTimeStamp,
    "svix-signature": svixSignature,
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;
  try {
    evt = wh.verify(payloadString, svixHeaders) as Event;
  } catch (_) {
    console.log("error");
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType: EventType = evt.type;

  switch (eventType) {
    case "user.created": {
      const { id, external_accounts } = evt.data;
      await prisma.user.create({
        data: {
          id: id,
          name: external_accounts[0].first_name,
          email: external_accounts[0].email_address,
          image: external_accounts[0].avatar_url || "",
        },
      });
      return new Response("success!!", {
        status: 201,
      });
    }
    case "user.deleted": {
      const { id } = evt.data;
      await prisma.user.delete({
        where: {
          id: id,
        },
      });
      return new Response("success!!", {
        status: 201,
      });
    }
  }
}
