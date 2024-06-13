import { NextResponse } from "next/server";
import Ticket from "@/app/(models)/Ticket";

export async function GET(req) {
  try {
    // finding all the tickets
    const tickets = await Ticket.find();
    return NextResponse.json({ tickets }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/Tickets:", error.message, error);
    return NextResponse.json(
      { message: "Error", error: error.message || error.toString() },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  console.log("POST request received");
  try {
    const body = await req.json();
    console.log("Received data:", body);

    // Save to MongoDB
    const ticket = new Ticket(body.formData); // body.formData contains the ticket data
    await ticket.save();

    return NextResponse.json(
      { message: "Ticket created successfully", data: ticket },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/Tickets:", error.message, error);
    return NextResponse.json(
      { message: "Error", error: error.message || error.toString() },
      { status: 500 }
    );
  }
}
